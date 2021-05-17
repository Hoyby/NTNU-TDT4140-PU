import React, { useState, useContext } from 'react'
import Styling from './DinnerForm.module.css'
import axios from 'axios';
import { Context } from '../../store/store';
import { useHistory } from 'react-router-dom';

export default function DinnerForm() {

    let history = useHistory()

    const { state } = useContext(Context)

    const [dinnerInfo, setDinnerInfo] = useState({
        title: '',
        description: '',
        timePlanned: '',
        totalCost: 0,
        seatsCapacity: 0,
        seatsTaken: 0,
        containsGluten: false,
        containsMilk: false,
        containsNuts: false,
        containsEgg: false,
        isMeat: false,
        isFish: false,
        isVegan: false,
        host: state.userData.id
    })

    const handleInputChange = event => {
        const { name, value } = event.target
        setDinnerInfo( prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleCheckboxChange = event => {
        const { name, checked } = event.target
        setDinnerInfo( prevState => ({
            ...prevState,
            [name]: checked
        }))
    }


    const handleNumberInputChange = event => {
        const { name, value } = event.target
        if (!isNaN(value)) {
            let numberValue = parseInt(value)
            setDinnerInfo( prevState => ({
                ...prevState,
                [name]: numberValue
            }))
        }
    }

    const publishDinner = event => {
        event.preventDefault()
        console.log(dinnerInfo)
        axios.post('http://localhost:8000/api/dinners/', dinnerInfo, {
            headers: {
                'Authorization': `Token ${state.token}`
            }
        })
        .then( response => {
            console.log(response)
            history.push('/profile')
            setDinnerInfo({
                title: '',
                description: '',
                timePlanned: '',
                totalCost: 0,
                seatsCapacity: 1,
                seatsTaken: 1,
                containsGluten: false,
                containsMilk: false,
                containsNuts: false,
                containsEgg: false,
                isMeat: false,
                isFish: false,
                isVegan: false,
                host: state.id
            })
        })
        .catch( error => {
            console.log(error)
        })
    }

    return (
        <div className={Styling.FormContainer}>
            <form>
                <h1>Register dinner</h1>
                    <h5>Title</h5>
                    <input 
                        data-testid='title'
                        type='text'
                        name='title'
                        placeholder='Fish' 
                        value={dinnerInfo.title} 
                        onChange={handleInputChange}/>
                    <h5>Seat capacity</h5>
                    <input 
                        data-testid='guests'
                        type='number'
                        name='seatsCapacity' 
                        value={dinnerInfo.seatsCapacity} 
                        onChange={handleNumberInputChange}/>
                    <h5>Description</h5>
                    <textarea 
                        data-testid='description'
                        type='text' 
                        name='description'
                        placeholder='This will be the best dinner ever..' 
                        rows="4" 
                        cols="30" 
                        value={dinnerInfo.description} 
                        onChange={handleInputChange}/>
                    <h5>Total expenses</h5>
                    <input
                        type='number'
                        name='totalCost'
                        value={dinnerInfo.totalCost}
                        onChange={handleNumberInputChange} />
                    <h5>Select time for dinner:</h5>
                    <input 
                        data-testid='dinnerTime'
                        type="datetime-local"
                        id="dinnerTime" 
                        name="timePlanned"
                        value={dinnerInfo.timePlanned}
                        onChange={handleInputChange}
                        />
                <h5>Select allergens</h5>
                    <input type="checkbox" id="gluten" name="containsGluten" checked={dinnerInfo.containsGluten} onChange={handleCheckboxChange}/>
                    <label for="gluten"> Gluten</label>
                    <input type="checkbox" id="milk" name="containsMilk" checked={dinnerInfo.containsMilk} onChange={handleCheckboxChange}/>
                    <label for="milk"> Milk</label>
                    <input type="checkbox" id="nuts" name="containsNuts" checked={dinnerInfo.containsNuts} onChange={handleCheckboxChange}/>
                    <label for="nuts"> Nuts</label>
                    <input type="checkbox" id="egg" name="containsEgg" checked={dinnerInfo.containsEgg} onChange={handleCheckboxChange}/>
                    <label for="egg"> Egg</label>
                <h5>Select food type: </h5>
                    <input type="checkbox" id="meat" name="isMeat" checked={dinnerInfo.isMeat} onChange={handleCheckboxChange}/>
                    <label for="meat"> Meat</label>
                    <input type="checkbox" id="fish" name="isFish" checked={dinnerInfo.isFish} onChange={handleCheckboxChange}/>
                    <label for="fish"> Fish</label>
                    <input type="checkbox" id="vegan" name="isVegan" checked={dinnerInfo.isVegan} onChange={handleCheckboxChange}/>
                    <label for="vegan"> Vegan</label>
                <br />
                <button className={Styling.PublishButton} onClick={publishDinner}>Publish</button>
            </form>

        </div>
    )
}
