

#  Central App Backend

Backend pour **Central App**, une plateforme offrant plusieurs services web (recitation, gestion de mots de passe, galerie, analyse CSV, gestion des amis).

---

##  Technologies

* **Node.js** + **TypeScript**
* **Prisma ORM** pour PostgreSQL
* **Express.js / Fastify** (selon votre serveur actuel)
* **PostgreSQL** (locale ou Data Proxy)
* **ts-node** pour exécuter le seed et le serveur en développement

---

##  Fonctionnalités

Le backend gère plusieurs services :

| Service                       | Description                                           | Route          |
| ----------------------------- | ----------------------------------------------------- | -------------- |
| Service de récitation         | Écoutez et gérez vos sourates préférées avec playlist | `/recitation`  |
| Gestionnaire de mots de passe | Gérez vos mots de passe de manière sécurisée          | `/password`    |
| Galerie d’images              | Stockez et visualisez vos images facilement           | `/gallery`     |
| Analyse CSV                   | Importez et analysez vos fichiers CSV                 | `/analyse-csv` |
| Gestion des amis              | Gérez votre réseau d’amis et partagez des contenus    | `/friends`     |

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
├─ prisma/
│   ├─ schema.prisma         # Schéma Prisma
│   ├─ seed.ts               # Seed initial des services
│   └─ migrations/           # Migrations
│
├─ config/
│   └─ prisma.ts             # Client Prisma partagé
│
├─ server.ts                 # Point d’entrée du serveur
├─ package.json
└─ tsconfig.json
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


