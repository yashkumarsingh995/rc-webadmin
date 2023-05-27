import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// import { useDataProvider, useGetOne, useGetMany, useGetIdentity } from 'react-admin';
import { Typography, Tab, Tabs, Paper } from '@mui/material';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';

import Modal from '../components/base/Modal';
import CalenarMain from '../components/CalendarMain';
import CalendarAvailability from '../components/CalendarAvailability';
import CalendarRecurring from '../components/CalendarRecurring';
import { scheduleHint } from '../static/Calendar';

dayjs.extend(advancedFormat);

// TODO: move all styles to css or theme
// TODO: get jobTicketsData from backend using useGetMany, now backend is not working properly

const jobTicketsData = [
  {
    "id": "1",
    "job_number": "18",
    "date": "2022-10-06",
    "time_start": "12:00pm",
    "time_end": "1:30pm",
    "installer": "John at Battery Inc.",
    "customer": "Jane Doe",
    "address": "123 Main St",
    "region": "48105"
  },
  {
    "id": "2",
    "job_number": "4",
    "date": "2022-10-10",
    "time_start": "9:00am",
    "time_end": "11:30am",
    "installer": "John at Battery Inc.",
    "customer": "Jane Doe",
    "address": "123 Main St",
    "region": "48105"
  },
  {
    "id": "3",
    "job_number": "12",
    "date": "2022-10-26",
    "time_start": "1:00pm",
    "time_end": "2:30pm",
    "installer": "Jane",
    "customer": "John Doe",
    "address": "123 S Main",
    "region": "48105"
  },
];

const scheduling = {
  mon: [900, 1700],
  tue: [800, 1700],
  wed: [900, 1600],
  thu: [900, 1500],
  fri: [900, 1400],
  sat: [900, 1300],
  sun: [900, 1200],
  overrides: {
    '20221212': [900, 1000, 1100, 1200],
    '20221213': [800, 900, 1000]
  }
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other} >
      {(value === index) && <div> {children}</div>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    key: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const arrHilightImportant = [{
  "highlight-important": [
    // new Date('07-30-2022'),
    // new Date('07-31-2022'),
    // new Date('07-05-2022')
  ],
},];

const to24h = (time12h) => {
  return parseInt(dayjs(`1/1/1 ${time12h}`).format('kmm'));
}

jobTicketsData.forEach(item => {
  arrHilightImportant[0]['highlight-important'].push(new Date(dayjs(item.date).format('MM-DD-YYYY')));
})

const ScheduleList = ((props: any) => {

  const scheduleMenu = ['Calendar', 'Daily Availability', 'Recurring'];

  const location = useLocation();
  const state = location.state as { showModal: boolean };

  const [modalOpen, setModalOpen] = useState((state && state.showModal) ? true : false);
  const [menuCurrent, setMenuCurrent] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [thisMonth, setThisMonth] = useState(dayjs(selectedDate).format('MMMM'));
  const [scheduleSource, setScheduleSource] = useState(scheduling);

  const handleSelect = (e, title, id) => {
    const toUpdate = { ...scheduleSource };
    if (id === 'from') {
      toUpdate[title][0] = to24h(e.target.value);
      if (toUpdate[title][1] < toUpdate[title][0]) toUpdate[title][1] = toUpdate[title][0];
    }
    else {
      toUpdate[title][1] = to24h(e.target.value);
    }
    setScheduleSource(toUpdate);
  }

  const handleDate = (date) => {
    const month = dayjs(date).format('MMMM');
    if (month !== thisMonth) handleMonthChanged(date);
    setSelectedDate(date);
  }

  const unsetDays = (title) => {
    const toUpdate = { ...scheduleSource };
    delete toUpdate[title];
    toUpdate[title] = [];
    setScheduleSource(toUpdate);
  }

  const setDaysDefaults = (title) => {
    const toUpdate = { ...scheduleSource };
    delete toUpdate[title];
    toUpdate[title] = [900, 1700];
    setScheduleSource(toUpdate);
  }

  const handleMenuChange = (event: React.SyntheticEvent, newValue: number) => {
    setMenuCurrent(newValue);
  }

  const handleSheduleSource = (value) => {
    setScheduleSource(value);
  }

  // TODO: uncomment this code to get data from API endpoint. Now getOne() works, getMany() fails
  // const dataProvider = useDataProvider();

  // const { identity, isLoading : identityLoading } = useGetIdentity();
  // console.log('identity=', identity);

  // const { data: user, isLoading, error } = useGetOne('users', { id: identity?.id }, { enabled: (identityLoading && identity?.id !== undefined) });
  // const { data: user, isLoading, error } = useGetOne('users', { id: identity?.id }, { enabled: identity?.id !== undefined });
  // console.log('user=', user);

  // const { data, isLoading, error } = useGetMany('job-tickets');
  // console.log('data=', data, isLoading, error);

  // if (isLoading) return <div>Loading</div>;
  // if (error) return <div>Error</div>;
  // if (!data) return <div>null</div>;

  // jobTicketsData.forEach(item => {
  //   arrHilightImportant[0]['highlight-important'].push(dayjs(item.date);
  // });

  const handleMonthChanged = (value) => {
    setThisMonth(dayjs(value).format('MMMM'));
  }

  const ticketsToShow = jobTicketsData.filter((item) => (item.date === dayjs(selectedDate).format('YYYY-MM-DD')));

  return (
    <div>

      {modalOpen && <Modal setModalOpen={setModalOpen} />}

      <div style={{ margin: '-10px auto 20px -10px', border: '2px solid transparent' }}>
        <Tabs indicatorColor="primary" onChange={handleMenuChange} value={menuCurrent} sx={{ mb: 1 }}>
          {scheduleMenu.map((m, index) =>
            <Tab sx={{ pl: 5, pr: 5 }} label={m} value={index} {...a11yProps(index)} />)}
        </Tabs>

        <Typography variant='subtitle2' color='secondary' sx={{ mt: 2, mb: 2, fontFamily: 'Lato', fontSize: '12px', fontWeight: 'bold', backgroundColor: '#F1F9FF' }}>
          {scheduleHint}
        </Typography>

        <TabPanel value={menuCurrent} index={0}>
          <CalenarMain
            selectedDate={selectedDate}
            setSelectedDate={handleDate}
            thisMonth={thisMonth}
            handleMonthChanged={handleMonthChanged}
            ticketsToShow={ticketsToShow}
            arrHilightImportant={arrHilightImportant}
          />
        </TabPanel>

        <TabPanel value={menuCurrent} index={1}>

          <CalendarAvailability
            scheduleSource={scheduleSource}
            handleSheduleSource={handleSheduleSource}
            selectedDate={selectedDate}
            setSelectedDate={handleDate}
            thisMonth={thisMonth}
            handleMonthChanged={handleMonthChanged}
            handleSelect={handleSelect}
            unsetDays={unsetDays}
            setDaysDefaults={setDaysDefaults}
          />

        </TabPanel>

        <TabPanel value={menuCurrent} index={2}>
          <CalendarRecurring
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate} />
        </TabPanel>

      </div>
    </div>
  )
})

export default ScheduleList;
