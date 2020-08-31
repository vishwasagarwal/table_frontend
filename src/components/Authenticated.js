import React from 'react'
import {isAuth} from '../actions/auth';
import { Redirect } from 'react-router';
import {Route} from 'react-router-dom';
 

const AuthenticateRoute = ({component:Component,...rest}) =>
  <Route {...rest} render={(props)=>(
    isAuth()?<Redirect to='/dashboard'/>:<Component {...props}/>
  )}/>
export default AuthenticateRoute
