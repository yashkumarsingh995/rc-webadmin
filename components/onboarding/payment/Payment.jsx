import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Grid } from '@mui/material'
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import dayjs from 'dayjs'

import { rootOnboarding } from '../../../static/Roots'
import ProgressButton from '../../base/ProgressButton'
import StripePayment from './StripePayment'
import { Toolbar } from '../../base/Toolbar'
import { useStore } from '../../../stores/OnBoardStore'
import styles from '../Main.module.css'
import staticContent from '../../../static/Onboarding'
import { adminUpdateProfile } from '../../../services/Admin'

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUB_KEY)

// TODO: clean this code
const ELEMENTS_OPTIONS = {
  // fonts: [{ cssSrc: "https://fonts.googleapis.com/css?family=Roboto" }]
}

const Payment = observer(() => {

  const store = useStore()
  const navigate = useNavigate()

  const {
    addonReferral = "", addonReferralPurchased = false,
    addonPriority = "", addonPriorityPurchased = false,
  } = store.currentUser

  const paymentInit = []
  const addonInit = []

  if (addonReferral && !addonReferralPurchased) {
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

  if (addonPriority && !addonPriorityPurchased) {
    paymentInit.push({
      id: 2,
      name: staticContent.addonTwoDisplayName,
      repeat: addonPriority,
      billingDate: Date(),
      price: Number(staticContent.addonPriority.rate[addonPriority].replace('$', '').split("/")[0])
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

  const [paymentDetails, setPaymentDetails] = useState(paymentInit)
  const [selectedAddons, setSelectedAddons] = React.useState(addonInit)
  const [purchased, setPurchased] = useState(false)

  const [loading, setLoading] = useState(false)
  const [objUser, setObjUser] = useState(userInit);
  const [apiError, setApiError] = useState('')

  const handlePurchased = async () => {

    setPurchased(true)

    // save to local store in case of success
    const addons = {}
    if (addonReferral) {
      addons['addonReferralPurchased'] = true
    }
    if (addonPriority) {
      addons['addonPriorityPurchased'] = true
    }
    store.saveUserInfo({ ...objUser, ...addons })

    // save to api in case of success
    // TODO: remove static text
    const referral = (addonReferral === 'monthly') ?
      { purchased: true, monthly: true, yearly: false } :
      (addonReferral === 'yearly') ?
        { purchased: true, monthly: false, yearly: true } :
        { purchased: false, monthly: false, yearly: false }

    const priority = (addonPriority === 'monthly') ?
      { purchased: true, monthly: true, yearly: false } :
      (addonPriority === 'yearly') ?
        { purchased: true, monthly: false, yearly: true } :
        { purchased: false, monthly: false, yearly: false }

    try {
      const res = await adminUpdateProfile({ referral, priority })
    }
    catch (error) {
      console.warn('ERROR updating profile')
    }

  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // already saved, navigate next
    navigate(`${rootOnboarding}/steps`, { state: { from: '/premium-addon-priority', to: '/stripe-onboard' } })
  }

  const { firstName, lastName, eMail, phoneNumber } = store.currentUser
  return (
    <Grid className={styles['fixed-width-container']}>

      <Toolbar label='Setup: Options' value={store.setupProgress}
        navigateBack='/premium-addon-checkout' />

      <div className={styles['form-container-large']}>

        <div className={styles['form-heading']}>{staticContent.payment}</div>
        {purchased ? <div className={styles['form-subheading']}>{staticContent.success}</div> :
          <div className={styles['form-subheading']}>{staticContent.completeYourPurchase}</div>}

        {purchased && selectedAddons.map((x, index) => (
          <div key={`addon-${index}`} className={styles['service-options-addon-checkout-box']} style={{ paddingLeft: 0, paddingRight: 0, border: 'none', width: '100%' }}>
            <div className={styles['service-options-checkout-addon-header']}>
              {staticContent.premiumAddOn}
            </div>
            <div className={styles['service-options-checkout-addon-bold']}>
              {x.name} - {x.repeat}
            </div>
            <div className={styles['service-options-checkout-addon-regular']}>
              {x.rate}
            </div>
          </div>)
        )}

        <Elements stripe={stripePromise} options={ELEMENTS_OPTIONS}>
          <StripePayment
            name={`${firstName} ${lastName}`}
            email={eMail || ''}
            phone={phoneNumber || ''}
            payment={paymentDetails}
            setPurchased={handlePurchased}
          />
        </Elements>

        {purchased && <div className={styles['service-options-footer']}>
          {staticContent.oneYouHaveCompleted}
        </div>}

        <div className={styles['btn-container']}>
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

export default Payment
