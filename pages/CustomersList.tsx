import React, { useEffect } from 'react'
import { List, Datagrid, TextField, SearchInput, useGetOne, useRecordContext, useGetMany, useGetList } from 'react-admin'
import { connect } from 'react-redux'
import { setMainCrumb, setSubCrumbs } from '../actions/breadcrumbs'

const postFilters = [<SearchInput source="q" alwaysOn />]

const CustomersList = connect(null, { setMainCrumb, setSubCrumbs })((props: any) => {
  useEffect(() => {
    props.setMainCrumb({ name: 'customers', link: '/customers' })
  }, [])

  const { data, isLoading, error } = useGetList('customers', {}, { enabled: true })
  if (!isLoading) {
    if (error) {
      console.log('error', error)
    }
    console.log('customer data', data)
  }

  return (
    <List {...props} exporter={false} bulkActionButtons={false} filters={postFilters}>
      <Datagrid>
        <TextField source="id" />
        <TextField source="name" />
        <TextField source="email" />
        <TextField source="phone_number" />
        <TextField source="created_at" />
      </Datagrid>
    </List>
    // <div>TODO</div>
  )
})

export default CustomersList
