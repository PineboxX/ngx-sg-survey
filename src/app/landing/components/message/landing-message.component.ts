import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-message',
  templateUrl: 'landing-message.component.html'
})

export class LandingMessageComponent implements OnInit {
  constructor(
    private router: Router
  ) { }

  ngOnInit() { }

  participate() {
    console.log('works');
    this.router.navigate(['register']);
  }
}