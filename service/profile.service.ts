import {profileRepository} from "../repository/profile.repository";

export const profileService={
    findProfileById:(id:string)=>profileRepository.findProfileById(id),
    findByUserId:(id:string)=>profileRepository.findByUserId(id)
}