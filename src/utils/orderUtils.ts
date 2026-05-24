import { Order, OrderItem } from '../types';

export const calculateOrderTotal = (items: OrderItem[]): number =>
  items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

export const calculateRevenueTotal = (orders: Order[]): number =>
  orders.reduce((sum, order) => sum + order.total, 0);

export const getCustomerOrders = (orders: Order[], customerId: string): Order[] =>
  orders.filter((order) => order.customerId === customerId);
