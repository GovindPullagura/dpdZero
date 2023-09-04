# DPDZero

DPDZero is a web application that allows users to store and manage key-value pairs in a secure and organized manner.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [API Endpoints](#api-endpoints)
  - [Store Data](#store-data)
  - [Retrieve Data](#retrieve-data)
  - [Update Data](#update-data)
  - [Delete Data](#delete-data)
- [Authentication](#authentication)
- [Database](#database)
- [Error Handling](#error-handling)
- [Contributing](#contributing)
- [License](#license)

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

1. **User Registration:**

   **Endpoint: `POST /api/register`**
   This endpoint is for registering a new user.

   ```json
   {
     "username": "example_user",
     "email": "user@example.com",
     "password": "secure_password123",
     "full_name": "John Doe",
     "age": 30,
     "gender": "male"
   }
   ```

```

```
