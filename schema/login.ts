import * as z from "zod"; 
 
const UserLogin = z.object({ 
  email: z.string(),
  password: z.string()
});

const UserRegister = z.object({
    email: z.string(),
    password: z.string(),
    username: z.string()
});