import { User } from "../models/users";
import {UserData} from "../utils/interfaces"

export const getAllUsers=async () => {
    try {
        const users = await User.find({});
        if (!users) throw new Error('No users found');
        return {
            success: true,
            total: users.length,
            users
        };
    } catch (error) {
        throw error;
    }
}
export const getUserById=async (_ : any, args : UserData) => {
    try {
        if (!args.id) throw new Error('No id provided');
        const user = await User.findById(args.id);
        if (!user) throw new Error('No user found');
        return user;
    } catch (error) {
        throw error;
    }
}

export const registerUser=async (_ : any, args : UserData) => {
    try {
        const user = await User.findOne({email: args.email});
        if (user) throw new Error('User already exists');
        const newUser = await User.create({
            username: args.username,
            email: args.email,
            password: args.password,
            name:args.name
        })
        return newUser;
    } catch (error) {
        throw error;
    }
}

export const loginUser=async (_ : any, args : UserData) => {
    try {
        const user = await User.findOne({email: args.email});
        if (!user) throw new Error('User not found');
        const isValid = await user.isValidPassword(args.password);
        if (!isValid) throw new Error('Invalid password');
        return user;
    } catch (error) {
        throw error;
    }
}


export const updateUser= async (_ : any, args : UserData) => {
    try {
        const id = args.id;
        if (!id) throw new Error('No id provided');
        const user = await User.findById(args.id);
        if (!user) throw new Error('User not found');
        const updateUser = await User.findByIdAndUpdate(id, {...args}, {new: true, runValidators: true});
        return updateUser;
    } catch (error) {
        throw error;
    }
}

export const deleteUser= async (_ : any, args : UserData) => {
    try {
        const id = args.id;
        if (!id) throw new Error('No id provided');
        const user = await User.findById(args.id);
        if (!user) throw new Error('User not found');
        const deleteUser = await User.findByIdAndDelete(id);
        return {
            success: true,
            message: 'User deleted successfully',
            id: deleteUser?._id
        };
    } catch (error) {
        throw error;
    }
}
