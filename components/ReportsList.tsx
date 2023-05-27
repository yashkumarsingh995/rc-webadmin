import React, { useEffect } from 'react'
import { List, Datagrid, TextField, Button, DateField, SearchInput } from 'react-admin'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'
import { TransitionProps } from '@mui/material/transitions'
import Typography from '@mui/material/Typography'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import NativeSelect from '@mui/material/NativeSelect'
import { connect } from 'react-redux'
import { setMainCrumb, setSubCrumbs } from '../actions/breadcrumbs'

const styles = {
  header: {
    padding: '20px',
    fontSize: 30,
  },
  button: {
    width: '350px',
    height: '50px',
    margin: '10px',
    backgroundColor: '#171F58',
    color: 'white',
    fontSize: '15px',
  },
  dialog: {
    // width: '800px',
  },
}

const postFilters = [<SearchInput source="q" alwaysOn />]

const Title = () => {
  return <Typography style={styles.header}>Reports</Typography>
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />
})

const buttonColumns = [
  { text: 'new user report' },
  { text: 'new payment report' },
  { text: 'new analytics report' },
  { text: 'new job report' },
  { text: 'new referrals report' },
]

const optionColumns = [{}]

const Aside = () => {
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState('')

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const [value, setValue] = React.useState<Date | null>(new Date('2014-08-18T21:11:54'))

  const handleChange = (newValue: Date | null) => {
    setValue(newValue)
  }

  return (
    <div style={{ width: 200, margin: '1em' }}>
      {buttonColumns.map(col => (
        <Button
          onClick={() => {
            handleClickOpen()
          }}
          key={col.text}
          style={styles.button}
          variant="contained"
          label={col.text}
        />
      ))}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        fullWidth
        onClose={handleClose}
      >
        <DialogTitle>Set Report Criteria</DialogTitle>
        <DialogContent>
          <DialogContentText>Select Date Range</DialogContentText>
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            Date
          </InputLabel>
          <NativeSelect>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </NativeSelect>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            style={styles.button}
            onClick={handleClose}
            label="generate report"
          />
        </DialogActions>
      </Dialog>
    </div>
  )
}

const ReportsList = connect(null, { setMainCrumb, setSubCrumbs })((props: any) => {
  useEffect(() => {
    props.setMainCrumb({ name: 'reports', link: '/reports' })
  }, [])

  return (
    <List
      // title={<Title title='reports' />}
      style={{ width: '1000px' }}
      aside={<Aside />}
      {...props}
      filters={postFilters}
      exporter={false}
    >
      <>
        <Title />
        <Datagrid>
          <TextField source="type" />
          <DateField source="date" />
          <TextField source="time" />
          <TextField source="user" />
        </Datagrid>
      </>
    </List>
  )
})

export default ReportsList
