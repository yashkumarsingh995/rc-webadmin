import { useState, useEffect } from "react";
import { Button, Dialog, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';

import officialColors from "../styles/Colors";
import { strTitleOverlay, timesWithStyle } from '../static/Calendar';

dayjs.extend(advancedFormat);

const to24h = (time12h) => {
  return parseInt(dayjs(`1/1/1 ${time12h}`).format('kmm'));
}

const updateModalTimesWithStyle = (dayRecurrent, dayOverride) => {

  const toUpdate = [...timesWithStyle];
  toUpdate.forEach(item => { item.style = false; });

  if (dayOverride) {
    for (let i = 0; i < toUpdate.length; i++) {
      if (dayOverride.filter((r) => (r === to24h(toUpdate[i].source))).length) {
        toUpdate[i].style = true;
      }
    }
    return toUpdate;
  }
  if (dayRecurrent && dayRecurrent.length === 2) {
    toUpdate.forEach(item => {
      const time24h = to24h(item.source);
      if ((time24h >= dayRecurrent[0]) && (time24h <= dayRecurrent[1])) {
        item.style = true;
      }
    });
  }
  return toUpdate;
}

const CalendarOverlay = ({ scheduleSource, handleSheduleSource, setModalOpen, selectedDate, setSelectedDate }) => {

  const today = dayjs(selectedDate);
  const dateKey = today.format('YYYYMMDD');
  const dayOfTheWeek = today.format('ddd').toLowerCase();

  const [open, setOpen] = useState(true);
  const [overlayTimes, setOverlayTimes] = useState(timesWithStyle);

  useEffect(
    () => setOverlayTimes(updateModalTimesWithStyle(scheduleSource[dayOfTheWeek], scheduleSource['overrides'][dateKey])),
    [scheduleSource[dayOfTheWeek]]
  );

  const handleClick = () => {
    // save override for this day
    const toUpdate = { ...scheduleSource };
    delete toUpdate['overrides'][dateKey];
    const overrideData = [];
    overlayTimes.forEach(item => {
      if (item.style) {
        overrideData.push(to24h(item.source));
      }
    });
    toUpdate['overrides'][dateKey] = overrideData;
    handleSheduleSource(toUpdate);

    setModalOpen(false);
  }

  const handleClickTime = (index) => {
    const toUpdate = [...overlayTimes];
    toUpdate.splice(index, 1, { source: overlayTimes[index].source, style: !overlayTimes[index].style });
    setOverlayTimes(toUpdate);
  }

  const selected = new Date(selectedDate);
  const isToday = (dayjs(selected).format('MM-DD-YYYY') === dayjs().format('MM-DD-YYYY'));
  const yesterday = new Date(Number(selected) - 86400000); // that is: 24 * 60 * 60 * 1000
  const tomorrow = new Date(Number(selected) + 86400000); // that is: 24 * 60 * 60 * 1000

  return (
    <Dialog
      PaperProps={{
        style: {
          backgroundColor: 'rgb(255,255,255,1)',
          padding: '30px 25px 25px 25px',
          minWidth: '250px'
        },
      }}
      open={open}
    >
      <div style={{ minWidth: '200px' }}>
        <div style={{ position: 'absolute', right: '12px', top: '8px', cursor: 'pointer' }}>
          <CloseIcon style={{ width: '15px' }} onClick={() => setModalOpen(false)} />
        </div>

        <Typography variant='caption' sx={{ margin: '5px auto', color: officialColors.darkBlue, fontFamily: 'LatoBold', fontSize: '16px' }}>{strTitleOverlay}</Typography>

        <div style={{ display: 'flex' }}>
          <div style={{ cursor: 'pointer', pointerEvents: isToday ? 'none' : 'auto' }} onClick={() => setSelectedDate(yesterday)}><KeyboardArrowLeftIcon /></div>
          <Typography variant='h5' sx={{ margin: '5px auto', color: officialColors.darkBlue, fontFamily: 'LatoBold', fontSize: '14px', textTransform: 'uppercase' }}>{dayjs(selectedDate).format('dddd, MMM DD, YYYY')}</Typography>
          <div style={{ cursor: 'pointer' }} onClick={() => setSelectedDate(tomorrow)}> <KeyboardArrowRightIcon /></div>

        </div>

        <div style={{ fontSize: '12px', margin: '0 auto' }}>Source={scheduleSource['overrides'][dateKey] ? '(override)' : '(recurrent)'}</div>
        {/* {scheduleSource['overrides'][dateKey] ?
          <div>{scheduleSource['overrides'][dateKey].map((x, index) => (<span key={index}>{x} </span>))} </div>: 
          scheduleSource[dayOfTheWeek].length === 2 ? <span>{scheduleSource[dayOfTheWeek][0]}-{scheduleSource[dayOfTheWeek][1]}</span> : "empty"
        } */}

        <div style={{
          display: 'flex', flexDirection: 'column', gap: '5px', cursor: 'pointer',
          justifyContent: 'center', textAlign: 'center', flexWrap: 'wrap', height: '300px', width: '250px',
          margin: '0 auto'
        }}>
          {overlayTimes ? overlayTimes.map((time, index) => (
            (time.style) ?
              <div key={index} style={{ background: '#94D034', border: '1px solid #94D034', padding: '5px' }}
                onClick={() => handleClickTime(index)}>{time.source} </div>
              :
              <div key={index} style={{ background: 'white', border: '1px solid #94D034', padding: '5px' }}
                onClick={() => handleClickTime(index)}>{time.source}</div>
          )) :
            "no data"}
        </div>
        <div style={{ width: '150px', margin: '15px auto 0 auto' }}>
          <Button sx={{ fontSize: '12px' }} fullWidth variant="contained" color="secondary" onClick={handleClick}>Save</Button>
        </div>
      </div>
    </Dialog>
  )
}

export default CalendarOverlay