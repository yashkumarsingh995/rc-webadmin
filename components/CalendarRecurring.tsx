import CalendarComponent from './Calendar';

// TODO: move all styles to css or theme

const CalendarRecurring = ((props: any) => {

  const { selectedDate, setSelectedDate } = props;

return (
  <div style={{ display: 'flex', gap: '10px' }}>
    <div>
      <CalendarComponent
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
    </div>
  </div>
);
})

export default CalendarRecurring;
