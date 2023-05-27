
import React from 'react'
import { Routes, Route, useLocation } from "react-router-dom"
import { Grid } from '@mui/material'
import { Helmet } from "react-helmet-async"

import { useStyles } from '../styles/Theme'
import { rootOnboarding } from '../static/Roots'
import splashLogo from '../assets/images/logo-installers@3x.png'
import styles from '../components/onboarding/Main.module.css'
import {
  Login, ForgotPassword, ResetPassword,
  SplashScreen, StepsScreen, Prequalification, PrequalificationSuccess,
  PrequalificationFailure, CreateAccount, UpdateCompanyInfo,
  StateLicense, BusinessLicense, Bonding,
  AttestationOfAccuracy, CertificationInProgress,
  ServiceOptions, ServiceArea,
  PremiumAddonOneReferral, PremiumAddonTwoPriority, PremiumAddonCheckout,
  Payment, StripeOnboard
} from '../components/onboarding'

import favicon from '../assets/images/favicon-installers-16px.svg'

const predefined = [
  rootOnboarding,
  `${rootOnboarding}/`,
  `${rootOnboarding}/login`,
  `${rootOnboarding}/forgot-password`,
  `${rootOnboarding}/reset-password`,

]

const predefinedRoutes = (pathname) => {
  return predefined.includes(pathname)
}

const HomeOnboarding = () => {

  const classes = useStyles()
  const pathName = useLocation().pathname
  const isRoot = predefinedRoutes(pathName)

  return (<div className={styles['onboarding-home']}>

    <Helmet>
      <title>ReadiCharge Installers</title>
      <meta name="ReadiCharge" content="ReadiCharge" />
      <link rel="icon" type="image/png" href={favicon} sizes="16x16" />
    </Helmet>

    <Grid container flexDirection='column' alignContent='center' alignItems="center" wrap="nowrap" className={classes.rootitem}>
      {!isRoot &&
        <Grid item justifyContent="center" className={classes.up}>
          <Grid justifyContent="center" className={classes.logo} >
            <img src={splashLogo} alt="logo-installers" className={classes.logoItemSmall}></img>
          </Grid>
        </Grid>
      }

      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>

      <Grid item className={classes.down}>
        <Grid className={classes.mainform} >
          <Routes>
            <Route path="/steps" element={<StepsScreen />} />
            <Route path="/prequalification" element={<Prequalification />} />
            <Route path="/prequalification-success" element={<PrequalificationSuccess />} />
            <Route path="/prequalification-failure" element={<PrequalificationFailure />} />
            <Route path="/create-account" element={<CreateAccount />} />
            <Route path="/update-company-info" element={<UpdateCompanyInfo />} />
            <Route path="/state-license" element={<StateLicense />} />
            <Route path="/business-license" element={<BusinessLicense />} />
            <Route path="/bonding" element={<Bonding />} />
            <Route path="/attestation-of-accuracy" element={<AttestationOfAccuracy />} />
            <Route path="/certification-in-progress" element={<CertificationInProgress />} />
            <Route path="/service-options" element={<ServiceOptions />} />
            <Route path="/service-area" element={<ServiceArea />} />
            <Route path="/premium-addon-referral" element={<PremiumAddonOneReferral />} />
            <Route path="/premium-addon-priority" element={<PremiumAddonTwoPriority />} />
            <Route path="/premium-addon-checkout" element={<PremiumAddonCheckout />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/stripe-onboard" element={<StripeOnboard />} />
          </Routes>
        </Grid>
      </Grid>
    </Grid>
  </div>
  )
}

export default HomeOnboarding