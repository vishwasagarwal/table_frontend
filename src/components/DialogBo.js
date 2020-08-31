import React, { Children } from 'react';
import Button from '@material-ui/core/Button';


export default function DialogBox({children}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <IconButton onClick={handleClose}>
            <CloseIcon/>
        </IconButton>
        <DialogContent>
          {children}
        </DialogContent>
      </Dialog>
    </div>
  );
}