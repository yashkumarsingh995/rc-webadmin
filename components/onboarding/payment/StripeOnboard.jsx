import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Grid } from '@mui/material'

import { rootOnboarding } from '../../../static/Roots'
import ProgressButton from '../../base/ProgressButton'
import { Toolbar } from '../../base/Toolbar'
import { useStore } from '../../../stores/OnBoardStore'
import styles from '../Main.module.css'
import staticContent from '../../../static/Onboarding'
import { getAccountOnboarding } from '../../../services/Admin'

const StripeOnboard = observer(() => {

  const store = useStore()
  const navigate = useNavigate()

  const { addonReferral = "", addonPriority = "" } = store.currentUser

  const paymentInit = []
  const addonInit = []

  if (addonReferral) {
    paymentInit.push({
      id: 1,
      name: staticContent.addonOneDisplayName,
      repeat: addonReferral,
      billingDate: Date(),
      price: Number(staticContent.addonReferral.rate[addonReferral].replace('$', '').split("/")[0])
    })
    addonInit.push({
      id: 1,
      name: staticContent.addonOneDisplayName,
      rate: staticContent.addonReferral.rate[addonReferral],
      repeat: addonReferral
    })
  }

  if (addonPriority) {
    paymentInit.push({
      id: 2,
      name: staticContent.addonTwoDisplayName,
      repeat: addonPriority,
      billingDate: Date(),
      price: Number(staticContent.addonReferral.rate[addonPriority].replace('$', '').split("/")[0])
    })
    addonInit.push({
      id: 2,
      name: staticContent.addonTwoDisplayName,
      rate: staticContent.addonPriority.rate[addonPriority],
      repeat: addonPriority
    })
  }

  // console.log(`pay for=${paymentInit}`)

  const userInit = {}

  const [purchased, setPurchased] = useState(false)

  const [url, setUrl] = useState('')
  const [connected, setConnected] = useState(false)

  const [loading, setLoading] = useState(false)
  const [loadingStripe, setLoadingStripe] = useState(false)
  const [objUser, setObjUser] = useState(userInit);
  const [apiError, setApiError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    setLoading(false)

    store.setProgress(4.75)
    navigate(`${rootOnboarding}/steps`, { state: { from: '/stripe-onboard', to: '', rcadmin: 'rcadmin' } })
  }

  const handleOnboardingUrl = async () => {

    setLoadingStripe(true)
    const res = await getAccountOnboarding()
    // console.log('2. MY RESULT=', JSON.stringify(res))

    if (res && res.url) {
      console.log('STRIPE ONBOARDING URL')
      console.log(res.url)
      setConnected(true)
      setUrl(res.url)
      openInNewTab(res.url)
    }
    else {
      // console.log('err=', res)
      setApiError('Error getting stripe onboarding link.')
    }

    setLoadingStripe(false)
  }

  const openInNewTab = url => {
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  return (
    <Grid className={styles['fixed-width-container']}>

      <Toolbar label='Setup: payments' value={store.setupProgress}
        navigateBack='/premium-addon-priority' />

      <div className={styles['form-container-large']}>

        <div className={styles['form-heading']} style={{ marginBottom: 0 }}>{staticContent.linkYourAccount}</div>
        <div className={styles['form-subheading']}>{staticContent.partnersWithStripe}</div>

        <div className={styles['btn-container-stripe-onboard']}>

          {/* TODO: should we display URL in case of browser block it? */}
          {/* {url && <div style={{fontFamily: 'Lato'}}>{url}</div>} */}

          {<ProgressButton
            loading={loadingStripe}
            color='primary'
            variant='contained'
            sx={{ mb: 5 }}
            onClick={handleOnboardingUrl}
            disabled={connected}
          >{staticContent.setupStripe}</ProgressButton>
          }

          {apiError && <div className={styles['common-api-err']}>{staticContent.error}: {apiError}</div>}
          <ProgressButton
            loading={loading}
            color='primary'
            variant='contained'
            sx={{ mb: 3 }}
            onClick={handleSubmit}
          >{staticContent.continue}</ProgressButton>
        </div>

      </div>
    </Grid>
  )
})

export default StripeOnboard
