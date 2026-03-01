
# Lego Store Frontend

React frontend application for Lego Store Manager.

This application communicates with the backend API:
https://github.com/terox88/lego-store

---

## Features

- JWT authentication
- Lego sets management table
- Filtering & sorting
- Stock increase/decrease (warehouse & store)
- Create / Edit / Delete sets
- Request counter display
- Production-ready Docker setup (nginx)

---

## Technologies

- React
- React Router
- Axios
- CSS (custom styling)
- Docker (multi-stage build)
- Nginx

---

## Running Locally (Development Mode)

npm install
npm start

Frontend runs at:
http://localhost:3000

Backend must be running at:
http://localhost:8080

---

## Running with Docker

When both backend and frontend repositories are cloned into the same parent directory:

C:\java
├── lego-store
└── lego-store-frontend

Run from backend directory:

docker compose up --build

Frontend will be available at:
http://localhost:3000

---

## Production Build Only

npm run build

---

## Author

Michał Morawski
