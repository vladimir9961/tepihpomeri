import { ContactInputsModel } from '../../model/contact-inputs.model';

export class ContactInputs {
    static CONTACT_INPUTS: ContactInputsModel[] = [
        {
            label: 'Puno ime i prezime',
            type: 'text',
            form_control: 'from_name',
            required: true,
        },
        {
            label: 'Email',
            type: 'email',
            form_control: 'from_email',
            required: true,
        },
        {
            label: 'Broj telefona',
            type: 'number',
            form_control: 'number',
            required: true,
        },
        {
            label: 'Adresa ulica i broj',
            type: 'text',
            form_control: 'address',
            required: true,
        },
        {
            label: 'Poštanski broj',
            type: 'number',
            form_control: 'zip_number',
            required: true,
        },
    ];
}
