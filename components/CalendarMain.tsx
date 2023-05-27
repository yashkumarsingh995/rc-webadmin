import { Typography, Paper } from '@mui/material';
import dayjs from 'dayjs';

import CalendarComponent from '../components/Calendar';
import CalendarTicketView from '../components/CalendarTicketView';
import CalendarLegend from '../components/CalendarLegend';

// TODO: move all styles to css or theme

const CalendarMain = ((props: any) => {

  const { selectedDate, setSelectedDate, ticketsToShow, arrHilightImportant, thisMonth, handleMonthChanged } = props;

  const legend = [
    { title: 'Unavailable', border: '1px dashed black', background: 'white' },
    { title: 'Partial Day', border: '1px solid #94D034', background: 'white' },
    { title: 'Full Day', border: '1px solid #94D034', background: '#94D034' },
  ];

  return (
    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', flexWrap: 'nowrap' }}>

        <CalendarComponent
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          arrHilightImportant={arrHilightImportant}
          thisMonth={thisMonth}
          handleMonthChanged={handleMonthChanged}
        />

        <CalendarLegend legend={legend}/>
      </div>
      <div>
        {selectedDate &&

          <Paper sx={{ width: '282px', p: 1, display: 'flex', flexDirection: 'column' }} elevation={1}>

            <Typography sx={{ margin: '0 auto', fontFamily: 'LatoBold', fontSize: '16px', textTransform: 'uppercase' }} variant='h6' color='primary'>
              {dayjs(selectedDate).format('dddd, MMM DD, YYYY')}
            </Typography>

            {/* <CalendarTicketView ticketsToShow={ticketsToShow} /> */}

          </Paper>
        }

      </div>
    </div>
  )
})

export default CalendarMain;
