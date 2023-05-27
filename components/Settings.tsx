import React from 'react'
import { Card, CardHeader, CardContent, Typography } from '@mui/material'
import Switch from '@mui/material/Switch'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import ServiceOptions from './settings/ServiceOptions'
import styles from '../styles/SettingsStyles'
import ServiceArea from './settings/ServiceArea'
import Bio from './settings/Bio'

const ColorToggleButton = props => {
  const [alignment, setAlignment] = React.useState('web')

  const handleChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    setAlignment(newAlignment)
  }

  return (
    <ToggleButtonGroup color="primary" value={alignment} exclusive onChange={handleChange}>
      <ToggleButton value="annual">annual</ToggleButton>
      <ToggleButton selected={props.check} value="monthly">
        monthly
      </ToggleButton>
    </ToggleButtonGroup>
  )
}

const ControlledSwitches = props => {
  const [checked, setChecked] = React.useState(true)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked)
  }

  return (
    <Switch
      checked={props.check}
      onChange={handleChange}
      inputProps={{ 'aria-label': 'controlled' }}
    />
  )
}

const quickLinks = [
  {
    id: 1,
    name: 'Google Drive',
    path: 'https://www.google.com/drive/',
  },
  {
    id: 2,
    name: 'Google Mail',
    path: 'https://www.google.com/mail/',
  },
  {
    id: 3,
    name: 'Zendesk',
    path: 'https://www.zendesk.com/',
  },
]

const titles = ['account settings', 'referral network', 'priority placement', 'quicklinks', 'service area', 'service options', 'user bio']

export default function Settings(props) {
  const data = props.source
  return (
    <div style={{ flexDirection: 'column' }}>
      {/* <Typography style={styles.header}>{titles[0]}</Typography>
      <Card style={styles.cardContainer}>
          <CardHeader
            titleTypographyProps={{ variant: 'h6' }}
            style={styles.header}
            title={titles[1]}
          />
          <CardContent>
            <Typography style={styles.price}>$29.99/mo</Typography>
            <ControlledSwitches check={data.referred} />
            <ColorToggleButton check={data.referred} />
          </CardContent>
        </Card>
        <Card style={styles.cardContainer}>
          <CardHeader
            titleTypographyProps={{ variant: 'h6' }}
            style={styles.header}
            title={titles[2]}
          />
          <CardContent>
            <Typography style={styles.price}>$29.99/mo</Typography>
            <ControlledSwitches check={data.preferred} />
            <ColorToggleButton check={data.preferred} />
          </CardContent>
        </Card> */}
      {/* Quick links */}
      {/* <Card style={styles.linkCard}>
          <CardHeader
            style={styles.header}
            titleTypographyProps={{ variant: 'h6' }}
            title={titles[3]}
          />
          {quickLinks.map(quickLink => (
            <CardContent key={quickLink.id} style={{ padding: '5' }}>
              <Typography style={styles.cardText}>
                <a href={quickLink['path']} target="_blank" rel="noopener noreferrer">
                  {quickLink['name']} »
                </a>
              </Typography>
            </CardContent>
          ))}
        </Card> */}

      {/* service options/area */}
      <Card style={styles.cardContainer}>
        <CardHeader
          titleTypographyProps={{ variant: 'h6' }}
          style={styles.header}
          title={titles[4]}
        />
        <CardContent>
          <ServiceArea />
        </CardContent>
      </Card>

      <Card style={styles.cardContainer}>
        <CardHeader
          titleTypographyProps={{ variant: 'h6' }}
          style={styles.header}
          title={titles[5]}
        />
        <CardContent>
          <ServiceOptions />
        </CardContent>
      </Card>
      <Card style={styles.cardContainer}>
        <CardHeader
          titleTypographyProps={{ variant: 'h6' }}
          style={styles.header}
          title={titles[6]}
        />
        <CardContent>
          <Bio />
        </CardContent>
      </Card>
    </div>
  )
}
