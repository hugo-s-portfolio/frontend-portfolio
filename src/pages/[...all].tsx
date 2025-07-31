import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async () => {
    return {
        redirect: {
            destination: '/aboutme',
            permanent: false,
        },
    }
}

export default function CatchAll() {
    return null
}
