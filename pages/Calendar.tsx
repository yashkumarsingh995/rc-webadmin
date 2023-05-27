// import DatePicker from "react-datepicker";
// import dayjs from 'dayjs';

// import "./Calendar.css";
// import { fullDayStart, fullDayEnd, usTimeFullDay } from '../static/Calendar';

// import { useState } from "react";

// const checker = (arr, target) => target.every(v => arr.includes(v));

// const CalendarComponent = ((props: any) => {

//   const { selectedDate, setSelectedDate, arrHilightImportant, thisMonth, handleMonthChanged, scheduleSource, openModal } = props;

//   const onChange = (dates) => {
//     setSelectedDate(dates);
//     if (openModal) openModal(true);
//   }

//   const handleChange = (date) => {
//     handleMonthChanged(date);
//     setSelectedDate(date);
//   }

//   const findScheduledRecurrent = (date) => {

//     const moment1 = dayjs(date);
//     const strMonth = moment1.format('MMMM');
//     const dayOfTheWeek = moment1.format("ddd").toLocaleLowerCase();

//     const moment2 = dayjs();
//     const strThisMonth = thisMonth;

//     // make cells invisible
//     if (strMonth !== strThisMonth) {
//       return "highlight-invisible";
//     }

//     const theSameDay = (moment1.format('MM-DD-YYYY') === moment2.format('MM-DD-YYYY'));

//     // do not highlight past dates
//     if (!((moment1.isAfter(moment2) || theSameDay))) return;

//     // check overrides
//     const dateKey = dayjs(date).format('YYYYMMDD');
//     if (scheduleSource['overrides'][dateKey]) {

//       // do not change style when nothing selected
//       if (scheduleSource['overrides'][dateKey].length === 0) return;

//       if (checker(scheduleSource['overrides'][dateKey], usTimeFullDay)) {
//         return "highlight-custom-full";
//       }
//       else {
//         return "highlight-custom-half";
//       }
//     }

//     const storeDayRecurrent = scheduleSource[`${dayOfTheWeek}`];

//     // no additional style in case of empty array or array length!=2
//     if (storeDayRecurrent.length !== 2) return;

//     if ((storeDayRecurrent[0] <= fullDayStart) && (storeDayRecurrent[1] >= fullDayEnd)) {
//       return "highlight-custom-full";
//     }
//     return "highlight-custom-half";

//   }

//   return (
//     <div className="customDatePickerWidth">
//       <DatePicker
//         // selected={selectedDate}
//         openToDate={selectedDate}
//         onChange={onChange}
//         minDate={new Date()}
//         onMonthChange={handleChange}
//         highlightDates={arrHilightImportant ? arrHilightImportant : []}
//         dayClassName={scheduleSource ? findScheduledRecurrent : null}
//         // selectsDisabledDaysInRange
//         disabledKeyboardNavigation
//         inline
//       />
//     </div>
//   );
// })

// export default CalendarComponent;