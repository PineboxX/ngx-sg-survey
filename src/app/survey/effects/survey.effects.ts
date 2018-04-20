import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { SurveyService } from '../services/survey.service';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import * as surveyActions from '../../survey/actions/survey.actions';
import { switchMap, map } from 'rxjs/operators';
import { SurveyQuestion } from '../models/questions.model';

@Injectable()
export class SurveyEffects {

  @Effect()
  public getQuestions: Observable<Action> = this.actions$
    .ofType(surveyActions.GET_QUESTIONS)
    .pipe(switchMap(() => {
      return this.surveyService.getActiveQuestion()
        .pipe(map((questions: SurveyQuestion[]) => new surveyActions.setQuestions(questions)))
    }))


  constructor(
    private actions$: Actions,
    private surveyService: SurveyService
  ) { }
}