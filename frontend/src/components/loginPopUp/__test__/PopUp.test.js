import React from 'react'
import { cleanup, screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoginPopUp from '../LoginPopUp'

describe('PopUp', () => {

    afterEach(cleanup)

    test('Renders without crashing', () => {
        render(<LoginPopUp />)
    })

    test('Renders correctly with registerform', () => {
        render(<LoginPopUp initialIsUserCreated={false} />)
        expect(screen.queryByTestId('registerFormContainer')).toBeTruthy()
        expect(screen.queryByTestId('loginFormContainer')).toBeFalsy()

        userEvent.click(screen.queryByTestId('changeForm'))
        expect(screen.queryByTestId('registerFormContainer')).toBeFalsy()
        expect(screen.queryByTestId('loginFormContainer')).toBeTruthy()
    })

    test('Renders correctly with loginform', () => {
        render(<LoginPopUp initialIsUserCreated={true} />)
        expect(screen.queryByTestId('registerFormContainer')).toBeFalsy()
        expect(screen.queryByTestId('loginFormContainer')).toBeTruthy()

        userEvent.click(screen.queryByTestId('changeForm'))
        expect(screen.queryByTestId('registerFormContainer')).toBeTruthy()
        expect(screen.queryByTestId('loginFormContainer')).toBeFalsy()
    })
})
