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
        console.log(`Cannot connect to API: ${error}`)
      })
  }, [])

  return (
    <Container >
      <div><p>Zakażeni: {activeCases}</p> </div>
      <div><p>Hospitalizowani: {inHospital} </p> </div>
      <div><p>Stan krytyczny: {criticalCases}</p> </div>
      <div><p>Zgony: {totalDeaths} </p></div>
      <div><p>Łącznie: {totalCases}</p></div>
      <Signature>created by wrogoz</Signature>
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
      &:nth-of-type(2n+1){
        background-color:#696758;
      }
      &:nth-of-type(2n){
        background-color:#45484B;
      }

      p{
        color:#EEE6AB;
        font-size: 1.5rem;
        text-transform:uppercase;
        padding:0;
        margin:0;
      }
    }
  `
  const Signature = styled.p`
    position:absolute;
    bottom: 60px;
    right: -44px;
    transform: rotate(-90deg);
    color: #C5BC8E;
    font-size: 0.8rem;
  `
export default App;
