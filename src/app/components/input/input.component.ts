import { CommonModule } from '@angular/common';
import { Component, Input, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent implements ControlValueAccessor {
  @Input() label: string = ''
  @Input() type: string = ''
  @Input() isRequired: boolean = false
  @Input() choseFile: boolean = false;
  @Input() name: string = '';

  public _value: any = '';

  public onChange: any = () => {};
  public onTouched: any = () => {};

  get value(): any { return this._value; };

  set value(v: any) {
    if (v !== this._value) {
      this._value = v;
      this.onChange(v);
    }
  }

  public writeValue(value: any): void {
    this.value = value;
  }
  
  public registerOnChange(fn: any) {
    this.onChange = fn;
  }
  
  public registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  constructor( @Self() public superControl: NgControl) {
    if (this.superControl.value) {
      this.value = this.superControl.value;
    }
  }

  public updateValue(newValue: any) {
    this.value = newValue.value; 
    this.onChange(newValue.value);
    this.onTouched();
  }
  

  public isTouched(): boolean {
    if (this.superControl && this.superControl.control) {
      return this.superControl.control.touched;
    }
    return false;
  }
}
