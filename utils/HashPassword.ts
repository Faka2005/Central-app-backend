import bcrypt from "bcrypt";

export async function HashPassword(password:string){
    return await bcrypt.hash(password,10)
}