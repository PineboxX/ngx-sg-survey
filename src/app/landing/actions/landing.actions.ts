import { Action } from "@ngrx/store";

export const REGISTER_USER = '[ Landing ] - Register User';

export class RegisterUser implements Action {
  readonly type = REGISTER_USER;
  public constructor(public payload: any) { }
}

export type All = RegisterUser;