# ===============================
#  STAGE 1 : BUILD
# ===============================
# On utilise une image Node.js pour builder l'application
FROM node:20 AS builder

# Définit le dossier de travail dans le container
WORKDIR /app

# Copie uniquement les fichiers de dépendances
#  permet d'utiliser le cache Docker (plus rapide)
COPY package*.json ./

# Installe toutes les dépendances (dev incluses)
RUN npm install

# Copie tout le code source
COPY . .

# Génère le client Prisma (obligatoire pour fonctionner)
RUN npx prisma generate

# Compile le projet TypeScript → JavaScript (dossier dist)
RUN npm run build


# ===============================
#  STAGE 2 : PRODUCTION
# ===============================
# Nouvelle image plus légère pour exécuter l'app
FROM node:20

# Définir le dossier de travail
WORKDIR /app

# Copier uniquement les dépendances nécessaires
COPY package*.json ./

# Installer uniquement les dépendances de production
RUN npm install --only=production

# Copier le code compilé depuis le stage builder
COPY --from=builder /app/dist ./dist

# Copier les dépendances déjà installées (plus rapide)
COPY --from=builder /app/node_modules ./node_modules

# Copier le dossier Prisma (schéma + migrations)
COPY --from=builder /app/prisma ./prisma

# Expose le port utilisé par ton serveur
EXPOSE 3000

# Commande de démarrage en production
CMD ["node", "dist/server.js"]