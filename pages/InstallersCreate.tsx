import { Card, CardContent, CardHeader, Grid, styled, TextField as MuiTextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import {
  SimpleForm,
  TextInput, required,
  Create,
  Toolbar,
  SaveButton,
  useRecordContext,
  usePermissions,
  useGetIdentity,
  useGetOne,
  Loading,
  useRedirect,
  email,
} from 'react-admin'
import { env } from '../env'


import cardStyle from '../styles/CardStyle'

const companyAdminGroups = [
  env.ownerAdminGroup,
  env.managerGroup,
]

// const labels = ['given_name', 'family_name', 'email', 'phone_number']

const formStyle = {
  container: {
    maxWidth: 750,
    // marginTop: 30,
  },
  header: {
    textTransform: 'uppercase',
    fontSize: 25,
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

const CardContentNoPadding = styled(CardContent)(`
  padding: 0;
  &:last-child {
    padding-bottom: 0;
  }
`)

const installerDetails = [
  { label: 'first name', source: 'first_name', required: true },
  { label: 'last name', source: 'last_name', required: true },
  { label: 'email', source: 'email', required: true, validate: email('Please choose a valid email')},
  { label: "phone number", source: "phone_number", required: true },
  { label: 'address 1', source: 'address_1', required: true },
  { label: 'address 2', source: 'address_2', required: false },
  { label: 'city', source: 'city', required: true },
  { label: 'state', source: 'state', required: true },
  { label: "zip", source: "zip", required: true },
]
let companyFields

const transformUser = data => ({
  ...data,
  company_id: companyFields[0].source,
  company_name: companyFields[1].source
});

const CreateToolBar = props => {
  const record = useRecordContext();
  return (
    <Toolbar {...props}>
      <SaveButton transform={transformUser} label='create' type="button" style={formStyle.button} />
    </Toolbar>
  )
}

const InstallersCreate = (props: any) => {
  const { permissions } = usePermissions();
  let id = ''
  const { identity, isLoading: identityLoading } = useGetIdentity();

  if (!identityLoading) {
    id = identity.id.toString()
    console.log(id)
  }

  const { data: user, isLoading, error } = useGetOne('admins', { id }, { enabled: !identityLoading && id !== null });
  if (user) {
    console.log(user)
    companyFields = [
      { label: "Company Id", source: user.company_id },
      { label: "Company Name", source: user.company, },
      // { label: "Company Email", source: user.email },
      // { label: "Company Phone", source: user.phone_number },
    ]
  }

  return (
    <Create {...props}>
      <SimpleForm toolbar={<CreateToolBar />}>
        <Typography style={formStyle.header}>Add New Installer</Typography>
        <Grid style={cardStyle.container} className="sample-grid" container spacing={3}>
          <Card style={cardStyle.card}>
            <CardHeader
              titleTypographyProps={{ variant: 'h6' }}
              title="new installer details"
              style={{ textTransform: 'uppercase' }}
            />
            {installerDetails.map(field => (
              <CardContentNoPadding>
                <TextInput
                  key={`input-${field.label}`}
                  style={cardStyle.inputField}
                  label={field.label}
                  source={field.source}
                  required={field.required}
                  fullWidth={true}
                  validate={field.validate}
                />
              </CardContentNoPadding>
            ))}
          </Card>
          <Card style={cardStyle.card}>
            <CardHeader
              titleTypographyProps={{ variant: 'h6' }}
              title="company info"
              style={{ textTransform: 'uppercase' }}
            ></CardHeader>
            {companyFields ? companyFields.map(col => (
              <CardContentNoPadding>
                <TextInput
                  disabled
                  key={`input-${col.label}`}
                  style={cardStyle.inputField}
                  label={col.label}
                  source={col.source}
                  fullWidth={true}
                  defaultValue={col.source}
                />
              </CardContentNoPadding>
            )) : null}
          </Card>
        </Grid>
      </SimpleForm>
    </Create>
  )
  // }
  // else return <Loading />
}

export default InstallersCreate;