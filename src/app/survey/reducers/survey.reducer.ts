import * as surveyActions from '../../survey/actions/survey.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export type Action = surveyActions.All;

export interface SurveyFeatureModel {
  surveyState: State
}

export interface State {
  questions: any,
  answers: any
}

export const initialState: State = {
  questions: null,
  answers: null
}

export function reducer(state: State = null, action: Action) {
  switch (action.type) {
    case surveyActions.GET_QUESTIONS:
      return { ...state, questions: action.payload };
    case surveyActions.GET_ANSWER:
      return { ...state, answers: action.payload }
    default:
      return state;
  }
}

export const getSurveyFeatureModel = createFeatureSelector<SurveyFeatureModel>('surveyFeatureModel');
export const getSurveyState = createSelector(getSurveyFeatureModel, (state: SurveyFeatureModel) => state.surveyState);
export const getSurveyQuestions = createSelector(getSurveyState, (state: State) => state.questions);
export const getSurveyAnswers = createSelector(getSurveyState, (state: State) => state.answers)