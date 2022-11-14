import React, {useState} from "react";
import {Box, Button, chakra, FormLabel, Input} from "@chakra-ui/react";
import {useRouter} from "next/router";

const Signup = () => {
    const router = useRouter()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [username, setUsername] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (password !== password2) {
            setMessage(`Password doesn't match`)
            return null
        }
        const options = {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username: username, email: email, password: password})
        }

        await fetch(`http://localhost:3000/api/auth/signup`, options)
            .then(res => res.json())
            .then((data) => {
                if (data) router.push(`/auth/signin`)
            })
    }
    return (
        <Box>
            <p style={{color: "red"}}>{message}</p>
            <chakra.form onSubmit={handleSubmit}>
                <FormLabel>username</FormLabel>
                <Input type='username' onChange={(e) => setUsername(e.target.value)}/>
                <FormLabel>Email Address</FormLabel>
                <Input type='email' onChange={(e) => setEmail(e.target.value)}/>
                <FormLabel>Password</FormLabel>
                <Input type='password' onChange={(e) => setPassword(e.target.value)}/>
                <FormLabel>Repeat Password</FormLabel>
                <Input type='password' onChange={(e) => setPassword2(e.target.value)}/>
                <Button type='submit' w='100%' my={5}>
                    SignUP
                </Button>
            </chakra.form>
        </Box>
    )
}

export default Signup