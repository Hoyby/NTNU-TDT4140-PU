import React, { createContext } from 'react'
import { cleanup, screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import DinnerForm from '../DinnerForm'

const Context = createContext()

const state = {
    userData: {
        id: 1
    }
}

describe('DinnerForm', () => {

    test('Dummytest', () => {
        
    })
    // afterEach(cleanup)

    // test('Renders without crashing', () => {
    //     render(
    //     <Context.Provider value={{ state }}>
    //         <DinnerForm />
    //     </Context.Provider>)
    // })
    // test('Title changes value on user input', () => {
    //     render(
    //         <Context.Provider value={{ state }}>
    //         <DinnerForm />
    //     </Context.Provider>)

    //     expect(screen.queryByTestId('title').value).toBe('')
    //     userEvent.type(screen.queryByTestId('title'), 'Taco Party')
    //     expect(screen.queryByTestId('title').value).toBe('Taco Party')
    // })
    // test('description changes value on user input', () => {
    //     render(
    //         <Context.Provider value={{ state }}>
    //         <DinnerForm />
    //     </Context.Provider>)

    //     expect(screen.queryByTestId('description').value).toBe('')
    //     userEvent.type(screen.queryByTestId('description'), 'Noe')
    //     expect(screen.queryByTestId('description').value).toBe('Noe')
    // })
    // test('Guests changes value on user input', () => {
    //     render(
    //         <Context.Provider value={{ state }}>
    //         <DinnerForm />
    //     </Context.Provider>)

    //     expect(screen.queryByTestId('guests').value).toBe('1')
    //     userEvent.type(screen.queryByTestId('guests'), '3')
    //     expect(screen.queryByTestId('guests').value).toBe('13')
    // })

})