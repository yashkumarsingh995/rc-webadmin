import React, { useEffect, useState } from 'react'
import { usePermissions } from 'react-admin'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader } from '@mui/material'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Skeleton from 'react-loading-skeleton'
import { getDashboardData } from '../services/Admin'
import { isAdmin, isCompanyAdmin, isSupport } from '../Permissions'
import 'react-loading-skeleton/dist/skeleton.css'


const quickLinks = [
  {
    id: 1,
    name: 'Amazon',
    path: 'https://aws.amazon.com/',
  },
  {
    id: 2,
    name: 'Google Drive',
    path: 'https://www.google.com/drive/',
  },
  {
    id: 3,
    name: 'Google Mail',
    path: 'https://www.google.com/mail/',
  },
  {
    id: 4,
    name: 'Google Meet',
    path: 'https://www.google.com/meet/',
  },
  {
    id: 5,
    name: 'Zendesk',
    path: 'https://www.zendesk.com/',
  },
]

const cardStyle = {
  container: {
    margin: '10px',
  },
  card: {
    width: 175,
    height: 320,
    margin: '0.5em',
    display: 'inline-block',
    verticalAlign: 'top',
  },
  text: {
    fontSize: 15,
  },
  header: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
  } as React.CSSProperties,
  cardBody: {
    textTransform: 'uppercase',
    padding: '5px',
  } as React.CSSProperties,
  link: {
    bottom: '0px',
    textDecoration: 'underline',
    position: 'absolute',
  } as React.CSSProperties,
}

const tabs = ['Feed', 'Jobs', 'Payment', 'Rating', 'Status']

interface DashboardCardProps {
  entries?: any[]
  link?: string
  title?: string
}

const DashboardCard = (props: DashboardCardProps) => {
  const { entries = [...Array(5)], link, title } = props
  return (
    <Card style={cardStyle.card}>
      <CardHeader
        style={cardStyle.header}
        titleTypographyProps={{ variant: 'h6' }}
        title={title || <Skeleton />}
      />
      {entries.map((entry, index) => (
        <CardContent key={`card-content-${index}`} style={cardStyle.cardBody}>
          <Typography style={cardStyle.text}>
            {entry ?
              <>
                <span>{entry?.key}</span>
                <span style={{ float: 'right' }}>{entry?.value}</span>
              </>
              :
              <Skeleton />
            }

          </Typography>
        </CardContent>
      ))}
      <CardActions style={cardStyle.link}>
        <Typography style={cardStyle.text}>
          {link ? <Link to={''}>{link} »</Link> : <Skeleton />}
        </Typography>
      </CardActions>
    </Card>
  )
}

const CompanyAdminDashboard = ((props: any) => {
  const [currentTab, setCurrentTab] = useState(0)

  return (
    <div className="Dashboard">
      <Tabs
        indicatorColor="primary"
        onChange={(e, value) => setCurrentTab(value)}
        value={currentTab}>
        {tabs.map(tab => <Tab label={tab} />)}
      </Tabs>
    </div>
  )
})

/*
<Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
    <Tab label="Item One" {...a11yProps(0)} />
    <Tab label="Item Two" {...a11yProps(1)} />
    <Tab label="Item Three" {...a11yProps(2)} />
  </Tabs>
</Box>
<TabPanel value={value} index={0}>
  Item One
</TabPanel>
<TabPanel value={value} index={1}>
  Item Two
</TabPanel>
<TabPanel value={value} index={2}>
  Item Three
</TabPanel>
*/

const InstallerDashboard = ((props: any) => {
  const [chargersData, setChargersData] = useState<any>({})
  const [customerData, setCustomerData] = useState<any>({})
  const [installerData, setInstallerData] = useState<any>({})
  const [jobsData, setJobsData] = useState<any>({})
  const [supportData, setSupportData] = useState<any>({})

  useEffect(() => {
    getDashboardData('chargers').then(data => setChargersData(data))
    getDashboardData('customers').then(data => setCustomerData(data))
    getDashboardData('installers').then(data => setInstallerData(data))
    getDashboardData('jobs').then(data => setJobsData(data))
    getDashboardData('support').then(data => setSupportData(data))
  }, [])

  return (
    <div className="Dashboard" style={cardStyle.container}>
      <DashboardCard {...installerData} />
      <DashboardCard {...customerData} />
      <DashboardCard {...jobsData} />
      <DashboardCard {...supportData} />
      <DashboardCard {...chargersData} />
      {/* seperate card inline for quicklinks */}
      <Card style={cardStyle.card}>
        <CardHeader
          style={cardStyle.header}
          titleTypographyProps={{ variant: 'h6' }}
          title="Quicklinks"
        />
        {quickLinks.map(quickLink => (
          <CardContent key={quickLink.id} style={{ padding: '5px' }}>
            <Typography style={cardStyle.text}>
              <a href={quickLink['path']} target="_blank" rel="noopener noreferrer">
                {quickLink['name']} »
              </a>
            </Typography>
          </CardContent>
        ))}
      </Card>
    </div>
  )
})


export const Dashboard = ((props: any) => {
  const { permissions = [] } = usePermissions()
  if (isAdmin(permissions)) {
    /* Admin Dashboard */
    return <InstallerDashboard {...props} />
  } else if (isCompanyAdmin(permissions)) {
    /* Company Admin Dashboard */
    return <CompanyAdminDashboard {...props} />
  }
  return null
})
