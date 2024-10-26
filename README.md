# 🎬 Choix de Film - API Backend

**Projet scolaire - BAC3Q1 HELHA - Fin 2024**

Ce dépôt contient le backend d’un projet scolaire visant à simplifier le choix d'un film à regarder, en utilisant l'API *The Movie Database* (TMDB) pour proposer une large gamme de films et recommandations aux utilisateurs.

## 🚀 Technologies Utilisées

- **Node.js** avec **Express** pour la gestion du serveur et des routes.
- **TypeScript** pour un typage robuste et des fonctionnalités modernes de JavaScript.
- **TypeORM** pour l'interaction avec la base de données.
- **TMDB API** pour la récupération des informations de films en temps réel.

## 📂 Configuration

Avant de lancer le projet, assurez-vous de configurer correctement l'API TMDB et la base de données :

1. **TMDB** : Ajoutez votre clé d’API TMDB dans le fichier de configuration `/src/configs/tmdbConfig.ts`.
2. **Base de données** : Configurez les paramètres de connexion de la base de données dans `/src/configs/dbConfig.ts`.

Pour les environnements de développement et de production, voici les paquets nécessaires :

- **TypeORM** : installation avec 
  ```bash
  npm install typeorm --save
  ```
  et l'importation de 
  ```typescript
  import "reflect-metadata";
  ```
- **Types Node** (pour TypeScript) : 
  ```bash
  npm install @types/node --save-dev
  ```
- **Base de données** :
   - **MariaDB** pour la production :
     ```bash
     npm install mysql --save
     ```
   - **SQLite3** pour le développement :
     ```bash
     npm install sqlite3 --save
     ```

## ⚙️ Installation

Pour démarrer le projet, suivez les étapes ci-dessous :

1. **Installer les dépendances :**
   ```bash
   npm install
   ```

2. **Lancer le serveur :**
   ```bash
   npm start
   ```

Cela démarrera le serveur en mode de production. Assurez-vous que toutes les configurations (TMDB, base de données) sont correctement définies avant de démarrer pour éviter les erreurs de connexion.

## 📜 Documentation des Endpoints

Chaque endpoint de l’API est documenté pour permettre une intégration fluide avec les interfaces front-end. Pour consulter la liste complète des endpoints disponibles, référez-vous à la documentation interne ou au fichier `/docs/api.md` (si documenté).



# Project Overview

This project is a backend application using TypeScript and Express, designed with a modular architecture to ensure scalability, maintainability, and separation of concerns. Each directory in the `src` folder has a specific responsibility, explained below.

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

### 1. `config/`

- **Purpose**: Contains configuration files that define settings for external services and database connections.
- **Files**:
  - `dbConfigs.ts`: Manages the configuration for database connectivity and setup (e.g., database URL, credentials).
  - `tmdbConfig.ts`: Holds configurations for the TMDB API, including API tokens, base URL, and any necessary parameters.

### 2. `controllers/`

- **Purpose**: Handles HTTP requests, processes data, and calls appropriate services.
- **File Structure**:
  - Each controller is specific to a particular resource (e.g., `UserController.ts`), which receives requests, interacts with the relevant service, and returns responses.

### 3. `models/`

- **Purpose**: Defines data models and schemas, which represent the structure of the data managed in the database.
- **Example**: 
  - `User.ts` could represent a user entity schema with properties such as `id`, `name`, `email`, etc.
  - Any other entities (e.g., `Series`) would also have their respective models defined here.

### 4. `repositories/`

- **Purpose**: Acts as a data access layer, responsible for interacting with the database to perform CRUD operations. This follows the Repository Pattern, isolating data logic from business logic.
- **Files**:
  - `UserRepository.ts`: Contains methods for retrieving, adding, updating, or deleting `User` data in the database.
  - Other repositories would be added here for additional entities as needed.

### 5. `routes/`

- **Purpose**: Organizes API routes and links each route to the corresponding controller function. Each route file focuses on one endpoint or resource, ensuring modularity.
- **Files**:
  - `userRoutes.ts`: Defines routes related to `User` actions (e.g., `/users`, `/users/:id`), linked to appropriate controller methods.
  - Additional files would follow the same pattern for each new route.

### 6. `services/`

- **Purpose**: Contains business logic and handles core functionalities of the application. Services use repositories to fetch or manipulate data and apply any additional logic needed for each feature.
- **Example**:
  - `UserService.ts`: Contains user-related functionality, such as creating a new user, updating user details, etc., with methods that call `UserRepository` functions.
  - Additional service files are created as needed for other features or entities.

### 7. `utils/`

- **Purpose**: Stores utility functions and classes that are not directly associated with any specific layer (e.g., helper functions, error-handling classes).
- **File Structure**:
  - `HttpException.ts`: Custom error-handling class to manage HTTP exceptions consistently across the application.
  - If a utility class is specific to a certain function and has a parent class, consider creating a package for it within this folder.

### 8. `server.ts`

- **Purpose**: The main entry point for the server. Initializes the Express application, loads routes, and listens on the designated port.
- **Responsibilities**:
  - Imports configurations, initializes middleware, registers routes, and sets up the Express server.

---

### Notes

- **Modularity**: Each layer is separated to enhance code readability, maintainability, and scalability.
- **Error Handling**: Custom error classes in `utils/` provide consistent error management throughout the application.
- **Extensibility**: Additional features or resources can be easily added by creating new files within the `controllers`, `services`, `repositories`, and `routes` directories.
