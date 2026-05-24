# OrderPort Club Cellar

OrderPort Club Cellar is a sanitized public portfolio demo inspired by OP-style winery DTC club operations. It focuses on customer records, product listings, order creation, customer order history, and basic revenue tracking.

## Features
- Customer list
- Add customer
- Wine/product list
- Create order for customer
- View customer order history
- Basic revenue total

## Tech Stack
- React 18
- TypeScript
- Vite
- Vitest (unit tests for totals and order filtering)
- localStorage (order persistence)

## Setup
```bash
npm install
npm run dev
```

Build and preview:
```bash
npm run build
npm run preview
```

Run tests:
```bash
npm run test
```

## Architecture
- `src/types.ts`: Domain interfaces for `Customer`, `Product`, `Order`, and `OrderItem`.
- `src/data/sampleData.ts`: Fictional sample customers and fixed product catalog.
- `src/utils/orderUtils.ts`: Business logic for order total, revenue total, and customer order filtering.
- `src/App.tsx`: Main staff workflow UI for customer management, order creation, and order history.
- `src/styles.css`: Lightweight winery-adjacent styling.

Data flow:
1. Customer and product seed data loads from `sampleData.ts`.
2. Orders are created in the UI and totals are calculated through `orderUtils.ts`.
3. Orders are persisted to `localStorage` under `op-club-cellar-orders`.
4. Revenue and customer history are derived from current order state.

## Public Repo / Data Disclaimer
All customer, product, and order data in this repository is fictional sample data. No OP proprietary data, credentials, assets, private URLs, or internal workflows are included.

## AI Usage
AI assistance was used for planning, naming/positioning, README drafting, and implementation support. Final code and content were reviewed and adjusted by the developer.

## Bugs Fixed
- Fixed validation gaps by enforcing required first name, last name, club tier, and valid email checks in the add-customer form.
- Fixed order total and revenue logic by centralizing calculations into utility functions with tests.
- Fixed customer-history visibility by filtering orders per selected customer and adding a clear empty state.

## Future Improvements
- Authentication and role-based access
- Real backend/API integration
- Persistent database
- Inventory decrementing on order submit
- Export orders (CSV/PDF)
- Customer search and filtering
- More robust reporting dashboard
- Accessibility audit and pass
- Deployment pipeline (CI/CD)

## Manual Test Checklist
- Start app and verify sample customer list renders.
- Add a new customer and confirm it appears immediately.
- Verify email and required field validation messaging.
- Create order with multiple products and confirm subtotal and revenue update.
- Switch selected customer and confirm customer-specific order history updates.
- Refresh page and verify orders persist via `localStorage`.

## Screenshots / Demo Notes
No screenshots are currently committed. Add demo screenshots in a future update under a `docs/screenshots/` folder.
