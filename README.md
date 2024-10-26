# 🎬 Choix de Film - API Backend

**Projet scolaire - BAC3Q1 HELHA - Fin 2024**

Ce dépôt contient le backend d’un projet visant à accélérer le choix d'un film à regarder, en utilisant l'API de *The Movie Database* (TMDB) pour proposer une large gamme de films aux utilisateurs.

## 🚀 Technologies Utilisées

- **Node.js** et **Express** pour la gestion du serveur et des routes.
- **TypeScript** pour un typage strict et des fonctionnalités modernes de JavaScript.
- **TypeORM** pour l'interaction avec la base de données.
- **TMDB API** pour récupérer des informations sur les films.

## 📂 Configuration

Avant de lancer le projet, assurez-vous de configurer correctement l'API TMDB et la base de données :

1. **TMDB** : Configurez votre clé d’API TMDB dans `/src/configs/tmdbConfig.ts`.
2. **Base de données** : Configurez les paramètres de connexion de la base de données dans `/src/configs/dbConfig.ts`.

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

Cela démarrera le serveur en mode de production. Assurez-vous que toutes les configurations (TMDB, base de données) sont correctement définies avant de démarrer.

## 📜 Documentation des Endpoints

Chaque endpoint est documenté pour aider les développeurs à intégrer cette API dans des interfaces front-end. Pour consulter la liste complète des endpoints disponibles, consultez la documentation interne ou le fichier `/docs/api.md` (si documenté).
