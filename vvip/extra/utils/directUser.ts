
import { store } from "../state"
import { User } from "../typings/structures"

export const AccessUser=()=>{
    const state=store.getState()
    const {currentUser}=state as any
    const {user}=currentUser as any
   
    return user as User
}

/*

 Special Report
 Simple Report
 Training
 Rules and laws
 Archive
 

*/