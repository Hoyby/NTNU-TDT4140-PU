import React, { useState } from 'react'
import LoginForm from '../loginForm/LoginForm'
import Styling from './LoginPopUp.module.css'
import RegisterUserForm from '../registerUserForm/RegisterUserForm'

export default function PopUp({ initialIsUserCreated, togglePopUp, tokenReceived }) {

    const [isUserCreated, setIsUserCreated] = useState(initialIsUserCreated)

    const toggleUserCreated = event => {
        event.preventDefault()
        setIsUserCreated(!isUserCreated)
    }

    return (
        <div className={Styling.Root}>
            {isUserCreated 
                ? <LoginForm tokenReceived={tokenReceived} changeForm={toggleUserCreated}/>
                : <RegisterUserForm tokenReceived={tokenReceived} changeForm={toggleUserCreated} closeForm={togglePopUp}/>}
        </div>
    )
}
