import React from 'react'
import { cleanup, screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import RegisterUserForm from '../RegisterUserForm'


describe('RegisterUserForm', () => {

    afterEach(cleanup)

    test('Renders without crashing', () => {
        render(<RegisterUserForm />)
    })
    test('First name changes value on user input', () => {
        render(<RegisterUserForm />)

        expect(screen.queryByTestId('firstName').value).toBe('')
        userEvent.type(screen.queryByTestId('firstName'), 'henrik')
        expect(screen.queryByTestId('firstName').value).toBe('henrik')
    })
    test('Last name changes value on user input', () => {
        render(<RegisterUserForm />)

        expect(screen.queryByTestId('lastName').value).toBe('')
        userEvent.type(screen.queryByTestId('lastName'), 'fevang')
        expect(screen.queryByTestId('lastName').value).toBe('fevang')
    })
    test('Email changes value on user input', () => {
        render(<RegisterUserForm />)

        expect(screen.queryByTestId('email').value).toBe('')
        userEvent.type(screen.queryByTestId('email'), 'henrik.fevang@example.com')
        expect(screen.queryByTestId('email').value).toBe('henrik.fevang@example.com')
    })
    test('Password changes value on user input', () => {
        render(<RegisterUserForm />)

        expect(screen.queryByTestId('password').value).toBe('')
        userEvent.type(screen.queryByTestId('password'), 'hello123')
        expect(screen.queryByTestId('password').value).toBe('hello123')
    })
    // test('Checkbox changes value on user input', () => {
    //     render(<RegisterUserForm />)

    //     expect(screen.queryByTestId('checkbox')).not.toBeChecked()
    //     userEvent.click(screen.queryByTestId('checkbox'))
    //     expect(screen.queryByTestId('checkbox')).toBeChecked()
    //     userEvent.click(screen.queryByTestId('checkbox'))
    //     expect(screen.queryByTestId('checkbox')).not.toBeChecked()
    // })
})
