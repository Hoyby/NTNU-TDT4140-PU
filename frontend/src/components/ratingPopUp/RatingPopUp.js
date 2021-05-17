import axios from 'axios'
import Styling from './RatingPopUp.module.css'
import React, { useContext, useState } from 'react'
import { Context } from '../../store/store'
import ProfileOverview from '../profileOverview/profileOverview'


export default function RatingPopUp({ user, togglePopUp }) {

    const [showRatingForm, setShowRatingForm] = useState(false)
    const [rating, setRating] = useState({
        id: user.id,
        feedback: '',
        value: 0,
    })

    const { state } = useContext(Context)

    const openRatingForm = () => {
        setShowRatingForm(true)
    }

    const submitRating = event => {
        event.preventDefault()
        axios.post(`http://localhost:8000/api/rating/`, rating, {
            headers: {
                'Authorization': `Token ${state.token}`
            }
        })
        .then(response => {
            console.log(response)
            togglePopUp()
        })
        .catch(error => {
            console.log(error)
        })
    }

    return (
        <div>
            {showRatingForm
            ? <form className={Styling.Root}>
                    <h2>Rating</h2>
                    <label>Feedback:</label>
                    <textarea value={rating.feedback} onChange={event => setRating(prevState => ({
                        ...prevState,
                        feedback: event.target.value
                    }))}/>
                    <label>Score:</label>
                    <select value={rating.value} onChange={event => setRating(prevState => ({
                        ...prevState,
                        value: event.target.value
                    }))}>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                    </select>
                    <div className={Styling.ButtonContainer}>
                        <button onClick={submitRating}>Sumbit</button>
                        <button onClick={togglePopUp}>Close</button>
                    </div>
              </form>
            : <div className={Styling.UserInfoContainer}>
                <ProfileOverview profile={user} />
                <button className={Styling.OpenRatingButton} onClick={openRatingForm}>Give rating</button>
              </div>}
        </div>
    )
}