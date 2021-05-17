import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import NavButton from '../navButton/NavButton'
import Styling from './Navbar.module.css'
import BurgerIcon from '../../images/burger-icon.png'

export default function Navbar() {

    let location = useLocation()
    let history = useHistory()

    const goToDashboard = () => {
        history.push('/dashboard')
    }

    return (
        <div className={Styling.Root}>
            <button className={Styling.DashboardIconBox} onClick={goToDashboard}>
                <img className={Styling.DashboardIcon} src={BurgerIcon} alt='Burger' />
            </button>
            <NavButton path={'/create'} pathname={'Create'} location={location.pathname} />
            <NavButton path={'/discover'} pathname={'Discover'} location={location.pathname} />
            <NavButton path={'/profile'} pathname={'My Profile'} location={location.pathname} />
            <NavButton path={'/'} pathname={'Log out'} location={location.pathname} />
        </div>
    )
}