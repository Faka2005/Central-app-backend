

# Structure complète du dossier `/tests`

```
tests/
│
├── setup/
│   ├── setupTests.ts
│   ├── teardownTests.ts
│   ├── testDatabase.ts
│   └── seedTestData.ts
│
├── helpers/
│   ├── auth.helper.ts
│   ├── prisma.helper.ts
│   └── request.helper.ts
│
├── factories/
│   ├── user.factory.ts
│   └── service.factory.ts
│
├── integration/
│   │
│   ├── auth/
│   │   ├── register.test.ts
│   │   ├── login.test.ts
│   │   └── deleteUser.test.ts
│   │
│   ├── service/
│   │   ├── getAllServices.test.ts
│   │   ├── getOneService.test.ts
│   │   ├── createService.test.ts
│   │   ├── updateEtatService.test.ts
│   │   ├── updateService.test.ts
│   │   └── deleteService.test.ts
│   │
│   └── middleware/
│       ├── authAdmin.test.ts
│       └── authUserOrAdmin.test.ts
│
├── unit/
│   │
│   ├── services/
│   │   ├── auth.service.test.ts
│   │   └── service.service.test.ts
│   │
│   ├── controllers/
│   │   ├── auth.controller.test.ts
│   │   └── service.controller.test.ts
│   │
│   └── middleware/
│       ├── authAdmin.middleware.test.ts
│       └── authUserOrAdmin.middleware.test.ts
│
└── utils/
    ├── generateToken.ts
    └── testConstants.ts
```

---

# Explication rapide des dossiers

### `setup/`

Initialisation de l’environnement de test

```
setupTests.ts
```

* démarre prisma
* connecte la DB test
* reset la DB

```
teardownTests.ts
```

* ferme prisma

```
testDatabase.ts
```

* reset DB entre tests

```
seedTestData.ts
```

* crée admin
* crée user
* crée services

---

### `helpers/`

Fonctions utilitaires pour tests

ex :

```
auth.helper.ts
```

```ts
export const loginAsAdmin = async () => {}
export const loginAsUser = async () => {}
```

```
request.helper.ts
```

wrap de supertest :

```ts
export const api = request(app)
```

---

### `factories/`

Création d’objets fake pour tests

```
user.factory.ts
```

```ts
export const createTestUser = () => ({
  email: "test@mail.com",
  password: "password123"
})
```

```
service.factory.ts
```

```ts
export const createTestService = () => ({
  title: "Test service",
  description: "description"
})
```

---

### `integration/`

Tests **API complets**

→ route → middleware → controller → service → prisma

ex :

```
POST /auth/register
```

```
tests/integration/auth/register.test.ts
```

---

### `unit/`

Tests isolés

* service seul
* controller seul
* middleware seul

---

### `utils/`

petits outils utiles :

```
generateToken.ts
```

pour créer JWT fake

```
testConstants.ts
```

ex :

```ts
export const TEST_ADMIN_EMAIL = "admin@test.com"
```

---




# Bonus (recommandé pour Prisma)

Ajouter **une DB de test**

```
.env.test
```

```
DATABASE_URL="postgresql://test:test@localhost:5432/test_db"
```

---

# Structure finale de ton backend

```
src/
 ├── controllers/
 ├── services/
 ├── routes/
 ├── middleware/
 ├── schema/
 └── server.ts

tests/
 ├── integration/
 ├── unit/
 ├── factories/
 ├── helpers/
 └── setup/
```

---
