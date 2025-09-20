# JSON Server Setup

This project now uses json-server to provide a mock REST API for user data management.

## Setup and Usage

### 1. Install Dependencies

```bash
npm install
```

### 2. Start the JSON Server

```bash
npm run json-server
```

This will start the mock API server on `http://localhost:3000`

### 3. Available API Endpoints

- **GET** `/users` - Get all users
- **GET** `/users/:id` - Get user by ID
- **POST** `/users` - Create a new user
- **PUT** `/users/:id` - Update an existing user
- **DELETE** `/users/:id` - Delete a user

### 4. Start the Angular Application

In a separate terminal:

```bash
npm start
```

## Data Structure

The user data is stored in `db.json` and contains the following structure:

```json
{
  "users": [
    {
      "id": 1,
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@hirely.com",
      "phone": "+1 (555) 123-4567",
      "position": "Senior Software Engineer",
      "department": "Engineering",
      "salary": 95000,
      "joinDate": "2022-03-15T00:00:00.000Z",
      "status": "Active"
    }
    // ... more users
  ]
}
```

## Changes Made

1. **Installed json-server** as a development dependency
2. **Created db.json** with all user data previously hardcoded in user.ts
3. **Added json-server script** to package.json
4. **Updated ApiCallService** to include user-specific API methods
5. **Refactored UserService** to use API calls instead of hardcoded data

The application now fetches user data from the mock API instead of using hardcoded data, making it more realistic and closer to a production environment.
