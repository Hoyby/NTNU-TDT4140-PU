import React, { useContext, useEffect, useState } from 'react'
import Styling from './DinnerView.module.css'
import ParticipantIconOpen from '../../images/person-icon.png'
import ParticipantIconTaken from '../../images/person-icon-filled.png'
import { Context } from '../../store/store'
import axios from 'axios'

export default function DinnerView({ dinner, dinnerHost, rateHost, editDinner, updateDinners }) {
    
    const [hostUser, setHostUser] = useState()

    const { state } = useContext(Context)

    const hasModerateAccess = () => {
        return (state.userData.id === dinner.host || state.userData.is_superuser)
    }

    const handleEdit = () => {
        editDinner(dinner)
    }

    useEffect(() => {
        axios.get(`http://localhost:8000/api/users/${dinnerHost}`, {
            headers: {
                'Authorization': `Token ${state.token}`
            }
        })
        .then( response => {
            setHostUser(response.data)
        })
        .catch( error => {
            console.log(error)
        })
    }, [dinnerHost, state])

    const handleDelete = () => {
        axios.delete(`http://localhost:8000/api/dinners/${dinner.id}/`, {
            headers: {
                'Authorization': `Token ${state.token}`
        }})
        .then( response => {
            updateDinners()
        })
        .catch( error => {
            console.log(error)
        })
    }

    const handleAttend = () => {
        axios.post(`http://localhost:8000/api/attends/`, {
            id: dinner.id,
        }, {
            headers: {
                'Authorization': `Token ${state.token}`
            }
        })
        .then( response => {
            updateDinners()
            
        })
        .catch( error => {
            console.log(error)
        })
    }

    const openHostProfile = () => {
        if (hostUser != null) {
            rateHost(hostUser)
        }
    }

    const participantIcons = () => {
        let participantIcons = []
        for (let i = 0; i < dinner.seatsCapacity; i++) {
            if (i < dinner.seatsTaken) {
                participantIcons.push({
                    id: i,
                    src: ParticipantIconTaken,
                    alt: 'taken'
                })
            }
            else {
                participantIcons.push({
                    id: i,
                    src: ParticipantIconOpen,
                    alt: 'open'
                })
            }
        }
        return (participantIcons)
    }

    const participantIconDisplays = participantIcons().map( icon => (
        <img key={icon.id} className={Styling.Participant} src={icon.src} alt={icon.alt} />
    ))

    const foodTypeStringDisplay = () => {
        if (dinner.isMeat) {
            return 'Meat'
        }
        else if (dinner.isFish) {
            return 'Fish'
        }
        else if (dinner.isVegan) {
            return 'Vegan'
        }
        else {
            return ''
        }
    }

    const allergensStringDisplay = () => {
        let allergenString = ''
        if (dinner.containsGluten) {
            allergenString += 'Gluten, '
        }
        if (dinner.containsMilk) {
            allergenString += 'Milk, '
        }
        if (dinner.containsNuts) {
            allergenString += 'Nuts, '
        }
        if (dinner.containsEgg) {
            allergenString += 'Egg, '
        }
        return allergenString.substring(0, allergenString.length - 2)
    }

    return (
        <div className={Styling.Root}>
            <div className={Styling.ContentBox}>

                <div className={Styling.LeftContent}>
                    <button
                        onClick={openHostProfile}
                        style={{background: 'none', border: 'none'}}>{dinnerHost}</button>
                    <span className={Styling.Title}>
                        {dinner.title}
                    </span>
                    <span>Type: {foodTypeStringDisplay()}</span>
                    <span className={Styling.UnderText}>
                        {dinner.description}
                    </span>
                    
                    <div>
                        <span>Allergens:</span>
                        <br/>
                        <span>
                            {allergensStringDisplay()}
                        </span>
                    </div>
                    <div className={Styling.Participants}>
                        {participantIconDisplays}
                    </div>
                </div>
                <div className={Styling.RightContent}>
                <span className={Styling.UnderText}>
                    {`Date: ${dinner.timePlanned.substring(0, 10)}`}
                    <br />
                    {`Time: ${dinner.timePlanned.substring(11, 16)}`}
                </span>
                {hasModerateAccess()
                ? <div className={Styling.ButtonBox}>
                        <button
                            className={Styling.Button}
                            onClick={handleEdit}>
                                Edit
                        </button>
                        <button
                            className={Styling.Button}
                            onClick={handleDelete}>
                                Delete
                        </button>
                    </div>
                : <button
                        className={Styling.Button}
                        onClick={handleAttend}
                        disabled={dinner.seatsTaken >= dinner.seatsCapacity}>
                            Attend
                    </button>}
                <span className={Styling.UnderText}>
                    {`Total expenses: ${dinner.totalCost},-`}
                </span>
                </div>
            </div>
        </div>
    )
}