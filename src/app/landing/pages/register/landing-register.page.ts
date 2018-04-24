import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AngularFireAuth } from 'angularfire2/auth';
import { has } from 'lodash';
import { Router } from '@angular/router';
@Component({
  selector: 'page-landing-register',
  templateUrl: 'landing-register.page.html'
})

export class LandingRegisterPage implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  goToStats() {
    this.router.navigate(['/stats/graphV1', 0]);
  }


}