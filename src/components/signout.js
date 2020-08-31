import React from 'react'
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import {signout} from '../actions/auth';
const SignOut = () =>{
    let history = useHistory();
    return(
        <Button variant="contained" color="secondary" onClick={() => signout(() => history.push("/"))}>SignOut</Button>
    )
}
export default SignOut;
