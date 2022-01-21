import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';

import useStyles from './styles.js';

const Map = ({setCoordinates, setBounds, coordinates}) => {
    const classes = useStyles();
    const matches = useMediaQuery('(min-width:600px)');


    return (

        <div className={classes.mapContainer}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyBzG_n-VYVO7fO4YSYARdcCyeEW3_kC_bc' }}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={14}
                margin={[50, 50, 50, 50]}
                options={''}
                onChange = {(e) => { 
                    setCoordinates ({ lat: e.center.lat, lng: e.center.lng }); //works similarly to call by reference
                    setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw })
                }}
                onChildClick={''}
            >

            </GoogleMapReact>
        </div>
    );
}

export default Map;