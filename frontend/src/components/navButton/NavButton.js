import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import Styling from './NavButton.module.css'
import { Context } from '../../store/store'
import { logout } from '../../store/actions/actions'


export default function NavButton({ path, pathname, location }) {
    
    const { dispatch } = useContext(Context)

    let history = useHistory()

    const goToPath = event => {
        if (pathname === 'Log out') {
            dispatch(logout())
        }
        event.preventDefault()
        history.push(path)
    }

    const isSelected = (location === path)

    if (isSelected) {
        return (
            <button
                className={Styling.ButtonSelected}
                onClick={goToPath}
                data-testid='buttonSelected'>
                    {pathname}
            </button>
        )
    }
    else {
        return (
            <button
                className={Styling.Button}
                onClick={goToPath}
                data-testid='button'>
                    {pathname}
            </button>
        )
    }
}
