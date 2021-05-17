import React from 'react'
import { cleanup, screen, render } from '@testing-library/react'
import Context from './store/store'
import App from './App'


describe('App', () => {

    afterEach(cleanup)

    test('Component renders without crashing', () => {
        render(
        <Context>
            <App />
        </Context>)
    })

    test('Renders login page when token is not present', () => {
        render(
        <Context>
            <App />
        </Context>)
    })
})
