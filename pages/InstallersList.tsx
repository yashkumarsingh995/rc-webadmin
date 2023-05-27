import { useEffect } from 'react'
import { List, Datagrid, TextField, FunctionField, SearchInput, CreateButton, TopToolbar, useRecordContext, DateField, BooleanField } from 'react-admin'
import { connect } from 'react-redux'
import Rating from '@mui/material/Rating'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { setMainCrumb, setSubCrumbs } from '../actions/breadcrumbs'
import cardStyle from '../styles/CardStyle'
import { CloseIcon, CheckIcon } from '../components/Icons'

const installersColumns = [
  { label: 'name', source: 'name' },
  { label: 'email', source: 'email' },
  // { label: 'type', source: 'type' },
  { label: 'id', source: 'id' },
  { label: 'state', source: 'state' },
  { label: 'region', source: 'zip' },
  { label: 'jobs', source: 'jobs' },
]

const installerTypes = ['residential', 'commerical']

const postFilters = [<SearchInput source="q" alwaysOn />]

const InstallersListActions = () => (
  <TopToolbar>
    <CreateButton style={{ ...cardStyle.button, position: 'absolute' }} label='create installer' />
  </TopToolbar>
)

const JobsField = (props: any) => {
  const record = useRecordContext();
  if (record.license && record.license.verifiable) {
    console.log('verified installer', record)
  }
  return (
    record.jobs && Array.isArray(record.jobs) ? <div style={{ textAlign: 'center', width: 40 }}>{record.jobs.length}</div>
      : <div style={{ textAlign: 'center' }}>-</div>)
}

const InstallersList = connect(null, { setMainCrumb, setSubCrumbs })((props: any) => {
  useEffect(() => {
    props.setMainCrumb({ name: 'installers', link: '/installers' })
  }, [])

  const handleChange = value => {
    const { filterValues, setFilters } = props
    setFilters({ ...filterValues, currentTab: value.id });
  }

  const { filterValues } = props

  return (
    <List {...props}
      exporter={false}
      filters={postFilters}
      empty={false}
      actions={<InstallersListActions />}
    >
      <>
        {/* <Typography style={cardStyle.header}>Residential Installers</Typography> */}
        <Tabs
          indicatorColor="primary" onChange={handleChange}
          value={filterValues?.currentTab || installerTypes[0]}
        >
          {installerTypes.map(t => <Tab disabled={t === installerTypes[1]} key={t} label={t} value={t} />)}
        </Tabs>
        <Datagrid rowClick="edit" bulkActionButtons={false} style={{ justifyContent: 'center' }} >
          {installersColumns.map(col => {
            if (col.label === 'jobs') {
              return <JobsField key={col.source} label={col.label} />
            }
            else {
              return <TextField key={col.source} label={col.label} source={col.source} />
            }
          })}
          <FunctionField
            source='rating'
            label="rating"
            render={record => <Rating name="read-only" value={record.rating} readOnly />}
          />
          <FunctionField
            label="onboard"
            render={(record) => {
              return record.finished_onboarding ?
                <div style={{ textAlign: 'center' }}>
                  <CheckIcon />
                </div>
                : <div style={{ textAlign: 'center' }}>
                  <CloseIcon />
                </div>
            }}
          />
          <FunctionField
            label="cert"
            render={(record) => {
              // return record.license?.verified && record.backg ?
              return record.license?.verified && record.backgroundCheck ?
                <div style={{ textAlign: 'center' }}>
                  <CheckIcon />
                </div>
                : <div style={{ textAlign: 'center' }}>
                  <CloseIcon />
                </div>
            }}
          />
          <FunctionField
            label="sched"
            render={(record) => {
              return record.scheduling ?
                <div style={{ textAlign: 'center' }}>
                  <CheckIcon />
                </div>
                : <div style={{ textAlign: 'center' }}>
                  <CloseIcon />
                </div>
            }}
          />
          {/* <FunctionField
            source="preferred"
            label="preferred"
          render={(record) => {
              // console.log('record=', record);
              return record.preferred === true ? <CheckIcon style={{ color: '#94D034' }} /> : 'no'
            }}
          /> */}
          {/* <DateField label={'created at'} source={'UserCreateDate'} /> */}
        </Datagrid>
      </>
    </List>
  )
})

export default InstallersList;
