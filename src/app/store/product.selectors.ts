import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from './product.reducer';

export interface AppState {
  productState: ProductState; 
}

// Select the feature state
export const selectFeature = createFeatureSelector<ProductState>('product');

export const selectProduct = createSelector(
  selectFeature,
  (state: ProductState) => state?.product
);
