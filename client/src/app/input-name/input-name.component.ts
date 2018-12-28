import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator } from "@angular/forms";

@Component({
  selector: 'input-name',
  templateUrl: './input-name.component.html',
  styleUrls: ['./input-name.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputNameComponent),
      multi: true
    },
  ]
})

export class InputNameComponent implements ControlValueAccessor {
  firstName: string = ""
  lastName: string = ""

  private onChange: (value: FullName) => {}
  private onTouched: Function;

  constructor() {
  }

  onChangeFirstName(firstName) {
    this.firstName = firstName
    this.onChange && this.onChange({
      firstName: this.firstName,
      lastName: this.lastName
    })
  }

  onChangeLastName(lastName) {
    this.lastName = lastName
    this.onChange && this.onChange({
      firstName: this.firstName,
      lastName: this.lastName
    })
  }

  writeValue(value) {
    if (!value) return
    this.firstName = value.firstName 
    this.lastName = value.lastName 
  }

  registerOnChange(fn) {
    this.onChange = fn
  }
  registerOnTouched(fn) { this.onTouched = fn; }
}

interface FullName {
  firstName: string
  lastName: string
}
