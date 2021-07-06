import { Link as RLink } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';

// assets
import Logo from '../../assets/images/logos/huawei.png';

// data
import data from '../../utils/data/login.json';
import { useState } from 'react';


interface ICredentials {
    email: string,
    password: string
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    logo: {
        maxWidth: '300px'
    },
    error: {
        marginTop: theme.spacing(2)
    },
    registerLink: {
        color: theme.palette.secondary.main
    }
}));

const Register = (props: any) => {


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showError, setShowError] = useState(false);

    const handleSubmit = (e: any) => {
        e.preventDefault();

        let credentials: ICredentials = {
            email,
            password
        }

        const isUnique = data.find(i => JSON.stringify(i) === JSON.stringify(credentials));

        if (!isUnique) {
            setShowError(false);
            data.push(credentials);
            // dispatch(authActions.login({ isAuthenticated: true, email: credentials.email }));
            props.history.push('/login');
        } else {
            setShowError(true);
        }
    }

    const classes = useStyles();
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <img src={Logo} className={classes.logo} alt="logo" />
                <Typography component="h1" variant="h5">
                    Register
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoFocus
                        color="secondary"
                        autoComplete="off"
                        onChange={(e) => { setEmail(e.target.value) }}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        color="secondary"
                        onChange={(e) => { setPassword(e.target.value) }}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password again"
                        type="password"
                        id="password-again"
                        autoComplete="current-password"
                        color="secondary"
                        onChange={(e) => { setPassword(e.target.value) }}
                    />
                    <small>You can use test credentials like <b>email: test</b> and <b>password: test</b></small>
                    <FormControlLabel
                        control={<Checkbox value="remember" color="secondary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="secondary"
                        className={classes.submit}
                    >
                        Create Account
                    </Button>
                    <Grid container>
                        <Grid item xs>

                        </Grid>
                        <Grid item>
                            <RLink to="/login" className={classes.registerLink}>
                                You already have an account?
                                {/* <Link href="register" variant="body2" color="secondary" onClick={(e) => e.preventDefault()}>
                                {"Don't have an account? Sign Up"}
                            </Link> */}
                            </RLink>
                        </Grid>
                    </Grid>
                    {showError
                        && <Alert
                            className={classes.error} severity="error">Your credentials are not unique or passwords doesn't match!
                        </Alert>}
                </form>
            </div>
        </Container>
    )
}

export default Register;