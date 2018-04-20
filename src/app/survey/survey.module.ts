import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { reducer } from './reducers/survey.reducer';
import { COMPONENTS } from './components';
import { PAGES } from './pages';
import { SERVICES } from './services';
import { SurveyRoutingModule } from './survey.router';
import { SharedModule } from '../shared/shared.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { EFFECTS } from './effects';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SurveyRoutingModule,
    SharedModule,
    StoreModule.forFeature('surveyFeatureModel', { surveyState: reducer }),
    EffectsModule.forFeature(EFFECTS)
  ],
  exports: [],
  declarations: [COMPONENTS, PAGES],
  providers: [SERVICES],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SurveyModule { }
