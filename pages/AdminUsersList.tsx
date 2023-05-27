import { Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { List, Datagrid, TextField, TopToolbar, SearchInput, CreateButton, useGetList, DateField } from 'react-admin'
import { connect } from 'react-redux'

import { setMainCrumb, setSubCrumbs } from '../actions/breadcrumbs'
import { formStyle } from '../styles/General'

const postFilters = [<SearchInput source="q" alwaysOn />]

const PostListActions = () => {
  return (
    <TopToolbar>
      <CreateButton style={formStyle.button} label='create new user' />
    </TopToolbar>
  )
};

const AdminUsersList = connect(null, { setMainCrumb, setSubCrumbs })((props: any) => {
  useEffect(() => {
    props.setMainCrumb({ name: 'users', link: '/users' })
  }, [])


  return (
    <List
      style={{ maxWidth: '100%' }}
      {...props}
      actions={<PostListActions />}
      exporter={false}
      filters={postFilters}
    >
      <>
        <Typography style={formStyle.header}>Users</Typography>
        <Datagrid rowClick="edit" bulkActionButtons={false} >
          <TextField fullWidth={true} source="name" />
          <TextField fullWidth={true} source="groups[0].GroupName" label='type' />
          <TextField fullWidth={true} source="email" />
          <DateField fullWidth={true} source="UserCreateDate" />
        </Datagrid>
      </>
    </List>
  )
})

export default AdminUsersList;