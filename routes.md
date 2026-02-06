Parfait 👍
Je vais te répondre **comme une vraie spec d’API**, sans code, **route par route**, avec :

* 🔹 Objectif
* 🔹 Étapes internes (ce que fait le serveur)
* 🔹 Requête (entrée)
* 🔹 Réponse (sortie)
* 🔹 Sécurité

---

# 1️⃣ AUTHENTIFICATION

## 🔐 POST `/auth/register` — Inscription

### Objectif

Créer un nouvel utilisateur.

### Étapes internes

1. Vérifier que `email` n’existe pas déjà
2. Valider les champs (email valide, mot de passe fort)
3. Hasher le mot de passe
4. Créer l’utilisateur en base
5. Générer un token (JWT)
6. Retourner l’utilisateur + token

### Requête

```json
{
  "email": "user@mail.com",
  "password": "********",
  "username": "yassar"
}
```

### Réponse (201)

```json
{
  "user": {
    "id": "uuid",
    "email": "user@mail.com",
    "username": "yassar",
    "role": "user"
  },
  "token": "jwt_token"
}
```

---

## 🔐 POST `/auth/login` — Connexion

### Étapes

1. Trouver l’utilisateur par email
2. Comparer le mot de passe
3. Générer un token
4. Retourner les infos utilisateur

### Requête

```json
{
  "email": "user@mail.com",
  "password": "********"
}
```

### Réponse (200)

```json
{
  "token": "jwt_token",
  "user": {
    "id": "uuid",
    "email": "user@mail.com"
  }
}
```

---

## 🔐 GET `/auth/me` — Utilisateur connecté

### Étapes

1. Lire le token
2. Vérifier l’auth
3. Charger l’utilisateur

### Réponse

```json
{
  "id": "uuid",
  "email": "user@mail.com",
  "role": "user"
}
```

🔒 **Protégé**

---

# 2️⃣ UTILISATEUR

## 👤 PATCH `/users/me` — Modifier profil

### Étapes

1. Authentifier
2. Valider les champs
3. Mettre à jour l’utilisateur
4. Retourner le profil

### Requête

```json
{
  "username": "nouveauNom"
}
```

### Réponse

```json
{
  "id": "uuid",
  "username": "nouveauNom"
}
```

---

## ❌ DELETE `/users/me` — Supprimer compte

### Étapes

1. Authentifier
2. Supprimer données liées (passwords, csv, media)
3. Supprimer l’utilisateur

### Réponse

```json
{ "message": "Compte supprimé" }
```

---

# 3️⃣ GESTIONNAIRE DE MOTS DE PASSE 🔐

## ➕ POST `/passwords`

### Étapes

1. Authentifier
2. Chiffrer la valeur
3. Lier au user
4. Sauvegarder

### Requête

```json
{
  "label": "Gmail",
  "value": "monMotDePasse"
}
```

### Réponse

```json
{
  "id": 1,
  "label": "Gmail",
  "createdAt": "2026-02-01"
}
```

---

## 📄 GET `/passwords`

### Étapes

1. Authentifier
2. Charger les mots de passe du user

### Réponse

```json
[
  {
    "id": 1,
    "label": "Gmail"
  }
]
```

---

# 4️⃣ CSV 📊

## ⬆️ POST `/csv/upload`

### Étapes

1. Authentifier
2. Vérifier fichier CSV
3. Parser le contenu
4. Sauvegarder
5. Associer à l’utilisateur

### Requête

* multipart/form-data
* fichier CSV

### Réponse

```json
{
  "id": 3,
  "filename": "data.csv",
  "rows": 120
}
```

---

## 👀 GET `/csv/:id/preview`

### Étapes

1. Vérifier propriété du fichier
2. Retourner X premières lignes

### Réponse

```json
{
  "columns": ["name", "age"],
  "rows": [
    ["Ali", 22],
    ["Sara", 30]
  ]
}
```

---

# 5️⃣ MÉDIAS 🖼️🎥

## ⬆️ POST `/media/upload`

