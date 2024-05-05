import { AngularSvgIconModule } from 'angular-svg-icon';
import emailjs from '@emailjs/browser';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { Component } from '@angular/core';

import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import {
    MatDialogRef,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

// Constants
import { ContactInputs } from '../../utils/constants/contact-inputs.constants';

// Components
import { InputComponent } from '../../components/input/input.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [
        AngularSvgIconModule,
        MatDialogModule,
        MatInputModule,
        MatFormFieldModule,
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
})
export class HomeComponent {
    public contactInputs = ContactInputs.CONTACT_INPUTS;

    constructor(public dialog: MatDialog) {}

    public openDialog(
        enterAnimationDuration: string,
        exitAnimationDuration: string
    ): void {
        this.dialog.open(DialogAnimationsExampleDialog, {
            width: '450px',
            enterAnimationDuration,
            exitAnimationDuration,
        });
    }
}

@Component({
    selector: 'home-modal',
    templateUrl: 'home-modal.html',
    styleUrl: './home.component.scss',
    standalone: true,
    imports: [
        MatButtonModule,
        MatDialogActions,
        MatDialogClose,
        MatDialogTitle,
        MatDialogContent,

        ReactiveFormsModule,

        InputComponent,
    ],
})
export class DialogAnimationsExampleDialog {
    private destroy$ = new Subject<void>();
    public contactInputs = ContactInputs.CONTACT_INPUTS;
    public imageUrl: any;

    public order_form: FormGroup = this.fb.group({
        from_email: ['', [Validators.required, Validators.email]],
        from_name: ['', [Validators.required]],
        number: ['', [Validators.required]],
        address: ['', [Validators.required]],
        zip_number: ['', [Validators.required]],
        width: ['', [Validators.required]],
        lenght: ['', [Validators.required]],
        to_name: ['Vladimir'],
        message: [''],
        file: [''],
    });

    constructor(
        public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>,
        private fb: FormBuilder
    ) {}

    public handleFileInput(event: any): void {
        const file = event.target.files[0];
        if (file) {
            // Read the file as a data URL
            const reader = new FileReader();
            reader.onload = (e: any) => {
                this.imageUrl = e.target.result;
                // Update form control value with the Base64 data URL
                this.order_form.patchValue({ file: e.target.result });
            };
            reader.readAsDataURL(file);
        }
    }

    public async sendEmail(): Promise<void> {
        emailjs.init('MNR5w-ogbuNl8JNtO');
        try {
            const response = await emailjs.send(
                'service_8nctpdf',
                'template_6frimj3',
                {
                    to_name: this.order_form.value.to_name,
                    from_name: this.order_form.value.from_name,
                    from_email: this.order_form.value.from_email,
                    message: this.order_form.value.message,
                    address: this.order_form.value.address,
                    number: this.order_form.value.number,
                    zip_number: this.order_form.value.zip_number,
                    width: this.order_form.value.width,
                    length: this.order_form.value.length,
                    file: this.order_form.value.file.toDataURL(), // Pass the Base64 data URL directly
                }
            );
            console.log('Email sent:', response);
        } catch (error) {
            console.error('Email sending failed:', error);
        }
    }
}
