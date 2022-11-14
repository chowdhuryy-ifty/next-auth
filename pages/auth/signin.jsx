import React, {useState} from "react";
import {signIn, useSession} from "next-auth/react";
import {Box, Button, chakra, FormLabel, Heading, Input, VStack} from "@chakra-ui/react";
import {useRouter} from "next/router";
import {BsGithub, BsGoogle} from 'react-icons/bs'

const providers = [
    {
        name: 'github',
        Icon: BsGithub,
    },
    {
        name: 'google',
        Icon: BsGoogle,
    },
]

const Signin = () => {
    const {data: session, status} = useSession()
    const {push} = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()

    if (status === "loading") return <Heading>Checking Authentication .....</Heading>

    if (session) {
        setTimeout(() => {
            push('/')
        }, 1000)

        return <Heading>you are already signed in</Heading>
    }

    const handleOAuthSignIn = (provider) => () => signIn(provider, {callbackUrl: "http://localhost:3000"})

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!email) return false

        signIn('email', {email, redirect: false})
    }

    const handleEmailandPassword = async (e) => {
        e.preventDefault()
        if (!email && !password) {
            return false
        }
        console.log(email, password)
        const status = await signIn('credentials', {
            redirect: false,
            email: email,
            password: password,
            callbackUrl: "/"
        })
        console.log(status)
        if (status.ok) router.push(status.url)

    }

    return (
        <Box>
            <chakra.form onSubmit={handleEmailandPassword}>
                <FormLabel>Email Address</FormLabel>
                <Input type='email' onChange={(e) => setEmail(e.target.value)}/>
                <FormLabel>Password</FormLabel>
                <Input type='password' onChange={(e) => setPassword(e.target.value)}/>
                <Button type='submit' w='100%' my={5}>
                    Login
                </Button>
                <p>if your new please <Button><a href='/auth/signup'>sign up</a></Button></p>
            </chakra.form>
            <chakra.form onSubmit={handleSubmit}>
                <FormLabel>Email Address</FormLabel>
                <Input type='email' onChange={(e) => setEmail(e.target.value)}/>

                <Button type='submit' w='100%' my={5}>
                    Submit
                </Button>

            </chakra.form>
            <VStack>
                {providers.map(({name, Icon}) => (
                    <Button
                        key={name}
                        leftIcon={<Icon/>}
                        onClick={handleOAuthSignIn(name)}
                        textTransform='uppercase'
                        w='100%'
                    >
                        Sign in with {name}
                    </Button>
                ))}
            </VStack>
        </Box>
    )
}

export default Signin