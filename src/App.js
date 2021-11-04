import { useState } from 'react';
import './App.scss';
import FlightsList from './Components/Flights/FlightsList';
import Checkbox from './Components/Header/Checkbox';
import OptionsDropdown from './Components/Header/OptionsDropdown';
import Loader from './Components/Utils/Loader';
import { DateTime } from 'luxon';

//Create an application that will fetch the top 5 flights from Prague to Valencia (Spain) departing the next day.

// time of departure and arrival in local time, name of the origin and departure & price for the flight

//"Valencia", "Barcelona", "Madrid", "Milano" and "Athens"
const arrivals = [
  {
    name: "Valencia",
    airport: "VLC"
  },
  {
    name: "Barcelona",
    airport: "BCN"
  },
  {
    name: "Madrid",
    airport: "MAD"
  },
  {
    name: "Milano",
    airport: "MXP"
  },
  {
    name: "Athens",
    airport: "ATH"
  }
]
//"Prague", "Berlin", "Warsaw" and "Pardubice"
const departures = [
  {
    name: "Prague",
    airport: "PRG"
  },
  {
    name: "Berlin",
    airport: "TXL"
  },
  {
    name: "Warsaw",
    airport: "WAW"
  },
  {
    name: "Pardubice",
    airport: "PED"
  }
];

function App() {
  const affilId = 'data4youcbp202106';
  // const locationsUrl = 'https://api.skypicker.com/locations?term=PRG&locale=en-US&location_types=airport&limit=10&active_only=true&sort=name';
  const [initialLoad, setInitialLoad] = useState(true);
  const [flights, setFlights] = useState([]);
  const [departure, setDeparture] = useState(null);
  const [arrival, setArrival] = useState(null);
  const [loading, setLoading] = useState(false);
  const [direct, setDirect] = useState(false);
  const [limit, setLimit] = useState(5);
  const [departureDate, setDepartureDate] = useState('');

  const formatDate = (date) => {
    return DateTime.fromISO(date).toFormat('d/M/yyyy')
  }


  async function fetchData() {
    setInitialLoad(false);
    setLoading(true);
    const response = await fetch(`https://api.skypicker.com/flights?fly_from=${departure.airport}&fly_to=${arrival.airport}&date_from=${departureDate}&partner=${affilId}&limit=${limit}&direct_flights=${direct}`);
    const data = await response.json();

    data && setFlights(data.data);
    console.log(data.data);
    setLoading(false);
  }

  return (
    <div className="App">
     <header className="header">
       <h1>Search flights</h1>
       <div className="dropdownsWrapper">


         
         <form>
           <input min={DateTime.now().toFormat("yyyy-MM-dd")} className="dateInput" type="date" onChange={(event) => setDepartureDate(formatDate(event.target.value))}/>
         </form>
        <OptionsDropdown 
          itemsList={departures} 
          setSelectedItem={setDeparture} 
          selectedItem={departure} 
          defaultTitle="Origin"
        />
        <OptionsDropdown 
          itemsList={arrivals} 
          setSelectedItem={setArrival} 
          selectedItem={arrival} 
          defaultTitle="Destination"
        />
        <button 
          className="searchButton" 
          onClick={() => departure && arrival && fetchData()}>
            Search
        </button>
        <div className="checkboxWrapper">
          <Checkbox checked={direct} setChecked={setDirect} />
        </div>
        
        </div>
      </header>
     
      <div>
      {!initialLoad && (loading ? <Loader /> : <FlightsList flights={flights} />)}
      </div>
    </div>
  );
}

export default App;
