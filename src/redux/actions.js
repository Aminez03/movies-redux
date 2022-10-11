import { ADD, DELETE, EDIT, RATING } from "./actionsTypes"

export const handleDelete=(id)=>{
    return{
        type:DELETE,
        payload:id,
    }
}
export const handleEdit=(editmovie)=>{
    return{
        type:EDIT,
        payload:editmovie,
    }
}

export const handleAdd=(newmovie)=>{
        return{
            type:ADD,
            payload:newmovie
    
        }
}
