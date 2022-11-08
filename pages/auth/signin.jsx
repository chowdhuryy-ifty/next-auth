import React, {useState} from "react";
import {signIn, useSession} from "next-auth/react";
import {Box, Button, FormLabel, Heading, Input, VStack, chakra} from "@chakra-ui/react";
import {useRouter} from "next/router";
import {BsGithub, BsGoogle, BsTwitter} from 'react-icons/bs'

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
    if (status === "loading") return <Heading>Checking Authentication .....</Heading>

    if (session) {
        setTimeout(() => {
            push('/')
        }, 1000)

        return <Heading>you are already signed in</Heading>
    }

    const handleOAuthSignIn = (provider) => () => signIn(provider)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!email) return false

        signIn('email', {email, redirect: false})
    }

    return (
        <Box>
            <chakra.form onSubmit={handleSubmit}>
                <FormLabel>Email Address</FormLabel>
                <Input type='email' onChange={(e) => setEmail(e.target.value)}/>

                <Button type='submit' w='100%' my={5}>
                    Login
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