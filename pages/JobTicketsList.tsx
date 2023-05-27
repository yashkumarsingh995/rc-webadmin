import React, { useEffect } from 'react'
import { List, Datagrid, TextField, DateField, SearchInput, TopToolbar, CreateButton, useRecordContext, useGetMany, useGetList } from 'react-admin'
import { CSSProperties } from 'react'
import { connect } from 'react-redux'

import { setMainCrumb, setSubCrumbs } from '../actions/breadcrumbs'
import { formStyle } from '../styles/General'

const postFilters = [<SearchInput source="q" alwaysOn />]

const PostListActions = () => {
  return (
    <TopToolbar>
      <CreateButton style={formStyle.button} label='create new ticket' />
    </TopToolbar>
  )
};

const JobTicketsList = connect(null, { setMainCrumb, setSubCrumbs })((props: any) => {
  useEffect(() => {
    props.setMainCrumb({ name: 'job tickets', link: '/job-tickets' })
  }, [])
  // const { data, isLoading, error } = useGetList('job-tickets', {}, { enabled: true })
  // if (!isLoading) {
  //   if (error) {
  //     console.log('error', error)
  //   }
  //   console.log('job data', data)
  // }


  return (
    <List {...props} exporter={false}
      bulkActionButtons={false}
      // filters={postFilters}
      actions={<PostListActions />}
    >
      <Datagrid rowClick="edit" >
        <TextField style={{ textDecoration: 'underline' }} source="id" label="job #" />
        <DateField label="date" source="ts" />
        <TextField label="start" source="time_start" />
        <TextField label="end" source="time_end" />
        <TextField label="installer" source="installer_id"  />
        <TextField label="customer" source="customer_id" />
        <TextField label="address" source="address" />
        <TextField label="region" source="region" />
      </Datagrid>
    </List>
  )
})

export default JobTicketsList