### Étapes

1. Authentifier
2. Vérifier type (image/video)
3. Stocker (local / cloud)
4. Sauvegarder l’URL

### Réponse

```json
{
  "id": 9,
  "type": "image",
  "url": "https://..."
}
```

---

## 📂 GET `/media`

### Étapes

1. Authentifier
2. Charger les médias du user

### Réponse

```json
[
  {
    "id": 9,
    "type": "image",
    "url": "https://..."
  }
]
```

---

# 6️⃣ LEÇONS / FORMATION 📚

## ➕ POST `/lessons` (admin)

### Étapes

1. Vérifier rôle admin
2. Créer la leçon

### Requête

```json
{
  "title": "Intro Prisma",
  "content": "..."
}
```

### Réponse

```json
{
  "id": 1,
  "title": "Intro Prisma"
}
```

---

## 📘 GET `/lessons`

### Étapes

1. Charger toutes les leçons

### Réponse

```json
[
  { "id": 1, "title": "Intro Prisma" }
]
```

---

# 7️⃣ ADMIN 👑

## 👥 GET `/admin/users`

### Étapes

1. Vérifier admin
2. Charger tous les utilisateurs

### Réponse

```json
[
  { "id": "uuid", "email": "user@mail.com" }
]
```

---


# ❤️ `GET /health` — Pourquoi ?

### 👉 À quoi ça sert ?

Dire **“le serveur est vivant et fonctionne”**.

### Qui l’utilise ?

* Docker
* Render / Railway / VPS
* Load balancer
* Monitoring (UptimeRobot, Grafana, etc.)
* Toi, en debug rapide

---

### Exemple concret

Quand tu déploies :

* Le serveur démarre
* La plateforme appelle automatiquement `/health`
* Si **200 OK**, elle garde le service
* Sinon → redémarrage automatique

---

### Ce que ça vérifie

Selon ton niveau :

* Serveur Express OK
* Base de données connectée
* Prisma OK

---

### Réponse simple

```json
{ "status": "ok" }
```

Ou plus avancé :

```json
{
  "status": "ok",
  "db": "connected",
  "uptime": 23423
}
```

👉 **Si `/health` échoue → le service est considéré comme mort**

---

# ℹ️ `GET /version` — Pourquoi ?

### 👉 À quoi ça sert ?

Savoir **quelle version de ton backend tourne en production**.

---

### Cas réels

* Tu déploies une nouvelle version
* Un bug apparaît
* Tu appelles `/version`
* Tu sais **instantanément** :

  * si le bon build est déployé
  * si le cache/CDN est à jour

---

### Réponse

```json
{ "version": "1.0.0" }
```

Ou :

```json
{
  "version": "1.2.3",
  "commit": "a8f3c2d",
  "env": "production"
}
```

Parfait. On va poser **LES ROUTES**, proprement, comme une **API + navigation frontend** cohérente avec ta homepage centrale.

👉 Je te donne :

* routes **API**
* routes **frontend**
* qui est **public / privé**
* rôle de chaque route
  ❌ pas de code

---

# 🧭 1️⃣ ROUTES FRONTEND (navigation)

## 🌍 PUBLIQUES (sans compte)

| Route       | Rôle                                     |
| ----------- | ---------------------------------------- |
| `/`         | Homepage centrale                        |
| `/login`    | Connexion                                |
| `/register` | Inscription                              |
| `/explore`  | Explorer tuteurs / cours (lecture seule) |
| `/about`    | Présentation plateforme                  |
| `/contact`  | Contact                                  |

---

## 🔐 PRIVÉES (auth requise)

### 🧑‍💻 Espace utilisateur

| Route           | Rôle                     |
| --------------- | ------------------------ |
| `/dashboard`    | Vue centrale après login |
| `/profile`      | Mon profil               |
| `/profile/edit` | Modifier mon profil      |
| `/settings`     | Paramètres compte        |

---

### 🎓 Tuteurs / Cours

