import { Action } from '@ngrx/store';
import { SurveyQuestion, SurveyAnswers } from '../models/questions.model';

export const GET_QUESTIONS = '[ Survey ] - Get Questions';
export const SET_QUESTIONS = '[ Survey ] - Set Questions';
export const SAVE_ANSWER = '[ Survey ] - Save Answer';
export const GET_ANSWER = '[ Survey ] - Get Answer';

export class getQuestions implements Action {
  readonly type = GET_QUESTIONS;
  constructor() { }
}

export class setQuestions implements Action {
  readonly type = SET_QUESTIONS;
  constructor(public payload: SurveyQuestion[]) { }
}

export class saveAnswer implements Action {
  readonly type = SAVE_ANSWER;
  constructor(public payload: any) { }
}

export class GetAnswer implements Action {
  readonly type = GET_ANSWER;
  constructor(public payload: any) { }
}

export type All = getQuestions |
  setQuestions |
  saveAnswer |
  GetAnswer;
