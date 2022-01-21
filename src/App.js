import React, { useState, useEffect } from 'react';
import { CssBaseline, Grid } from '@material-ui/core';

import Header from './Components/Header/Header';
import List from './Components/List/List';
import Map from './Components/Map/Map';
import { getPlacesData } from './api'

const App = () => {
    const [ places, setPlaces] = useState([]); //starts as list
    const [ coordinates, setCoordinates ] = useState({}); //starts as an empty object, passes this prop to maps
    const [ bounds, setBounds ] = useState({}); 

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({coords: { latitude, longitude }}) => {
            setCoordinates({ lat: latitude, lng: longitude });
        })
    }, []);

    //.then is required for async functions, useEffect similar to componentDidMount and componentDidUpdate
    useEffect(() => {
        console.log(bounds )
        getPlacesData(bounds.sw, bounds.ne)
            .then((data) => {
                console.log(data);
                setPlaces(data);
            })
    }, [coordinates, bounds]); // required to update values 

    return(
        <>
            <CssBaseline />
            <Header />
            <Grid container spacing={3} style={{width: '100%'}}>
                <Grid item xs={12} md={4}>
                    <List places={places} />
                </Grid>
                <Grid item xs={12} md={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Map 
                        setCoordinates = {setCoordinates}
                        setBounds = {setBounds}
                        coordinates = {coordinates}
                        places={places}
                    />
                </Grid>
            </Grid>
        </>
    );
}

export default App;