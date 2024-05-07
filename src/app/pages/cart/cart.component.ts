import emailjs from '@emailjs/browser'
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, Subject, takeUntil } from 'rxjs';

// Models
import { ProductCart } from '../../model/product-cart.model';

// Store
import { getProduct } from '../../store/product.actions';
import { selectProduct } from '../../store/product.selectors';
import { InputComponent } from '../../components/input/input.component';

// Contants
import { ContactInputs } from '../../utils/constants/contact-inputs.constants';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    CommonModule, 
    InputComponent
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  private destroy$ = new Subject<void>();

  public contactInputs = ContactInputs.CONTACT_INPUTS
  
  public product$: Observable<ProductCart[]>
  private store = inject(Store)

  public productsInStore: any = []
  
  public order_form: FormGroup = this.fb.group({
    from_email: ['', [Validators.required, Validators.email]],
    from_name: ['', [Validators.required]],
    number: ['', [Validators.required]],
    address: ['', [Validators.required]],
    zip_number: ['', [Validators.required]],
    to_name: ['Vladimir'],
    message: [''],
  })

  constructor(private fb: FormBuilder){
    this.store.dispatch(getProduct());

    this.product$ = this.store.select(selectProduct);
  }

  ngOnInit(): void {
    this.getCart()

    this.order_form.valueChanges
    .pipe(takeUntil(this.destroy$))
    .subscribe(res => {
      console.log(res)
    })
  }

   public hasError(controlName: string, errorName: string): any {
    return this.order_form.get(controlName)?.hasError(errorName);
  }

  private getCart(): void {
    this.product$
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe((res: any) =>{ 
      this.productsInStore = res
    })
  }
  

  public async send() {
    // Format products array
    let productsFormatted = '';
    this.productsInStore.forEach((product: any, index: number) => {
       productsFormatted += `${index + 1}. ${product.name} - Količina: ${product.quantity}\n\n`;
    });
  
    // Send email
    emailjs.init('MNR5w-ogbuNl8JNtO');
    let response = await emailjs.send("service_8nctpdf", "template_6frimj3", {
      to_name: this.order_form.value.to_name,
      from_name: this.order_form.value.from_name,
      from_email: this.order_form.value.from_email,
      message: this.order_form.value.message,
      address: this.order_form.value.address,
      number: this.order_form.value.number,
      zip_number: this.order_form.value.zip_number,
      order: productsFormatted // Include the formatted product list in the email message
    });
  
    // Reset order_form after sending email
    this.order_form.reset();
  }
  
}