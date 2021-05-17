import React from 'react'
import Styling from './profileOverview.module.css'

export default function ProfileOverview({ profile }) {


    return (
        <div className={Styling.Root}>
            <div className={Styling.ProfileBox}>
                

                <p className={Styling.text}>
                    <b>Username:</b> {profile.username} 

                </p>

                <p className={Styling.text}>
                    <b>Email:</b> {profile.email}
                </p>

                <p className={Styling.text}>
                <b>First name:</b> {profile.first_name}
                </p>

                <p className={Styling.text}>
                <b>Last name:</b> {profile.last_name}
                </p>

                <p className={Styling.text}>
                <b>Adress:</b> {profile.address}
                </p>

                <p className={Styling.text}>
                <b>Allergies:</b> {profile.allergies}
                </p>
            
            </div>
        </div>
    )
}