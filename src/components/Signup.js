import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from "react-router-dom";
import {signup, autheticate} from '../actions/auth';
import { Alert} from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignUp =() =>{
  const classes = useStyles();
  let history = useHistory();
  const [Value, setValue] = React.useState({
    name: '',
    email: '',
    password: '',
    error: '',
    loading: false,
    message: '',
    showform: true,
});
const {
    name,
    email,
    password,
    error,
    loading,
    message,
    showform
} = Value;
const handleSubmit = (e) => {
    e.preventDefault();
    console.table({name,email,password,error,loading,message,showform})
    setValue({
        ...Value,
        loading: true,
        error: false
    })
    const user = {
        name,
        email,
        password
    }
    signup(user).then(data => {
        if(data.error) {
            setValue({
                ...Value,
                error: data.error,
                loading: false
            });
        } else {
          console.log(data);
          autheticate(data,()=>{
            history.push("/dashboard");
          })  
            
        }
    })

}
const handleChange = names => e => {
    setValue({
        ...Value,
        [names]: e.target.value
    })
}
const showloading = () =>(loading ? <div>loading....</div> :<div></div>);
const showerror =() =>(error ?  <Alert severity="error">{error}</Alert>:<div></div>)
const showmessage =()=>(message ?  <Alert severity="info">{message}</Alert>:<div></div>)
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
            <TextField onChange={handleChange('name')} autoComplete="name" value={name} variant="outlined" required fullWidth id="name" label="Name" autoFocus/>
            </Grid>
            <Grid item xs={12}>
            <TextField onChange={handleChange('email')} variant="outlined" required fullWidth id="email"label="Email Address" value={email} autoComplete="email"/>
            </Grid>
            <Grid item xs={12}>
            <TextField onChange={handleChange('password')} variant="outlined" required fullWidthvalue={password} label="Password" type="password" id="password" autoComplete="current-password"/>
            </Grid>
            </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
        </form>
      </div>
      <Grid container justify="center">
            <Grid item>
                {showerror()}
                {showloading()}
                {showmessage()} 
            </Grid>
        </Grid>
    </Container>
  );
}
export default SignUp;
