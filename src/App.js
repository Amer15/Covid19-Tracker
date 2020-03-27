import React,{ Component, Fragment } from 'react';
import axios from 'axios';

import Card from './components/card';
import './App.css';

class App extends Component{

   state = {
      stats : {},
      countries:[],
      error:false
   }


  componentDidMount() {
    this.getAllStats();
    this.getAllCountriesStats();
  }

  getAllStats = () => {
    axios.get('https://covid19.mathdro.id/api')
    .then( response => {
      // console.log(response.data);
    const { confirmed, recovered, deaths } = response.data;
    const Obj = {
      confirmed: confirmed.value,
      recovered: recovered.value,
      deaths: deaths.value
    };
    this.setState({ stats: Obj })
    })
    .catch( error => {
      // console.log(error);
      this.setState({ error: true });
    })
  }

  getAllCountriesStats = () => {
    let fetchedCountries = [];
    axios.get('https://covid19.mathdro.id/api/countries')
    .then( response => {
      const { countries } = response.data;
      for(let key in countries) {
        // console.log(countries[key].name);
        fetchedCountries.push(countries[key].name)//Pushing Strings of all countryNames
      };
      this.setState({ countries: fetchedCountries});
    })
    .catch( error => {
      console.log(error);
    })
  }

  renderCountries = () => {
   return  this.state.countries.map( (country, i) => {
    return <option key={i}>{country}</option>
  })
  };

  getCountryData = (e) => {
    if(e.target.value === 'WorldWide') {
      return this.getAllStats()
    };

    axios.get(`https://covid19.mathdro.id/api/countries/${e.target.value}`)
    .then( response => {
      const { confirmed, recovered, deaths } = response.data;

      const countryData = {
        confirmed: confirmed.value,
        recovered: recovered.value,
        deaths: deaths.value
      };
      this.setState({ stats: countryData });
    })
    .catch( error => {
      console.log(error);
      const ErrorData = {
        confirmed: "No data found",
        recovered: "No data found",
        deaths: "No data found"
      };
      this.setState({ stats: ErrorData });
    })
  }

  

  render() {
    let Cards = (
       <Fragment>
        <Card stat="Confirmed" value={this.state.stats.confirmed} />
        <Card stat="Recovered" value={this.state.stats.recovered} />
        <Card stat="Deaths" value={this.state.stats.deaths} />
      </Fragment>
    );

    if(this.state.error) {
      Cards = <p>Something went wrong!</p>
    }
    
    return(
     <div className="App">
        <div className="Nav">
          <h1>Covid19 - Tracker</h1>
        </div>
        <div className="section">
          <select onChange={this.getCountryData}>
            <option>WorldWide</option>
            {this.renderCountries()}
          </select>

          <div className="container">
            {Cards}
          </div> 
        </div>
     </div>
    );
  }
}

export default App;

