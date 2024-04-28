import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import emailjs from '@emailjs/browser'

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  public form: FormGroup = this.fb.group({
    from_email: '',
    from_name: '',
    number: '',
    to_name: "Vladimir",
    address: '',
    message: '',
    zip_number: ''
  })

  constructor(private fb: FormBuilder){}

  async send() {
    emailjs.init('MNR5w-ogbuNl8JNtO')
    let response = await emailjs.send("service_8nctpdf","template_6frimj3",{
      to_name: this.form.value.to_name,
      from_name: this.form.value.from_name,
      from_email: this.form.value.from_email,
      message: this.form.value.message,
      address: this.form.value.address,
      number: this.form.value.number,
      zip_number: this.form.value.zip_number
      });

    console.log(response)

      alert('Message sent')

      this.form.reset()
  }
}