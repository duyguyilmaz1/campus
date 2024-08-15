import React from 'react'
import { Nav } from 'react-bootstrap'
import { config } from '../../helpers/config';
import {FaFacebook, FaTwitter, FaLinkedin, FaGithub, FaYoutube, FaInstagram} from "react-icons/fa"

const SocialMenu = (props) => {
  return (
    <>
    <Nav {...props}>
          <Nav.Link href={config.contact.socialMedia.facebook}  target="_black">
            <FaFacebook/> Facebook</Nav.Link>
   <Nav.Link href={config.contact.socialMedia.twitter}  target="_black">
            <FaTwitter/> Twitter</Nav.Link>
   <Nav.Link href={config.contact.socialMedia.linkedin}  target="_black">
            <FaLinkedin/> Linkedin</Nav.Link>
   <Nav.Link href={config.contact.socialMedia.instagram}  target="_black">
            <FaInstagram/> Instagram</Nav.Link>
   <Nav.Link href={config.contact.socialMedia.github}  target="_black">
            <FaGithub/> Github</Nav.Link>
  <Nav.Link href={config.contact.socialMedia.youtube}  target="_black">
            <FaYoutube/> Youtube</Nav.Link>
  
   </Nav> 
   </>
  )
}

export default SocialMenu
