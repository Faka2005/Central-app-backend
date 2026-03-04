import {prisma} from '../server'


async function main() {
  const services = [
{
  name: "Service de récitation",
  description: "Écoutez et gérez vos sourates préférées avec playlist",
  link: "/recitation",
  etat: true, // true si le service est actif
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
  etat: true, // true si le service est actif
},
{
  name: "Analyse de données CSV",
  description: "Importez et analysez vos fichiers CSV facilement",
  link: "/analyse-csv",
  etat: true, // true si le service est actif
},
{
  name: "Service de gestion des amis",
  description: "Gérez votre réseau d'amis et partagez des contenus avec eux",
  link: "/friends",
  etat: true, // true si le service est actif
}
]

  for (const s of services) {
    await prisma.service.upsert({
      where: { name: s.name },
      update: s,
      create: s,
    });
  }

  console.log("Seed terminé ✅");

////npx prisma db push     
////npx ts-node prisma/seed.ts
//import {prisma} from '../server'
//import { Reciter } from '@prisma/client'
//const surahs = [
//  "Al-Fatiha",
//  "Al-Baqara",
//  "Aal-E-Imran",
//  "An-Nisa",
//  "Al-Ma'idah",
//  "Al-An'am",
//  "Al-A'raf",
//  "Al-Anfal",
//  "At-Tawbah",
//  "Yunus",
//  "Hud",
//  "Yusuf",
//  "Ar-Ra'd",
//  "Ibrahim",
//  "Al-Hijr",
//  "An-Nahl",
//  "Al-Isra",
//  "Al-Kahf",
//  "Maryam",
//  "Ta-Ha",
//  "Al-Anbiya",
//  "Al-Hajj",
//  "Al-Mu'minun",
//  "An-Nur",
//  "Al-Furqan",
//  "Ash-Shu'ara",
//  "An-Naml",
//  "Al-Qasas",
//  "Al-Ankabut",
//  "Ar-Rum",
//  "Luqman",
//  "As-Sajda",
//  "Al-Ahzab",
//  "Saba",
//  "Fatir",
//  "Ya-Sin",
//  "As-Saffat",
//  "Sad",
//  "Az-Zumar",
//  "Ghafir",
//  "Fussilat",
//  "Ash-Shura",
//  "Az-Zukhruf",
//  "Ad-Dukhan",
//  "Al-Jathiya",
//  "Al-Ahqaf",
//  "Muhammad",
//  "Al-Fath",
//  "Al-Hujurat",
//  "Qaf",
//  "Adh-Dhariyat",
//  "At-Tur",
//  "An-Najm",
//  "Al-Qamar",
//  "Ar-Rahman",
//  "Al-Waqia",
//  "Al-Hadid",
//  "Al-Mujadila",
//  "Al-Hashr",
//  "Al-Mumtahina",
//  "As-Saff",
//  "Al-Jumu'a",
//  "Al-Munafiqun",
//  "At-Taghabun",
//  "At-Talaq",
//  "At-Tahrim",
//  "Al-Mulk",
//  "Al-Qalam",
//  "Al-Haqqa",
//  "Al-Ma'arij",
//  "Nuh",
//  "Al-Jinn",
//  "Al-Muzzammil",
//  "Al-Muddaththir",
//  "Al-Qiyama",
//  "Al-Insan",
//  "Al-Mursalat",
//  "An-Naba",
//  "An-Nazi'at",
//  "Abasa",
//  "At-Takwir",
//  "Al-Infitar",
//  "Al-Mutaffifin",
//  "Al-Inshiqaq",
//  "Al-Buruj",
//  "At-Tariq",
//  "Al-A'la",
//  "Al-Ghashiya",
//  "Al-Fajr",
//  "Al-Balad",
//  "Ash-Shams",
//  "Al-Layl",
//  "Ad-Duha",
//  "Ash-Sharh",
//  "At-Tin",
//  "Al-Alaq",
//  "Al-Qadr",
//  "Al-Bayyina",
//  "Az-Zalzala",
//  "Al-Adiyat",
//  "Al-Qari'a",
//  "At-Takathur",
//  "Al-Asr",
//  "Al-Humaza",
//  "Al-Fil",
//  "Quraysh",
//  "Al-Ma'un",
//  "Al-Kawthar",
//  "Al-Kafirun",
//  "An-Nasr",
//  "Al-Masad",
//  "Al-Ikhlas",
//  "Al-Falaq",
//  "An-Nas"
//]
//async function main() {
//  // 1️⃣ Créer le récitateur
//  const reciter = await prisma.reciter.upsert({
//    where: { slug: 'yasser-al-dossary' },
//    update: {},
//    create: {
//      name: 'Yasser Al-dossary',
//      slug: 'yasser-al-dossary',
//      basePath: '/reciters/yasser-al-dossary',
//    },
//  })
//
//  // 2️⃣ Créer les 114 sourates
//  for (let i = 0; i < surahs.length; i++) {
//    const number = i + 1
//    const audioFile = String(number).padStart(3, '0') + '.mp3'
//
//    await prisma.surah.upsert({
//      where: {
//        number_reciterId: {
//          number,
//          reciterId: reciter.id,
//        },
//      },
//      update: {},
//      create: {
//        number,
//        name: surahs[i],
//        audioFile,
//        reciterId: reciter.id,
//      },
//    })
//  }
//
//  console.log('✅ 114 sourates seedées avec succès')
}
//
main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
