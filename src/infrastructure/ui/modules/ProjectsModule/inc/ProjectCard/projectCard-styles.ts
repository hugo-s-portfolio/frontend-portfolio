import tw, { styled } from 'twin.macro'

export const StyledProjectCard = styled.div`
    ${tw`h-full`}

    .MuiCard-root {
        ${tw`h-full flex flex-col`}
    }

    .MuiCardContent-root {
        ${tw`flex-1`}
    }
`
