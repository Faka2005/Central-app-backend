# ===============================
# Dockerfile pour dev Node + TypeScript + Prisma + Nodemon
# ===============================

FROM node:20

# Définir le répertoire de travail
WORKDIR /app

# Copier seulement package.json et package-lock.json pour profiter du cache
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Installer nodemon globalement
RUN npm install -g nodemon

# Copier le reste du projet
COPY . .

# Générer le client Prisma
RUN npx prisma generate

# Exposer le port
EXPOSE 3000

# Lancer le serveur avec nodemon (surveiller les fichiers .ts)
CMD ["npm", "run","dev"]

