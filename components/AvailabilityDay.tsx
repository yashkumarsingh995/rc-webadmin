import { useState } from 'react';
import { Typography, Checkbox, MenuItem } from '@mui/material';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';

import { CssTextField } from './base/CssTextField';
import { usTime } from '../static/Calendar';

dayjs.extend(advancedFormat);

function insert(str, index, value) {
  return str.substr(0, index) + value + str.substr(index);
}

const to12h = (time24h) => {
  const str24h = String(`${time24h}`)
  const str24hsemi = insert(str24h, str24h.length - 2, ':');
  return dayjs(`1/1/1 ${str24hsemi}`).format('h:mm A');
}

const to24h = (time12h) => {
  return parseInt(dayjs(`1/1/1 ${time12h}`).format('kmm'));
}

const AvailabilityDay = ({ title, scheduleSource, handleSelect, classes, unsetDays, setDaysDefaults }) => {

  // TODO: add validation here

  const [isAllow, setIsAllow] = useState(!!scheduleSource.length);

  const handleCheckboxLocal = (e) => {
    // unset recurrent schedule for these days
    e.target.checked ? setDaysDefaults(title) : unsetDays(title);
    setIsAllow(e.target.checked);
  }

  const needToBeShown = (id, x) => {
    if (id === 'from') return true;
    if (!isAllow) return true;
    if (to24h(x) >= scheduleSource[0]) return true;
    return false;
    // (f.id === 'from' || (f.id === 'to' && (!isAllow || to24h(x) >= scheduleSource[0])))
  }

  const fields = [
    { id: 'from', value: scheduleSource.length ? to12h(scheduleSource[0]) : '9:00 AM', label: 'from', placeholder: '' },
    { id: 'to', value: scheduleSource.length ? to12h(scheduleSource[1]) : '5:00 PM', label: 'to', placeholder: '' },
  ];

  return (
    <div className={classes.dayContainerStyles} >
      <div>
        <Typography variant="h6" color="blueMain" sx={{ width: '30px', fontSize: '14px', textAlign: 'right' }}>{title}</Typography>
      </div>

      <div>
        <Checkbox id={title} key={`${title}-ch`} size="small"
          checked={isAllow} onChange={handleCheckboxLocal} />
      </div>

      {fields.map((f, index) => <div key={`${index}-div`} style={{ border: '2px solid transparent', width: '130px' }}>
        <CssTextField
          id={f.id} name={f.id} label={f.label} required={true} type='text'
          placeholder={f.placeholder}
          key={`${title}${index}`} disabled={!isAllow}
          value={f.value} onChange={(e) => handleSelect(e, title, f.id)}
          select={true} variant='filled'
          size='small'
          sx={{ margin: '1px 0' }}
        >{usTime.map((x, index) => (needToBeShown(f.id, x) ? <MenuItem key={index} value={x}>{x}</MenuItem> : null)
        )}
        </CssTextField>
      </div>)}

    </div>
  );
}

export default AvailabilityDay;