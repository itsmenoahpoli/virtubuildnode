# VirtuBuild API Documentation

## Overview

The VirtuBuild API is a RESTful service built with Node.js, Express, and TypeScript. This documentation provides information about all available endpoints, request/response schemas, and authentication methods.

## API Documentation

### Swagger UI

The API documentation is automatically generated using Swagger/OpenAPI 3.0 and is available at:

- **Development**: `http://localhost:3000/api-docs`
- **Production**: `{BASE_URL}/api-docs`

### Base URL

All API endpoints are prefixed with `/api`:

- **Development**: `http://localhost:3000/api`
- **Production**: `{BASE_URL}/api`

## Available Endpoints

### Authentication Endpoints

#### POST `/api/auth/signin`

Sign in with email and password.

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**

- `200 OK`: User successfully authenticated
- `401 Unauthorized`: Invalid credentials
- `422 Unprocessable Entity`: Validation error

#### POST `/api/auth/signup`

Create a new user account.

**Request Body:**

```json
{
  "firstName": "John",
  "middleName": "Doe",
  "lastName": "Smith",
  "email": "john.smith@example.com",
  "password": "password123"
}
```

**Response:**

- `201 Created`: User successfully created
- `422 Unprocessable Entity`: User already exists or validation error

### System Endpoints

#### GET `/api/system/healthcheck`

Check system health status.

**Response:**

- `200 OK`: System is online

```json
{
  "message": "SYSTEM_ONLINE"
}
```

### User Roles Endpoints

#### GET `/api/user-roles`

Get all user roles with optional filtering.

**Query Parameters:**

- `page` (optional): Page number for pagination (default: 1)
- `limit` (optional): Number of items per page (default: 10)
- `search` (optional): Search term for filtering roles

**Response:**

- `200 OK`: List of user roles retrieved successfully

#### GET `/api/user-roles/{id}`

Get a specific user role by ID.

**Path Parameters:**

- `id` (required): User role ID

**Response:**

- `200 OK`: User role retrieved successfully
- `404 Not Found`: User role not found

#### POST `/api/user-roles`

Create a new user role.

**Request Body:**

```json
{
  "name": "Admin",
  "isEnabled": true
}
```

**Response:**

- `201 Created`: User role created successfully
- `422 Unprocessable Entity`: Role already exists or validation error

#### PATCH `/api/user-roles/{id}`

Update an existing user role.

**Path Parameters:**

- `id` (required): User role ID

**Request Body:**

```json
{
  "name": "Updated Role Name",
  "isEnabled": false
}
```

**Response:**

- `200 OK`: User role updated successfully
- `404 Not Found`: User role not found
- `422 Unprocessable Entity`: Validation error

#### DELETE `/api/user-roles/{id}`

Delete a user role.

**Path Parameters:**

- `id` (required): User role ID

**Response:**

- `200 OK`: User role deleted successfully
- `404 Not Found`: User role not found

## Data Models

### SigninCredentials

```json
{
  "email": "string (email format)",
  "password": "string"
}
```

### SignupData

```json
{
  "firstName": "string",
  "middleName": "string (optional)",
  "lastName": "string",
  "email": "string (email format)",
  "password": "string"
}
```

### UserRole

```json
{
  "name": "string",
  "isEnabled": "boolean (optional, default: true)"
}
```

## Error Responses

All error responses follow this format:

```json
{
  "message": "Error description",
  "status": 400
}
```

Common HTTP status codes:

- `200 OK`: Request successful
- `201 Created`: Resource created successfully
- `400 Bad Request`: Invalid request
- `401 Unauthorized`: Authentication required
- `404 Not Found`: Resource not found
- `422 Unprocessable Entity`: Validation error or business logic error

## Development

### Running the API

1. Install dependencies:

   ```bash
   npm install
   ```

2. Set up environment variables (create `.env` file):

   ```env
   APP_PORT=3000
   APP_ENV=development
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Access the API documentation:
   ```
   http://localhost:3000/api-docs
   ```

### Building for Production

```bash
npm run build
npm start
```

## Technologies Used

- **Node.js**: Runtime environment
- **Express**: Web framework
- **TypeScript**: Programming language
- **TypeORM**: Database ORM
- **Class Validator**: Request validation
- **Swagger/OpenAPI**: API documentation
- **PostgreSQL**: Database
- **JWT**: Authentication

## Contributing

When adding new endpoints:

1. Create the controller with proper Swagger documentation comments
2. Define DTOs for request/response validation
3. Update this documentation file
4. Test the endpoints using the Swagger UI

## Support

For questions or issues, please contact the development team.
