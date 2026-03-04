import bcrypt from "bcrypt";

export async function ComparePassword(password:string,userpassword:string){
    await bcrypt.compare(password, userpassword);
}