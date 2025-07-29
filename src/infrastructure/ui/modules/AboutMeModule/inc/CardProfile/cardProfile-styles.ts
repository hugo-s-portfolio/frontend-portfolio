import tw, { styled } from 'twin.macro'
import Image from 'next/image'

export const StyledHomeImage2 = styled.img`
    ${tw`w-52 h-52 rounded-[50%] border-4 border-solid border-dark absolute`}
    ${tw`bottom-[-80px] left-[calc(50% - 104px)]`}
`

export const StyledHomeImage = styled(Image)`
    border: 1px solid red;
    width: 13rem;
    height: 13rem;
    border-radius: 50%;
    border-width: 4px;
    --tw-border-opacity: 1;
    border-color: rgb(17 34 34 / var(--tw-border-opacity));
    position: absolute;
    bottom: -80px;
    left: calc(50% - 104px);
`
