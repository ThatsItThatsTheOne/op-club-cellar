import { FormEvent, useMemo, useState } from 'react';
import { sampleCustomers, sampleProducts } from './data/sampleData';
import { Customer, Order, Product } from './types';
import { calculateOrderTotal, calculateRevenueTotal, getCustomerOrders } from './utils/orderUtils';
import './styles.css';

const STORAGE_KEY = 'op-club-cellar-orders';

const isValidOrderItem = (value: unknown): boolean => {
  if (typeof value !== 'object' || value === null) return false;

  const record = value as Record<string, unknown>;
  return (
    typeof record.productId === 'string' &&
    typeof record.productName === 'string' &&
    typeof record.quantity === 'number' &&
    Number.isFinite(record.quantity) &&
    record.quantity > 0 &&
    typeof record.unitPrice === 'number' &&
    Number.isFinite(record.unitPrice) &&
    record.unitPrice >= 0
  );
};

const isValidOrder = (value: unknown): value is Order => {
  if (typeof value !== 'object' || value === null) return false;

  const record = value as Record<string, unknown>;
  return (
    typeof record.id === 'string' &&
    typeof record.customerId === 'string' &&
    typeof record.createdAt === 'string' &&
    typeof record.total === 'number' &&
    Number.isFinite(record.total) &&
    record.total >= 0 &&
    Array.isArray(record.items) &&
    record.items.every((item) => isValidOrderItem(item))
  );
};

const loadOrders = (): Order[] => {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];

  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed.filter(isValidOrder);
  } catch {
    return [];
  }
};

function App() {
  const [customers, setCustomers] = useState<Customer[]>(sampleCustomers);
  const [products] = useState<Product[]>(sampleProducts);
  const [orders, setOrders] = useState<Order[]>(loadOrders);
  const [selectedCustomerId, setSelectedCustomerId] = useState(sampleCustomers[0]?.id ?? '');
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [errors, setErrors] = useState<string[]>([]);

  const revenueTotal = useMemo(() => calculateRevenueTotal(orders), [orders]);
  const selectedCustomerOrders = useMemo(() => getCustomerOrders(orders, selectedCustomerId), [orders, selectedCustomerId]);

  const handleAddCustomer = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const firstName = String(formData.get('firstName') ?? '').trim();
    const lastName = String(formData.get('lastName') ?? '').trim();
    const email = String(formData.get('email') ?? '').trim();
    const clubTier = String(formData.get('clubTier') ?? '').trim();

    const nextErrors: string[] = [];
    if (!firstName) nextErrors.push('First name is required.');
    if (!lastName) nextErrors.push('Last name is required.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.push('Please enter a valid email.');
    if (!clubTier) nextErrors.push('Club tier is required.');

    if (nextErrors.length > 0) {
      setErrors(nextErrors);
      return;
    }

    const newCustomer: Customer = {
      id: `cust-${crypto.randomUUID()}`,
      firstName,
      lastName,
      email,
      clubTier,
      createdAt: new Date().toISOString().slice(0, 10)
    };

    setCustomers((prev) => [...prev, newCustomer]);
    setErrors([]);
    event.currentTarget.reset();
  };

  const handleCreateOrder = () => {
    if (!selectedCustomerId) return;
    const items = products
      .map((product) => ({ product, quantity: quantities[product.id] ?? 0 }))
      .filter((entry) => entry.quantity > 0)
      .map((entry) => ({
        productId: entry.product.id,
        productName: entry.product.name,
        quantity: entry.quantity,
        unitPrice: entry.product.price
      }));

    if (items.length === 0) return;

    const newOrder: Order = {
      id: `ord-${crypto.randomUUID()}`,
      customerId: selectedCustomerId,
      createdAt: new Date().toISOString(),
      items,
      total: calculateOrderTotal(items)
    };

    setOrders((prev) => {
      const next = [...prev, newOrder];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
    setQuantities({});
  };

  return (
    <main className="app">
      <h1>OP Club Cellar</h1>
      <p className="subtitle">Sanitized OP-inspired demo for lightweight winery club operations.</p>

      <section className="panel">
        <h2>Revenue Snapshot</h2>
        <p>Total Revenue: <strong>${revenueTotal.toFixed(2)}</strong></p>
      </section>

      <section className="grid">
        <div className="panel">
          <h2>Add Customer</h2>
          <form onSubmit={handleAddCustomer} className="stack">
            <input name="firstName" placeholder="First name" />
            <input name="lastName" placeholder="Last name" />
            <input name="email" placeholder="Email" />
            <input name="clubTier" placeholder="Club tier" />
            <button type="submit">Add Customer</button>
          </form>
          {errors.length > 0 && (
            <ul className="errors">{errors.map((error) => <li key={error}>{error}</li>)}</ul>
          )}
        </div>

        <div className="panel">
          <h2>Customers</h2>
          {customers.length === 0 ? <p>No customers yet.</p> : (
            <table>
              <thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Tier</th><th>Created</th></tr></thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.id}>
                    <td>{customer.id}</td><td>{customer.firstName} {customer.lastName}</td><td>{customer.email}</td><td>{customer.clubTier}</td><td>{customer.createdAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>

      <section className="panel">
        <h2>Products</h2>
        <ul className="product-grid">
          {products.map((product) => <li key={product.id}>{product.name} ({product.category}) {product.vintage ?? 'NV'} - ${product.price} · {product.inventoryStatus}</li>)}
        </ul>
      </section>

      <section className="panel">
        <h2>Create Order</h2>
        <label>
          Customer
          <select value={selectedCustomerId} onChange={(e) => setSelectedCustomerId(e.target.value)}>
            <option value="">Select customer</option>
            {customers.map((customer) => <option key={customer.id} value={customer.id}>{customer.firstName} {customer.lastName}</option>)}
          </select>
        </label>
        <div className="stack">
          {products.map((product) => (
            <label key={product.id}>
              {product.name} (${product.price})
              <input type="number" min={0} value={quantities[product.id] ?? 0} onChange={(e) => setQuantities((prev) => ({ ...prev, [product.id]: Number(e.target.value) }))} />
            </label>
          ))}
        </div>
        <button onClick={handleCreateOrder}>Create Order</button>
      </section>

      <section className="panel">
        <h2>Customer Order History</h2>
        {!selectedCustomerId || selectedCustomerOrders.length === 0 ? <p>No orders yet for this customer.</p> : (
          <ul>
            {selectedCustomerOrders.map((order) => (
              <li key={order.id}>
                <strong>{order.id}</strong> ({new Date(order.createdAt).toLocaleDateString()}) - ${order.total.toFixed(2)}
                <ul>{order.items.map((item) => <li key={item.productId}>{item.productName}: {item.quantity}</li>)}</ul>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

export default App;
