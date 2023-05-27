import React from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

import officialColors from '../../styles/Colors';
import { steps, strTitle } from '../../static/ModalSchedule';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Modal = ({ setModalOpen }) => {

  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (<div>
    <Dialog
      PaperProps={{
        style: {
          backgroundColor: 'rgb(255,255,255,0.9)',
          padding: '50px 25px 25px 25px',
        },
      }}
      open={open}
      TransitionComponent={Transition}
    >
      <div style={{ position: 'absolute', right: '12px', top: '8px', cursor: 'pointer' }}>
        <CloseIcon style={{ width: '15px' }} onClick={handleClose} />
      </div>
      <Typography sx={{ margin: '-15px auto 5px auto', color: officialColors.darkBlue, fontSize: '16px' }}>{strTitle}</Typography>
      {steps.map((s, index) => (
        <div key={`div-modal-${index}`} style={{ margin: '10px 0' }}>
          <Typography key={`t-t${index}`} variant='subtitle1'
            sx={{ fontFamily: 'Lato', color: officialColors.darkBlue, fontSize: '16px', fontWeight: 'bold' }}>
            {s.title}
          </Typography>
          <Typography key={`t-s-${index}`} variant='subtitle1'
            sx={{ fontFamily: 'Lato', color: officialColors.darkBlue, fontSize: '14px'}}>
            {s.subtitle}
          </Typography>
        </div>
      ))}
      <div style={{ width: '250px', margin: '15px auto 0 auto' }}>
        <Button sx={{fontSize: '12px'}} fullWidth variant="contained" color="secondary" onClick={handleClose}>Let's go!</Button>
      </div>
    </Dialog>
  </div>
  )
}

export default Modal;