import { Component, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { MatCheckboxModule, MatCheckbox } from '@angular/material/checkbox';
import { MatSelectModule, MatSelect, MatOption } from '@angular/material/select';
import { MatButton } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { exactValueValidator } from '../validators/exact-value-validator';
import { noLetterAValidator } from '../validators/no-letter-a-validator';

@Component({
  selector: 'app-application-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormField,
    MatLabel,
    MatError,
    MatCheckbox,
    MatSelect,
    MatOption,
    MatButton,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule
  ],
  templateUrl: './application-form.component.html',
  styleUrl: './application-form.component.scss'
})
export class ApplicationFormComponent {
  stepNumber: number = 1;
  myForm: FormGroup;
  levels = ['Junior', 'Mid', 'Senior'];

  constructor(private fb: FormBuilder, private changeDetectorRef: ChangeDetectorRef) {
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      lookingForAJob: [true],
      experienceLevel: [null, Validators.required],
      twoPlusTwo: [null],
      description: [''],
      motivationalLetter: ['']
    });

    this.myForm.get('experienceLevel')!.valueChanges.subscribe(() => {
      if (this.myForm.get('experienceLevel')!.value === 'Junior') {
        this.myForm.get('twoPlusTwo')!.setValidators([Validators.required, exactValueValidator(4)]);
        this.myForm.get('description')!.clearValidators();
      }
      if (this.myForm.get('experienceLevel')!.value === 'Mid') {
        this.myForm.get('description')!.setValidators([Validators.required, noLetterAValidator()]);
        this.myForm.get('twoPlusTwo')!.clearValidators();
      }
      if (this.myForm.get('experienceLevel')!.value === 'Senior') {
        this.myForm.get('twoPlusTwo')!.clearValidators();
        this.myForm.get('description')!.clearValidators();
      }
      this.myForm.get('twoPlusTwo')!.updateValueAndValidity();
      this.myForm.get('description')!.updateValueAndValidity();
      
      this.changeDetectorRef.detectChanges();
    });
  }

  onSubmitStepOne() {
    if (this.myForm.valid) {
      this.stepNumber = 2;
      if (this.myForm.get('lookingForAJob')!.value === false && this.myForm.get('experienceLevel')!.value === 'Senior') {
        this.myForm.get('motivationalLetter')!.setValidators([Validators.required, Validators.minLength(140)]);
      }
    }
  }

  onSubmitStepTwo() {
    if (this.myForm.valid) {
      this.stepNumber = 3;
    }
  }
}
