import NextAuth from "next-auth";
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from "next-auth/providers/google";
import clientPromise from "../../../database/connectDB";
import {MongoDBAdapter} from "@next-auth/mongodb-adapter"
import EmailProvider from "next-auth/providers/email";
import CredentialsProvider from 'next-auth/providers/credentials'
import connectMongo from "../../../database/conn";
import CustomUsers from "../../../models/userModel";
import {compare} from "bcrypt";

export default NextAuth({

    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        EmailProvider({
            server: {
                host: process.env.EMAIL_SERVER_HOST,
                port: process.env.EMAIL_SERVER_PORT,
                auth: {
                    user: process.env.EMAIL_SERVER_USER,
                    pass: process.env.EMAIL_SERVER_PASSWORD
                }
            },
            from: process.env.EMAIL_FROM,
            subject: "User Email Signin"
        }),
        CredentialsProvider({
            name: "Credentials",
            async authorize(credentials, req) {
                connectMongo().catch(error => {
                    "Connection failed"
                })

                // check user existance
                const result = await CustomUsers.findOne({email: credentials.email})
                if (!result) {
                    throw new Error("No user found with this email please signup")
                }
                //compare
                const checkPassword = await compare(credentials.password, result.password)
                if (!checkPassword || result.email !== credentials.email) {
                    throw new Error("Username and password doesn't match")
                }
                return result
            }
        })

    ],
    pages: {
        signIn: '/auth/signin',
    },
    adapter: MongoDBAdapter(clientPromise)
})
