import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import Styling from './DiscoverPage.module.css'
import PageHeader from '../pageHeader/PageHeader'
import Navbar from '../../components/navbar/Navbar'
import Filter from '../../components/filter/Filter'
import DinnerView from '../../components/DinnerView/DinnerView'
import { Context } from '../../store/store'
import DinnerEditPopUp from '../../components/dinnerEditPopUp/DinnerEditPopUp'
import RatingPopUp from '../../components/ratingPopUp/RatingPopUp'



export default function DiscoverPage() {

    const [dinners, setDinners] = useState([])
    const [updateDinners, setUpdateDinners] = useState(false)
    const [dinnerToEdit, setDinnerToEdit] = useState()
    const [showEditPopUp, setEditShowPopUp] = useState(false)
    const [userToRate, setUserToRate] = useState()
    const [showRatingPopUp, setShowRatingPopUp] = useState(false)

    const { state } = useContext(Context)

    const handleDinnersUpdate = () => {
        setUpdateDinners(!updateDinners)
    }

    const toggleEditPopUp = dinner => {
        setDinnerToEdit(dinner)
        setEditShowPopUp(!showEditPopUp)
    }

    const toggleRatingPopUp = user => {
        if (user != null) {
            setUserToRate(user)
        }
        setShowRatingPopUp(!showRatingPopUp)
    }

    const getFilteredDinners = filterString => {
        axios.get(`http://localhost:8000/api/dinners${filterString}`, {
            headers: {
                'Authorization': `Token ${state.token}`
            }
        })
        .then( response => {
            setDinners(response.data)
        })
        .catch( error => {
            console.log(error)
        })
    }

    useEffect(() => {
        axios.get('http://localhost:8000/api/dinners/', {
            headers: {
                'Authorization': `Token ${state.token}`
            }
        })
        .then( response => {
            setDinners(response.data)
        })
        .catch( error => {
            console.log(error)
        })
    }, [state, updateDinners])

    const dinnerViews = dinners.map( dinner => {
        if (dinner.host === state.userData.id) {
            return null
        }
        else {
            return <DinnerView
                        key={dinner.id}
                        dinnerHost={dinner.host}
                        rateHost={toggleRatingPopUp}
                        dinner={dinner}
                        editDinner={toggleEditPopUp}
                        updateDinners={handleDinnersUpdate}/>
        }
    })

    function PopUp() {
        if (showEditPopUp) {
            return <DinnerEditPopUp
                        dinner={dinnerToEdit}
                        updateDinner={handleDinnersUpdate}
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
        <div className={Styling.Root}>
            <Navbar />
            <PageHeader headerText='Discover' slogan='Discover meals to join!'/>
            <div className={Styling.FilterBox}>
                <Filter updateDinners={getFilteredDinners}/>
            </div>
            <div className={Styling.DinnerBox}>
                {dinnerViews}
            </div>
            <PopUp />
        </div>
    )
}
