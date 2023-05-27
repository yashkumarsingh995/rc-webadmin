import React, { useEffect } from 'react'
import { CreateButton, FunctionField, List, Datagrid, TextField, SearchInput, TopToolbar } from 'react-admin'
import { connect } from 'react-redux'
import Rating from '@mui/material/Rating'
import Typography from '@mui/material/Typography'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import CheckIcon from '@mui/icons-material/Check'

import { setMainCrumb, setSubCrumbs } from '../actions/breadcrumbs'
import cardStyle from '../styles/CardStyle'
import { generalStyles } from '../styles/General'

const installerTypes = ['residential', 'commerical']

// const postFilters = [<SearchInput source="q" style={{ ...generalStyles.search, bottom: -80 }} alwaysOn />]
const postFilters = [<SearchInput source="q" alwaysOn />]

const CompaniesListActions = () => (
  <TopToolbar>
    <CreateButton style={{ ...cardStyle.button, position: 'absolute' }} label='create company' />
  </TopToolbar>
)

const CustomersList = connect(null, { setMainCrumb, setSubCrumbs })((props: any) => {
  useEffect(() => {
    props.setMainCrumb({ name: 'companies', link: '/companies' })
  }, [])

  const handleChange = value => {
    const { filterValues, setFilters } = props
    setFilters({ ...filterValues, currentTab: value.id });
  }

  const { filterValues } = props

  return (
    <List {...props}
      actions={<CompaniesListActions />}
      exporter={false}
      bulkActionButtons={false}
      filters={postFilters}>
      <>
        {/* <Typography style={generalStyles.pageTitle}>Companies</Typography> */}
        <Tabs
          indicatorColor="primary"
          onChange={handleChange}
          value={filterValues?.currentTab || installerTypes[0]}>
          {installerTypes.map(t => <Tab disabled={t === installerTypes[1]} key={t} label={t} value={t} />)}
        </Tabs>

        <Datagrid rowClick="edit">
          <TextField source="id" />
          <TextField source="name" />
          <TextField source="city" />
          <TextField source="state" />
          <FunctionField
            source='rating'
            label="rating"
            render={record => <Rating name="read-only" value={record.rating} readOnly />}
          />
          <FunctionField
            source="preferred"
            label="preferred"
            render={record =>
              record.preferred === true ? <CheckIcon style={{ color: '#94D034' }} /> : ''
            }
          />
          <FunctionField
            source="referred"
            label="referred"
            render={record =>
              record.referred === true ? <CheckIcon style={{ color: '#94D034' }} /> : ''
            }
          />
        </Datagrid>
        {/* <CreateButton basePath="companies" style={{ ...generalStyles.button, position: 'absolute' }} label='create company' /> */}
        {/* <CreateButton style={{ ...generalStyles.button, position: 'absolute' }} label='create company' /> */}
      </>
    </List>
  )
})

export default CustomersList
