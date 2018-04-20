import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SurveyQuestion } from '../../models/questions.model';
import * as surveyActions from '../../actions/survey.actions';
import * as surveySelectors from '../../reducers/survey.reducer';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-survey-main',
  templateUrl: 'survey-main.page.html'
})

export class SurveyMainPage implements OnInit {

  public surveyQuestions$: Observable<SurveyQuestion[]>

  constructor(
    private store: Store<{}>
  ) { }

  ngOnInit() {
    this.getQuestions();
  }

  private getQuestions() {
    this.store.dispatch(new surveyActions.getQuestions());
    this.surveyQuestions$ = this.store.select(surveySelectors.getSurveyQuestions);
  }
}