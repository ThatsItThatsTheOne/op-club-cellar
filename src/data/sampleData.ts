import { Customer, Product } from '../types';

export const sampleCustomers: Customer[] = [
  {
    id: 'cust-1',
    firstName: 'Avery',
    lastName: 'Brooks',
    email: 'avery.brooks@example.test',
    clubTier: 'Cellar Select',
    createdAt: '2026-01-14'
  },
  {
    id: 'cust-2',
    firstName: 'Jordan',
    lastName: 'Lane',
    email: 'jordan.lane@example.test',
    clubTier: 'Estate Club',
    createdAt: '2026-02-10'
  }
];

export const sampleProducts: Product[] = [
  { id: 'prod-1', name: 'Willow Ridge Pinot Noir', category: 'Pinot Noir', vintage: 2022, price: 42, inventoryStatus: '120 available' },
  { id: 'prod-2', name: 'Sunset Block Chardonnay', category: 'Chardonnay', vintage: 2023, price: 34, inventoryStatus: '95 available' },
  { id: 'prod-3', name: 'Valley Floor Rosé', category: 'Rosé', vintage: 2024, price: 28, inventoryStatus: '80 available' },
  { id: 'prod-4', name: 'Harvest Red Blend', category: 'Red Blend', price: 30, inventoryStatus: 'Available' }
];
