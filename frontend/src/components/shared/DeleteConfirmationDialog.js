import React from 'react';
import { Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';

function DeleteConfirmationDialog(props) {
  const { onClose, taskContent, open } = props;

  const handleClose = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="dialog-title" open={open}>
      <DialogTitle>Are you sure you want to delete task "{taskContent}" ?</DialogTitle>
      <div className="dialog__actions">
        <Button size="small" onClick={() => handleClose(true)}>
          Yes
        </Button>
        <Button
          variant="contained"
          size="medium"
          className="submit-button"
          onClick={() => handleClose(false)}
        >
          No
        </Button>
      </div>
    </Dialog>
  );
}

export default DeleteConfirmationDialog;
