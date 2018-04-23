import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as ons from 'onsenui';
import * as landingActions from '../../actions/landing.actions';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-landing-register',
  templateUrl: 'landing-register.component.html',
  styleUrls: ['landing-register.component.scss']
})

export class LandingRegisterComponent implements OnInit {

  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store<{}>,
    private afAuth: AngularFireAuth
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
          // Chane to true: boolean
          this.store.dispatch(new landingActions.RegisterUser({ genere: value.genere, age: value.age, know: true }));

          break;
        case "false":
          this.store.dispatch(new landingActions.RegisterUser({ genere: value.genere, age: value.age, know: false }))
          break;
      }
    }
    else {
      ons.notification.toast('Completa todos los campos', {
        timeout: 1000
      })
    }
  }

  public canShowRegister() {
    if (this.afAuth.auth.currentUser === undefined) {
      return false;
    }
    return false;
  }
}