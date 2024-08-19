import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import EventCard from './event-card'
import events from "../../helpers/data/events.json"

const Events = () => {
  return (
    <Container>
      <Row className="g-5" xs={1} sm={2} md={3} lg={4}>
       {events.map((item)=>(
         <Col>
        <EventCard {...item}/>
        </Col>
       ))}
    </Row>
    </Container>
  )
}

export default Events
