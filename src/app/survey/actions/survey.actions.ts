import { Action } from '@ngrx/store';

export const GET_QUESTIONS = '[ Survey ] - Get Questions';
export const SAVE_ANSWER = '[ Survey ] - Save Answer';
export const GET_ANSWER = '[ Survey ] - Get Answer';

export class getQuestions implements Action {
  readonly type = GET_QUESTIONS;
  constructor(public payload: any) { }
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
  saveAnswer |
  GetAnswer;
