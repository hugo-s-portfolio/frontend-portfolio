import { FC, ReactElement, SyntheticEvent, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// base components
import { MobileMenu } from '@/infrastructure/ui/components'
import { WrapperView } from '@infrastructure/ui/modules/HomeModule'

// selectors
import { menuMobileOptionSelector } from '@/domain/store/contentUseCase'

// actions
import { onLoadOptionMenu } from '@/domain/store/contentUseCase/homeContent/thunk'

// store
import { AppDispatch } from '@domain/store/store'

// styles
import { StyledHomeView } from '@infrastructure/ui/modules/HomeModule/views/HomeView/homeView-styles'

// actions
import { homeMenuSelector, onChangeOption } from '@/domain/store/homeUseCase'

// interfaces
import { AboutMe } from '@infrastructure/ui/modules/HomeModule/interfaces'

export interface HomeViewProps {
    aboutMe: AboutMe
}

const HomeView: FC<HomeViewProps> = ({ aboutMe }): ReactElement => {
    const dispatch: AppDispatch = useDispatch()
    const options = useSelector(menuMobileOptionSelector)
    const { value } = useSelector(homeMenuSelector)

    useEffect(() => {
        dispatch(onLoadOptionMenu({}))
    }, [dispatch])

    const handleChangeOption = (_e: SyntheticEvent<Element, Event>, newValue: number): void => {
        dispatch(onChangeOption(newValue))
    }

    return (
        <StyledHomeView>
            <WrapperView options={options} aboutMe={aboutMe} />
            <MobileMenu options={options} value={value} onChangeValue={handleChangeOption} />
        </StyledHomeView>
    )
}

export default HomeView
