import React, {useState} from "react";
import {Box, Button, chakra, FormControl, FormLabel, Input} from "@chakra-ui/react";
import {useRouter} from "next/router";
import {withGoogleReCaptcha} from "react-google-recaptcha-v3"
import Logo from "./Logo";


const SignupForm = ({googleReCaptchaProps}) => {
    const router = useRouter()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [username, setUsername] = useState('')
    const [message, setMessage] = useState('')
    const [isShown, setIsShown] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const {executeRecaptcha} = googleReCaptchaProps;
            if (!executeRecaptcha) {
                console.log("Execute recaptcha not yet available");
                return;
            }
            // console.log(executeRecaptcha)
            const token = await executeRecaptcha('token')
            console.log(token)
            if (password !== password2) {
                setMessage(`Password doesn't match`)
                return null
            }

            const options = {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({username: username, email: email, password: password, token: token})
            }

            await fetch(`http://localhost:3000/api/auth/signup`, options)
                .then(res => res.json())
                .then((data) => {
                    if (data) router.push(`/auth/signin`)
                })
        } catch (error) {
            console.log(error.message)
        }

    }


    const togglePassword = () => {
        setIsShown((isShown) => !isShown);
    }


    return (
        <Box>
            <Logo/>
            <p style={{color: "red"}}>{message}</p>
            <br/>
            <chakra.form onSubmit={handleSubmit}>
                <FormControl isRequired>
                    <FormLabel>Username</FormLabel>
                    <Input type='username' onChange={(e) => setUsername(e.target.value)}/>
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Email Address</FormLabel>
                    <Input type='email' onChange={(e) => setEmail(e.target.value)}/>
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Password</FormLabel>
                    <Input type={isShown ? "text" : "password"} minLength="6"
                           onChange={(e) => setPassword(e.target.value)}/>

                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Repeat Password</FormLabel>
                    <Input type={isShown ? "text" : "password"} minLength="6"
                           onChange={(e) => setPassword2(e.target.value)}/>
                    <input
                        id="checkbox"
                        type="checkbox"
                        checked={isShown}
                        onChange={togglePassword}
                    />
                    &nbsp;
                    <label htmlFor="checkbox"> Show password </label>
                </FormControl>
                <Button type='submit' w='100%' my={5}>
                    Signup
                </Button>
            </chakra.form>
            <p>Already have an account? <Button colorScheme='blue'><a href='/auth/signin'>Sign in</a></Button></p>
        </Box>
    )
}

export default withGoogleReCaptcha(SignupForm)