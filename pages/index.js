import React from "react";
import {Button, Grid, Heading} from "@chakra-ui/react";
import {getSession, signOut, useSession} from "next-auth/react";
import {useRouter} from "next/router";

export default function Home() {
    const {data: session} = useSession()
    // console.log(session['user'])
    //if we don't want to redirect user to another url after signout
    const handleSignOut = () => signOut({redirect: false})

    // if we want to redirect user to another url
    const {push, asPath} = useRouter()
    console.log(session)

    // const handleSignOut = async () => {
    //     const data = await signOut({redirect: false, callbackUrl: '/some'})
    //     push(data.url)
    // }

    const handleSignIn = () => push(`/auth/signin?callbackUrl=${asPath}`)

    return (<Grid placeItems='center' gridRowGap='1rem'>
        <Heading>I am learning NextAUTH</Heading>
        {session ? (<>
            <Heading>You are signed in as {session['user']['name']}</Heading>
            {/*<img src={session['user']['image']} alt="new"/>*/}
            <div></div>
            <div>email: {session['user']['email']}</div>
            <Button onClick={handleSignOut}>sign out</Button>
        </>) : (<>
                <Heading>You are not signed in</Heading>
                <Button onClick={handleSignIn}>Sign In</Button>
            </>

        )}
    </Grid>)
}

export async function getServerSideProps({req}) {
    const session = await getSession({req})

    if (!session) {
        return {
            redirect: {
                destination: '/auth/signin',
                permanent: false
            }
        }
    }
    console.log('jkj', session)
    return {
        props: {session}
    }
}

