import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import PageHeader from '../pageHeader/PageHeader'
import Navbar from '../../components/navbar/Navbar'
import ProfileOverview from '../../components/profileOverview/profileOverview'
import { Context } from '../../store/store'
import DinnerView from '../../components/DinnerView/DinnerView'
import DinnerEditPopUp from '../../components/dinnerEditPopUp/DinnerEditPopUp'
import Styling from './profilePage.module.css'
import RatingPopUp from '../../components/ratingPopUp/RatingPopUp'


export default function ProfilePage() {

    const [hostingDinners, setHostingDinners] = useState([])
    const [updateDinners, setUpdateDinners] = useState(false)
    const [dinnerToEdit, setDinnerToEdit] = useState()
    const [showEditPopUp, setShowEditPopUp] = useState(false)
    const [userToRate, setUserToRate] = useState()
    const [showRatingPopUp, setShowRatingPopUp] = useState(false)
    const [attendingDinners, setAttendingDinners] = useState([])

    const { state } = useContext(Context)

    const handleUpdateDinners = () => {
        setUpdateDinners(!updateDinners)
    }

    const toggleEditPopUp = dinner => {
        setDinnerToEdit(dinner)
        setShowEditPopUp(!showEditPopUp)
    }

    const toggleRatingPopUp = user => {
        if (user != null) {
            setUserToRate(user)
        }
        setShowRatingPopUp(!showRatingPopUp)
    }

    useEffect(() => {
        axios.get('http://localhost:8000/api/dinners/', {
            headers: {
                'Authorization': `Token ${state.token}`
            }
        })
        .then( response => {
            const dinnersIHost = []
            response.data.forEach(dinner => {
                if (dinner.host === state.userData.id) {
                    dinnersIHost.push(dinner)
                }
            });
            setHostingDinners(dinnersIHost)
        })
        .catch( error => {
            console.log(error)
        })

        axios.get('http://localhost:8000/api/dinners?myDinners=True', {
            headers: {
                'Authorization': `Token ${state.token}`
            }
        })
        .then( responseAttends => {
            setAttendingDinners(responseAttends.data)

        })
        .catch( error => {
            console.log(error)
        })
        
    }, [state, updateDinners])

    const hostingDinnersView = hostingDinners.map( dinner => (
        <DinnerView
            key={dinner.id}
            dinnerHost={dinner.host}
            dinner={dinner}
            rateHost={toggleRatingPopUp}
            editDinner={toggleEditPopUp}
            updateDinners={handleUpdateDinners}/>
    ))

    const dinnersToAttendView = attendingDinners.map( dinner => (
        <DinnerView
            key={dinner.id}
            dinnerHost={dinner.host}
            dinner={dinner}
            rateHost={toggleRatingPopUp}
            editDinner={toggleEditPopUp}
            updateDinners={handleUpdateDinners}/>
    ))

    function PopUp() {
        if (showEditPopUp) {
            return <DinnerEditPopUp
                        dinner={dinnerToEdit}
                        updateDinner={handleUpdateDinners}
                        togglePopUp={toggleEditPopUp} />
        }
        else if (showRatingPopUp) {
            return <RatingPopUp 
                        user={userToRate}
                        togglePopUp={toggleRatingPopUp}/>
        }
        else {
            return null
        }
    }

    return (
        <div>
            <Navbar/>
            <PageHeader headerText='My Profile' slogan='Your profile and dinners!'/>
            <div className={Styling.ProfileBox}>
            <div className={Styling.ProfilHeader}>Profile details</div>
            <ProfileOverview profile={state.userData}/>
            </div>
            <div className={Styling.DinnerBox}>
                <div className={Styling.Header}>Dinners you host</div>
                {hostingDinnersView}
            </div>
            <PopUp />
            <div>
                <div className={Styling.Header}>Dinners you attend</div>
                {dinnersToAttendView}
            </div>
        </div>
    )
}
