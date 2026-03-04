import {prisma} from "../server"

export const userRepository = {
  findById: (id: string) => {
    return prisma.user.findUnique({
      where: { id },
      include: { profil: true },
    });
  },
  findAll:()=>{
    return prisma.user.findMany()
  },
  deleteOne:(id:string)=>{
    return prisma.user.delete({
        where:{id}
    })
  },
  updateRole:(id:string,role:string)=>{
    return prisma.user.update({
        where:{id},
        data:{role}
    })
  },
  resetpassword:(id:string,newpassword:string)=>{
    return prisma.user.update({
        where:{id},
        data:{password :newpassword}
    })
  },
  updateProfile: (userId: string, data: any) => {
    return prisma.profil.update({
      where: { userId },
      data,
    });
  },
  
};