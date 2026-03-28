export interface Product {
  id: string;
  sku: string;
  name: string;
  description: string;
  ingredients: string[];
  health_benefits: string[];
  price: number;
  direct_url: string;
  image_url: string;
}

export interface CartItem extends Product {
  quantity: number;
}
