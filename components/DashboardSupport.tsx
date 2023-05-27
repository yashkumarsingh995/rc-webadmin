import * as React from 'react'
import { CSSProperties } from 'react'
import { Card, CardContent, CardHeader } from '@mui/material'
import { List, useGetList } from 'react-admin'
import CardActions from '@mui/material/CardActions'
import { Link } from 'react-router-dom'
import { ClassNames } from '@emotion/react'
import { typography } from '@mui/system'
import Typography from '@mui/material/Typography'
import { setMainCrumb, setSubCrumbs } from '../actions/breadcrumbs'
import { connect } from 'react-redux'
import { env } from '../env'
import axios from 'axios'

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

export const DashboardSupport = connect(null, { setMainCrumb, setSubCrumbs })((props: any) => {
  const [data, setData] = React.useState<any[]>([])
  React.useEffect(() => {
    props.setMainCrumb({ name: 'dashboard', link: '/dashboard' })
    props.setSubCrumbs([{ name: '', link: '' }])

    const getData = async () => {
      try {
        const response = await axios.get(`${env.rcApiUrl}/dashboard`)
        setData(response.data.cards)
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [])

  return (
    <div style={cardStyle.container}>
      {data.map(stat => (
        <Card key={stat['id']} style={cardStyle.card}>
          <CardHeader
            style={cardStyle.header}
            titleTypographyProps={{ variant: 'h6' }}
            title={stat['statName']}
          />
          {stat['entries'].map(entry => (
            <CardContent key={entry['lineName']} style={cardStyle.cardBody}>
              <Typography style={cardStyle.text}>
                <span>{entry['lineName']}</span>
                <span style={{ float: 'right' }}>{entry['number']}</span>
              </Typography>
            </CardContent>
          ))}
          <CardActions style={cardStyle.link}>
            <Typography style={cardStyle.text}>
              <Link to={stat['path']}>{stat['link']} »</Link>
            </Typography>
          </CardActions>
        </Card>
      ))}
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
