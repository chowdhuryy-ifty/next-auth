import React from "react";
import {Button} from "@chakra-ui/react";
import {useRouter} from "next/router";

const some = () => {
    const {push, asPath} = useRouter()
    const handleSignIn = () => push(`/auth/signin?callbackUrl=${asPath}`)

    return (
        <div>
            SOME
            <br/>
            <Button onClick={handleSignIn}>Sign in</Button>
        </div>
    )
}

export default some