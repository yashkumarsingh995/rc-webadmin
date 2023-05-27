import { Card, CardHeader, CardContent, styled, Grid } from '@mui/material'
import cardStyle from '../styles/CardStyle'
import { Edit, TextInput, useRecordContext } from 'react-admin'

const CardContentNoPadding = styled(CardContent)(`
  padding: 0;
  &:last-child {
    padding-bottom: 0;
  }
`)

const accountColumns = [
  { label: 'Name', source: 'name' },
  { label: 'email', source: 'email' },
  { label: 'phone_number', source: 'phone_number' },
  { label: 'Address Line 1', source: 'addressOne' },
  { label: 'Address Line 2', source: 'addressTwo' },
  { label: 'city', source: 'city' },
  { label: 'state', source: 'state' },
  { label: 'region', source: 'zip' },
]

const companyInstallerColumns = [
  { label: 'Company Name', source: 'company.name' },
  { label: 'email', source: 'company.email' },
  { label: 'phone_number', source: 'company.phone_number' },
  { label: 'Address Line 1', source: 'company.address_1' },
  { label: 'Address Line 2', source: 'company.address_2' },
  { label: 'city', source: 'company.city' },
  { label: 'state', source: 'company.state' },
  { label: 'region', source: 'company.zip' },
]

// const individualCompanyColumns = [
//   { label: 'Company Name', source: 'companyName' },
//   { label: 'email', source: 'company.email' },
//   { label: 'phone_number', source: 'company.phone_number' },
//   { label: 'Address Line 1', source: 'company.address_1' },
//   { label: 'Address Line 2', source: 'company.address_2' },
//   { label: 'city', source: 'company.city' },
//   { label: 'state', source: 'company.state' },
//   { label: 'region', source: 'company.zip' },
// ]

export default function AccountInfo() {
  const data = useRecordContext()
  return (
    <Edit>
      <Grid className="Grid__installers-edit" container spacing={3}>
        <Card className="Card__company-info" style={cardStyle.card}>
          <CardHeader
            titleTypographyProps={{ style: cardStyle.cardHeader, fontSize: 16, marginTop: 1 }}
            title="account owner"
          />
          {accountColumns.map(col => {
            if (data && data[col.source]) {
              return (
                <CardContentNoPadding>
                  <TextInput
                    key={col.source}
                    style={cardStyle.inputField}
                    // label={col.label}
                    source={col.source}
                    fullWidth={true}
                  />
                </CardContentNoPadding>
              )
            }
          })}
        </Card>
        {data.company_id ? <Card style={cardStyle.card}>
          <CardHeader
            titleTypographyProps={{ style: cardStyle.cardHeader, fontSize: 16, marginTop: 1 }}
            title="company info"
          />
          {companyInstallerColumns.map(col => (
            <CardContentNoPadding>
              <TextInput
                key={col.source}
                style={cardStyle.inputField}
                label={col.label}
                source={col.source}
                fullWidth={true}
              />
            </CardContentNoPadding>
          ))}
        </Card>
          : null
          //   <Card style={cardStyle.card}>
          //   <CardHeader
          //     titleTypographyProps={{ style: cardStyle.cardHeader, fontSize: 16, marginTop: 1 }}
          //     title="company info"
          //   />
          //   {individualCompanyColumns.map(col => (
          //     <CardContentNoPadding>
          //       <TextInput
          //         key={col.source}
          //         style={cardStyle.inputField}
          //         label={col.label}
          //         source={col.source}
          //         fullWidth={true}
          //       />
          //     </CardContentNoPadding>
          //   ))}
          // </Card>
        }
      </Grid>
    </Edit>
  )
}
