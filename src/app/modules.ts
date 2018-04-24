import { SurveyModule } from "./survey/survey.module";
import { SharedModule } from "./shared/shared.module";
import { LandingMainPage } from "./landing/pages/main/landing-main.page";
import { LandingModule } from "./landing/landing.module";
import { StatisticsModule } from "./statistics/statistics.module";

export const MODULES = [
  SurveyModule,
  LandingModule,
  SharedModule,
  StatisticsModule
];
