import NextAuth from "next-auth";
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from "next-auth/providers/google";
import clientPromise from "../../../database/connectDB";
import {MongoDBAdapter} from "@next-auth/mongodb-adapter"
import EmailProvider from "next-auth/providers/email";
import CredentialsProvider from 'next-auth/providers/credentials'
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

    ],
    pages: {
        signIn: '/auth/signin',
    },
    adapter: MongoDBAdapter(clientPromise)
})
