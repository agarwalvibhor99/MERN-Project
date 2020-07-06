import React from 'react'
import "../styles.css"
import {API} from "../backend"
import Base from './Base'


export default function Home() {
    console.log("API IS", API)
    return (
        <Base>
            <h1> Hello Front End </h1>
        </Base>
    )
}
