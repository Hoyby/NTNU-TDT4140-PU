import React from 'react'
import { cleanup, screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NavButton from '../NavButton'

describe('Navigation button', () => {
    
    afterEach(cleanup)

    test('Renders without crashing', () => {
        render(<NavButton />)
    })

    test('Renders correctly when selected', () => {
        render(<NavButton location='Discover' path='Discover' />)
        
        expect(screen.queryByTestId('buttonSelected')).toBeTruthy()
        expect(screen.queryByTestId('button')).toBeFalsy()
    })

    test('Renders correctly when not selected', () => {
        render(<NavButton location='Create' path='Discover' />)
        
        expect(screen.queryByTestId('buttonSelected')).toBeFalsy()
        expect(screen.queryByTestId('button')).toBeTruthy()
    })

    test('Renders with correct text', () => {
        render(<NavButton location='Discover' path='Discover' pathname='Discover' />)

        expect(screen.queryByTestId('buttonSelected')).toHaveTextContent('Discover')
    })

})