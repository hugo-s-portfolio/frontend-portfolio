import { StyledDefaultCtr } from '@/infrastructure/ui/components/inc/Containers/DefaultCtr/defaultCtr-styles'

export interface DefaultCtrProps {
    children: React.ReactNode
}

const DefaultCtr: React.FC<DefaultCtrProps> = ({ children }) => (
    <StyledDefaultCtr>{children}</StyledDefaultCtr>
)

export default DefaultCtr
