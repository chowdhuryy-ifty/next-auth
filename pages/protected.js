import {getSession, useSession} from "next-auth/react";
import {Heading} from "@chakra-ui/react";

const Protected = () => {

    const {data: session, loading, status} = useSession()

    if (status === 'unauthenticated') {
        return (
            <Heading>You are unauthenticated</Heading>
        )
    }
    return (
        <div>
            Protected
        </div>
    )
}

export const getServerSideProps = async (ctx) => {
    const session = await getSession(ctx)

    if (!session)
        return {
            redirect: {
                destination: '/auth/signin'
            }
        }
    return {
        props: {session},
    }
}

export default Protected