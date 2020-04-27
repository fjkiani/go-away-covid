import React from 'react'
import Navbar from "./Nav"
import { Link } from "react"
import styles from "../styles/styles.css"
import { DiGithub } from "react-icons/di";
import { IoLogoLinkedin } from "react-icons/io";
import { IoLogoGithub } from "react-icons/io";
import { IoLogoInstagram } from "react-icons/io";
import { IoLogoYoutube } from "react-icons/io";


function About() {
    return (
        <div className="about">
            <div className="heading">
            <h4>This is project started as a tutorial on YouTube by  Hong Ly. Fahad Kiani followed along and deployed his version. We are working together on with a goal to help everyone around the world have access to COVID-19 data.    </h4>
            <br></br>
            <h4>This is an open source project. If you would like to contribute, you can find the github link above </h4>
            <br></br>
            <div class="aboutParagraph">
            <br></br>
            <hr></hr>
            <h4>You can find Fahad Kiani on <br></br>
                <a href="https://www.linkedin.com/in/fjkiani/" target="_blank"><IoLogoLinkedin/></a> 
                <a href="https://www.github.com/fjkiani/" target="_blank"><IoLogoGithub/></a> 
                <a href="https://www.instagram.com/fjkiani/" target="_blank"><IoLogoInstagram/></a> 
            </h4>
            <br></br> <hr></hr>
            <h4>Hong LY on <br></br>
                <a href="https://www.linkedin.com/in/hong-ly/" target="_blank"><IoLogoLinkedin/></a> 
                <a href="https://www.github.com/lyhd" target="_blank"><IoLogoGithub/></a> 
                <a href="https://www.youtube.com/channel/UCjJHir6dFiHSOe5EayRoSMw/" target="_blank"><IoLogoYoutube/></a> 
            </h4>
        </div>
        
         </div>
        </div>
    )
}

export default About;