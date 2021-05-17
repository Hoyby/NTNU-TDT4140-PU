import React, { useState } from 'react'
import Styling from './Filter.module.css'

export default function Filter({ updateDinners }) {

    const [filterValues, setFilterValues] = useState({
        gluten: false,
        milk: false,
        nuts: false,
        egg: false,
        meat: false,
        fish: false,
        vegan: false,
    })
    
    const updateFilterValues = event => {
        const { name, checked } = event.target
        setFilterValues( prevstate => ({
            ...prevstate,
            [name]: checked
        }))
    }

    const applyFiltering = () => {
        let filterString = '?'
        if (filterValues.gluten) {
            filterString += 'gluten&'
        }
        if (filterValues.milk) {
            filterString += 'milk&'
        }
        if (filterValues.nuts) {
            filterString += 'nuts&'
        }
        if (filterValues.egg) {
            filterString += 'eggs&'
        }
        if (filterValues.meat) {
            filterString += 'meat&'
        }
        if (filterValues.fish) {
            filterString += 'fish&'
        }
        if (filterValues.vegan) {
            filterString += 'vegan&'
        }
        (filterString.length < 2)
            ? filterString = ''
            : filterString = filterString.substring(0, filterString.length - 1)
        updateDinners(filterString)
    }
  
    return (
        <div className={Styling.FormContainer}>
            <div className={Styling.AllergenContainer}>
                <h4>Allergens: </h4>
                <label for="gluten"> Gluten </label>
                <input type="checkbox" id="gluten" name="gluten" onChange={updateFilterValues}/>
                <label for="milk"> Milk </label>
                <input type="checkbox" id="milk" name="milk" onChange={updateFilterValues}/>
                <label for="nuts"> Nuts </label>
                <input type="checkbox" id="nuts" name="nuts" onChange={updateFilterValues}/>
                <label for="egg"> Egg </label>
                <input type="checkbox" id="egg" name="egg" onChange={updateFilterValues}/>
            </div>
            <div className={Styling.FoodTypeContainer}>
                <h4> Food type: </h4>
                <label for="meat"> Meat </label>
                <input type="checkbox" id="meat" name="meat" onChange={updateFilterValues}/>
                <label for="fish"> Fish </label>
                <input type="checkbox" id="fish" name="fish" onChange={updateFilterValues}/>
                <label for="vegan"> Vegan </label>
                <input type="checkbox" id="vegan" name="vegan" onChange={updateFilterValues}/>
            </div>
            <button onClick={applyFiltering}>Apply</button>
        </div>
    )
}
