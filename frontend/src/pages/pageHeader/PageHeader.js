import React from 'react'
import Styling from './PageHeader.module.css'

export default function PageHeader({ headerText, slogan}) {

    return (
        <div className={Styling.Header}>
            <div className={Styling.HeaderTextBox}>
                <span className={Styling.HeaderText}>{headerText}</span>
                <span className={Styling.Slogan}>{slogan}</span>
            </div>
        </div>
    )
}