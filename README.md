# Sujet de Tests Technique CRUD

## Objectif
L'objectif de ce test technique est d'évaluer vos compétences en développement d'applications web en utilisant Symfony pour le backend (API REST) et Angular pour le frontend.

Vous devrez créer une application simple permettant de gérer une liste de joueurs de football avec des opérations CRUD (Create, Read, Update, Delete) ainsi qu'un import du fichier XLSX.

## Contexte
Vous allez développer une application de gestion de joueurs de football où les utilisateurs peuvent ajouter, afficher, mettre à jour et supprimer des joueurs. L'application doit inclure un backend en Symfony qui expose une API REST, ainsi qu'un frontend en Angular qui consomme cette API.

## Exigences fonctionnelles

### Backend (Symfony)
1. **Modèle de données** : Créez une entité `Player` avec les champs suivants :
    - `id`
    - `firstName`
    - `lastName`
    - `position` (choix possibles : `Attaquant`, `Défenseur`, `Gardien` et `Milieu`)
    - `team`
    - `age`
    - `createdAt`
    - `updatedAt`

2. **API REST** : Implémentez les endpoints suivants :
    - `GET /players` : Récupère la liste de tous les joueurs
    - `GET /players/{id}` : Récupère les détails d'un joueur spécifique
    - `POST /players` : Crée un nouveau joueur
    - `PUT /players/{id}` : Met à jour un joueur existant
    - `DELETE /players/{id}` : Supprime un joueur existant
    - `POST /players/import` : Importe des joueurs depuis un fichier XLSX

3. **Validation et Sécurité** : Ajoutez des validations pour les champs de l'entité `Player`. Implémentez une sécurité basique pour protéger les endpoints (authentification par token JWT par exemple).

Note : vous pouvez utiliser les designs patterns que vous voulez. 

### Frontend (Angular)
1. **Interface utilisateur** : Créez une interface utilisateur permettant de :
    - Afficher la liste des joueurs
    - Ajouter un nouveau joueur
    - Mettre à jour un joueur existant
    - Supprimer un joueur
    - Importer des joueurs depuis un fichier XLSX

2. **Formulaires** : Utilisez des formulaires pour la création et la mise à jour des joueurs. Ajoutez des validations de formulaire côté frontend.

3. **Services** : Créez des services Angular pour interagir avec l'API REST du backend.

4. **Composants** : Organisez le code en composants Angular pour une meilleure maintenabilité.

## Exemple de fichier XLSX
Vous trouverez un exemple de fichier XLSX dans le dossier `data` qui contient une liste de joueurs de football.

## Critères d'évaluation
- Respect des exigences fonctionnelles
- Qualité du code (lisibilité, organisation, utilisation des bonnes pratiques)
- Fonctionnalité et réactivité de l'interface utilisateur
- Gestion des erreurs et validations
- Sécurité de l'API

## Livrables
- Code source du backend Symfony
- Code source du frontend Angular
- Instructions pour exécuter l'application (README)

## Instructions
- Vous avez **7 heures** pour compléter ce test.
- Envoyez votre code via un dépôt **Git** ou un fichier ZIP.
- Assurez-vous que les instructions pour exécuter l'application sont claires et complètes.

Bonne chance !
