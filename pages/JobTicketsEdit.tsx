import { Edit, TextField, DateField, useGetOne, useRecordContext, useReference } from 'react-admin'
import { Button } from '@mui/material';
import { useParams } from 'react-router-dom';

import { NetworkIcon, MessagesIcon, CalendarIcon } from '../components/Icons';
import officialColors from '../styles/Colors'
import userPic from '../assets/images/user-picture-default.png';

const JobTicketsEdit = (props) => {

  // TODO: make component readable
  // TODO: move styles to css]
  const { id } = useParams();

  const { data, isLoading, error } = useGetOne('job-tickets', { id })
  if (!isLoading) {
    if (error) {
      console.log('error', error)
    }
    console.log('job-tickets', data)
  }

  const homeDetails = [
    { label: 'Home renter or owner:', source: 'job_scope.home.rent_own' },
    { label: 'Year home was built:', source: 'job_scope.home.year_built' },
    { label: 'Panel upgraded:', source: 'job_scope.home.panel_upgraded'  },
  ]

  const chargerDetails = [
    { label: 'number of chargers to install:', source: 'job_scope.chargers.num_chargers' },
    { label: 'number of chargers to install:', source: 'job_scope.chargers.num_chargers' },
  ]


  return (
    <Edit {...props}>

      <div style={{ fontFamily: 'Lato', width: '100%', color: officialColors.darkBlue }}>
        <div style={{ display: 'flex', marginLeft: '10px' }}>
          <div style={{ textTransform: 'uppercase', fontWeight: 'bold', fontSize: '18px' }}>
            Job #<TextField sx={{ fontWeight: 'bold', fontSize: '18px' }} source="id" /> - open
          </div>
        </div>

        <div style={{ display: 'flex', backgroundColor: officialColors.green, padding: '10px 5px', width: '100%', textTransform: 'uppercase', fontWeight: 'bold', fontSize: '14px' }}>
          <div>
            <DateField source="ts" sx={{ textTransform: 'uppercase', fontWeight: 'bold', fontSize: '14px' }} options={{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' }} /> -
            <TextField source="time_start" sx={{ textTransform: 'uppercase', fontWeight: 'bold', fontSize: '14px' }} /> -
            <TextField source="time_end" sx={{ textTransform: 'uppercase', fontWeight: 'bold', fontSize: '14px' }} />
          </div>
        </div>

        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', gap: '10px', flexWrap: 'wrap' }}>

          <div style={{ display: 'flex', padding: '10px' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ textTransform: 'uppercase', fontWeight: 'bold', fontSize: '16px' }}>Customer Info</div>
              <div style={{ margin: '5px 0', display: 'flex', flexDirection: 'column' }}>
                <TextField sx={{ fontWeight: 'bold', fontSize: '14px' }} source="customer_data.name" fullWidth={true} />
                <TextField source="customer_data.addressOne" fullWidth={true} />

                <div style={{ display: 'flex', gap: '5px' }}>
                  <TextField source="customer_data.city" fullWidth={true} />
                  <TextField source="customer_data.state" fullWidth={true} />
                  <TextField source="customer_data.zip" fullWidth={true} />
                </div>
              </div>

              <div style={{ margin: '5px 0', display: 'flex', flexDirection: 'column' }}>
                <TextField source="customer_data.phone_number" fullWidth={true} />
                <TextField source="customer_data.email" fullWidth={true} />
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', padding: '10px' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ textTransform: 'uppercase', fontWeight: 'bold', fontSize: '16px' }}>Installer Info</div>
              <div style={{ display: 'flex', gap: '5px' }}>
                <div style={{ width: '90px' }}>
                  <img src={userPic} alt="default-userpic" />
                </div>
                <div>

                  <div style={{ margin: '5px 0', display: 'flex', flexDirection: 'column' }}>
                    <TextField sx={{ fontWeight: 'bold', fontSize: '14px' }} source="installer_data.name" fullWidth={true} />
                    <TextField source="installer_data.addressOne" fullWidth={true} />

                    <div style={{ display: 'flex', gap: '5px' }}>
                      <TextField source="installer_data.city" fullWidth={true} />
                      <TextField source="installer_data.state" fullWidth={true} />
                      <TextField source="installer_data.zip" fullWidth={true} />
                    </div>
                  </div>

                  <div style={{ margin: '5px 0', display: 'flex', flexDirection: 'column' }}>
                    <TextField source="installer_data.phone_number" fullWidth={true} />
                    <TextField source="installer_data.email" fullWidth={true} />
                  </div>

                </div>
              </div>
            </div>
          </div>


          <div style={{ display: 'flex', flexDirection: 'column', padding: '10px' }}>
            <Button sx={{ fontSize: '12px', width: '200px', margin: '3px 0' }} fullWidth variant="outlined" color="primary" startIcon={<NetworkIcon />}>Mark as completed</Button>
            <Button sx={{ fontSize: '12px', width: '200px', margin: '3px 0' }} fullWidth variant="contained" color="secondary" startIcon={<MessagesIcon />}>Message customer</Button>
            <Button sx={{ fontSize: '12px', width: '200px', margin: '3px 0' }} fullWidth variant="contained" color="secondary" startIcon={<MessagesIcon />}>Message installer</Button>
            <Button sx={{ fontSize: '12px', width: '200px', margin: '3px 0' }} fullWidth variant="contained" color="secondary" startIcon={<CalendarIcon />}>Reschedule</Button>
          </div>

        </div>


        {/* Project details */}
        <div>
          <div style={{ textTransform: 'uppercase', fontWeight: 'bold', fontSize: '16px', borderBottomWidth: 1,  }}>project details</div>

          {/* Charger details */}
          <div style={{ textTransform: 'capitalize', fontWeight: 'bold', fontSize: '16px', borderBottomWidth: 1, width: '20%', marginTop: 20 }}>charger details</div>
          {chargerDetails.map((field) => (
            <div style={{marginLeft: 15}}>
              <div style={{ textTransform: 'capitalize', fontWeight: 'bold', fontSize: '14px' }}>{field.label}</div>
              <TextField style={{ fontSize: '14px', textTransform: 'capitalize' }} source={field.source} defaultValue='N/A' fullWidth={true} />
            </div>
          ))}

          {/* Home Details */}
          <div style={{ textTransform: 'capitalize', fontWeight: 'bold', fontSize: '16px', borderBottomWidth: 1, width: '20%', marginTop: 20 }}>home details</div>
          {homeDetails.map((field) => (
            <div style={{marginLeft: 15}}>
              <div style={{ textTransform: 'capitalize', fontWeight: 'bold', fontSize: '14px' }}>{field.label}</div>
              <TextField style={{ fontSize: '14px', textTransform: 'capitalize' }} source={field.source} fullWidth={true} />
            </div>
          ))}
        

        </div>

      </div>
    </Edit>
  )
}

export default JobTicketsEdit;