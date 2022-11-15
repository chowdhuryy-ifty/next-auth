import React, {useState} from "react";
import {signIn, useSession} from "next-auth/react";
import {Box, Button, chakra, FormLabel, Heading, HStack, IconButton, Input, VStack} from "@chakra-ui/react";
import {useRouter} from "next/router";
import {BsGithub, BsGoogle, BsLinkedin} from 'react-icons/bs'
import Logo from "../../Components/Logo";

const providers = [
    {
        name: 'github',
        Icon: BsGithub,
    },
    {
        name: 'google',
        Icon: BsGoogle,
    },
    {
        name: 'linkedin',
        Icon: BsLinkedin
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
            <Logo/>
            <br/>
            <chakra.form onSubmit={handleEmailandPassword}>
                <FormLabel>Email Address</FormLabel>
                <Input type='email' onChange={(e) => setEmail(e.target.value)}/>
                <br/>
                <FormLabel>Password</FormLabel>
                <Input type='password' onChange={(e) => setPassword(e.target.value)}/>
                <Button type='submit' w='100%' my={5} variant='outline'>
                    Login
                </Button>
                <p>If your new please <Button colorScheme='blue'><a href='/auth/signup'>Sign up</a></Button></p>
            </chakra.form>
            <br/>
            <HStack>
                {providers.map(({name, Icon}) => (
                    <IconButton
                        key={name}
                        icon={<Icon/>}
                        onClick={handleOAuthSignIn(name)}
                        textTransform='uppercase'
                        w='100%'
                    >

                    </IconButton>
                ))}
            </HStack>
        </Box>
    )
}

export default Signin