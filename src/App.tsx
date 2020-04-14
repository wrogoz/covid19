import React,{useEffect,useState} from 'react';
import styled from 'styled-components';
import axios from 'axios';

const App=()=> {

const [activeCases,setActiveCases] = useState('loading...');
const [inHospital,setInHospital] = useState('N/A');
const [criticalCases,setCriticalCases] = useState('loading...');
const [totalDeaths,setTotalDeaths] = useState('loading...');
const [totalCases,setTotalCases] = useState('loading...');
  useEffect(() => {
    console.log('use effect status: ok')
    axios({
      "method":"GET",
      "url":"https://coronavirus-monitor.p.rapidapi.com/coronavirus/latest_stat_by_country.php",
      "headers":{
      "content-type":"application/octet-stream",
      "x-rapidapi-host":"coronavirus-monitor.p.rapidapi.com",
      "x-rapidapi-key":"b60f46bea6msh7bbd55a04c4c2cdp1ebab7jsncb634d69134a"
      },"params":{
      "country":"Poland"
      }
      })
      .then((response)=>{
        console.log(response.data.latest_stat_by_country[0])
        setActiveCases(response.data.latest_stat_by_country[0].active_cases);
        setCriticalCases(response.data.latest_stat_by_country[0].serious_critical);
        setTotalDeaths(response.data.latest_stat_by_country[0].total_deaths);
        setTotalCases(response.data.latest_stat_by_country[0].total_cases);
      })
      .catch((error)=>{
        console.log(error)
      })
  }, [])

  return (
    <Container >
      <div><p>Zakażeni: {activeCases}</p> </div>
      <div><p>Hospitalizowani: {inHospital} </p> </div>
      <div><p>Stan krytyczny: {criticalCases}</p> </div>
      <div><p>Zgony: {totalDeaths} </p></div>
      <div>Łącznie: {totalCases}</div>
    </Container>
  );
}

  const Container = styled.div`

    height:100vh;
    width:100%;

    display:flex;
    flex-direction:column;

    div{
      display:flex;
      align-items:center;
      justify-content:center;
      width:100%;
      height:20%;
      border-bottom:1px dotted grey ;


      p{
        padding:0;
        margin:0;
      }
    }
  `
export default App;
