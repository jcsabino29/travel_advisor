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
    const [ childClick, setChildClick ] = useState({});
    const [type, setType] = useState('restaurants');
    const [rating, setRating] = useState('');
    const [filteredPlaces, setFilteredPlaces] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({coords: { latitude, longitude }}) => {
            setCoordinates({ lat: latitude, lng: longitude });
        })
    }, []);

    useEffect(() => {
        const filteredPlaces = places.filter((place) => Number(place.rating) >= Number(rating));
        //const temp_filteredPlaces = filteredPlaces.filter((place) => Number(place.num_reviews) >= Number(0))
        setFilteredPlaces(filteredPlaces);
    }, [rating]);

    //.then is required for async functions, useEffect similar to componentDidMount and componentDidUpdate
    useEffect(() => {
        setIsLoading(true);
        getPlacesData(bounds.sw, bounds.ne, type, rating)
            .then((data) => {
                //console.log(data);
                setPlaces(data);
                setFilteredPlaces([]);
                setIsLoading(false);
            })
    }, [coordinates, bounds, type, rating]); // required to update values 

    return(
        <>
            <CssBaseline />
            <Header setCoordinates={setCoordinates}/>
            <Grid container spacing={3} style={{width: '100%'}}>
                <Grid item xs={12} md={4}>
                    <List 
                        places={filteredPlaces.length ? filteredPlaces : places} 
                        childClick={childClick} 
                        isLoading={isLoading} 
                        type={type} 
                        setType={setType}
                        rating={rating} 
                        setRating={setRating} 
                    />
                </Grid>
                <Grid item xs={12} md={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Map 
                        places={filteredPlaces.length ? filteredPlaces : places} 
                        setCoordinates = {setCoordinates}
                        setBounds = {setBounds}
                        coordinates = {coordinates}
                        setChildClick={setChildClick}
                    />
                </Grid>
            </Grid>
        </>
    );
}

export default App;