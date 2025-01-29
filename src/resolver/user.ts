import { deleteUser, getAllUsers, getUserById, loginUser, registerUser, updateUser } from "../Controllers/user.controller";

export const UserResolver ={
  
    Query:{
        users:getAllUsers,
        user:getUserById
    },
    Mutation:{
        registerUser,
        loginUser,
        updateUser,
        deleteUser
    }

}