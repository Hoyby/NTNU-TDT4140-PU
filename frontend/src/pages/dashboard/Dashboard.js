import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import PageHeader from '../pageHeader/PageHeader'
import Styling from './Dashboard.module.css'

export default function Dashboard({ tokenReceived }) {

    return (
        <div className={Styling.Root}>
            <Navbar tokenReceived={tokenReceived}/>
            <PageHeader headerText='Food Cohort' slogan='Enjoy a meal with company!'/>
            <div className={Styling.ContactInformation}>
                <div  className={Styling.ContactInformationText}>
                    <h2>
                        For advertisement, please contact us on:
                    </h2>
                    <p>
                        admin@food-cohort.com
                    </p>
                </div>
            </div>
        </div>
    )
}