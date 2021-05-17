import React, { useState, useContext } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import Styling from './RegisterUserForm.module.css'
import { register_profile } from '../../store/actions/actions'
import { Context } from '../../store/store'

export default function RegisterUserForm({ changeForm }) {

    let history = useHistory()

    const { dispatch } = useContext(Context)

    const [userInfo, setUserInfo] = useState( {
        username: '',
        email: '',
        first_name: '',
        last_name: '',
        password: '',
        repPassword: '',
        address: '',
    })

    const [regFeedback, setregFeedback] = useState("")


    // 'POST' for creating a user using the registration form.
    const registerUser = event => {
        event.preventDefault()
        axios.post('http://localhost:8000/api/users/', userInfo)
            .then( response => {
                console.log(response)
                dispatch(register_profile())
                history.push('/dashboard')
                window.alert("user successfully created.")

            })
            .catch( error => {
                console.log(error)
                setregFeedback(error.toString())
                console.log(regFeedback)

            })
    }

    const handleInputChange = event => {
        const { name, value } = event.target
        setUserInfo( prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    return (
        <div data-testid="registerFormContainer" className={Styling.FormContainer}>
            <h1 className={Styling.Header}>Register</h1>
            <form>
                <p>
                    <input 
                        type ='text'
                        data-testid = 'userName'
                        name ='username'
                        placeholder='Username' 
                        value = {userInfo.username} 
                        onChange = {handleInputChange}/>
                </p>
                <p>
                    <input 
                        type='password'
                        data-testid = 'password'
                        name='password'
                        placeholder='Password' 
                        value={userInfo.password} 
                        onChange={handleInputChange}/>
                </p>
                <p>
                    <input 
                        type='password'
                        data-testid = 'repPassword'
                        name='repPassword'
                        placeholder='Repeat password' 
                        value={userInfo.repPassword} 
                        onChange={handleInputChange}/>
                </p>
                
                <p>
                    <input 
                        type='text'
                        data-testid = 'email'
                        name='email'
                        placeholder='Email' 
                        value={userInfo.email} 
                        onChange={handleInputChange}/>
                </p>
                <p>
                    <input 
                        type='text'
                        data-testid = 'firstName'
                        name='first_name'
                        placeholder='First name' 
                        value={userInfo.first_name} 
                        onChange={handleInputChange}/>
                </p>
                <p>
                    <input 
                        type='text'
                        data-testid = 'lastName'
                        name='last_name'
                        placeholder='Last name' 
                        value={userInfo.last_name} 
                        onChange={handleInputChange}/>
                </p>
                <p>
                    <input 
                        type='text'
                        data-testid = 'address'
                        name='address'
                        placeholder='Address' 
                        value={userInfo.address} 
                        onChange={handleInputChange}/>
                </p>
                <p style={{color: "red"}}> {regFeedback} </p>

                <button onClick={registerUser}>Confirm</button>
                <button onClick={changeForm} data-testid='changeForm'>Already have a user?</button>
            </form>
        </div>
    )
}
