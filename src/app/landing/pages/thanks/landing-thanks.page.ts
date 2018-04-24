import { Component, OnInit } from '@angular/core';
import * as landingActions from '../../actions/landing.actions';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-landing-thanks',
  templateUrl: 'landing-thanks.page.html'
})

export class LandingThanksPage implements OnInit {
  constructor(private store: Store<{}>) { }

  ngOnInit() { }

  public signOut() {
    this.store.dispatch(new landingActions.SignOut());
  }
}