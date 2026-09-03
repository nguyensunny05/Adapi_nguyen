# ADAPI

> ADAPI permettant d'interagir avec une base de données PostgreSQL via des opérations CRUD complètes.

---

## ✨ Fonctionnalités clés

- **Opérations CRUD complètes :** Consultation, ajout, modification et suppression de données via des routes REST dédiées.
- **Suite de tests d'API :** Fichier `requetes.http` prêt à l'emploi pour tester les endpoints avec l'extension REST Client ou Thunder Client.
- **Gestion des requêtes SQL :** Fichier `queries.sql` documentant les schémas, migrations et requêtes utilisées par l'API.

---

## 🛠️ Stack technique

- **Back-end :** Node.js, Express
- **Base de données :** PostgreSQL
- **Outils & Tests :** Docker, Thunder Client / REST Client

---

## 🔌 Endpoints principaux

| Méthode | Route | Description |
| :--- | :--- | :--- |
| `GET` | `/api/v1/...` | Récupérer la liste complète |
| `GET` | `/api/v1/.../:id` | Récupérer un élément par son identifiant |
| `POST` | `/api/v1/...` | Créer une nouvelle entrée |
| `PATCH` | `/api/v1/.../:id` | Mettre à jour une entrée existante sans tout modifier mais en ciblant un élément bien précis |
| `DELETE` | `/api/v1/.../:id` | Supprimer une entrée |

---

## 🚀 Démarrage rapide

### Prérequis

- Node.js
- PostgreSQL ou Docker

### Installation

1. **Cloner le dépôt :**
   ```bash
   git clone [https://github.com/nguyensunny05/Adapi_nguyen.git](https://github.com/nguyensunny05/Adapi_nguyen.git)
   cd Adapi_nguyen