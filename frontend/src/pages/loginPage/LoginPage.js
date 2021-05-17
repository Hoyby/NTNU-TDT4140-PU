import React, { useEffect, useRef, useState } from 'react'
import PopUp from '../../components/loginPopUp/LoginPopUp'
import PageHeader from '../pageHeader/PageHeader'
import Styling from './LoginPage.module.css'

export default function LoginPage({ tokenReceived }) {

    const [showPopUp, setShowPopUp] = useState(false)
    const [isUserRegistered, setIsUserRegistered] = useState()

    const isFirstRender = useRef(true)
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false
            return
        }
        console.log(isUserRegistered)
        setShowPopUp(true)
    }, [isUserRegistered])

    const openRegisterForm = () => {
        setIsUserRegistered(false)
    }

    const openLoginForm = () => {
        setIsUserRegistered(true)
    }

    return (
        <div className={Styling.Root}>
            <PageHeader headerText='Food Cohort' slogan='Enjoy a meal with company!'/>
            <div className={Styling.ButtonContainer}>
                <button className={Styling.Button} onClick={openRegisterForm}>Register</button>
                <button className={Styling.Button} onClick={openLoginForm}>Login</button>
            </div>
            {showPopUp
            ? <PopUp tokenReceived={tokenReceived} hidden={!showPopUp} initialIsUserCreated={isUserRegistered}/>
            : null
            }
        </div>
    )
}
