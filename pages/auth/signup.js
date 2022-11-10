import React, {useState} from "react";
import {Box, Button, FormLabel, Input, chakra} from "@chakra-ui/react";

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
    }
    return (
        <Box>
            <chakra.form onSubmit={handleSubmit}>
                <FormLabel>Email Address</FormLabel>
                <Input type='email' onChange={(e) => setEmail(e.target.value)}/>
                <FormLabel>Password</FormLabel>
                <Input type='password' onChange={(e) => setPassword(e.target.value)}/>
                <Button type='submit' w='100%' my={5}>
                    SignUP
                </Button>
            </chakra.form>
        </Box>
    )
}

export default Signup