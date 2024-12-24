# Description

Ce projet une webapp pour historiser et afficher les informations remontées par des devices en temps réelle à l’aide du protocole MQTT.
Composé de trois parties : un client React, un backend Express/Node et une simulation MQTT.

## Installation

Pour installer et lancer le projet, veuillez suivre les étapes suivantes :

1. Clonez le repository Git : `git clone https://github.com/yassinsaied/test-technique-eversun.git`.
2. Exécutez la commande suivante `mosquitto` pour la communication avec les appareils connectés .
3. cd test-technique-eversun
4. Exécutez `yarn install` pour installer les dépendances .
5. Exécutez `yarn start` pour lancer le projet.

Note : Assurez-vous d'avoir Yarn , Node.js et Mosquitto MQTT installés sur votre machine ansi MongoDB.
La documentation complète des API est disponible à la racine du projet.
Vous pouvez l'importer dans Postman pour une meilleure expérience de test et de développement.

## Description

Le projet vise à démontrer l'intégration d'une application front-end React avec un backend Express utilisant MQTT pour la communication en temps réel entre les appareils et le serveur.

## Fonctionnalités

- Affichage en temps réel des données des appareils connectés.
- Contrôle des appareils depuis l'interface utilisateur.
- Affichage de l'historique des appareils.
- Simulation MQTT pour la génération de données aléatoires.

## Technologies Utilisées

- React.js
- Express.js
- MQTT
- MongoDB
