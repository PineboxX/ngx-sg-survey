import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as ons from 'onsenui';

@Component({
  selector: 'app-landing-register',
  templateUrl: 'landing-register.component.html',
  styleUrls: ['landing-register.component.scss']
})

export class LandingRegisterComponent implements OnInit {

  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store<{}>
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  private buildForm() {
    this.form = this.fb.group({
      'genere': ['', Validators.required],
      'age': ['', Validators.required],
      'know': ['', Validators.required]
    });
  }

  public onFormSubmitted({ value, valid }: { value: any, valid: boolean }) {
    console.log(valid, value);
    if (valid) {
      switch (value.know) {
        case "true":

          break;
        case "false":
          ons.notification.alert({
            message: 'Muchas gracias por su tiempo y colaboración',
            title: 'Encuesta Finalizada'
          })
          break;
      }
    }
  }
}