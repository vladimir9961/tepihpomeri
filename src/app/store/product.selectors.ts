import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from './product.reducer';

export interface AppState {
  feature: ProductState;
}

export const selectFeature = (state: AppState) => state.feature;

export const selectProduct = createSelector(
  selectFeature,
  (state: ProductState) => state.product
);
