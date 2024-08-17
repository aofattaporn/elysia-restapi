# Elysia with Bun runtime

## Getting Started
To get started with this template, simply paste this command into your terminal:
```bash
bun create elysia ./elysia-example
```

## Development
To start the development server run:
```bash
bun run dev
```

Open http://localhost:3000/ with your browser to see the result.


# Elysia API Project Summary

## Project Overview
This project demonstrates how to create an API using Elysia, focusing on authentication and user management. It includes the following features:

### API Routes
- **Authentication Routes**:
  - **Register**: Allows users to create a new account.
  - **Login**: Authenticates users and provides a JWT for further requests.

- **User Management Routes**:
  - **CRUD Operations**: Create, Read, Update, and Delete user information. These routes are protected and require authentication via a JWT stored in cookies.

## Learning Objectives
- Understand the Elysia API framework and its project structure.
- Implement JWT authentication for secure login and registration.
- Create protected routes that require authentication for user management.
- Utilize Swagger for API documentation and exploration.

## Swagger Integration
- Added Swagger documentation to provide an interactive API interface.
- Access the Swagger UI at [http://localhost:3000/swagger](http://localhost:3000/swagger) to explore the API endpoints.

## Getting Started
To get started with this template, simply paste this command into your terminal:
```bash
bun create elysia ./elysia-example



