# Fullstack Developer Portfolio

A robust, full-stack portfolio application designed to showcase projects and technical skills. This project is structured as a monorepo and strictly adheres to Clean Architecture principles.

## Architecture Overview

The system is divided into two main environments within a single repository to ensure seamless feature-driven development.

### Backend

Built with Node.js and Express, utilizing Dependency Injection (Awilix) to achieve loose coupling and high testability.

- **Domain**: Core entities and repository interfaces.
- **Application**: Use cases orchestrating business rules.
- **Infrastructure**: MongoDB connections and concrete repository implementations.
- **Presentation**: Express routes, controllers, and middlewares.

### Frontend

A high-performance Single Page Application (SPA) structured with component-driven design.

## Tech Stack

**Frontend**
- React
- Vite
- React Router DOM
- Axios

**Backend**
- Node.js
- Express
- MongoDB (Mongoose)
- Awilix

## Prerequisites

- Node.js
- MongoDB

## Installation

git clone <repository-url>
cd <repository-name>

cd backend
npm install

cd ../frontend
npm install

## Environment Setup

Create a `.env` file inside the `backend` directory:

PORT=5000
MONGO_URI=your_mongodb_connection_string

## Running Locally

Open two separate terminals.

Terminal 1:
cd backend
npm run dev

Terminal 2:
cd frontend
npm run dev

The frontend development server runs on `http://localhost:5173` and the backend API is served at `http://localhost:5000`.