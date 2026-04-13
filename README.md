

#  Central App Backend

Backend pour **Central App**, une plateforme offrant plusieurs services web (recitation, gestion de mots de passe, galerie, analyse CSV, gestion des amis).

---

##  Technologies

* **Node.js** + **TypeScript**
* **Prisma ORM** pour PostgreSQL
* **Express.js 
* **PostgreSQL**
* **ts-node** pour exécuter le seed et le serveur en développement

---

##  Fonctionnalités

Le backend gère plusieurs services :


---

##  Services disponibles

| Service                       | Description                                                 | Route          |
| ----------------------------- | ----------------------------------------------------------- | -------------- |
| Authentification              | Gestion des comptes utilisateurs (inscription, connexion)   | `/auth`        |
| Gestionnaire de mots de passe | Stockage sécurisé et gestion des mots de passe              | `/password`    |
| Galerie d’images              | Upload, stockage et consultation d’images                   | `/gallery`     |
| Analyse CSV                   | Importation et analyse de fichiers CSV                      | `/analyse-csv` |
| Gestion des amis              | Gestion du réseau d’amis et interactions entre utilisateurs | `/friends`     |

---





##  Installation

1. Cloner le projet :

```bash
git clone <URL_DU_PROJET>
cd Central-app-backend
```

2. Installer les dépendances :

```bash
npm install
```

3. Configurer la base de données :

* Créer un fichier `.env` à la racine :

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/central_app"
```

> Remplacez `postgres`, `password` et `central_app` par vos informations locales.

4. Générer Prisma Client :

```bash
npx prisma generate
```

5. Lancer les migrations (si nécessaire) :

```bash
npx prisma migrate dev --name init
```

---

##  Seed (initialisation des services)

Pour ajouter les services par défaut dans la base de données :

```bash
npm run seed
```

Le seed utilise `createMany({ skipDuplicates: true })` pour éviter les doublons.

---

##  Lancer le serveur

```bash
npm run dev
```

* Serveur écoute par défaut sur **`http://localhost:3000`**
* Routes disponibles selon les services décrits ci-dessus

---

##  Structure du projet

```
Central-app-backend/
│
Central-app-backend/
│
src/
│
├─ config/
│   ├─ env.ts
│   ├─ jwt.ts
│   └─ prisma.ts
├─ user/
│   ├─ user.controller.ts
│   ├─ user.service.ts
│   ├─ user.repository.ts
│   ├─ user.routes.ts
│   └─ user.types.ts
│
├─ auth/
│   ├─ auth.controller.ts
│   ├─ auth.service.ts
│   ├─ auth.middleware.ts
│   └─ auth.routes.ts
│
├─ service/             
│   ├─ service.controller.ts
│   ├─ service.service.ts
│   ├─ service.repository.ts
│   ├─ service.routes.ts
│   └─ service.types.ts
│
├─ friend/             
│   ├─ friend.controller.ts
│   ├─ friend.service.ts
│   ├─ friend.repository.ts
│   ├─ friend.routes.ts
│   └─ friend.types.ts
|
├─ message/             
│   ├─ message.controller.ts
│   ├─ message.service.ts
│   ├─ message.repository.ts
│   ├─ message.routes.ts
│   └─ message.types.ts
|
├─ media/             
│   ├─ media.controller.ts
│   ├─ media.service.ts
│   ├─ media.repository.ts
│   ├─ media.routes.ts
│   └─ media.types.ts
|
├─ password/             
│   ├─ password.controller.ts
│   ├─ password.service.ts
│   ├─ password.repository.ts
│   ├─ password.routes.ts
│   └─ password.types.ts
|
├─ csv/             
│   ├─ csv.controller.ts
│   ├─ csv.service.ts
│   ├─ csv.repository.ts
│   ├─ csv.routes.ts
│   └─ csv.types.ts
|
└─ system/
│
├─ middleware/
│   ├─ auth/
│   │   ├─ authUser.middleware.ts
│   │   ├─ authAdmin.middleware.ts
│   │   └─ authUserOrAdmin.middleware.ts
│   │
│   └─ error.middleware.ts
│
├─ routes/
│   └─ index.ts
│
├─ prisma/
│   ├─ schema.prisma
│   ├─ seeds/
│   │   ├─ index.ts
│   │   ├─ service.seed.ts
│   │   └─ user.seed.ts
│   └─ migrations/
│
├─ utils/
│
├─ types/
│
├─ app.ts
└─ server.ts
```

---

##  Bonnes pratiques

* **Ne jamais importer le serveur dans le seed** (évite les conflits Prisma)
* **Toujours utiliser `createMany` avec `skipDuplicates: true`** pour le seed
* **Utiliser une DB locale pour le dev** afin d’éviter les erreurs `P5010` / `fetch failed`
* Vérifier la connectivité DB avant de lancer le seed :

```bash
npx prisma db pull
```

---

##  Liens utiles

* [Documentation Prisma](https://www.prisma.io/docs/)
* [Node.js](https://nodejs.org/en/docs/)
* [PostgreSQL](https://www.postgresql.org/docs/)
* [Docker](https://docker.io)
---


