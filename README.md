# 🎬 Movie Choice - API Backend

**School Project - BAC3Q1 HELHA - End of 2024**

This repository contains the backend for a school project that aims to simplify choosing a movie to watch, using *The Movie Database* (TMDB) API to provide users with a wide range of movies and recommendations.

## 🚀 Technologies Used

- **Node.js** with **Express** for server and route management.
- **TypeScript** for robust typing and modern JavaScript features.
- **TypeORM** for database interactions.
- **TMDB API** for real-time movie information retrieval.

## 📂 Configuration

Before launching the project, ensure that the TMDB API and database are correctly configured:

1. **TMDB**: Add your TMDB API key in the configuration file `/src/configs/tmdbConfig.ts`.
2. **Database**: Configure database connection settings in `/src/configs/dbConfig.ts`.

For both development and production environments, the following packages are required:

- **TypeORM**: Install with 
  ```bash
  npm install typeorm --save
  ```
  and import with
  ```typescript
  import "reflect-metadata";
  ```
- **Node Types** (for TypeScript):
  ```bash
  npm install @types/node --save-dev
  ```
- **Database**:
   - **MariaDB** for production:
     ```bash
     npm install mysql --save
     ```
   - **SQLite3** for development:
     ```bash
     npm install sqlite3 --save
     ```

## ⚙️ Installation

To start the project, follow the steps below:

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the server:**
   ```bash
   npm start
   ```

This will start the server in production mode. Make sure that all configurations (TMDB, database) are properly set up before starting to avoid connection errors.

## 📜 API Endpoints Documentation

Each API endpoint is documented to allow seamless integration with front-end interfaces. For a complete list of available endpoints, refer to the internal documentation or the file `/docs/api.md` (if documented).

# Project Overview

This backend application uses TypeScript and Express and is designed with a modular architecture to ensure scalability, maintainability, and separation of concerns. Each directory in the `src` folder has a specific responsibility, as explained below.

## Folder Structure

```plaintext
src/
├── config/               # Application configurations
│   ├── dbConfigs.ts      # Database connection and setup
│   └── tmdbConfig.ts     # Configuration for accessing the TMDB API (tokens, endpoints, etc.)
├── controllers/          # HTTP request handlers (controllers)
│   └── UserController.ts # Example controller handling user-related requests
├── models/               # Data models and schemas
│   └── User.ts           # Example data model for User entity
├── repositories/         # Data access layer (repositories following DAO pattern)
│   └── UserRepository.ts # Repository for managing User entity interactions with the database
├── routes/               # API route definitions, one route file per Express route
│   └── userRoutes.ts     # Route file handling user-related endpoints
├── services/             # Business logic and service layer
│   └── UserService.ts    # Example service that contains user-related business logic
├── utils/                # Utility functions and classes
│   └── HttpException.ts  # Utility class for handling HTTP errors across the application
└── server.ts             # Server entry point, starts and configures the Express application
```

---

## Directory and File Explanations

### 1. `config/` ⚙️

- **Purpose**: Contains configuration files defining settings for external services and database connections.
- **Files**:
  - `dbConfigs.ts`: Manages configuration for database connectivity and setup (e.g., database URL, credentials).
  - `tmdbConfig.ts`: Holds configurations for the TMDB API, including API tokens, base URL, and necessary parameters.

### 2. `controllers/` 🎛️

- **Purpose**: Handles HTTP requests, processes data, and calls appropriate services.
- **File Structure**:
  - Each controller focuses on a specific resource (e.g., `UserController.ts`), handling requests, interacting with relevant services, and returning responses.

### 3. `models/` 🗃️

- **Purpose**: Defines data models and schemas that represent the structure of the data managed in the database.
- **Example**:
  - `User.ts` could represent a user entity schema with properties such as `id`, `name`, `email`, etc.
  - Additional entities (e.g., `Series`) would have their respective models here.

### 4. `repositories/` 🛠️

- **Purpose**: Acts as a data access layer responsible for interacting with the database to perform CRUD operations, following the Repository Pattern, which separates data logic from business logic.
- **Files**:
  - `UserRepository.ts`: Contains methods for retrieving, adding, updating, or deleting `User` data in the database.
  - Other repositories for additional entities as needed.

### 5. `routes/` 🛣️

- **Purpose**: Organizes API routes and links each route to the corresponding controller function. Each route file focuses on one endpoint or resource for modularity.
- **Files**:
  - `userRoutes.ts`: Defines routes related to `User` actions (e.g., `/users`, `/users/:id`), linked to appropriate controller methods.
  - Additional files would follow the same pattern for each new route.

### 6. `services/` 🛎️

- **Purpose**: Contains business logic and core application functionalities. Services use repositories to fetch or manipulate data and apply additional logic as needed.
- **Example**:
  - `UserService.ts`: Contains user-related functionality, such as creating a new user, updating user details, with methods that call `UserRepository` functions.
  - Additional service files are created as needed for other features or entities.

### 7. `utils/` 🧰

- **Purpose**: Stores utility functions and classes not directly associated with any specific layer (e.g., helper functions, error-handling classes).
- **File Structure**:
  - `HttpException.ts`: Custom error-handling class for consistent HTTP error management across the application.
  - If a utility class is specific to a certain function, consider creating a package for it within this folder.

### 8. `server.ts` 🔌

- **Purpose**: Main entry point for the server. Initializes the Express application, loads routes, and listens on the designated port.
- **Responsibilities**:
  - Imports configurations, initializes middleware, registers routes, and sets up the Express server.

---

### Notes ✍️

- **Modularity**: Each layer is separated to enhance code readability, maintainability, and scalability.
- **Error Handling**: Custom error classes in `utils/` provide consistent error management throughout the application.
- **Extensibility**: Additional features or resources can be added by creating new files within the `controllers`, `services`, `repositories`, and `routes` directories.