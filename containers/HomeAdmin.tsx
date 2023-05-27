import { useEffect } from 'react';
import { Admin, Resource, fetchUtils } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';
import { Amplify } from '@aws-amplify/core';
import {
  withAuthenticator, SignIn, ConfirmSignIn, VerifyContact,
  ForgotPassword, RequireNewPassword, Loading
} from 'aws-amplify-react';
import '@aws-amplify/ui/dist/style.css';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { Helmet } from "react-helmet-async";

import favicon from '../assets/images/favicon-installers-16px.svg'

import {
  CompanyIcon, CustomerIcon, AdminIcon,
  JobTicketIcon, ReportIcon, SettingsIcon, CalendarIcon
} from '../components/Icons';
import CustomLayout from '../components/CustomLayout';
import ReportsList from '../components/ReportsList'
import { Dashboard } from '../pages/Dashboard'
import breadcrumbs from '../reducers/breadcrumbs'
import {
  UsersCreate, UsersEdit, JobTicketsList, JobTicketsCreate, JobTicketsEdit, ScheduleList,
  CompaniesCreate, CompaniesList, CustomersList,
  AdminUsersList, InstallersList, InstallersEdit, InstallersCreate
} from '../pages'
import { getAccessToken, getIdToken } from '../aws-exports'
import RCTheme from '../RCTheme';
import { env } from '../env'
import { buildAuthProvider } from '../providers'
import logo from '../assets/images/logo-no-tagline@3x.png'

declare global {
  interface Window {
    Userback?: any
  }
}

Amplify.configure({
  aws_project_region: 'us-east-2',
  aws_cognito_region: 'us-east-2',
  aws_user_pools_id: env.cogntioUserPoolId,
  aws_user_pools_web_client_id: env.congitoClientId,
  aws_appsync_authenticationType: 'AMAZON_COGNITO_USER_POOLS',
  Storage: {
    AWSS3: {
      bucket: env.userDataBucket,
      region: 'us-east-2',
    }
  }
})

const httpClient = async (url, options: any = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: 'application/json' })
  }
  const authToken = await getIdToken()
  const accessToken = await getAccessToken()
  options.headers.set('Authorization', authToken['Authorization'])
  options.headers.set('X-Amz-Access-Token', accessToken['X-Amz-Access-Token'])

  return fetchUtils.fetchJson(url, options)
}

const dataProvider = simpleRestProvider(env.rcApiUrl, httpClient)
const authProvider = buildAuthProvider({
  authGroups: [
    env.rcAdminGroup,
    env.ownerAdminGroup,
    env.managerGroup,
    env.marketingGroup,
    env.contentEditorGroup,
    env.supportManagerGroup,
    env.supportRepGroup,
  ],
})

const HomeAdmin = () => {
  useEffect(() => {
    if (process.env.REACT_APP_USERBACK_ACCESS_TOKEN) {
      window.Userback = window.Userback || {};
      window.Userback.access_token = process.env.REACT_APP_USERBACK_ACCESS_TOKEN;
      (function (d) {
        const s = d.createElement('script');
        s.async = true;
        s.src = 'https://static.userback.io/widget/v1.js';
        (d.head || d.body).appendChild(s);
      })(document)
    }
  }, [])

  const isAdmin = permissions => env.rcAdminGroup && permissions.indexOf(env.rcAdminGroup) >= 0

  return (
    <div style={theme.home}>
      <Provider store={createStore(combineReducers({ breadcrumbs }))}>

        {/* TODO: change it for super-admin and support. Depending on user logged in */}
        <Helmet>
          <title>ReadiCharge Installers</title>
          <meta name="ReadiCharge" content="ReadiCharge" />
          <link rel="icon" type="image/png" href={favicon} sizes="16x16" />
        </Helmet>

        <Admin
          basename="/admin"
          authProvider={authProvider}
          // customReducers={{ breadcrumbs }}
          dashboard={Dashboard}
          dataProvider={dataProvider}
          disableTelemetry
          theme={RCTheme}
          layout={CustomLayout}
        >
          {permissions => {
            return [
              <Resource
                name="job-tickets"
                options={{ label: 'Job Tickets' }}
                list={JobTicketsList}
                edit={JobTicketsEdit}
                icon={JobTicketIcon}
                create={JobTicketsCreate}
              />,
              isAdmin(permissions) ?
                <Resource
                  name="companies"
                  options={{ label: 'Companies' }}
                  list={CompaniesList}
                  create={CompaniesCreate}
                  icon={CompanyIcon} />
                : null,
              <Resource
                name="installers"
                options={{ label: 'Installers' }}
                list={InstallersList}
                edit={InstallersEdit}
                icon={CustomerIcon}
                create={InstallersCreate}
              />,
              <Resource
                name="customers"
                options={{ label: 'Customers' }}
                list={CustomersList}
                icon={CustomerIcon} />,
              <Resource
                name="schedule"
                options={{ label: 'Schedule' }}
                list={ScheduleList}
                icon={CalendarIcon} />,
              <Resource
                name="admins"
                options={{ label: isAdmin(permissions) ? 'Admin Users' : 'User Accounts' }}
                list={AdminUsersList}
                edit={UsersEdit}
                icon={AdminIcon}
                create={UsersCreate}
              />,
              <Resource
                name="reports"
                options={{ label: 'Reports' }}
                list={ReportsList}
                icon={ReportIcon}
              />,
              <Resource
                name="settings"
                options={{ label: 'Settings' }}
                list={ReportsList}
                icon={SettingsIcon}
              />,
            ]
          }}
        </Admin>
      </Provider>
    </div>
  )
}

const { typography, palette } = RCTheme
const authTheme = {
  container: {
    background: 'radial-gradient(circle at 50% 14em, #000000 0%, #171F58 60%, #171F58 100%)',
    display: 'flex',
    flexDirection: 'column-reverse',
    fontFamily: typography.fontFamilySecondary,
    height: '100vh',
    minHeight: 'unset',
  },
  input: {
    marginTop: '1em',
    // height: defaultHeights.buttonHeight,
  },
  button: {
    fontFamily: typography.fontFamilySecondary,
    fontWeight: typography.fontWeightBold,
    width: '100%',
    backgroundColor: palette.secondary.main,
    color: palette.secondary.contrastText,
    borderRadius: '5px',
    // height: defaultHeights.buttonHeight,
    '&:hover': {
      backgroundColor: palette.secondary.light,
    },
  },
  forgotPasswordLink: {
    marginTop: '1em',
    fontSize: '0.8em',
    color: palette.secondary.main,
  },
  formContainer: {
    marginTop: 0,
  },
  formSection: {
    borderRadius: 0,
    marginBottom: 150,
  },
  sectionHeader: {
    color: 'rgb(23 31 88)',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  sectionFooterPrimaryContent: {
    flex: 1,
  },
}
const theme = {
  home: { height: '100vh', overflow: 'scroll' }
}

// TODO make this its own component with useClasses instead of style
const AlwaysOn = () => {
  return (
    <div style={{ transform: 'scale(0.5)', margin: '0 auto -40px auto' }}>
      <img src={logo} alt="ReadiCharge Logo" className="max-w-md" />
    </div>
  )
}
export default withAuthenticator(
  HomeAdmin,
  false,
  [
    <SignIn />,
    <ConfirmSignIn />,
    <VerifyContact />,
    <ForgotPassword />,
    <RequireNewPassword />,
    <Loading />,
    <AlwaysOn />,
  ],
  null,
  authTheme,
)