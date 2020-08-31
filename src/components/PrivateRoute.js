import React from 'react'
import {isAuth} from '../actions/auth';
import { Redirect } from 'react-router';
import {Route} from 'react-router-dom';
 

const PrivateRoute = ({component:Component,...rest}) =>
  <Route {...rest} render={(props)=>(
    isAuth()?<Component {...props}/>:<Redirect to='/'/>
  )}/>
export default PrivateRoute