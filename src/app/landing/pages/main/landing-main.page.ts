import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'page-landing-main',
  templateUrl: 'landing-main.page.html'
})

export class LandingMainPage implements OnInit {
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  goToStats() {
    this.router.navigate(['/stats/graphV1', 0]);
  }

}