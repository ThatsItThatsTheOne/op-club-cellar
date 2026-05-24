import { describe, expect, it } from 'vitest';
import { calculateOrderTotal, calculateRevenueTotal, getCustomerOrders } from './orderUtils';

describe('orderUtils', () => {
  it('calculates order total', () => {
    expect(
      calculateOrderTotal([
        { productId: 'a', productName: 'A', quantity: 2, unitPrice: 10 },
        { productId: 'b', productName: 'B', quantity: 1, unitPrice: 12.5 }
      ])
    ).toBe(32.5);
  });

  it('calculates revenue total', () => {
    expect(
      calculateRevenueTotal([
        { id: '1', customerId: 'c1', createdAt: '2026-01-01', items: [], total: 22 },
        { id: '2', customerId: 'c2', createdAt: '2026-01-01', items: [], total: 38 }
      ])
    ).toBe(60);
  });

  it('filters customer order history', () => {
    const orders = [
      { id: '1', customerId: 'c1', createdAt: '2026-01-01', items: [], total: 22 },
      { id: '2', customerId: 'c2', createdAt: '2026-01-01', items: [], total: 38 },
      { id: '3', customerId: 'c1', createdAt: '2026-01-02', items: [], total: 10 }
    ];

    expect(getCustomerOrders(orders, 'c1')).toHaveLength(2);
  });
});
