import { Card, CardHeader, CardContent, Grid, Typography, styled, Box } from '@mui/material'
import { useEffect, useState } from 'react'
import { Button, DateField, DateInput, ImageField, ImageInput, Loading, TextField, TextInput, useGetList, useGetOne, useRecordContext } from 'react-admin'
import { useParams } from 'react-router-dom'
import { useGetIdentity } from 'react-admin'
import officialColors from '../styles/Colors'
import Api from '../Api'
import { CloseIcon, CheckIcon } from '../components/Icons'


const cardStyle = {
  card: {
    width: 400,
    marginLeft: 30,
    marginTop: 30,
  },
  header: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: 20,
  } as React.CSSProperties,
  certifiedContainer: {
    borderWidth: 1,
    borderColor: officialColors.darkBlue,
    width: 400,
    marginTop: 30,

    // margin: 1
  },
  blueButton: {
    backgroundColor: '#171F58',
    color: 'white',
    fontSize: 15,
    height: 50,
    margin: 10,
    width: 350,
    // zIndex: 10
  },
  transparentButton: {
    color: officialColors.darkBlue,
    fontSize: 15,
    height: 50,
    margin: 10,
    width: 350,
    zIndex: 1,
    borderColor: officialColors.darkBlue
  },
  backgroundContainer: {
    borderWidth: 1,
    borderColor: officialColors.darkBlue,
    width: 400,
    marginTop: 30,
    marginLeft: 30,
    maxHeight: 300,
  }
}

const CardContentNoPadding = styled(CardContent)(`
  padding: 0;
  &:last-child {
    padding-bottom: 0;
  }
`)

