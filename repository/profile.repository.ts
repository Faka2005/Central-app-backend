import { prisma } from "../config/prisma";
import {  Prisma } from "@prisma/client";



export const profileRepository={
    findProfileById:(id:string)=>{
        return prisma.profil.findUnique({
            where:{userId:id}
        })
    },
    findByUserId:(id:string)=>{
        return prisma.profil.findUnique({
            where:{id}
        })
    },
    update:(id:string,data: {
        firstname?: string
        lastname?: string
        bio?: string,
        interests?: string[]
        niveau?: string
        campus?: string
        isTutor?: boolean })=>{

    },
    delete:(id:string)=>{},
    create:(id:string,data:any)=>{}
}