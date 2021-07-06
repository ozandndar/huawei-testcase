import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    country: '',
    continent: '',
    countryData: {
        activeCases: '',
        country: '',
        newCases: '',
        newDeaths: '',
        totalCases: '',
        totalDeaths: '',
        totalRecovered: ''
    },
    continentData: {
        activeCases: '',
        continent: '',
        newCases: '',
        newDeaths: '',
        totalCases: '',
        totalDeaths: '',
        totalRecovered: ''
    },
    isCountryLoading: false,
    isContinentLoading: false,
    openCovidModal: false
}

const covidSlice = createSlice({
    name: 'covid',
    initialState,
    reducers: {
        setCountry(state, action) {
            state.country = action.payload.country;
        },
        setCountryData(state, action) {
            state.countryData = action.payload;
        },
        showCountryDataLoading(state) {
            state.isCountryLoading = true
        },
        hideCountryDataLoading(state) {
            state.isCountryLoading = false
        },
        setContinent(state, action) {
            state.continent = action.payload.continent;
        },
        setContinentData(state, action) {
            state.continentData = action.payload;
        },
        showContinentDataLoading(state) {
            state.isContinentLoading = true
        },
        hideContinentDataLoading(state) {
            state.isContinentLoading = false
        },
        setOpenCovidModal(state){
            state.openCovidModal = true
        },
        setCloseCovidModal(state){
            state.openCovidModal = false
        },
        resetCovidData(state) {
            state.country = ''
            state.continent = ''
            state.countryData = {
                activeCases: '',
                country: '',
                newCases: '',
                newDeaths: '',
                totalCases: '',
                totalDeaths: '',
                totalRecovered: ''
            }
            state.continentData = {
                activeCases: '',
                continent: '',
                newCases: '',
                newDeaths: '',
                totalCases: '',
                totalDeaths: '',
                totalRecovered: ''
            }
            state.isCountryLoading = false
            state.isContinentLoading = false
            state.openCovidModal = false

        }
    }
})

export const covidActions = covidSlice.actions;

export default covidSlice.reducer;