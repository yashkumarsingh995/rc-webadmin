import { Paper, Button } from '@mui/material';

import AvailabilityDay from './AvailabilityDay';
import { useStyles } from '../styles/Theme';

import { arrWeek } from '../static/Calendar';

const Availability = ({ scheduleSource, handleSelect, unsetDays, setDaysDefaults }) => {

  const classes = useStyles();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('TODO: API save recurrent');
  };

  return (
    <div>

      <Paper elevation={1} sx={{ p: 1 }}>
        <form onSubmit={handleSubmit}>

          {arrWeek.map((day => (
            <AvailabilityDay
              title={day} key={day} scheduleSource={scheduleSource[day]}
              handleSelect={handleSelect} classes={classes}
              unsetDays={unsetDays} setDaysDefaults={setDaysDefaults}
            />
          )))}

          <div style={{ margin: '10px auto', display: 'flex', justifyContent: 'center' }}>
            <Button sx={{ width: '200px', alignSelf: 'center' }} type='submit' color='secondary' variant='contained'>Save</Button>
          </div>

        </form>
      </Paper>

    </div>
  );
}

export default Availability;