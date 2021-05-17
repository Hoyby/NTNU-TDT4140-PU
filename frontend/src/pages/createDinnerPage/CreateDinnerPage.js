import React, { useState } from 'react'
import DinnerForm from '../../components/dinnerForm/DinnerForm'
import Navbar from '../../components/navbar/Navbar'
import PageHeader from '../pageHeader/PageHeader'
import Styling from './CreateDinnerPage.module.css'

export default function CreateDinnerPage({ tokenReceived }) {

    return (
        <div>
            <Navbar tokenReceived={tokenReceived} />
            <PageHeader headerText='Create' slogan='Create a meal for others to join!'/>
            <DinnerForm />
        </div>
    )
}
