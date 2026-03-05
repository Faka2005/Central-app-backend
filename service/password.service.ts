import { passwordRepository } from "../repository/password.repository";
import { encrypt } from "../utils/Encrypt";
import { decrypt } from "../utils/Decrypt";
import { prisma } from "../server";
export const passwordService = {
  createPassword: async (userId:string,data: any) => {
    const encrypted = encrypt(data.password);
    return passwordRepository.create(userId,data)
  },
  getPasswordsForUser: async (userId: string) => {
    const passwords = await passwordRepository.findByUser(userId);
    return passwords?.map((p: { password: string; }) => ({ ...p, password: decrypt(JSON.parse(p.password)) }));
  },
  updatePassword:async (id:string,data:any)=>{
    const updatepasswors=await passwordRepository.updatePassword(id,data)

  },
  delete:async(id:string)=>{
    return prisma.password.delete({
      where:{id},
    })
  }
  
};