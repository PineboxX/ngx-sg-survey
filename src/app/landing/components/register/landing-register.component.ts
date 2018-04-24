import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as ons from 'onsenui';
import * as landingActions from '../../actions/landing.actions';
import { AngularFireAuth } from 'angularfire2/auth';
import { Subscription } from 'rxjs/Subscription';
import * as landingSelectors from '../../reducer/landing.reducer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-register',
  templateUrl: 'landing-register.component.html',
  styleUrls: ['landing-register.component.scss']
})

export class LandingRegisterComponent implements OnInit, OnDestroy {

  @ViewChild("alertDialog") public alertDialog;

  public registerSubs: Subscription;

  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store<{}>,
    private afAuth: AngularFireAuth,
    private router: Router
  ) { }

  ngOnInit() {
    this.buildForm();
    this.listenRegisterReducer();
  }

  private buildForm() {
    this.form = this.fb.group({
      'gender': ['', Validators.required],
      'age': ['', Validators.compose([Validators.required, Validators.min(14), Validators.max(90)])],
      'know': ['', Validators.required]
    });
  }

  public onFormSubmitted({ value, valid }: { value: any, valid: boolean }) {
    if (valid) {
      this.alertDialog.nativeElement.show();
      switch (value.know) {
        case "true":
          this.store.dispatch(new landingActions.RegisterUser({ gender: value.gender, age: value.age, know: true }));
          break;
        case "false":
          this.store.dispatch(new landingActions.RegisterUser({ gender: value.gender, age: value.age, know: false }));
          break;
      }
    }
    else {
      ons.notification.toast('Debes completar todos los campos antes de continuar', {
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

  public listenRegisterReducer() {
    this.registerSubs = this.store.select(landingSelectors.getLandingPreRegister).subscribe((landingRegister) => {
      if (landingRegister) {
        setTimeout(() => {
          this.alertDialog.nativeElement.hide();
          switch (landingRegister.know) {
            case true:
              return this.router.navigate(['survey']);
            case false:
              this.router.navigate(['thanks']);
          };
        }, 1000);
      }
    });
  }

  public ngOnDestroy() {
    if (this.registerSubs) this.registerSubs.unsubscribe();
  }
}