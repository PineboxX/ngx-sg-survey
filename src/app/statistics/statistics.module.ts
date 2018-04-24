import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { COMPONENTS } from './components';
import { PAGES } from './pages';
import { StatisticsRoutingModule } from './statistics.router';
import { SharedModule } from '../shared/shared.module';
import { ChartsModule } from 'ng2-charts';
import { SERVICES } from './services';


@NgModule({
  imports: [
    CommonModule,
    StatisticsRoutingModule,
    SharedModule,
    ChartsModule
  ],
  exports: [],
  declarations: [
    COMPONENTS,
    PAGES
  ],
  providers: [
    SERVICES
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StatisticsModule { }
