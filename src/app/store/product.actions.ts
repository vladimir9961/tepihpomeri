import { createAction, props } from '@ngrx/store';
import { ProductCart } from '../model/product-cart.model';

export const setProduct = createAction(
  '[Product] Set Product',
  props<{ product: ProductCart[] }>()
);

export const GetProduct = createAction(
  '[Product] Get Product',
  props<{ product: ProductCart[] }>()
);