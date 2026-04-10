

---

#  AUTHENTIFICATION

##  POST `/auth/register` — Inscription

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

##  POST `/auth/login` — Connexion

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

##  GET `/auth/me` — Utilisateur connecté

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

 **Protégé**

---

#  UTILISATEUR

##  PATCH `/users/me` — Modifier profil

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

##  DELETE `/users/me` — Supprimer compte

### Étapes

1. Authentifier
2. Supprimer données liées (passwords, csv, media)
3. Supprimer l’utilisateur

### Réponse

```json
{ "message": "Compte supprimé" }
```

---

#  GESTIONNAIRE DE MOTS DE PASSE 

##  POST `/passwords`

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

##  GET `/passwords`

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

#  CSV 

##  POST `/csv/upload`

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

##  GET `/csv/:id/preview`

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

#  MÉDIAS 

##  POST `/media/upload`

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

##  GET `/media`

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

# LEÇONS / FORMATION 

##  POST `/lessons` (admin)

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

##  GET `/lessons`

### Étapes

1. Charger toutes les leçons

### Réponse

```json
[
  { "id": 1, "title": "Intro Prisma" }
]
```

---

#  ADMIN 

##  GET `/admin/users`

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

