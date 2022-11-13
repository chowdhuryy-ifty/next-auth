import React, {useState} from "react";
import {Box, Button, chakra, FormLabel, Input} from "@chakra-ui/react";

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [username, setUsername] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        if (password !== password) {
            setMessage(`Password doesn't match`)
        }
    }
    return (
        <Box>
            <p>{message}</p>
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