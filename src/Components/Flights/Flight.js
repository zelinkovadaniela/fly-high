import { DateTime } from 'luxon';

// time of departure and arrival in local time, name of the origin and departure & price for the flight

function Flight(props) {
  const { flyFrom, flyTo, dTime, aTime, price, route } = props.flight;

  function timeUtil(time) {
    return DateTime.fromMillis(time * 1000).toFormat('hh:mm');
  }

  return (
    <tr className="flight">
        <td>{flyFrom}</td>
        <td>{timeUtil(dTime)}</td>
        <td>{flyTo}</td>
        <td>{timeUtil(aTime)}</td>
        <td>{price} EUR</td>
        <td>{route.length - 1}</td>
      </tr>
  );
}

export default Flight;
