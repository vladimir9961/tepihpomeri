import { createReducer, on } from '@ngrx/store';
import { ProductCart } from '../model/product-cart.model';
import { GetProduct, setProduct } from './product.actions';

export interface ProductState {
  product: ProductCart[];
}

export const initialState: ProductState = {
  product: []
};

export const productReducer = createReducer(
  initialState,

  on(setProduct, (state, { product }) => {
    const nextState = {
      ...state,
      product
    };
    return nextState;
  })
);


