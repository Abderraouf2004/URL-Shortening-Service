# 🔗 URL Shortening Service

A full-stack URL Shortening Service that allows users to create, manage, and track short URLs.

## 🚀 Project URL

https://url-shortening-service-sandy.vercel.app/

## 🔧 Backend API

https://url-shortening-api-mutf.onrender.com

## 📦 GitHub Repository

https://github.com/Abderraouf2004/URL-Shortening-Service

---

## ✨ Features

- 🔗 Create short URLs
- 📋 View all created short URLs
- 🔍 Search short URLs
- 📄 View URL details
- ✏️ Update an existing URL
- 🗑️ Delete a short URL
- 📊 View access statistics
- 📈 Track URL accesses
- 🔐 Generate unique short codes
- 🗄️ PostgreSQL database
- ⚡ REST API
- 📱 Responsive frontend
- ☁️ Deployed frontend and backend

---

## 🛠️ Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS

### Backend

- Node.js
- Express.js
- TypeScript
- Prisma ORM
- Joi
- Zod
- Nanoid
- CORS

### Database

- PostgreSQL

### Deployment

- Frontend: Vercel
- Backend: Render
- Database: Render PostgreSQL

---

## 📁 Project Structure

```text
URL-Shortening-Service/
│
├── backend/
│   ├── prisma/
│   │   ├── migrations/
│   │   └── schema.prisma
│   │
│   ├── packages/
│   │   ├── errors/
│   │   ├── schemas/
│   │   └── types/
│   │
│   ├── src/
│   │   ├── apis/
│   │   └── core/
│   │       ├── controller.ts
│   │       ├── repo.ts
│   │       └── service.ts
│   │
│   ├── main.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── prisma.config.ts
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── UrlShortener.tsx
│   │   └── services/
│   │       └── api.ts
│   │
│   ├── package.json
│   └── vite.config.ts
│
└── README.md
