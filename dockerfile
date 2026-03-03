# ===============================
# 1️⃣ Stage Build
# ===============================
FROM node:20-alpine AS builder

WORKDIR /app

# Copier les fichiers package
COPY package*.json ./

# Installer toutes les dépendances (y compris dev pour build)
RUN npm install

# Copier le reste du projet
COPY . .

# Générer Prisma Client
RUN npx prisma generate

# Compiler TypeScript
RUN npm run build


# ===============================
# 2️⃣ Stage Production
# ===============================
FROM node:20-alpine

WORKDIR /app

# Copier uniquement les dépendances prod
COPY package*.json ./
RUN npm install --omit=dev

# Copier build + prisma
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma
COPY prisma ./prisma

# Exposer le port
EXPOSE 3000

# Lancer le serveur
CMD ["node", "dist/server.js"]