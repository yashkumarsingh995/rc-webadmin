import { Paper, Button } from '@mui/material';
import MessageIcon from '@mui/icons-material/Message';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import officialColors from '../styles/Colors';

// TODO: move styles to .css or theme

const CalendarTicketView = (({ ticketsToShow }) => {

  const ticketsHeader = [
    { title: '', subtitle: [{ source: 'time_start' }, { source: 'time_end' }] },
    { title: 'Job#', subtitle: [{ source: 'job_number' }] },
  ];

  const ticketsBody = [
    { body: { title: 'Installer:', subtitle: [{ source: 'installer' }] }, icon: <MessageIcon /> },
    { body: { title: 'Customer:', subtitle: [{ source: 'customer' }] }, icon: <MessageIcon /> },
    { body: { title: 'Address:', subtitle: [{ source: 'address' }, { source: 'region' }] }, icon: <LocationOnIcon /> },
  ];

  return (
    <div>
      {ticketsToShow.map((x, index) => (

        <Paper key={`paper-${index}`} sx={{
          m: 1, p: 1, border: '2px solid transparent', width: '250px',
          display: 'flex', flexDirection: 'column', gap: '10px', color: officialColors.darkBlue,
          fontFamily: 'Lato'
        }} elevation={1}>

          {/* ticket header */}
          <div style={{
            display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'space-between',
            gap: '10px', borderBottom: '1px solid', fontWeight: 'bold', textTransform: 'uppercase'
          }}>
            {ticketsHeader.map((h, index) => (
              <div key={`header-${index}`} style={{ border: '2px solid transparent', }}>
                {h.title}{h.subtitle.map((s, index) => (
                  <span key={`span-${index}`} >{x[s.source]}{(index === h.subtitle.length - 1) ? '' : ' - '}</span>
                ))}
              </div>
            ))}
          </div>

          {/* ticket body */}
          {ticketsBody.map((b, index) => (
            <div key={`tbody-${index}`} style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'space-between', gap: '10px' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontWeight: 'bold' }}>{b.body.title}</div>
                {b.body.subtitle.map((s, index) => (
                  <div key={`src-${index}`} >{x[s.source]}</div>
                ))}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontWeight: 'bold', marginTop: '3px', border: '2px solid transparent' }}>{b.icon}</div>
              </div>
            </div>
          ))}
          <Button fullWidth variant="contained" color='secondary'>See Job Ticket</Button>
        </Paper>
      ))}
    </div>
  )
})

export default CalendarTicketView;
