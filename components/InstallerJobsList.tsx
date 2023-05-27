import { Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { List, Datagrid, TextField, SearchInput, useGetManyAggregate, Loading, ArrayField, useGetList, useRecordContext, DateField } from 'react-admin'
import { useParams } from 'react-router'
import { formStyle } from '../styles/General'

const postFilters = [<SearchInput source="q" alwaysOn />]

// const PostListActions = () => {
//   return (
//     <TopToolbar>
//       <CreateButton style={formStyle.button} label='create new ticket' />
//     </TopToolbar>
//   )
// }

const AddressField = (address: any) => {
  return address.address ? <span>{address.address.address_1} {address.address.city} {address.address.state}</span> : <span>-</span>
}

const tickets = []
const jobFields = [
  { label: "job #", source: 'id' },
  // {label: "date", source: "ts" },
  { label: "installer", source: "installer_id" },
  { label: "customer", source: "customer_id" },
  { label: "address", source: "address" },
]

const JobTicketsList = (props: any) => {
  const { id } = useParams()
  const jobRowClick = (ticketId: string) => {
    console.log(ticketId)

    // console.log(path)
    return `/admin/job-tickets/${ticketId}`

  };

  // /:resource/:id/edit

  const { data: jobs, isLoading, error } = useGetList(`installers/${id}/job-tickets`);
  if (!isLoading) {
    if (error) {
      console.log('error', error)
    }
    if (jobs && jobs.length > 0) {
      return (
        <List {...props} exporter={false}
          // filters={postFilters}
          actions={''}
          pagination={false}
        >
          <Datagrid data={jobs} rowClick={jobRowClick} bulkActionButtons={false} >
            {jobs && jobFields.map((field, i) => {
              if (field.label === 'address') {
                return <AddressField key={field.label} label={field.label} address={jobs[i] && jobs[i].address} />
              }
              else {
                return <TextField key={field.label} label={field.label} source={field.source} />
              }
            })}
            <DateField label="date" source="ts" />
          </Datagrid>

        </List>
      )
    }
    else return <Typography>No jobs at this time</Typography>
  }
  else return <Loading />
}

export default JobTicketsList
