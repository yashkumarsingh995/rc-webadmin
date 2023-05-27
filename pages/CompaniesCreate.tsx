import { Card, CardContent, CardHeader, Grid, styled, TextField as MuiTextField, Typography } from '@mui/material'
import React from 'react'
import {
  SimpleForm,
  TextInput,
  Create,
  Toolbar,
  SaveButton,
  useRecordContext,
} from 'react-admin'
import cardStyle from '../styles/CardStyle'
import { generalStyles, formStyle } from '../styles/General'

const CardContentNoPadding = styled(CardContent)(`
  padding: 0;
  &:last-child {
    padding-bottom: 0;
  }
`)

const companyColumns = [
  { label: 'Company Name', source: 'name' },
  { label: 'email', source: 'email' },
  { label: 'Phone Number', source: 'phone_number' },
  { label: 'Address Line 1', source: 'address_1' },
  { label: 'Address Line 2', source: 'address_2' },
  { label: 'city', source: 'city' },
  { label: 'state', source: 'state' },
  { label: 'zip', source: 'zip' },
]

const accountColumns = [
  { label: 'Name', source: 'account[name]' },
  { label: 'Email', source: 'account[email]' },
  { label: 'Phone Number', source: 'account[phone_number]' },
  { label: 'Title', source: 'account[title]' }
]

const EditToolbar = props => {
  const record = useRecordContext();
  console.log(record)
  return (
    <Toolbar {...props}>
      <SaveButton style={formStyle.button} />
    </Toolbar>
  )
}

const CompaniesCreate = (props: any) => (
  <Create {...props}>
    <SimpleForm toolbar={<EditToolbar />}>
      <Typography style={generalStyles.pageTitle}>Add New Company</Typography>
      <Grid style={cardStyle.container} className="sample-grid" container spacing={3}>
        <Card style={cardStyle.card}>
          <CardHeader
            titleTypographyProps={{ variant: 'h6' }}
            title="Company Info"
          />
          {companyColumns.map(col => (
            <CardContentNoPadding>
              <TextInput
                key={col.source}
                style={cardStyle.inputField}
                label={col.label}
                source={col.source}
                defaultValue={col.source}
                fullWidth={true}
              />
            </CardContentNoPadding>
          ))}
        </Card>
        <Card style={cardStyle.card}>
          <CardHeader
            titleTypographyProps={{ variant: 'h6' }}
            title="Account Owner"
          />
          {accountColumns.map(col => (
            <CardContentNoPadding>
              <TextInput
                key={col.source}
                style={cardStyle.inputField}
                label={col.label}
                source={col.source}
                // defaultVaue={col.label}
                fullWidth={true}
              />
            </CardContentNoPadding>
          ))}
        </Card>
      </Grid>
    </SimpleForm>
  </Create>
)
export default CompaniesCreate
