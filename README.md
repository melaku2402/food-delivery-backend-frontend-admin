 Food-Delivery

Professional, full-stack Food Delivery sample application (React + Vite frontend(s) and Node.js + Express backend).

Quick overview

- Monorepo containing: frontend user app, admin panel, and backend API.
- User features: browse menu, add to cart, place orders, Stripe checkout, order history.
- Admin features: manage food items, view orders.

Repository layout

- [admin](admin) — admin panel (React + Vite)
- [frontend](frontend) — customer-facing site (React + Vite)
- [backend](backend) — REST API (Node.js, Express, MongoDB)

Tech stack

- Backend: Node.js, Express, MongoDB (Mongoose), Multer (uploads), JWT, Stripe
- Frontend(s): React, Vite, Axios, React Router

Getting started (development)

Prerequisites

- Node.js (v16+ recommended)
- npm or yarn
- MongoDB (Atlas or local)
- Stripe account (for payments)

Backend

1. Open a terminal and install dependencies:

bash
cd backend
npm install


2. Create a `.env` file in `backend/` and set the following variables:

- `MONGO_URI` — MongoDB connection string
- `JWT_SECRET` — secret used to sign JSON Web Tokens
- `STRIPE_SECRET_KEY` — Stripe secret key (test key ok)
- `PORT` — optional, default 4000

Example `.env` (do not commit):


MONGO_URI=your_mongo_uri_here
JWT_SECRET=replace_with_strong_secret
STRIPE_SECRET_KEY=sk_test_...
PORT=4000


3. Start the backend in development:

bash
npm run server


Frontend (customer)

bash
cd frontend
npm install
npm run dev


Admin panel

bash
cd admin
npm install
npm run dev


Build for production

bash
cd frontend
npm run build

cd ../admin
npm run build


Important notes & security

- The API serves uploaded images from `/images` mapped to the `uploads/` folder.
- Current repository contains a hard-coded MongoDB connection string in `backend/config/db.js`. Replace it with `process.env.MONGO_URI` and remove credentials before committing or publishing.
- Never commit `.env` files, API keys, or other secrets. Use environment variables or a secrets manager.

Useful files

- Server entry: [backend/server.js](backend/server.js)
- DB config: [backend/config/db.js](backend/config/db.js)
- Backend routes: [backend/routers](backend/routers)
- Frontend entry: [frontend/src/main.jsx](frontend/src/main.jsx)

Contributing

- Fork, create a feature branch, run tests (if added), open a pull request with a clear description.

License
...