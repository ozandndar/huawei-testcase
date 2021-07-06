import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LocationCity from '@material-ui/icons/ExploreOutlined';

import List from '@material-ui/core/List';
import { useDispatch } from 'react-redux';
import { covidActions } from '../../redux/store/covid';
import { fetchCountryData } from '../../redux/actions/countryActions';
import { fetchContinentData } from '../../redux/actions/continentActions';
import { useEffect, useState } from 'react';

const buttonsList = [
    {
        country: 'Russia',
        continent: 'Europe'
    },
    {
        country: 'Turkey',
        continent: 'Asia'
    },
    {
        country: 'USA',
        continent: 'North America'
    },
    {
        country: 'Saudi Arabia',
        continent: 'Asia'
    },
    {
        country: 'Spain',
        continent: 'Europe'
    },
    {
        country: 'China',
        continent: 'Asia'
    },
    {
        country: 'UK',
        continent: 'Europe'
    },
    {
        country: 'Libya',
        continent: 'Africa'
    },
    {
        country: 'India',
        continent: 'Asia'
    },
    {
        country: 'France',
        continent: 'Europe'
    },
    {
        country: 'Italy',
        continent: 'Europe'
    },
    {
        country: 'Germany',
        continent: 'Europe'
    },
    {
        country: 'Poland',
        continent: 'Europe'
    },
    {
        country: 'Netherlands',
        continent: 'Europe'
    },
    {
        country: 'Czechia',
        continent: 'Europe'
    },
    {
        country: 'Belgium',
        continent: 'Europe'
    },
    {
        country: 'Romania',
        continent: 'Europe'
    },
    {
        country: 'Japan',
        continent: 'Asia'
    },
    {
        country: 'Serbia',
        continent: 'Europe'
    },
    {
        country: 'Switzerland',
        continent: 'Europe'
    },
];

interface IButtonProps {
    country: string,
    continent: string
}

const Sidebar = (props: any) => {

    const dispatch = useDispatch();

    const [email, setEmail] = useState('');

    useEffect(() => {
        setEmail(window.sessionStorage.getItem('email') || '');
    }, [])

    const handleClick = ({ country, continent }: IButtonProps) => {
        dispatch(fetchCountryData(country));
        dispatch(fetchContinentData(continent));

        dispatch(covidActions.setCountry({ country }));
        dispatch(covidActions.setContinent({ continent }));

        dispatch(covidActions.setOpenCovidModal());
    }

    return (
        <List>
            <ListItem>
                Welcome, {email}
            </ListItem>
            <Divider />
            {buttonsList && buttonsList.map((r, i) => (
                <ListItem button key={i}>
                    <ListItemIcon>
                        <LocationCity />
                    </ListItemIcon>
                    <ListItemText primary={r.country} onClick={() => { handleClick(r) }} />
                </ListItem>
            ))}

        </List>
    )

}

export default Sidebar;