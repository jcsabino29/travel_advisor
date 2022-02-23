import axios from 'axios';


export const getPlacesData = async (sw, ne, type, rating) => {
    const URL = `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`;
    
    try {
        // broke down response twice 
        const { data: { data } } = await axios.get(URL, {
            params: {
                bl_latitude: sw.lat,
                tr_latitude: ne.lat,
                bl_longitude: sw.lng,
                tr_longitude: ne.lng,
              },
              headers: {
                'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
                'x-rapidapi-key': '624d1215fdmsh6fd166c33c46c4cp11e9eajsn596c171ff917'
              }
        });

        //let results = []
        //results = data.map((place, i) => place.rating > rating ? results.push(place) : "" );
        return data;

    } catch(e) {
        console.log(e);
    }
    
}