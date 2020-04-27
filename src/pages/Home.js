import React, { useEffect, useState, Component } from "react";

import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import styles from "../styles/styles.css"
import Columns from "react-columns"
import { getQueriesForElement } from "@testing-library/dom";
import FormComponent from "../components/Form.js"
import { Col, Row, Form } from "react-bootstrap";
import ReactGA from "react-ga"
import NumberFormat from 'react-number-format';
import Spinner from 'react-bootstrap/Spinner'
import * as ReactBootStrap from "react-bootstrap"


import Navbar from "../components/Nav"




function Home() {
  //to store api data
  const [latest, setLatest] = useState ([])
  const [results, setResults] = useState([]);
  const [searchCountries, setSearchCountries] = useState("")
  const [loading, setLoading] = useState(false);


  useEffect(() => {

    ReactGA.initialize('UA-163972670-1');
    ReactGA.pageview(window.location.pathname + window.location.search);
 


    axios
      .all([
        axios.get("https://corona.lmao.ninja/v2/all"),
        axios.get("https://corona.lmao.ninja/v2/countries")
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
  // convert int into a string
   const lastUpdated = date.toString()

   //function to filter the country based on search
   const filteredCountry = results.filter(item => {
    let country = item.country.toLowerCase()
    let search = searchCountries.toLowerCase()
    if (search) {
      return search === country.slice(0, search.length) ? true : false
    } else {
      return true
    }
  })


   const countries = filteredCountry.map((data, i) => {
  
    return (
      <div>
      <Card
      key= {i}
        bg="light"
        text ="dark"
        className="text-center"
        >
        <Card.Img variant="top" src ={data.countryInfo.flag}></Card.Img>
        <Card.Body>
          <Card.Title>{data.country}</Card.Title>
          
          {/* <Card.Text>Brave Souls Fighting {data.cases}</Card.Text> */}
          <Card.Text> 
          <NumberFormat value={data.cases} displayType={'text'} thousandSeparator={true}/> Cases
        </Card.Text>

        <Card.Text> 
          <NumberFormat value={data.deaths} displayType={'text'} thousandSeparator={true}/> Lives Lost
        </Card.Text>

        <Card.Text> 
          <NumberFormat value={data.recovered} displayType={'text'} thousandSeparator={true}/> Blessed & Recovered
        </Card.Text>


        <Card.Text> 
          <NumberFormat value={data.todayCases} displayType={'text'} thousandSeparator={true}/> impacted today
        </Card.Text>

        
        <Card.Text> 
          <NumberFormat value={data.todayDeaths} displayType={'text'} thousandSeparator={true}/>Lives lost today
        </Card.Text>

          {/* <Card.Text> {data.todayDeaths} Lives lost today </Card.Text> */}
          {/* <NumberFormat value={data.todayDeaths} displayType={'text'} thousandSeparator={true}/> */}

          <Card.Text>
          <NumberFormat value={data.active} displayType={'text'} thousandSeparator={true}/> Active 
          </Card.Text>


          <Card.Text>
          <NumberFormat value={data.tests} displayType={'text'} thousandSeparator={true}/> Tests done 
          </Card.Text>


          <Card.Text>
          <NumberFormat value={data.critical} displayType={'text'} thousandSeparator={true}/> Critical 
          </Card.Text>


        </Card.Body>
        {loading ? (results) : (
         <ReactBootStrap.Spinner animation="grow" />
        
    )}
        </Card>
        </div>

      )
    })


      var queries = [{
        columns: 2,
        query: 'min-width: 500px'
      }, {
        columns: 3,
        query: 'min-width: 1000px'
      }];

      // //track users interaction 
      // record user interactions that don't trigger a change in URL.
      const HandleSearchBar = () => {
        ReactGA.event({
          category: 'Search Bar',
          action: 'Clicked on search bar',
          label: "Home",
        });
      }

  return (
      <div> 
    <CardDeck>
    <Card className="cases card" >
      <Card.Body>
        <Card.Title>Brave Souls Fighting</Card.Title>
        {/* <Card.Text>
          {latest.cases}
        </Card.Text> */}
        <NumberFormat value={latest.cases} displayType={'text'} thousandSeparator={true}
 />
      </Card.Body>
      <Card.Footer>
      <small className="update">latest update: {lastUpdated}</small>
      </Card.Footer>
    </Card>
    <Card className="casesLost">
      <Card.Body>
        <Card.Title>Lost but never forgotten</Card.Title>
        <NumberFormat value={latest.deaths} displayType={'text'} thousandSeparator={true}
 />
      </Card.Body>
      <Card.Footer>
      <small className="update">latest update: {lastUpdated}</small>
      </Card.Footer>
    </Card>
    <Card className="recovered"  >
      <Card.Body>
        <Card.Title>Blessed Recovered Souls</Card.Title>
        <NumberFormat value={latest.recovered} displayType={'text'} thousandSeparator={true}
 />
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
            placeholder="Search your country"
            onChange={e => setSearchCountries(e.target.value)}
            //search what user searches for GA
            onClick={HandleSearchBar}
          />
        </Form.Group>
      </Form>

  <Columns queries={queries}>{countries}</Columns>
  </div>
  )
}

export default Home;
