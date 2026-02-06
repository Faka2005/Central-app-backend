

# 🧱 SCHÉMA LOGIQUE (référence)

Relations clés :

* User → Password (1-N)
* User → CSVFile (1-N)
* User → Media (1-N)
* User → LessonProgress (1-N)
* Lesson → LessonProgress (1-N)

IDs : **UUID partout** (bonne pratique moderne)

---

# 🐘 VERSION SQL (PostgreSQL)

## 👤 User

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  username TEXT UNIQUE,
  password TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'user',
  created_at TIMESTAMP DEFAULT now()
);
```

---

## 🔐 Password

```sql
CREATE TABLE passwords (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  label TEXT NOT NULL,
  value TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT now(),

  CONSTRAINT fk_password_user
    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE
);
```

---

## 📊 CSVFile

```sql
CREATE TABLE csv_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  filename TEXT NOT NULL,
  data TEXT NOT NULL,
  uploaded_at TIMESTAMP DEFAULT now(),

  CONSTRAINT fk_csv_user
    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE
);
```

---

## 🖼️🎥 Media

```sql
CREATE TABLE media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  filename TEXT NOT NULL,
  type TEXT NOT NULL, -- image / video
  url TEXT NOT NULL,
  uploaded_at TIMESTAMP DEFAULT now(),

  CONSTRAINT fk_media_user
    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE
);
```

---

## 📚 Lesson

```sql
CREATE TABLE lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  status TEXT DEFAULT 'published',
  created_at TIMESTAMP DEFAULT now()
);
```

---

## 📈 LessonProgress

```sql
CREATE TABLE lesson_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  lesson_id UUID NOT NULL,
  progress INTEGER DEFAULT 0,
  completed BOOLEAN DEFAULT false,
  updated_at TIMESTAMP DEFAULT now(),

  CONSTRAINT fk_lp_user
    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE,

  CONSTRAINT fk_lp_lesson
    FOREIGN KEY (lesson_id)
    REFERENCES lessons(id)
    ON DELETE CASCADE,

  CONSTRAINT unique_user_lesson UNIQUE (user_id, lesson_id)
);
```

---

# 🧬 VERSION PRISMA (schema.prisma)

👉 **Correspondance exacte avec le SQL**

```prisma
generator client {
  provider = "prisma-client"
}

datasource db {
  provider = "postgresql"
}

model User {
  id        String    @id @default(uuid())
  email     String    @unique
  username  String?   @unique
  password  String
  role      String    @default("user")
  createdAt DateTime  @default(now())

  passwords Password[]
  csvFiles  CSVFile[]
  media     Media[]
  progress  LessonProgress[]
}

model Password {
  id        String   @id @default(uuid())
  label     String
  value     String
  createdAt DateTime @default(now())

  userId String
  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model CSVFile {
  id         String   @id @default(uuid())
  filename   String
  data       String
  uploadedAt DateTime @default(now())

  userId String
  user   User @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model Media {
  id         String   @id @default(uuid())
  filename   String
  type       String
  url        String
  uploadedAt DateTime @default(now())

  userId String
  user   User @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model Lesson {
  id        String   @id @default(uuid())
  title     String
  content   String
  status    String   @default("published")
  createdAt DateTime @default(now())

  progress LessonProgress[]
}

model LessonProgress {
  id        String   @id @default(uuid())
  progress  Int      @default(0)
  completed Boolean  @default(false)
  updatedAt DateTime @default(now())

  userId   String
  lessonId String

  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)
  lesson Lesson @relation(fields: [lessonId], references: [id], onDelete: Cascade)

  @@unique([userId, lessonId])
}
```

---

# ✅ Correspondance SQL ↔ Prisma

| SQL             | Prisma                  |
| --------------- | ----------------------- |
| users           | User                    |
| passwords       | Password                |
| csv_files       | CSVFile                 |
| media           | Media                   |
| lessons         | Lesson                  |
| lesson_progress | LessonProgress          |
| UUID            | String @default(uuid()) |
| FOREIGN KEY     | @relation               |

---



## 👉 Prochaine étape possible

Dis-moi ce que tu veux ensuite :

* 📦 Docker + déploiement
* 🧪 jeux de données de test

