import React, { useState } from 'react'
import {
    Datagrid,
    TextField,
    FunctionField,
    TabbedForm,
    FormTab,
    TextInput,
    Edit,
    ArrayField,
    Toolbar,
    SaveButton,
    useRecordContext,
    DeleteWithConfirmButton,
    SimpleForm,
    useGetOne,
    Loading,
    DateField,
} from 'react-admin'
import { useParams } from 'react-router-dom'
import { Card, CardContent, CardHeader, Grid, Typography } from '@mui/material'

import { connect } from 'react-redux'
import Rating from '@mui/material/Rating'
import { styled } from '@mui/material/styles'
import Settings from '../components/Settings'
import { setMainCrumb, setSubCrumbs } from '../actions/breadcrumbs'
import Certification from '../components/Certification'
import cardStyle from '../styles/CardStyle'
import { generalStyles } from '../styles/General'
import InstallerJobsList from '../components/InstallerJobsList'
import AccountInfo from '../components/AccountInfo'
import ScheduleList from './ScheduleList'
// import RatingsBreakdown from './RatingsBreakdown'


const EditToolbar = props => {
    const record = useRecordContext();
    return (
        <Toolbar {...props}>
            <SaveButton style={cardStyle.button} />
            <DeleteWithConfirmButton
                confirmTitle={`Delete User: ${record.name}?`}
                confirmContent="You will not be able to recover this User. Are you sure?"
            />
        </Toolbar>
    )
}

const InstallersEdit = connect(null, { setMainCrumb, setSubCrumbs })((props: any) => {
    // const pathname = props.location.pathname.split('/')
    // let currentpath = pathname[pathname.length - 1]

    const { id } = useParams();
    const { data, isLoading, error } = useGetOne('installers', { id })
    if (!isLoading) {
        if (error) {
            console.log('error', error)
        }
        console.log('installer', data)
    }

    if (data && !isLoading)
        return (
            // <Edit {...props} toolbar={<EditToolbar />}>
            <Edit {...props} >
                <>
                    {/* <FunctionField
                    style={cardStyle.header}
                    label="header"
                    render={record => {
                        const userID = record.sub ? record.sub : record.code
                        const userName = record.name ? record.name : `${record.first_name} ${record.last_name}`
                        // set breadcrumb for each tab
                        if (currentpath === userID) {
                            currentpath = 0
                        }
                        props.setMainCrumb({ name: 'installers', link: '/installers-3' })
                        props.setSubCrumbs([
                            {
                                name: `> ${userID} > ${paths[currentpath]}`,
                                link: `/installers-4/${userID}`,
                            },
                        ])
                        return `${userName} (ID# ${userID})`
                    }}
                /> */}
                    <FunctionField
                        label="Rating"
                        render={record => (
                            <>
                                {record.code ?
                                    <Typography style={generalStyles.userIdNotification}>
                                        Use user_id: {record.code} to sign up in the modile app!
                                    </Typography>
                                    : record.id ? <Grid container sx={{ marginLeft: '2%' }} direction={"row"} spacing={3}>
                                        <Grid item>
                                            <TextField sx={{ fontWeight: 'bold', fontSize: '20px', textTransform: 'uppercase' }} source="name" />
                                        </Grid>
                                        <Grid sx={{ fontWeight: 'bold', fontSize: '20px' }} item>
                                            (ID# <TextField sx={{ fontWeight: 'bold', fontSize: '20px' }} source="id" />)
                                        </Grid>
                                        <Grid item>
                                            <Rating name="read-only" value={record.rating} readOnly />
                                        </Grid>
                                    </Grid>
                                        : null}
                            </>
                        )
                        }
                    />
                    <TabbedForm>
                        <FormTab label="account info">
                            <AccountInfo />
                        </FormTab>
                        <FormTab label="Settings">
                            <Settings source={data} />
                        </FormTab>
                        {/* {data.company_id && <FormTab label="Installers">
                            <ArrayField source="companyInstallers">
                                <Datagrid>
                                    <TextField style={{ textDecoration: 'underline' }} source="name" />
                                    <TextField source="id" />
                                    <TextField source="jobs" />
                                    <TextField source="experience" />
                                    <FunctionField
                                        label="Rating"
                                        render={record => <Rating name="read-only" value={record.rating} readOnly />}
                                    />
                                </Datagrid>
                            </ArrayField>
                        </FormTab>
                        } */}
                        <FormTab label="Certification">
                            <Certification />
                        </FormTab>
                        <FormTab label="Jobs">
                            <InstallerJobsList ticketIds={data.jobs} />
                        </FormTab>
                        <FormTab label="Schedule">
                            <ScheduleList />
                        </FormTab>
                    </TabbedForm>
                </>
            </Edit>
        )
    else return <Loading />
})

export default InstallersEdit;