import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SurveyMainPage } from './pages/survey-main/survey-main.page';

const routes: Routes = [
  { path: 'survey', component: SurveyMainPage },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SurveyRoutingModule { }

export const routedComponents = [SurveyMainPage];