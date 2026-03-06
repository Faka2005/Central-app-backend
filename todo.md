Voici **ton fichier TODO complété avec les routes**.
Je garde le même format pour que tu puisses **le copier directement dans `TODO.md`**.

---

# 📝 Backend TODO

---

# 1️⃣ Password

## repository/password.repository.ts

```ts
// TODO: findByUser(userId: string)
// TODO: findAll(limit?: number, skip?: number)
// TODO: create(userId: string, data: any)
// TODO: updatePassword(id: string, data: any)
// TODO: delete(id: string)
```

## services/password.service.ts

```ts
// TODO: createPassword(userId: string, data: any) -> repository.create + encrypt
// TODO: getPasswordsForUser(userId: string) -> repository.findByUser + decrypt
// TODO: modifyPassword(id: string, data: any) -> repository.updatePassword + encrypt si password
// TODO: deletePassword(id: string) -> repository.delete
```

## controllers/password.controller.ts

```ts
// TODO: POST /password/:userId -> createPassword
// TODO: GET /password/user/:userId -> getPasswordsForUser
// TODO: PUT /password/:id -> modifyPassword
// TODO: DELETE /password/:id -> deletePassword
```

## routes/password.routes.ts

```ts
// TODO: router.post("/:userId", AuthUser, passwordController.create)
// TODO: router.get("/user/:userId", AuthUser, passwordController.getAllForUser)
// TODO: router.put("/:id", AuthUser, passwordController.update)
// TODO: router.delete("/:id", AuthUser, passwordController.delete)
```

---

# 2️⃣ User

## repository/user.repository.ts

```ts
// TODO: findById(id: string)
// TODO: findAll()
// TODO: deleteOne(id: string)
// TODO: updateRole(id: string, role: string)
// TODO: resetPassword(id: string, newPassword: string)
// TODO: updateProfile(userId: string, data: any)
```

## services/user.service.ts

```ts
// TODO: getUserById(id: string)
// TODO: getAllUsers()
// TODO: updateUserRole(id: string, role: string)
// TODO: resetUserPassword(id: string, newPassword: string)
// TODO: updateUserProfile(userId: string, data: any)
// TODO: deleteUser(id: string)
```

## controllers/user.controller.ts

```ts
// TODO: GET /users/:id -> getUserById
// TODO: GET /users -> getAllUsers
// TODO: PUT /users/role/:id -> updateUserRole
// TODO: PUT /users/password/:id -> resetUserPassword
// TODO: PUT /users/profile/:id -> updateUserProfile
// TODO: DELETE /users/:id -> deleteUser
```

## routes/user.routes.ts

```ts
// TODO: router.get("/", AuthAdmin, userController.getAllUsers)
// TODO: router.get("/:id", AuthUserOrAdmin, userController.getUserById)
// TODO: router.put("/role/:id", AuthAdmin, userController.updateUserRole)
// TODO: router.put("/password/:id", AuthUserOrAdmin, userController.resetUserPassword)
// TODO: router.put("/profile/:id", AuthUser, userController.updateUserProfile)
// TODO: router.delete("/:id", AuthAdmin, userController.deleteUser)
```

---

# 3️⃣ Auth (login / register / token)

## repository/auth.repository.ts

```ts
// TODO: findByEmail(email: string)
// TODO: createUser(data: any)
```

## services/auth.service.ts

```ts
// TODO: register(data: any) -> hash password + repository.createUser
// TODO: login(email: string, password: string) -> check password + return token
// TODO: verifyToken(token: string)
```

## controllers/auth.controller.ts

```ts
// TODO: POST /auth/register -> authService.register
// TODO: POST /auth/login -> authService.login
// TODO: GET /auth/me -> authService.verifyToken
```

## routes/auth.routes.ts

```ts
// TODO: router.post("/register", authController.register)
// TODO: router.post("/login", authController.login)
// TODO: router.get("/me", AuthUser, authController.me)
```

---

# 4️⃣ Profil

## repository/profil.repository.ts

```ts
// TODO: findByUserId(userId: string)
// TODO: updateProfile(userId: string, data: any)
```

