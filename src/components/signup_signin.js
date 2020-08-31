import React from 'react';
import SignUp from './Signup';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import SignIn from './signin';

export default function SigninSignup(){
    const [open, setOpen] = React.useState(false);
    const [name,setName] = React.useState(false);

    const handleClickOpen = name => {
        setOpen(true);
        if(name==='SignUp'){
            setName(true)
        }
        else{
            setName(false);
        }
    }; 
    const handleClose = () => {
        setOpen(false);
    };
    return(
        <React.Fragment>
        <div style={{display:'flex',direction:'row',justifyContent:'center',alignContent:'center'}}>
        <Button variant="contained" color="secondary" onClick={()=>handleClickOpen('SignUp')} style={{marginRight:'10%'}}>
            SignUp
        </Button>
        <Button variant="contained" color="secondary" onClick={()=>handleClickOpen('SignIn')} >
            SignIn
        </Button>
        </div>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">
            <IconButton onClick={handleClose}>
            <CloseIcon/>
            </IconButton>
            </DialogTitle>
            <DialogContent>
                {name?<SignUp/>:<SignIn/>}
            </DialogContent>
        </Dialog>
        </React.Fragment>
    )
}