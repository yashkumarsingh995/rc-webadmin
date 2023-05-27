import { Grid, Typography } from '@mui/material';
import React from 'react'
import {
  ArrayField,
  BooleanInput,
  Datagrid,
  DateInput,
  DeleteWithConfirmButton,
  Edit,
  SaveButton,
  SimpleForm,
  TextField,
  TextInput,
  Toolbar,
  useRecordContext,
} from 'react-admin'

const formStyle = {
  container: {
    maxWidth: 1000,
    // marginTop: 30,
  },
  header: {
    textTransform: 'uppercase',
    fontSize: 30,
    margin: 25,
  } as React.CSSProperties,
  field: {
    maxWidth: 400,
  },
  largeField: {
    maxWidth: 650,
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
      <DeleteWithConfirmButton
        confirmTitle={`Delete User: ${record.name}?`}
        confirmContent="You will not be able to recover this User. Are you sure?"
      />
    </Toolbar>
  )
}

const sources = ['name', 'Username', 'UserStatus', 'phone_number', 'email']

const UsersEdit = (props: any) => {
  return (
    <Edit {...props}>
      <SimpleForm toolbar={<EditToolbar />}>
        <Typography style={formStyle.header}>Edit User</Typography>
        <Grid container style={formStyle.container} >
          {sources.map(source => (
            <Grid item xs={6}>
              {source === 'Username' || source === 'UserStatus'
                ? <TextInput style={formStyle.field} disabled source={source} fullWidth={true} />
                : <TextInput style={formStyle.field} source={source} fullWidth={true} />
              }
            </Grid>
          ))}
          <Grid item xs={12}>
            <BooleanInput disabled source="email_verified" />
            <BooleanInput disabled source="phone_number_verified" />
          </Grid>
          <ArrayField source="groups">
            <Datagrid>
              <TextField source="GroupName" fullWidth={true} />
              <TextField source="Description" fullWidth={true} />
              <TextField source="UserPoolId" fullWidth={true} />
            </Datagrid>
          </ArrayField>
          <DateInput disabled source="UserCreateDate" />
          <DateInput disabled source="UserLastModifiedDate" label='last modified' />
          <TextInput disabled source="id" />
        </Grid>
      </SimpleForm>
    </Edit>
  )
}
export default UsersEdit
