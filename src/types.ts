export interface Product {
  id: string;
  odoo_id: string;
  sku: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  location?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Reservation {
  id?: string;
  date: string;
  time: string;
  party_size: number;
  customer_name: string;
  customer_phone: string;
  location: string;
  status?: string;
}
