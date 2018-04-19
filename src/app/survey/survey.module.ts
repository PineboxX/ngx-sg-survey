import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { reducer } from './reducers/survey.reducer';
import { COMPONENTS } from './components';
import { PAGES } from './pages';
import { SERVICES } from './services';
import { SurveyRoutingModule } from './survey.router';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SurveyRoutingModule,
    StoreModule.forFeature('surveyFeatureModel', reducer)
  ],
  exports: [],
  declarations: [COMPONENTS, PAGES],
  providers: [SERVICES],
})
export class SurveyModule { }
