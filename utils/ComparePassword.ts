import bcrypt from "bcrypt";

export async function ComparePassword(password:string,userpassword:string){
    return await bcrypt.compare(password, userpassword);
}