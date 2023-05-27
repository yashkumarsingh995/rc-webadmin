import React from 'react'
import { Typography, Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import officialColors from '../../styles/Colors';

const AccordionPart = ({ children, expanded, handleChangeAccordion, id, number, label }) => {
  return <Accordion expanded={expanded} onChange={(t) => handleChangeAccordion(t, id)}>
    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content">
      <Typography sx={{ width: '20px', flexShrink: 0, position: 'absolute' }}>{number}</Typography>
      <Typography variant='body2' sx={{ margin: '0 auto', color: '#171F58', fontSize: '14px'}}>{label}</Typography>
    </AccordionSummary>
    <AccordionDetails>
      {children}
    </AccordionDetails>
  </Accordion>
}

export { AccordionPart }