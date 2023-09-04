# DPDZero

DPDZero is a web application that allows users to store and manage key-value pairs in a secure and organized manner.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [API Endpoints](#api-endpoints)
  - [User Registration](#user-registration)
  - [Generate Token](#generate-token)
  - [Store Data](#store-data)
  - [Retrieve Data](#retrieve-data)
  - [Update Data](#update-data)
  - [Delete Data](#delete-data)
- [Tech Stack](#tech-stack)

## Features

- **Key-Value Storage:** Store and manage key-value pairs.
- **User Accounts:** Create user accounts to manage your data securely.
- **Authentication:** Secure access to your data with JWT-based authentication.
- **API Endpoints:** Intuitive API for storing, retrieving, updating, and deleting data.

## Getting Started

To get started with DPDZero, follow the instructions below:

### Prerequisites

- **Node.js and npm:** DPDZero is built with Node.js. Ensure you have Node.js and npm installed on your machine. You can download them from [nodejs.org](https://nodejs.org/).

- **MySQL Database:** DPDZero uses a MySQL database to store user accounts and data. Make sure you have MySQL installed and running on your system. You can download MySQL from [mysql.com](https://www.mysql.com/).

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/dpdzero.git
   cd dpdzero
   ```

2. **Install Dependencies:**

   Install the required project dependencies by running the following command:

   ```
   npm install
   ```

3. **Configure Database:**

   - Create a `.env` file in your project's root directory.
   - Provide all the data regarding your database, PORT and the key for jsonwebtoken.
   - `sampleEnv.txt` file provides to add necessary data in `.env` file.

4. **Start the Application:**
   Once you've configured the database, you can start the DPDZero application:
   ```
   nodemon index.js
   ```
   The application will start, and you should see a message indicating that the server is running.

## API Endpoints

### User Registration:

**Endpoint: `POST /api/register`**
This endpoint is for registering a new user.

**Request:**

```json
{
  "username": "example_user",
  "email": "user@example.com",
  "password": "Password@123",
  "full_name": "John Doe",
  "age": 30,
  "gender": "male"
}
```

**Success Response:**

```json
{
  "status": "success",
  "message": "User successfully registered!",
  "data": {
    "user_id": "12345",
    "username": "example_user",
    "email": "user@example.com",
    "full_name": "John Doe",
    "age": 30,
    "gender": "male"
  }
}
```

**Error Response:**

```json
{
  "status": "error",
  "code": "INVALID_REQUEST",
  "message": "Invalid request. Please provide all required fields: username, email, password, full_name."
}
```

**Error codes:**
| Error Code | Description |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| INVALID_REQUEST | Invalid request. Please provide all required fields. |
| USERNAME_EXISTS | The provided username is already taken. Choose a different username. |
| EMAIL_EXISTS | The provided email is already registered. Use a different email address. |
| INVALID_PASSWORD | The provided password does not meet the requirements. Password must be at least 8 characters long and contain a mix of uppercase and lowercase letters, numbers, and special characters. |
| INVALID_AGE | Invalid age value. Age must be a positive integer. |
| GENDER_REQUIRED | Gender field is required. Please specify the gender (e.g., male, female, non-binary). |
| INTERNAL_ERROR | Internal server error occurred. Please try again later. |

### Generate Token:

**Endpoint**: `POST /api/token`
This endpoint is for generating a new access token.

**Request:**

```json
{
  "username": "example_user",
  "password": "Password@123"
}
```

**Success Response:**

```json
{
  "status": "success",
  "message": "Access token generated successfully.",
  "data": {
    "access_token": "<TOKEN>",
    "expires_in": 3600
  }
}
```

**Error codes:**
| Error Code | Description |
| --------------------- | -------------------------------------------------------------------- |
| `INVALID_CREDENTIALS` | Invalid credentials. The provided username or password is incorrect. |
| `MISSING_FIELDS` | Missing fields. Please provide both username and password. |
| `INTERNAL_ERROR` | Internal server error occurred. Please try again later. |

### Store data:

To store a key-value pair in the database.

**Endpoint**: `POST /api/data`

**Request:**

**Request Headers**:

- **`Authorization`**:**`access_token`**

```json
{
  "key": "laptop",
  "value": 60000
}
```

**Success Response:**

```json
{
  "status": "success",
  "message": "Data stored successfully."
}
```

**Error codes:**
| Error Code | Description |
| --------------- | ------------------------------------------------------------- |
| `INVALID_KEY` | The provided key is not valid or missing. |
| `INVALID_VALUE` | The provided value is not valid or missing. |
| `KEY_EXISTS` | The provided key already exists in the database. To update an existing key, use the update API. |
| `INVALID_TOKEN` | Invalid access token provided.

### Retrieve Data

To retrieve the value associated with a specific key.

**Endpoint**: `GET /api/data/{key}`

**Request Headers**:

- **`Authorization`**: **`access_token`**

**Success Response:**

```json
{
  "status": "success",
  "data": {
    "key": "key",
    "value": "value"
  }
}
```

**Error codes:**
| Error Code | Description |
| --------------- | ------------------------------------------------ |
| `KEY_NOT_FOUND` | The provided key does not exist in the database. |
| `INVALID_TOKEN` | Invalid access token provided. |

### Update Data

To update the value associated with an existing key.

**Endpoint**: `PUT /api/data/{key}`

**Request Headers**:

- **`Authorization`**: **`access_token`**

**Request:**

```json
{
  "value": "new_data_value"
}
```

**Success Response:**

```json
{
  "status": "success",
  "message": "Data updated successfully."
}
```

**Error codes:**
| Error Code | Description |
| ------------------ | -------------------------------------------------------------- |
| `KEY_NOT_FOUND` | The provided key does not exist in the database. |
| `INVALID_TOKEN` | Invalid access token provided. |

### Delete Data

To delete the value associated with an existing key.

**Endpoint**: `DELETE /api/data/{key}`

**Request Headers**:

- **`Authorization`**: **`access_token`**

**Success Response:**

```json
{
  "status": "success",
  "message": "Data deleted successfully."
}
```

**Error codes:**
| Error Code | Description |
| ------------------ | -------------------------------------------------------------- |
| `KEY_NOT_FOUND` | The provided key does not exist in the database. |
| `INVALID_TOKEN` | Invalid access token provided. |

### Tech Stack

DPDZero is built using the following technologies and libraries:

- **Node.js:** The server-side runtime environment for building fast and scalable applications in JavaScript.

- **Express.js:** A minimal and flexible Node.js web application framework used for building robust APIs.

- **MySQL:** A popular open-source relational database management system used to store user accounts and data.

- **Sequelize:** A powerful and flexible Object-Relational Mapping (ORM) library for Node.js and JavaScript, used for managing and interacting with relational databases.

- **JSON Web Tokens (JWT):** A standard for secure authentication and authorization between the server and clients.

- **npm:** The package manager for Node.js, used to manage project dependencies.

- **bcrypt:** A library for securely hashing user passwords before storing them in the database.

- **dotenv:** A module for loading environment variables from a `.env` file, which is used to store sensitive configuration data.

- **nodemon:** A utility that monitors for changes in your application and automatically restarts the server when changes are detected, making development more efficient.
