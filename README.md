**Pour le Backend :**

1. **Naviguer dans le dossier du backend :**
cd footballCrudBackend


2. **Installer les dépendances PHP avec Composer :**  
Cette commande installe toutes les dépendances définies dans le fichier `composer.json`.

composer install



4. **Créer la base de données :**  
Cette commande crée la base de données si elle n'existe pas encore.

php bin/console doctrine:database:create



6. **Créer la migration pour la base de données :**  
Cela génère un fichier de migration basé sur les changements dans les entités Doctrine.

php bin/console make:migration



8. **Appliquer la migration pour mettre à jour la base de données :**  
Cette commande applique les migrations générées précédemment pour synchroniser le schéma de la base de données avec les entités.

php bin/console doctrine:migrations:migrate



10. **Ajouter un code secret (facultatif mais important pour la sécurité) :**  
Cette commande permet de configurer un code secret, souvent utilisé pour des tokens ou des clés de cryptage.

php bin/console secrets:generate-keys



12. **Démarrer le serveur Symfony :**  
Cela lance un serveur local pour tester ton application Symfony en mode développement.

symfony server:start



> **Note :** Si tu ne veux pas utiliser `symfony server:start`, tu peux également utiliser un serveur HTTP natif de PHP :

php -S 127.0.0.1:8000 -t public



---

**Pour le Frontend :**

1. **Naviguer dans le dossier du frontend :**
cd footballCrudFrontend



2. **Installer les dépendances avec npm :**  
Cette commande installe toutes les dépendances définies dans le fichier `package.json`.

npm install


4. **Lancer le serveur Angular en mode développement :**  
Cette commande démarre le serveur de développement Angular et rend l'application accessible via `http://localhost:4200`.

ng serve


6. **Accéder à l'application dans un navigateur :**

Ouvre ton navigateur et accède à l'application frontend à l'adresse suivante :

http://localhost:4200