## services/profil.service.ts

```ts
// TODO: getProfile(userId: string)
// TODO: updateProfile(userId: string, data: any)
```

## controllers/profil.controller.ts

```ts
// TODO: GET /profil/me/:userId -> getProfile
// TODO: PUT /profil/me/:userId -> updateProfile
```

## routes/profil.routes.ts

```ts
// TODO: router.get("/me/:userId", AuthUser, profilController.getProfile)
// TODO: router.put("/me/:userId", AuthUser, profilController.updateProfile)
```

---

# 5️⃣ Interest

## repository/interest.repository.ts

```ts
// TODO: findAll()
// TODO: findById(id: string)
// TODO: createInterest(name: string)
// TODO: linkInterestToProfile(profileId: string, interestId: string)
```

## services/interest.service.ts

```ts
// TODO: getAllInterests()
// TODO: getInterest(id: string)
// TODO: addInterest(name: string)
// TODO: assignInterest(profileId: string, interestId: string)
```

## controllers/interest.controller.ts

```ts
// TODO: GET /interests -> getAllInterests
// TODO: POST /interests -> addInterest
// TODO: POST /interests/assign -> assignInterest
```

## routes/interest.routes.ts

```ts
// TODO: router.get("/", interestController.getAllInterests)
// TODO: router.post("/", AuthAdmin, interestController.addInterest)
// TODO: router.post("/assign", AuthUser, interestController.assignInterest)
```

---

# 6️⃣ Service

## repository/service.repository.ts

```ts
// TODO: findById(id: number)
// TODO: findAll()
// TODO: createService(data: any)
// TODO: updateService(id: number, data: any)
// TODO: updateEtat(id: number, etat: boolean)
// TODO: deleteService(id: number)
```

## services/service.service.ts

```ts
// TODO: getAllServices()
// TODO: getServiceById(id: number)
// TODO: createService(data: any)
// TODO: updateService(id: number, data: any)
// TODO: updateEtat(id: number, etat: boolean)
// TODO: deleteService(id: number)
```

## controllers/service.controller.ts

```ts
// TODO: GET /services -> getAllServices
// TODO: GET /services/:id -> getServiceById
// TODO: POST /services -> createService
// TODO: PUT /services/:id -> updateService
// TODO: PATCH /services/:id/etat -> updateEtat
// TODO: DELETE /services/:id -> deleteService
```

## routes/service.routes.ts

```ts
// TODO: router.get("/", serviceController.getAll)
// TODO: router.get("/:id", serviceController.getOne)
// TODO: router.post("/", AuthAdmin, serviceController.create)
// TODO: router.put("/:id", AuthUserOrAdmin, serviceController.updateService)
// TODO: router.patch("/:id/etat", AuthUserOrAdmin, serviceController.updateEtat)
// TODO: router.delete("/:id", AuthAdmin, serviceController.delete)
```

---

# 7️⃣ Utils

## utils/Encrypt.ts

```ts
// TODO: encrypt(text: string)
```

## utils/Decrypt.ts

```ts
// TODO: decrypt(encrypted: any)
```

## utils/AppError.ts

```ts
// TODO: class AppError extends Error
// TODO: ajouter statusCode
// TODO: message personnalisé
```

## utils/Token.ts

```ts
// TODO: createToken(payload: any)
// TODO: verifyToken(token: string)
```

---

# 8️⃣ Middleware

## middleware/AuthUserMiddleware.ts

```ts
// TODO: récupérer token dans header
// TODO: vérifier token
// TODO: attacher user dans req
// TODO: next()
```

## middleware/AuthAdminMiddleware.ts

```ts
// TODO: vérifier token
// TODO: vérifier role === admin
// TODO: next()
```

## middleware/AuthUserOrAdminMiddleware.ts

```ts
// TODO: vérifier token
// TODO: autoriser user OU admin
```

## middleware/ErrorHandlerMiddleware.ts

```ts
// TODO: intercepter toutes les erreurs
// TODO: gérer AppError
// TODO: renvoyer statusCode + message
```

---

