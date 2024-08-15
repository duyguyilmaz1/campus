import React from 'react'
import { Nav } from 'react-bootstrap'
import { config } from '../../helpers/config';
import {FaPhone, FaEnvelope, FaAddressCard} from "react-icons/fa"

const ContactMenu = (props) => {
  return (
    <>
    <Nav {...props}>
          <Nav.Link href={`tel:${config.contact.phone1}`}  target="_black">
            <FaPhone/> {config.contact.phone1}</Nav.Link>   
          <Nav.Link href={`tel:${config.contact.phone2}`}  target="_black">
            <FaPhone/> {config.contact.phone2}</Nav.Link>
          <Nav.Link href={`mail:${config.contact.email}`}  target="_black">
            <FaEnvelope/> {config.contact.email}</Nav.Link>    
          <Nav.Link href={config.contact.mapURL}  target="_black">
            <FaAddressCard/> {config.contact.address}</Nav.Link>
   </Nav> 
   </>
  )
}

export default ContactMenu
