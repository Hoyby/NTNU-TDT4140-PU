import React, { useState, useContext } from 'react'
import axios from 'axios'
import Styling from './LoginForm.module.css'
import { Context } from '../../store/store'
import { useHistory } from 'react-router-dom'
import { login_success } from '../../store/actions/actions'

export default function LoginForm({ changeForm }) {

    const [userInfo, setUserInfo] = useState({
        username: '',
        password: ''
    })

    let history = useHistory()

    const { dispatch} = useContext(Context)


    const handleChange = e => {
        const { name, value } = e.currentTarget;
        setUserInfo(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleLogIn = event => {
        event.preventDefault()
        axios.post('http://localhost:8000/auth/', userInfo)
            .then( response => {
                axios.get(`http://localhost:8000/api/users/${response.data.id}/`)
                .then( response_user => {
                    dispatch(login_success(response.data.token, response_user.data))
                    history.push('/dashboard')
                })
            })
            .catch( error => {
                console.log(error)
            })
    }

    return (
        <div className={Styling.Form} data-testid="loginFormContainer">
            <h1 className={Styling.Header}>Login</h1>
            <form>
                <p>
                    <input 
                        type='text'
                        name='username'
                        data-testid='username'
                        placeholder='Username'
                        value={userInfo.username}
                        onChange={handleChange} />
                </p>
                <p>
                    <input
                        type='password'
                        name='password'
                        data-testid='password'
                        placeholder='Password'
                        value={userInfo.password}
                        onChange={handleChange} />
                </p>
                <button onClick={handleLogIn} data-testid='login'>Log in</button>
                <button onClick={changeForm} data-testid='changeForm'>Don't have a user yet?</button>
            </form>
        </div>
    )
}