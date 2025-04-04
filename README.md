**Pour le Backend :**

Naviguer dans le dossier du backend :

    cd footballCrudBackend


Installer les dépendances PHP avec Composer : Cette commande installe toutes les dépendances définies dans le fichier composer.json.

    composer install


Créer la base de données 

    php bin/console doctrine:database:create


Créer la migration pour la base de données 

    php bin/console make:migration


Appliquer la migration pour mettre à jour la base de données : Cette commande applique les migrations générées précédemment pour synchroniser le schéma de la base de données avec les entités.

    php bin/console doctrine:migrations:migrate


Démarrer le serveur Symfony : Cela lance un serveur local pour tester ton application Symfony en mode développement.

    symfony server:start


Note : Si tu ne veux pas utiliser symfony server:start, tu peux également utiliser un serveur HTTP natif de PHP :

    php -S 127.0.0.1:8000 -t public


**Pour le Frontend :**

Naviguer dans le dossier du frontend :

    cd footballCrudFrontend


Installer les dépendances avec npm : Cette commande installe toutes les dépendances définies dans le fichier package.json.

    npm install


Lancer le serveur Angular en mode développement : Cette commande démarre le serveur de développement Angular et rend l'application accessible via http://localhost:4200.

    ng serve


Accéder à l'application dans un navigateur : Ouvre ton navigateur et accède à l'application frontend à l'adresse suivante :

    http://localhost:4200/register => pour créer un compte
    
    http://localhost:4200/login => pour s'authentifier
    
    http://localhost:4200/players => pour voir la liste des joueurs
