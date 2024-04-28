import { createReducer, on } from '@ngrx/store';
import { ProductCart } from '../model/product-cart.model';
import { getProduct, setProduct } from './product.actions';

export interface ProductState {
  product: ProductCart[];
}

export const initialState: ProductState = {
  product: []
};

export const productReducer = createReducer(
  initialState,
  on(setProduct, (state, { product }) => ({
    ...state,
    product
  }))
);

export const getProductData = createReducer(
  initialState,
  on(getProduct, (state) => {
    const productString = localStorage.getItem('products');
    if (productString) {
      const product = JSON.parse(productString);
      return { ...state, product }; 
    }
    return state; 
  })
);