| Route             | Rôle                         |
| ----------------- | ---------------------------- |
| `/tutors`         | Liste des tuteurs            |
| `/tutors/:id`     | Profil public d’un tuteur    |
| `/courses`        | Liste des cours              |
| `/courses/:id`    | Détail d’un cours            |
| `/courses/create` | Créer un cours (tuteur only) |

---

### 🤝 Réseau social

| Route               | Rôle            |
| ------------------- | --------------- |
| `/friends`          | Liste amis      |
| `/friends/requests` | Demandes reçues |
| `/messages`         | Messagerie (V2) |

---

# 🔌 2️⃣ ROUTES API (Express / REST)

## ❤️ SYSTÈME

| Méthode | Route      | Réponse                |
| ------- | ---------- | ---------------------- |
| GET     | `/health`  | `{ status: "ok" }`     |
| GET     | `/version` | `{ version: "1.0.0" }` |

---

## 🔐 AUTH

| Méthode | Route            | Rôle                |
| ------- | ---------------- | ------------------- |
| POST    | `/auth/register` | Inscription         |
| POST    | `/auth/login`    | Connexion           |
| POST    | `/auth/logout`   | Déconnexion         |
| GET     | `/auth/me`       | Utilisateur courant |

---

## 👤 USERS / PROFIL

| Méthode | Route        | Rôle                |
| ------- | ------------ | ------------------- |
| GET     | `/users/:id` | Profil public       |
| GET     | `/me`        | Mon profil          |
| PUT     | `/me`        | Modifier mon profil |
| DELETE  | `/me`        | Supprimer compte    |

---

## 🎓 TUTORS / COURSES

| Méthode | Route          | Rôle           |
| ------- | -------------- | -------------- |
| GET     | `/tutors`      | Liste tuteurs  |
| GET     | `/tutors/:id`  | Profil tuteur  |
| POST    | `/courses`     | Créer un cours |
| GET     | `/courses`     | Liste cours    |
| GET     | `/courses/:id` | Détail cours   |
| PUT     | `/courses/:id` | Modifier       |
| DELETE  | `/courses/:id` | Supprimer      |

---

## 🤝 FRIENDS

| Méthode | Route                 | Rôle            |
| ------- | --------------------- | --------------- |
| POST    | `/friends/:id`        | Envoyer demande |
| GET     | `/friends`            | Liste amis      |
| GET     | `/friends/requests`   | Demandes        |
| PATCH   | `/friends/:id/accept` | Accepter        |
| PATCH   | `/friends/:id/reject` | Refuser         |
| DELETE  | `/friends/:id`        | Supprimer ami   |

---

## 🧠 INTERESTS

| Méthode | Route               | Rôle           |
| ------- | ------------------- | -------------- |
| GET     | `/interests`        | Liste intérêts |
| POST    | `/me/interests`     | Ajouter        |
| DELETE  | `/me/interests/:id` | Retirer        |

---

# 🧩 3️⃣ CORRESPONDANCE FRONT ↔ API

| Frontend        | API            |
| --------------- | -------------- |
| `/dashboard`    | `GET /auth/me` |
| `/profile`      | `GET /me`      |
| `/profile/edit` | `PUT /me`      |
| `/tutors`       | `GET /tutors`  |
| `/courses`      | `GET /courses` |
| `/friends`      | `GET /friends` |

---

# 🚀 4️⃣ MVP MINIMAL (ordre de dev)

1️⃣ `/health`
2️⃣ `/auth/register` / `/login`
3️⃣ `/me`
4️⃣ `/profile/edit`
5️⃣ `/courses` (read only)
6️⃣ `/dashboard`
7️⃣ friends (V2)

---

## 🧠 RÈGLE D’OR

* **1 route = 1 responsabilité**
* homepage ≠ dashboard
* API REST claire
* frontend = simple hub central

---

👉 Prochaine étape ?

* Sidebar UX (navigation privée)
* Flow utilisateur (diagramme)
* Permissions par rôle
* MVP API ultra minimal
* Version mobile-first

Dis-moi ce que tu veux enchaîner 🔥

