import { Col, Row, Form } from "react-bootstrap";
import React, { useEffect, useState, Component } from "react";



function FormComponent () {
    const [searchCountry, setSearchCountries] = useState("")
    return (
    <Form>
        <Form.Group controlId="formGroupSearch">
          <Form.Control
            type="text"
            placeholder="Search for countries"
            onChange={e => setSearchCountries(e.target.value)}
          />
        </Form.Group>
      </Form>
            

    )
}

export default FormComponent



