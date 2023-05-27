import { Grid, TextField as MuiTextField, Typography } from '@mui/material'
import React from 'react'
import {

  SimpleForm,
  SelectInput, TextInput, required,
  FormTab,
  PasswordInput,
  List,
  Title,
  Datagrid,
  TextField,
  Create,
  Toolbar,
  Button,
  useNotify,
  useRedirect,
  SaveButton,
  useRecordContext,
  DeleteWithConfirmButton,
} from 'react-admin'

const labels = ['first_name', 'last_name', 'email', 'phone_number']
const formStyle = {
  container: {
    maxWidth: 750,
    // marginTop: 30,
  },
  header: {
    textTransform: 'uppercase',
    fontSize: 30,
    margin: 25,
  } as React.CSSProperties,
  field: {
    width: 300,
  },
  largeField: {
    width: 700,
  },
  button: {
    width: '350px',
    height: '50px',
    margin: '10px',
    backgroundColor: '#171F58',
    color: 'white',
    fontSize: '15px',
  },
}

const EditToolbar = props => {
  const record = useRecordContext();
  return (
    <Toolbar {...props}>
      <SaveButton style={formStyle.button} />
    </Toolbar>
  )
}

const UsersCreate = (props: any) => (
  <Create {...props}
  >
    <SimpleForm toolbar={<EditToolbar />}>
      <Typography style={formStyle.header}>Create User</Typography>
      <Grid container style={formStyle.container} rowSpacing={1} >
        {labels.map(label => (
          <Grid item xs={6}>
            <TextInput validate={required()} style={formStyle.field} source={label} />
          </Grid>
        ))}
        <Grid item xs={12}>
          <Typography style={formStyle.largeField}>
            Email will be the username. An email will be sent to the user with information to
            access their new account
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <SelectInput
            source="group"
            choices={[
              { id: 'admin', name: 'Admin' },
              { id: 'agent', name: 'Agent' },
              { id: 'csr', name: 'Customer Service' },
            ]}
            validate={required()}
            style={formStyle.largeField}
          />
        </Grid>
      </Grid>
    </SimpleForm>
  </Create>
)
export default UsersCreate
