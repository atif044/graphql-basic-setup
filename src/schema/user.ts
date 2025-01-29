import {buildSchema} from "graphql"

export const userGraphQLSchema=buildSchema(
    `
    type User {
        id:String!
        username:String!
        email:String!
        password:String!
        name:String!
    } 

    type Query {
        users: AllUsersResponse!
        user(id: String!):User!
        }
    type AllUsersResponse {
        success: Boolean!
        total:Int!
        users:[User!]!
        }
    type Mutation {
        registerUser(username:String!,email:String!,password:String!,name:String!):User!
        loginUser(email: String!, password: String!): User!
        updateUser(id: String!, username: String, email: String, password: String,name:String!): User!
        deleteUser(id: String!): deleteResponse!    
    }
    type deleteResponse {
        success: Boolean!
        message: String!
        id: String!
    }
    `
)