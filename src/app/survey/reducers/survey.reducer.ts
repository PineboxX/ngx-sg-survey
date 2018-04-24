import * as surveyActions from '../../survey/actions/survey.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SurveyQuestion } from '../models/questions.model';

export type Action = surveyActions.All;

export interface SurveyFeatureModel {
  surveyState: State
}

export interface State {
  questions: SurveyQuestion[],
  answers: any
}

export const initialState: State = {
  questions: [],
  answers: null
}

export function reducer(state: State = initialState, action: Action) {
  switch (action.type) {
    case surveyActions.SET_QUESTIONS:
      return { ...state, questions: action.payload };
    default:
      return state;
  }
}

export const getSurveyFeatureModel = createFeatureSelector<SurveyFeatureModel>('surveyFeatureModel');
export const getSurveyState = createSelector(getSurveyFeatureModel, (state: SurveyFeatureModel) => state.surveyState);
export const getSurveyQuestions = createSelector(getSurveyState, (state: State) => state.questions);
export const getSurveyAnswers = createSelector(getSurveyState, (state: State) => state.answers)