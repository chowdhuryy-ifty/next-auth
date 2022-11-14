import NextAuth from "next-auth";
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from 'next-auth/providers/credentials'
import connectMongo from "../../../database/conn";
import CustomUsers from "../../../models/userModel";
import {compare} from "bcrypt";
import LinkedInProvider from "next-auth/providers/linkedin";

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
        LinkedInProvider({
            clientId: process.env.LINKEDIN_CLIENT_ID,
            clientSecret: process.env.LINKEDIN_CLIENT_SECRET
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
    // adapter: MongoDBAdapter(clientPromise)
    secret: process.env.SECRET
})
