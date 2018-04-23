import { NgModule } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { CommonModule } from '@angular/common';
import { COMPONENTS } from './components';
import { PAGES } from './pages';
import { LandingRoutingModule } from './landing.router';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    LandingRoutingModule,
    SharedModule
  ],
  exports: [],
  declarations: [COMPONENTS, PAGES],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LandingModule { }
