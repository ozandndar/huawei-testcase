
import axios from 'axios';

import { covidActions } from '../store/covid';


export const fetchCountryData = (country: string) => {
    if(country === 'United States of America'){
        country = 'USA';
    }
    return async (dispatch: any) => {
        const fetchData = async () => {
            const response = await axios.get(`https://api.collectapi.com/corona/countriesData?country=${country}`);
            const data = await response;
            dispatch(covidActions.hideCountryDataLoading());
            return data;
        }

        dispatch(covidActions.showCountryDataLoading());
        try {
            const countryData = await fetchData();
            dispatch(covidActions.setCountryData(countryData.data.result.length > 0 && countryData.data.result[0]));
        } catch (error) {
            dispatch(covidActions.hideCountryDataLoading());
            console.log(error);
        }

    }
}
