import React from 'react';
import { connect } from 'react-redux';

const SelectedStation = (props) => {
  const { station } = props;
  return(
    <div>
      { station ? 
        <div>
        <h2>Station Info</h2>
        <span><strong>{station.station_name}</strong></span> 
        </div>
        : ''
      }
     </div>
  );
}


 const mapStateToProps = state => ({
  station: state.fuelStationState.selectedStation,
})

export default connect(mapStateToProps)(SelectedStation);