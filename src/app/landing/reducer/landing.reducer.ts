import * as landingActions from '../../landing/actions/landing.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { preRegister } from '../models/landing.model';

export type Action = landingActions.All;

export interface LandingFeatureModel {
  landingState: State
}

export interface State {
  pre_register: preRegister,
}

export const initialState: State = {
  pre_register: null
}

export function reducer(state: State = initialState, action: Action) {
  switch (action.type) {
    case landingActions.REGISTER_USER:
      return { ...state, pre_register: action.payload };
    default:
      return state;
  }
}

export const getLandingFeatureModel = createFeatureSelector<LandingFeatureModel>('landingFeatureModel');
export const getLandingState = createSelector(getLandingFeatureModel, (state: LandingFeatureModel) => state.landingState);
export const getLandingPreRegister = createSelector(getLandingState, (state: State) => state.pre_register);