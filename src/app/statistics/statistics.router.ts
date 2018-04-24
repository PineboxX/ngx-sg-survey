import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StatisticMainPage } from './pages/statistic-main.page';

const routes: Routes = [
  {
    path: 'stats', children: [
      {
        path: 'graphV1/:id', component: StatisticMainPage
      },
      {
        path: ':id', component: StatisticMainPage
      },
      {
        path: 'graphV2/:id', component: StatisticMainPage
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StatisticsRoutingModule { }

export const routedComponents = [StatisticMainPage];