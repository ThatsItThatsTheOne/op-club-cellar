export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  clubTier: string;
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  vintage?: number;
  price: number;
  inventoryStatus: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  id: string;
  customerId: string;
  createdAt: string;
  items: OrderItem[];
  total: number;
}
