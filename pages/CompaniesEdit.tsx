import React, { useEffect, useState } from 'react'
import {
    List,
    Datagrid,
    TextField,
    FunctionField,
    TabbedForm,
    FormTab,
    TextInput,
    Edit,
    ArrayField,
    SearchInput,
    Toolbar,
    SaveButton,
    TopToolbar,
    CreateButton,
    useRecordContext,
    DeleteWithConfirmButton,
    SimpleForm,
    Show,
} from 'react-admin'
import { connect } from 'react-redux'
import Rating from '@mui/material/Rating'
import CheckIcon from '@mui/icons-material/Check'
import { styled } from '@mui/material/styles'
import Settings from '../components/Settings'
import Typography from '@mui/material/Typography'
import { Card, CardContent, CardHeader, Grid } from '@mui/material'
import { setMainCrumb, setSubCrumbs } from '../actions/breadcrumbs'
import Certification from '../components/Certification'
import cardStyle from '../styles/CardStyle'
// import RatingsBreakdown from './RatingsBreakdown'


const CardContentNoPadding = styled(CardContent)(`
  padding: 0;
  &:last-child {
    padding-bottom: 0;
  }
`)

const companyColumns = [
    { label: 'Company Name', source: 'name' },
    { label: 'email', source: 'email' },
    { label: 'phone_number', source: 'phone_number' },
    { label: 'Address Line 1', source: 'address1' },
    { label: 'Address Line 2', source: 'address2' },
    { label: 'city', source: 'city' },
    { label: 'state', source: 'state' },
    { label: 'region', source: 'region' },
]

const accountColumns = [
    { label: 'Company Name', source: 'account[companyName]' },
    { label: 'email', source: 'account[email]' },
    { label: 'phone_number', source: 'account[phone_number]' },
    { label: 'Address Line 1', source: 'account[address1]' },
    { label: 'Address Line 2', source: 'account[address2]' },
    { label: 'city', source: 'account[city]' },
    { label: 'state', source: 'account[state]' },
    { label: 'region', source: 'account[region]' },
]

const installersColumns = [
    { label: 'name', source: 'name' },
    { label: 'type', source: 'type' },
    { label: 'id', source: 'sub' },
    { label: 'jobs', source: 'jobs' },
    { label: 'state', source: 'state' },
    { label: 'region', source: 'region' },
]

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

export const InstallersEdit = connect(null, { setMainCrumb, setSubCrumbs })((props: any) => {
    const pathname = props.location.pathname.split('/')
    let currentpath = pathname[pathname.length - 1]

    const paths = ['account info', 'settings', 'installers', 'certification', 'jobs', 'schedule']

    return (
        <Edit {...props} toolbar={<EditToolbar />}>
            <>
                <FunctionField
                    style={cardStyle.header}
                    label="header"
                    render={record => {
                        // set breadcrumb for each tab
                        if (currentpath === record.sub) {
                            currentpath = 0
                        }
                        props.setMainCrumb({ name: 'installers', link: '/installers-1' })
                        props.setSubCrumbs([
                            {
                                name: `> ${record.name} > ${paths[currentpath]}`,
                                link: `/installers-2/${record.sub}`,
                            },
                        ])
                        return `${record.name} (ID# ${record.sub})`
                    }}
                />
                <FunctionField
                    label="Rating"
                    render={record => <Rating name="read-only" value={record.rating} readOnly />}
                />
                <TabbedForm>
                    <FormTab label="account info">
                        <Edit {...props}>
                            <SimpleForm>
                                <Grid className="Grid__installers-edit" container spacing={3}>
                                    <Card className="Card__company-info" style={cardStyle.card}>
                                        <CardHeader
                                            titleTypographyProps={{ style: cardStyle.cardHeader, variant: 'h6' }}
                                            title="Company Info"
                                        />
                                        {companyColumns.map(col => (
                                            <CardContentNoPadding>
                                                <TextInput
                                                    key={col.source}
                                                    style={cardStyle.inputField}
                                                    label={col.label}
                                                    source={col.source}
                                                    fullWidth={true}
                                                />
                                            </CardContentNoPadding>
                                        ))}
                                    </Card>
                                    <Card className="Card__account-info" style={cardStyle.card}>
                                        <CardHeader
                                            titleTypographyProps={{ style: cardStyle.cardHeader, variant: 'h6' }}
                                            title="Account Info"
                                        />
                                        {accountColumns.map(col => (
                                            <CardContentNoPadding>
                                                <TextInput
                                                    key={col.source}
                                                    style={cardStyle.inputField}
                                                    label={col.label}
                                                    source={col.source}
                                                    fullWidth={true}
                                                />
                                            </CardContentNoPadding>
                                        ))}
                                    </Card>
                                </Grid>
                            </SimpleForm>
                        </Edit>
                        {/* <FunctionField
                                label="settings form"
                                addLabel={false}
                                render={record => <AccountForm source={record} />}
                            /> */}

                    </FormTab>
                    <FormTab label="Settings">
                        <FunctionField
                            label="settings form"
                            addLabel={false}
                            render={record => <Settings source={record} />}
                        />
                    </FormTab>
                    <FormTab label="Installers">
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
                    <FormTab label="Certification">
                        <Certification />
                    </FormTab>
                    <FormTab label="Jobs">
                        <TextField label="Id" source="id" />
                        <TextField source="title" />
                    </FormTab>
                    <FormTab label="Schedule">
                        <TextField label="Id" source="id" />
                        <TextField source="title" />
                    </FormTab>
                </TabbedForm>
            </>
        </Edit>
    )
})