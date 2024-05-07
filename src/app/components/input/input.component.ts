import { CommonModule } from '@angular/common';
import { Component, Input, Self } from '@angular/core';
import {
    ControlValueAccessor,
    FormsModule,
    NgControl,
    ReactiveFormsModule,
} from '@angular/forms';
@Component({
    selector: 'app-input',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    templateUrl: './input.component.html',
    styleUrl: './input.component.scss',
})
export class InputComponent implements ControlValueAccessor {
    @Input() label: string = '';
    @Input() type: string = '';
    @Input() isRequired: boolean = false;
    @Input() choseFile: boolean = false;
    @Input() name: string = '';

    public _value: any = '';

    public touchedInput: boolean = false;
    public focusInput: boolean = false;

    get value(): any {
        return this._value;
    }

    set value(v: any) {
        if (v !== this._value) {
            this._value = v;
            this.onChange(v);
        }
    }

    constructor(@Self() public superControl: NgControl) {
        this.superControl.valueAccessor = this;
    }

    get getSuperControl() {
        return this.superControl.control;
    }

    public writeValue(value: any): void {
        this.value = value;
    }

    public registerOnChange(fn: any) {
        this.onChange = fn;
    }

    public onChange(_: any): void {}

    public registerOnTouched(_: any): void {}

    public setDisabledState?(_: boolean): void {}

    public updateValue(newValue: any): void {
        this.value = newValue.value;
        this.onChange(newValue.value);
    }

    public onBlur(): void {
        this.touchedInput = true;
    }

    public onFocus(): void {
        this.focusInput = true;
    }
}
