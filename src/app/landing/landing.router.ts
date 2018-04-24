import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingMainPage } from './pages/main/landing-main.page';
import { LandingRegisterPage } from './pages/register/landing-register.page';
import { LandingThanksPage } from './pages/thanks/landing-thanks.page';

const routes: Routes = [
  { path: '', component: LandingMainPage },
  { path: 'register', component: LandingRegisterPage },
  { path: 'thanks', component: LandingThanksPage }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandingRoutingModule { }

export const routedComponents = [LandingMainPage, LandingThanksPage];