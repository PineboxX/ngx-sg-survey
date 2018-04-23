import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingMainPage } from './pages/main/landing-main.page';

const routes: Routes = [
  { path: 'landing', component: LandingMainPage },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandingRoutingModule { }

export const routedComponents = [LandingMainPage];