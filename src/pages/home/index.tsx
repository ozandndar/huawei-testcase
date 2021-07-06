import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import { useState } from 'react';
// import WorldMap from 'react-world-map';
const { ComposableMap, Geographies, Geography } = require('react-simple-maps');

const geoUrl =
    "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary">
            {'Copyright © '}
            <Link color="inherit" href="https://ozandundar.com/">
                ozandundar.com
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    homePage: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: '#333',
        color: '#fff'
    },
    main: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(2),
    },
    footer: {
        padding: theme.spacing(3, 2),
        marginTop: 'auto',
        backgroundColor: theme.palette.grey[800],
    }
}));

const Home = (props: any) => {

    const classes = useStyles();

    const [selected, onSelect] = useState(null);

    return (
        <div className={classes.homePage}>
            <CssBaseline />
            <Container component="big" className={classes.main} maxWidth="md" id="world-map-wrapper">
                <ComposableMap>
                    <Geographies geography={geoUrl}>
                        {({ geographies }: any) =>
                            geographies && geographies.map((geo: any) => (
                                <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    onMouseDown={(e: any) => {
                                        console.log(geo.properties);
                                    }}
                                />
                            ))
                        }
                    </Geographies>
                </ComposableMap>
            </Container>
            <footer className={classes.footer}>
                <Container maxWidth="sm">
                    <Typography variant="body1">Huawei Studycase</Typography>
                    <Copyright />
                </Container>
            </footer>
        </div>
    );
}

export default Home;