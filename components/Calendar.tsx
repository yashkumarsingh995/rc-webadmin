import DatePicker from "react-datepicker";
import dayjs from 'dayjs';
import "./Calendar.css";
import { Entries } from 'type-fest';

const checker = (arr, target) => target.every(v => arr.includes(v));

const CalendarComponent = ((props: any) => {

  const { selectedDate, setSelectedDate, arrHilightImportant, thisMonth, handleMonthChanged, scheduleSource, openModal } = props;

  const onChange = (dates) => {
    setSelectedDate(dates);
    if (openModal) openModal(true);
  }

  const handleChange = (date) => {
    handleMonthChanged(date);
    setSelectedDate(date);
  }
  const highlight = {};


  const getDayClass = (date) => {
    const currentDay = dayjs(date).format('YYYY-MM-DD')
    return highlight[currentDay]
  }

  const addExceptionStyling = (highlight: any) => {
    for (const [key, value] of Object.entries(arrHilightImportant.exceptions) as Entries<typeof arrHilightImportant.exceptions>) {
      highlight[key.toString()] = addDayStyling(value.start, value.end, value.available)
    }
  }

  const addDayStyling = (start: number, end: number, available: any) => {
    if (!available) {
      //  disabledDayProps
      return "highlight-invisible"
    }
    else if (end - start >= 1200) {
      //  allDayProps
      return "highlight-custom-full"
    }
      // partialDayProps
      return "highlight-custom-half"
  }

  if (arrHilightImportant) {
    console.log(arrHilightImportant)
    const start = new Date()
    const end = new Date(start.setMonth(start.getMonth() + 6))
    for (const currentDay = new Date(); currentDay <= new Date(end); currentDay.setDate(currentDay.getDate() + 1)) {
      const dayIndex = dayjs(currentDay).format('YYYY-MM-DD')
      const dayOfWeekName = dayjs(currentDay).format('ddd').toLowerCase()
      const recurringDay = arrHilightImportant[dayOfWeekName]
      highlight[dayIndex] = addDayStyling(recurringDay.start, recurringDay.end, recurringDay.available)
      if (arrHilightImportant.exceptions) {
        addExceptionStyling(highlight)
      }
    }
  }

  return (
    <div className="customDatePickerWidth" >
      <DatePicker
        // selected={selectedDate}
        openToDate={selectedDate}
        onChange={onChange}
        minDate={new Date()}
        onMonthChange={handleChange}
        highlightDates={highlight}
        dayClassName={getDayClass}
        disabledKeyboardNavigation
        inline
      />
    </div>
  );
})

export default CalendarComponent;