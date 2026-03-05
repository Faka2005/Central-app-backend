

# 📝 Backend TODO

## 1️⃣ Password

**repository/password.repository.ts**

```ts
// TODO: findByUser(userId: string)


// TODO: findAll(limit?: number, skip?: number)
// TODO: create(userId: string, data: any)
// TODO: updatePassword(id: string, data: any)
// TODO: delete(id: string)
```

**services/password.service.ts**

```ts
// TODO: createPassword(userId: string, data: any) -> repository.create + encrypt
// TODO: getPasswordsForUser(userId: string) -> repository.findByUser + decrypt
// TODO: modifyPassword(id: string, data: any) -> repository.updatePassword + encrypt si password
// TODO: deletePassword(id: string) -> repository.delete
```

**controllers/password.controller.ts**

```ts
// TODO: POST /:userId -> createPassword
// TODO: GET /user/:userId -> getPasswordsForUser
// TODO: PUT /:id -> modifyPassword
// TODO: DELETE /:id -> deletePassword
```

---

## 2️⃣ User

**repository/user.repository.ts**

```ts
// TODO: findById(id: string)
// TODO: findAll()
// TODO: deleteOne(id: string)
// TODO: updateRole(id: string, role: string)
// TODO: resetPassword(id: string, newPassword: string)
// TODO: updateProfile(userId: string, data: any)
```

**services/user.service.ts**

```ts
// TODO: getUserById(id: string)
// TODO: getAllUsers()
// TODO: updateUserRole(id: string, role: string)
// TODO: resetUserPassword(id: string, newPassword: string)
// TODO: updateUserProfile(userId: string, data: any)
// TODO: deleteUser(id: string)
```

**controllers/user.controller.ts**

```ts
// TODO: GET /:id -> getUserById
// TODO: GET / -> getAllUsers
// TODO: PUT /role/:id -> updateUserRole
// TODO: PUT /password/:id -> resetUserPassword
// TODO: PUT /profile/:id -> updateUserProfile
// TODO: DELETE /:id -> deleteUser
```

---

## 3️⃣ Auth (login / register / token)

**repository/auth.repository.ts**

```ts
// TODO: findByEmail(email: string)
// TODO: createUser(data: any)
```

**services/auth.service.ts**

```ts
// TODO: register(data: any) -> hash password + repository.createUser
// TODO: login(email: string, password: string) -> check password + return token
// TODO: verifyToken(token: string)
```

**controllers/auth.controller.ts**

```ts
// TODO: POST /register -> authService.register
// TODO: POST /login -> authService.login
// TODO: GET /me -> authService.verifyToken
```

---

## 4️⃣ Profil

**repository/profil.repository.ts**

```ts
// TODO: findByUserId(userId: string)
// TODO: updateProfile(userId: string, data: any)
```

**services/profil.service.ts**

```ts
// TODO: getProfile(userId: string)
// TODO: updateProfile(userId: string, data: any)
```

**controllers/profil.controller.ts**

```ts
// TODO: GET /me/:userId -> getProfile
// TODO: PUT /me/:userId -> updateProfile
```

---

## 5️⃣ Interest

**repository/interest.repository.ts**

```ts
// TODO: findAll()
// TODO: findById(id: string)
// TODO: createInterest(name: string)
// TODO: linkInterestToProfile(profileId: string, interestId: string)
```

**services/interest.service.ts**

```ts
// TODO: getAllInterests()
// TODO: getInterest(id: string)
// TODO: addInterest(name: string)
// TODO: assignInterest(profileId: string, interestId: string)
```

**controllers/interest.controller.ts**

```ts
// TODO: GET / -> getAllInterests
// TODO: POST / -> addInterest
// TODO: POST /assign -> assignInterest
```

---

## 6️⃣ Utils

**utils/Encrypt.ts**

```ts
// TODO: encrypt(text: string)
```

**utils/Decrypt.ts**

```ts
// TODO: decrypt(encrypted: any)
```

**utils/AppError.ts**

```ts
// TODO: class AppError extends Error { statusCode: number, message: string }
```

**utils/Token.ts**

```ts
// TODO: createToken(payload: any)
// TODO: verifyToken(token: string)
```

---

## 7️⃣ Middleware

**middleware/AuthUserMiddleware.ts**

```ts
// TODO: vérifier token user
```

**middleware/AuthAdminMiddleware.ts**

```ts
// TODO: vérifier token admin
```

**middleware/ErrorHandlerMiddleware.ts**

```ts
// TODO: gérer toutes les erreurs (AppError)
```

---

💡 Ce fichier TODO te permet d’avoir **un plan complet et hiérarchisé** pour ton backend avec Prisma.

Si tu veux, je peux aussi te générer **un diagramme visuel en ASCII** avec toutes les flèches `controller → service → repository → prisma` pour que tu aies un **guide ultra clair et rapide à suivre**.

Veux‑tu que je fasse ça ?
