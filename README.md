# Kiddo Frontend

Ce dépôt contient la partie frontend de l'application Kiddo, réalisée avec React et Tailwind CSS. 
Il est responsable de l'interface utilisateur et de l'interaction avec l'API backend pour gérer les fonctionnalités liées aux rencontres entre parents et à l'organisation d'activités.

## Fonctionnalités

- Interface utilisateur intuitive permettant aux utilisateurs de naviguer facilement et rapidement.
- Affichage des annonces et des activités disponibles pour les parents.
- Gestion des profils utilisateur et des informations personnelles.
- Communication via des messages publics et privés avec d'autres parents.
- Recherche et filtrage des rencontres et des activités en fonction de la proximité géographique.

## Prérequis

- Node.js et npm (ou yarn) doivent être installés localement.
- L'API backend de Kiddo doit être en cours d'exécution.

## Instructions d'installation et de configuration

1. Clonez ou téléchargez ce dépôt sur votre machine locale.
2. Dans le répertoire du projet, exécutez la commande `npm install` (ou `yarn install`) pour installer les dépendances.
3. Créez un fichier `.env` à la racine du projet et configurez les variables d'environnement nécessaires, notamment l'URL de l'API backend.
4. Exécutez la commande `npm start` (ou `yarn start`) pour démarrer l'application en mode développement.
5. Accédez à `http://localhost:3000` dans votre navigateur pour afficher le site et interagir avec les fonctionnalités.

## Structure du projet

- `/src` : Contient les fichiers source du frontend.
  - `/assets` : Ressources graphiques
  - `/components` : Composants réutilisables de l'application.
  - `/context` : Contexte de l'application
  - `/hooks` : Hook personnalisé
  - `/pages` : Pages principales de l'application.
  - `/utils` : Utilitaires et fonctions auxiliaires.

## Auteurs

Ce projet a été réalisé par [E-Code](https://github.com/KinderrKill) et [Benjamin A](https://github.com/Baoufa).

## Remarques

- - C'est à la base un projet de fin de formation, celui-ci bien que fait en groupe à été repris à 90% par mes soins et une V2 est dans les tiroirs avec les technologies de Next et Nest.
- Le projet utilise Tailwind CSS pour faciliter le développement et la personnalisation de l'interface utilisateur.
