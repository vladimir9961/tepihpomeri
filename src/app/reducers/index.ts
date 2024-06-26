import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { getProductData, productReducer } from '../store/product.reducer';

export interface State {

}

export const reducers: ActionReducerMap<State> = {
  cart: productReducer,
  product: getProductData
};


export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