export default function Certification() {
  const { id } = useParams()
  const { identity, isLoading } = useGetIdentity()
  const record = useRecordContext()
  const api = new Api()
  const [licenseUrls, setLicenseUrls] = useState([])
  const [bondingUrls, setBondingUrls] = useState([])
  const [insuranceUrls, setInsuranceUrls] = useState([])
  const [loading, setLoading] = useState(false)

  const licenseFields = [
    { label: "state licese number", source: 'license.licenseNumber' },
  ]

  const insuranceFields = [
    { label: 'Insured Name / Business', source: 'insurance.insuredName' },
    { label: 'State', source: 'insurance.insuredState' },
    { label: 'Insurance Company / Agency', source: 'insurance.insuranceCompany' },
    { label: 'Agent Phone Number', source: 'insurance.agentPhone' },
    { label: 'Policy Number', source: 'insurance.policyNumber' },
  ]

  const bondingFields = [
    { label: 'Insured Name / Business', source: 'bonding.bondingName' },
    { label: 'Insurance Company / Agency', source: 'bonding.bondingCompany' },
    { label: 'Agent Phone Number', source: 'bonding.agentPhone' },
    { label: 'Policy Number', source: 'bonding.policyNumber' },
    { label: 'Bond Amount', source: 'bonding.bondAmount' },
  ]

  useEffect(() => {
    const getData = async () => {
      setLoading(true)
      record.license?.license_img_urls?.forEach(async imgPath => {
        const licensePath = await api.getResource(imgPath)
        setLicenseUrls([...licenseUrls, licensePath])
      })
      record.bonding?.bonding_img_urls?.forEach(async imgPath => {
        const bondingPath = await api.getResource(imgPath)
        setBondingUrls([...bondingUrls, bondingPath])
      })
      record.insurance?.insurance_img_urls?.forEach(async imgPath => {
        const insurancePath = await api.getResource(imgPath)
        setInsuranceUrls([...insuranceUrls, insurancePath])
      })
      setLoading(false)
    }
    getData()
  }, [])

  const handleCertify = async () => {
    const update = record.license ? record.license : {}
    update.verified = true
    update.certifiedBy = identity.id
    update.manualCertification = true
    console.log(update)
    await api.updateUser(id, { license: { ...update } })
  }

  if (loading && isLoading) {
    return <Loading />
  }
  else {
    return (
      <Grid className="certification-grid" container spacing={1}>
        <Card style={cardStyle.card}>
          <CardHeader
            titleTypographyProps={{ variant: 'h6' }}
            style={cardStyle.header}
            title="state license number"
          />
          {licenseFields.map(col => (
            <CardContentNoPadding>
              <TextInput key={col.source} label="state licese number" source={col.source} fullWidth={true} helperText={false} />
            </CardContentNoPadding>
          ))}
          <Typography sx={{ marginTop: 1 }}>Expiration date</Typography>
          <DateInput label={'license expiration'} source={'license.licenseEndDate'} />
          <CardContent>
            {licenseUrls?.map((path, index) => {
              return (
                <>
                  <Typography sx={{ textDecorationLine: 'underline', marginTop: 1, marginBottom: 1 }}>
                    <a key={`image-link-${index}`} href={path} target="_blank" rel="noopener noreferrer">
                      View license image {index + 1}
                    </a>
                  </Typography>
                </>
              )
            })}
            <ImageInput
              source="pictures"
              label="Upload a copy of your state license"
              accept="image/*"
            >
              <ImageField source="src" label="upload" />
            </ImageInput>

          </CardContent>
          <Card style={cardStyle.certifiedContainer}>
            <CardHeader
              titleTypographyProps={{ variant: 'h6' }}
              style={cardStyle.header}
              title="state license information"
            />
            <CardContentNoPadding sx={{ marginLeft: '5%' }}>
              <Box sx={{ justifyContent: 'space-between', display: 'flex', m: 1, p: 1 }}>
                <Typography>verifiable:</Typography>
                <Typography>
                  {record.license?.verifiable ? <CheckIcon /> : <CloseIcon />}
                </Typography>
              </Box>

              <Box sx={{ justifyContent: 'space-between', display: 'flex', m: 1, p: 1 }}>
                <Typography>verified:</Typography>
                <Typography>
                  {record.license?.verified ? <CheckIcon /> : <CloseIcon />}
                </Typography>
              </Box>
              <Box sx={{ justifyContent: 'space-between', display: 'flex', m: 1, p: 1 }}>
                <Typography>manual link:</Typography>
                <Typography>
                  {record.license?.manual_link ? <CheckIcon /> : <CloseIcon />}
                </Typography>
              </Box>
              <Box sx={{ justifyContent: 'space-between', display: 'flex', m: 1, p: 1 }}>
                <Typography>Last submission: <DateField source={'license.lastAttemptedAt'} /></Typography>
              </Box>
              <Box sx={{ justifyContent: 'space-between', display: 'flex', m: 1, p: 1 }}>
                <Typography>state:</Typography>
                <TextField sx={{mx: 1,}}source={'state'} />
              </Box>
              {record.license?.verified ? null :
                <>
                  {/* <Button style={cardStyle.blueButton} label={'certify'} onClick={() => api.submitUserCertification(id, { license: { ...record.license } })} /> */}
                  <Button style={cardStyle.blueButton} label={'certify'} onClick={handleCertify} />
                  {/* <Button style={cardStyle.transparentButton} variant="outlined" label={'uncertify'} /> */}
                </>
              }
            </CardContentNoPadding>

          </Card>
        </Card>
        <Card style={cardStyle.card}>
          <CardHeader
            titleTypographyProps={{ variant: 'h6' }}
            style={cardStyle.header}
            title="business insurance information"
          />
          {insuranceFields.map(col => (
            <CardContentNoPadding>
              <TextInput key={col.source} label={col.label} source={col.source} fullWidth={true} helperText={false} />
            </CardContentNoPadding>
          ))}
          <Typography sx={{ marginTop: 1 }}>Effective dates</Typography>
          <Grid container direction={"row"}>
            <DateInput sx={{ padding: 1, width: '45%' }} label={'insurance start'} source={'insurance.insuranceStartDate'} />
            <Typography sx={{ width: '5%', zIndex: 1, margin: 1, alignSelf: 'center', fontSize: 14, textTransform: 'lowercase' }}>to</Typography>
            <DateInput sx={{ padding: 1, width: '45%' }} label={'insurance end'} source={'insurance.insuranceEndDate'} />
          </Grid>
          <CardContent>
            {insuranceUrls?.map((path, index) => {
              return (
                <>
                  <Typography>
                    <a key={`image-link-${index}`} href={path} target="_blank" rel="noopener noreferrer">
                      View insurance image {index + 1}
                    </a>
                  </Typography>
                </>
              )
            })
            }
            <ImageInput
              source="pictures"
              label="Upload a copy of your insurance certificate"
              accept="image/*"
            >
            </ImageInput>
          </CardContent>
        </Card>
        <Card style={cardStyle.card}>
          <CardHeader
            titleTypographyProps={{ variant: 'h6' }}
            style={cardStyle.header}
            title="bonding information"
          />
          {bondingFields.map(col => (
            <CardContentNoPadding>
              <TextInput key={col.source} label={col.label} source={col.source} fullWidth={true} helperText={false} />
            </CardContentNoPadding>
          ))}
          <Typography sx={{ marginTop: 1 }}>Effective dates</Typography>
          <Grid container direction={"row"}>
            <DateInput sx={{ padding: 1, width: '45%' }} label={'bonding start'} source={'bonding.bondingStartDate'} />
            <Typography sx={{ width: '5%', zIndex: 1, margin: 1, alignSelf: 'center', fontSize: 14, textTransform: 'lowercase' }}>to</Typography>
            <DateInput sx={{ padding: 1, width: '45%' }} label={'bonding end'} source={'bonding.bondingEndDate'} />
          </Grid>
          <CardContent>
            {bondingUrls?.map((path, index) => {
              return (
                <>
                  <Typography sx={{ textDecorationLine: 'underline', marginTop: 1, marginBottom: 1 }}>
                    <a key={`image-link-${index}`} href={path} target="_blank" rel="noopener noreferrer">
                      View bonding image {index + 1}
                    </a>
                  </Typography>
                </>
              )
            })}
            <ImageInput
              source="pictures"
              label="Upload a copy of your bonding certificate"
              accept="image/*"
            >
              <ImageField source="src" label="upload" />
            </ImageInput>
          </CardContent>
        </Card>

        <Card style={cardStyle.backgroundContainer}>
          <CardHeader
            titleTypographyProps={{ variant: 'h6' }}
            style={cardStyle.header}
            title="background and attestation"
          />
          <CardContentNoPadding sx={{ marginLeft: '5%' }}>
            <Box sx={{ justifyContent: 'space-between', display: 'flex', m: 1, p: 1 }}>
              <Typography>attestation Agreed:
              </Typography>
              <Typography>
                {record.attestation?.agree ? <CheckIcon /> : <CloseIcon />}
              </Typography>
            </Box>
            <Box sx={{ justifyContent: 'space-between', display: 'flex', m: 1, p: 1 }}>
              <Typography>background check status:
              </Typography>
              <Typography>
                {record.background_check?.status === 'confirmed' ? <CheckIcon /> : <CloseIcon />}
              </Typography>
            </Box>
          </CardContentNoPadding>
        </Card>
      </Grid>
    )
  }
}
