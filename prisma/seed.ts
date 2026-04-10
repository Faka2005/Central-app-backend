import { prisma } from "../config/prisma";


async function seedServices() {
  const services = [
{
  name: "Service de récitation",
  description: "Écoutez et gérez vos sourates préférées avec playlist",
  link: "/recitation",
  etat: false, // true si le service est actif
},
{
  name: "Gestionnaire de mots de passe",
  description: "Gérez vos mots de passe de manière sécurisée",
  link: "/password",
  etat: true, // true si le service est actif
},
{
  name: "Gallerie d'images",
  description: "Stockez et visualisez vos images en toute simplicité",
  link: "/gallery",
  etat: false, // true si le service est actif
},
{
  name: "Analyse de données CSV",
  description: "Importez et analysez vos fichiers CSV facilement",
  link: "/analyse-csv",
  etat: false, // true si le service est actif
},
{
  name: "Service de gestion des amis",
  description: "Gérez votre réseau d'amis et partagez des contenus avec eux",
  link: "/friends",
  etat: false, // true si le service est actif
}
]

  for (const s of services) {
    await prisma.service.upsert({
      where: { name: s.name },
      update: s,
      create: s,
    });
  }

  console.log(" Services seedés");
}

async function seedUsers() {
  console.log(" Seed users...");
  
}

async function main() {
  const arg = process.argv[2]; // récupère le paramètre

  switch (arg) {
    case "service":
      await seedServices();
      break;

    case "user":
      await seedUsers();
      break;

    case "all":
      await seedServices();
      await seedUsers();
      break;

    default:
      console.log("❌ Argument invalide");
      console.log("Utilise : service | user | all");
  }
}