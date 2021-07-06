
import axios from 'axios';

import { covidActions } from '../store/covid';


export const fetchContinentData = (continent: string) => {
    return async (dispatch: any) => {
        const fetchData = async () => {
            const response = await axios.get(`https://api.collectapi.com/corona/continentData`);
            const data = await response;
            dispatch(covidActions.hideContinentDataLoading());
            return data;
        }

        dispatch(covidActions.showContinentDataLoading());
        try {
            const continentData = await fetchData();
            let parentContinent = {};
            
            await continentData.data.result.forEach((e: any) => {
                if(e.continent === continent){
                    parentContinent = e;
                }
            });

            dispatch(covidActions.setContinentData(parentContinent));
        } catch (error) {
            dispatch(covidActions.hideContinentDataLoading());
            console.log(error);
        }

    }
}
