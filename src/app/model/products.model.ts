export interface Product {
    images?: images[]
    id: number;
    name: string;
    regular_price?: string;
    description?: string;
    dimensions?: {width: number, height: number}
    length: number
    related_ids: number[]
  }

interface images {
    alt: string;
    src: string;

}