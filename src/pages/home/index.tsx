import { useEffect, useState } from 'react';
import { RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';

import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';

// components
import Sidebar from '../../components/Partials/Sidebar';

// Styles
import { styles } from './styles';

// redux
import { fetchCountryData } from '../../redux/actions/countryActions';
import { fetchContinentData } from '../../redux/actions/continentActions';
import { covidActions } from '../../redux/store/covid';

// 3rd parties
const { ComposableMap, Geographies, Geography, ZoomableGroup } = require('react-simple-maps'); // including javascript library

const geoUrl =
    "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const useStyles = styles;


const Home = (props: any) => {

    const dispatch = useDispatch();
    const covid = useSelector((state: RootState) => state.covid);

    const classes = useStyles();

    const [openDrawer, setOpenDrawer] = useState(true);

    useEffect(() => {
        dispatch(covidActions.resetCovidData());
        dispatch(covidActions.setCountry({ country: '' }));
        dispatch(covidActions.setContinent({ continent: '' }));
    }, [dispatch])

    const handleDrawerOpen = () => {
        setOpenDrawer(true);
    };
    const handleDrawerClose = () => {
        setOpenDrawer(false);
    };

    const handleModalOpen = () => {
        dispatch(covidActions.setOpenCovidModal());
    };

    const handleModalClose = () => {
        dispatch(covidActions.setCloseCovidModal());
    };

    const handleCountryClick = async (properties: any) => {
        // reset previous data
        dispatch(covidActions.resetCovidData());

        // fetching country and continent
        dispatch(fetchCountryData(properties.NAME));
        dispatch(fetchContinentData(properties.CONTINENT));

        dispatch(covidActions.setCountry({ country: properties.NAME }));
        dispatch(covidActions.setContinent({ continent: properties.CONTINENT }));

        handleModalOpen();
    }

    return (
        <div className={classes.homePage}>
            <CssBaseline />
            <AppBar position="absolute" color="secondary" className={clsx(classes.appBar, openDrawer && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(classes.menuButton, openDrawer && classes.menuButtonHidden)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                        Covid19 World Map
                    </Typography>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={() => {props.history.push('/login');}}
                    >
                        Logout
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                classes={{
                    paper: clsx(classes.drawerPaper, !openDrawer && classes.drawerPaperClose),
                }}
                open={openDrawer}
            >
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <Sidebar />
            </Drawer>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container} id="world-map-wrapper">
                    <Grid container spacing={3}>
                        <ComposableMap>
                            <ZoomableGroup zoom={1}>
                                <Geographies geography={geoUrl}>
                                    {({ geographies }: any) =>
                                        geographies && geographies.map((geo: any) => (
                                            <Geography
                                                key={geo.rsmKey}
                                                geography={geo}
                                                onClick={(e: any) => {
                                                    handleCountryClick(geo.properties);
                                                }}
                                            />
                                        ))
                                    }
                                </Geographies>
                            </ZoomableGroup>
                        </ComposableMap>
                    </Grid>
                    <Box pt={4}>
                        <Typography variant="body2" color="textSecondary">
                            {'Copyright © '}
                            <Link color="inherit" href="https://ozandundar.com/">
                                ozandundar.com
                            </Link>{' '}
                            {new Date().getFullYear()}
                            {'.'}
                        </Typography>
                    </Box>
                </Container>
            </main>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={covid.openCovidModal}
                onClose={handleModalClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={covid.openCovidModal}>
                    <div className={classes.paper}>
                        <h2 id="transition-modal-title">{covid.country && covid.country} - {covid.continent && covid.continent}</h2>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                {/* <Paper className={classes.paper}> */}
                                {covid.isCountryLoading ? <CircularProgress color="secondary" className="huawei-loading" /> :
                                    <div>
                                        <div><b>Country : </b>{covid.countryData.country}</div>
                                        <div><b>Active Cases :</b> {covid.countryData.activeCases}</div>
                                        <div><b>New Cases :</b> {covid.countryData.newCases}</div>
                                        <div><b>New Deaths :</b> {covid.countryData.newDeaths}</div>
                                        <div><b>Total Cases :</b> {covid.countryData.totalCases}</div>
                                        <div><b>Total Deaths :</b> {covid.countryData.totalDeaths}</div>
                                        <div><b>Total Recovered :</b> {covid.countryData.totalRecovered}</div>
                                    </div>
                                }
                                {/* </Paper> */}
                            </Grid>
                            <Grid item xs={6}>
                                {covid.isContinentLoading ? <CircularProgress color="secondary" className="huawei-loading" /> :
                                    <div>
                                        <div><b>Continent : </b>{covid.continentData.continent}</div>
                                        <div><b>Active Cases :</b> {covid.continentData.activeCases}</div>
                                        <div><b>New Cases :</b> {covid.continentData.newCases}</div>
                                        <div><b>New Deaths :</b> {covid.continentData.newDeaths}</div>
                                        <div><b>Total Cases :</b> {covid.continentData.totalCases}</div>
                                        <div><b>Total Deaths :</b> {covid.continentData.totalDeaths}</div>
                                        <div><b>Total Recovered :</b> {covid.continentData.totalRecovered}</div>
                                    </div>
                                }
                            </Grid>
                        </Grid>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}

export default Home;