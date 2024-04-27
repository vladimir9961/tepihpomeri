export interface ProductCart {
  id: number;
  name: string;
  description: string;
  image: {
    src: string;
  }; 
  quantity: number;
}

export interface Products extends ProductCart {
  product: ProductCart[];
}