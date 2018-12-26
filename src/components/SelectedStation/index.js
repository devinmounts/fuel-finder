import React from 'react';
import './styles.css';
import { connect } from 'react-redux';
import { Card, CardBody} from 'reactstrap';
// import MessageCardContainer from '../MessageCard'
import MessageCardContainer from '../MessageCardContainer';
const SelectedStation = (props) => {
  const { station } = props;
  return(
    <div>
      { station ? 
        <div>
}        <div className='hr-small-box'>
          <hr className='hr-small' />
        </div>
        <div className='info-container'>
          <h2 className='info-title'>Station Info</h2>
          <Card className='station-card'>
            <CardBody>
              <h4><strong>{station.station_name}</strong></h4>
              <span className='station-card-text'><strong>Distance:</strong> {station.distance} mi. / {station.distance_km} km.</span>
              <span className='station-card-text'><strong>Open to:</strong> {station.access_code}</span>
              <span className='station-card-text'><strong>Hours:</strong> {station.access_days_time}</span>
              <span className='station-card-text'><strong>Address:</strong> {station.street_address}</span> 
              <span className='station-card-text'>{station.city}, {station.state} {station.zip}</span> 
              <span className='station-card-text'><strong>Fuel Type:</strong> {station.fuel_type_code}</span> 
              <span className='station-card-text'><strong>Phone:</strong> {station.station_phone}</span>
            </CardBody>
          </Card>
          <h3 className='info-title'>Comments ({station.messages ? station.messages.length : 0}):</h3>
            <MessageCardContainer />
          </div>
        </div>
        : ''
      }
     </div>
  );
}




 const mapStateToProps = state => ({
  station: state.fuelStationState.selectedStation,
});

export default connect(mapStateToProps)(SelectedStation);

