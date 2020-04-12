import React, { useEffect, useState, Component } from "react";

import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import styles from "./styles/styles.css"
import Columns from "react-columns"
import { getQueriesForElement } from "@testing-library/dom";
import FormComponent from "./components/Form.js"
import { Col, Row, Form } from "react-bootstrap";



function App() {
  //to store api data
  const [latest, setLatest] = useState ([])
  const [results, setResults] = useState([]);
  const [searchCountries, setSearchCountries] = useState("")


  useEffect(() => {
    axios
      .all([
        axios.get("https://corona.lmao.ninja/all"),
        axios.get("https://corona.lmao.ninja/countries")
      ])
      .then(responseArr => {
        setLatest(responseArr[0].data);
        setResults(responseArr[1].data)
      })
      .catch(err => {
        console.log(err);
      });
  }, []);


  //convert the updated date from MS into a an int format 
   const date = new Date(parseInt(latest.updated))
  //  convert int into a string
   const lastUpdated = date.toString()

   //function to filter the country based on search
    const filteredCountry = results.filter(item => {
      return  searchCountries !== "" ? 
      item.country.toLowerCase().includes(searchCountries) || item.country.toUpperCase().includes(searchCountries): item
    })


   const countries = filteredCountry.map((data, i) => {
  
    return (
      <Card
      key= {i}
        bg="light"
        text ="dark"
        className="text-center"
        >
        <Card.Img variant="top" src ={data.countryInfo.flag}></Card.Img>
        <Card.Body>
          <Card.Title>{data.country}</Card.Title>
          <Card.Text>Brave Souls Fighting {data.cases}</Card.Text>
          <Card.Text>Lost but never forgotten {data.deaths}</Card.Text>
          <Card.Text>Blessed & Recovered {data.recovered}</Card.Text>
          <Card.Text> impacted today {data.todayCases}</Card.Text>
          <Card.Text>Lost today but never forgotten {data.todayDeaths}</Card.Text>
          <Card.Text>Active {data.active}</Card.Text>
          <Card.Text>Tests done {data.tests}</Card.Text>
          <Card.Text>Critical {data.critical}</Card.Text>
        </Card.Body>
        
        </Card>
        

      )
    })


      var queries = [{
        columns: 2,
        query: 'min-width: 500px'
      }, {
        columns: 3,
        query: 'min-width: 1000px'
      }];


  return (
      <div> 
    <CardDeck>
    <Card className="cases card" bg="light" >
      <Card.Body>
        <Card.Title>Brave Souls Fighting</Card.Title>
        <Card.Text>
          {latest.cases}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
      <small className="update">latest update: {lastUpdated}</small>
      </Card.Footer>
    </Card>
    <Card className="casesLost" bg="light">
      <Card.Body>
        <Card.Title>Lost but never forgotten</Card.Title>
        <Card.Text>
        {latest.deaths}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
      <small className="update">latest update: {lastUpdated}</small>
      </Card.Footer>
    </Card>
    <Card className="recovered" bg="light" >
      <Card.Body>
        <Card.Title>Blessed Recovered Souls</Card.Title>
        <Card.Text>
        {latest.recovered}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <small className="update">latest update: {lastUpdated}</small>
      </Card.Footer>
    </Card>
  </CardDeck>
  <Form>
        <Form.Group controlId="formGroupSearch">
          <Form.Control
            type="text"
            placeholder="Search for countries"
            onChange={e => setSearchCountries(e.target.value)}
          />
        </Form.Group>
      </Form>

  <Columns queries={queries}>{countries}</Columns>
  </div>
  )
}

export default App;
