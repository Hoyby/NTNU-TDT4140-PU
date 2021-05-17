import React from 'react'
import { cleanup, screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoginForm from '../LoginForm'


describe('LoginForm', () => {

    afterEach(cleanup)

    test('Renders without crashing', () => {
        render(<LoginForm />)
    })
    test('Username changes value on user input', () => {
        render(<LoginForm />)

        expect(screen.queryByTestId('username').value).toBe('')
        userEvent.type(screen.queryByTestId('username'), 'henrik')
        expect(screen.queryByTestId('username').value).toBe('henrik')
    })
    test('Password changes value on user input', () => {
        render(<LoginForm />)

        expect(screen.queryByTestId('password').value).toBe('')
        userEvent.type(screen.queryByTestId('password'), 'testpassword')
        expect(screen.queryByTestId('password').value).toBe('testpassword')
    })
})
