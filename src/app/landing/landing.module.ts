import { NgModule } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { CommonModule } from '@angular/common';
import { COMPONENTS } from './components';
import { PAGES } from './pages';
import { LandingRoutingModule } from './landing.router';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { reducer } from './reducer/landing.reducer';
import { EffectsModule } from '@ngrx/effects';
import { EFFECTS } from './effects';
import { SERVICES } from './services';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LandingRoutingModule,
    SharedModule,
    StoreModule.forFeature('landingFeatureModel', { landingState: reducer }),
    EffectsModule.forFeature(EFFECTS)
  ],
  exports: [],
  declarations: [COMPONENTS, PAGES],
  providers: [SERVICES],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LandingModule { }
