import { useState } from 'react';

import CalendarComponent from './Calendar';
import Availability from './Availability';
import CalendarLegend from './CalendarLegend';
import CalendarOverlay from './CalendarOverlay';
// TODO: remove Hints or add to UI
import { availabilityHint, dailyHint } from '../static/Calendar';

// TODO: move all styles to css or theme

const CalendarAvailability = (({ scheduleSource, handleSheduleSource, selectedDate, setSelectedDate, thisMonth, handleMonthChanged,
  handleSelect, unsetDays, setDaysDefaults }) => {

  const [modalOpen, setModalOpen] = useState(false);

  const legend = [
    { title: 'Unavailable', border: '1px dashed black', background: 'white' },
    { title: 'Partial Day', border: '1px solid #94D034', background: 'white' },
    { title: 'Full Day', border: '1px solid #94D034', background: '#94D034' },
  ];

  return (
    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
      <div>
        {/* <Typography variant='subtitle2' color='secondary' sx={{ mt: 2, mb: 2, fontFamily: 'Lato', fontSize: '12px', fontWeight: 'bold', backgroundColor: '#F1F9FF' }}>
          {dailyHint}
        </Typography> */}

        <CalendarComponent
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          openModal={setModalOpen}
          thisMonth={thisMonth}
          handleMonthChanged={handleMonthChanged}
          scheduleSource={scheduleSource}
          />
        <CalendarLegend legend={legend} />

        {modalOpen && <CalendarOverlay
          scheduleSource={scheduleSource}
          setModalOpen={setModalOpen}
          handleSheduleSource={handleSheduleSource}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />}

      </div>
      <div>
        {/* <Typography variant='subtitle2' color='secondary' sx={{ mt: 2, mb: 2, fontFamily: 'Lato', fontSize: '12px', fontWeight: 'bold', backgroundColor: '#F1F9FF' }}>
          {availabilityHint}
        </Typography> */}

        <Availability
          scheduleSource={scheduleSource}
          handleSelect={handleSelect}
          unsetDays={unsetDays}
          setDaysDefaults={setDaysDefaults}
        />
      </div>
    </div>
  );
})

export default CalendarAvailability;
