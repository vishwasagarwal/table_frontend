import React from 'react';
import {signin,autheticate} from '../actions/auth'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Alert } from '@material-ui/lab';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    avatar: {
        background: '#00B8FF',
        color:'#001935'
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    }
}));

const SignIn = () => {
    const [Value, setValue] = React.useState({
        email: '',
        password: '',
        error: '',
        loading: false,
        message: '',
        showform: true,
    });
    let history = useHistory();
    const {
        email,
        password,
        error,
        loading,
        message,
        showform
    } = Value;
    const classes = useStyles();
    const handleSubmit = (e) => {
      e.preventDefault();
      console.table({email,password,error,loading,message,showform})
      setValue({
          ...Value,
          loading: true,
          error: false
      })
      const user = {
          email,
          password
      }
      signin(user).then(data => {
          if(data.error) {
              setValue({
                  ...Value,
                  error: data.error,
                  loading: false
              });
          } else {
            console.log(data);
            autheticate(data,()=>{
              console.log('hello'+data.user.name)
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
        console.log(Value)
    }
           
    const showloading = () =>(loading ? <div>loading....</div> :<div></div>);
const showerror =() =>(error ?  <Alert severity="error">{error}</Alert>:<div></div>)
    const showmessage =()=>(message ?  <Alert severity="info">{message}</Alert>:<div></div>)
    return (
        <Container component="main" maxWidth="xs">
            <div className={
                classes.paper
            }>
                <Avatar className={
                    classes.avatar
                }>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign In
                </Typography>
                <form className={
                        classes.form
                    }
                    onSubmit={handleSubmit}>
                    <Grid container
                        spacing={2}>
                        <Grid item
                            xs={12}>
                            <TextField onChange={
                                    handleChange('email')
                                }
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                value={email}
                                autoComplete="email"/>
                        </Grid>
                        <Grid item
                            xs={12}>
                            <TextField onChange={
                                    handleChange('password')
                                }
                                variant="outlined"
                                required
                                fullWidth
                                value={password}
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"/>
                        </Grid>
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary"
                        className={
                            classes.submit
                    }>
                        Sign In
                    </Button>
                </form>
                <Grid container justify="center">
                    <Grid item>
                       {showerror()}
                       {showloading()}
                       {showmessage()} 
                    </Grid>
                </Grid>
            </div>
        </Container>
    )
}
export default SignIn;






