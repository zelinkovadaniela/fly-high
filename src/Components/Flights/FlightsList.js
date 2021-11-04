import Flight from "./Flight";

function FlightsList(props) {
  const { flights } = props;
  return (
    <div className="flightList">
      {flights.length > 0 ?
       <table className="table">
       <thead>
         <tr>
           <th>From</th>
           <th>Departure time</th>
           <th>To</th>
           <th>Arrival time</th>
           <th>Price</th>
           <th>Stopovers</th>
         </tr>
       </thead>
       <tbody>
        {flights.map((flight, index) => (
          <Flight key={index} flight={flight} />
        ))}
       </tbody>
     </table>
     : <div className="loader">No flights available</div>
    } 
    </div>
  );
}

export default FlightsList;
