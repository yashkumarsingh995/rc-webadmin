import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Grid } from '@mui/material'

import { useStore } from '../../../stores/OnBoardStore'
import { adminUpdateProfile } from '../../../services/Admin'
import styles from '../Main.module.css'
import staticContent from '../../../static/Onboarding'
import { rootOnboarding } from '../../../static/Roots'
import { Toolbar } from '../../base/Toolbar'
import ProgressButton from '../../base/ProgressButton'

const PremiumAddonCheckout = observer(() => {

  const store = useStore()
  const navigate = useNavigate()

  const {
    addonReferral = "", addonReferralPurchased = false,
    addonPriority = "", addonPriorityPurchased = false
  } = store.currentUser

  console.log(`checkout= '${addonReferral}'(purchased? ${addonReferralPurchased}) '${addonPriority}' (purchased? ${addonPriorityPurchased})`)

  const userInit = { addonReferral, addonPriority }

  const addonInit = []
  if (addonReferral) addonInit.push({
    id: 1,
    name: staticContent.addonOneDisplayName,
    purchased: addonReferralPurchased,
    rate: staticContent.addonReferral.rate[addonReferral],
    repeat: addonReferral
  })
  if (addonPriority) addonInit.push({
    id: 2,
    name: staticContent.addonTwoDisplayName,
    purchased: addonPriorityPurchased,
    rate: staticContent.addonPriority.rate[addonPriority],
    repeat: addonPriority
  })

  const [rate, setRate] = React.useState("$100/year")
  const [subType, setSubType] = React.useState("yearly")

  const [referral, setReferral] = React.useState(addonReferral)
  const [addonsToCheckOut, setAddonsToCheckOut] = React.useState(addonInit)

  const [objUser, setObjUser] = useState(userInit)
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState('')

  const handleEdit = (id) => {
    if (id === 1) {
      navigate(`${rootOnboarding}/premium-addon-referral`)
    }
    else {
      navigate(`${rootOnboarding}/premium-addon-priority`)
    }
  }

  const handleContinue = () => {
    // already saved, navigate next <--- TODO: check it
    navigate(`${rootOnboarding}/steps`, { state: { from: '/premium-addon-priority', to: '/stripe-onboard' } })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setApiError('')
    // store.saveUserInfo({ addonReferral, addonPriority })

    setLoading(true)

    const referral = (addonReferral === 'monthly') ?
      { purchased: addonReferralPurchased, monthly: true, yearly: false } :
      (addonReferral === 'yearly') ?
        { purchased: addonReferralPurchased, monthly: false, yearly: true } :
        { purchased: addonReferralPurchased, monthly: false, yearly: false }

    const priority = (addonPriority === 'monthly') ?
      { purchased: addonPriorityPurchased, monthly: true, yearly: false } :
      (addonPriority === 'yearly') ?
        { purchased: addonPriorityPurchased, monthly: false, yearly: true } :
        { purchased: false, monthly: false, yearly: false }

    const res = await adminUpdateProfile({ referral, priority })

    setLoading(false)

    if (res && res.error) {
      setApiError(res.error)
      console.log(res.error)
    }
    else {
      navigate(`${rootOnboarding}/payment`)
    }
  }

  const needCheckout = addonsToCheckOut.filter((x) => !x.purchased).length

  console.log(`need to checkout= ${needCheckout}`)

  return (
    <Grid className={styles['fixed-width-container']}>

      <Toolbar
        label='Setup: options' value={store.setupProgress}
        navigateBack='/premium-addon-priority'>
      </Toolbar>

      <div className={styles['form-container']}>

        <form style={{ width: '100%' }} onSubmit={handleSubmit}>

          <div className={styles['service-options-form']}>

            <div className={styles['form-heading']}>{staticContent.addons}</div>
            <div className={styles['form-subheading']}>{staticContent.youHaveSelected}</div>

            {addonsToCheckOut.map((x, index) => (
              <div key={`addon-${index}`} className={styles['service-options-addon-checkout-box']}>
                {x.purchased && <div style={{ color: 'red' }} className={styles['service-options-checkout-addon-header']}>
                  already purchased
                </div>
                }
                <div className={styles['service-options-checkout-addon-header']}>
                  {staticContent.premiumAddOn}
                </div>
                <div className={styles['service-options-checkout-addon-bold']}>
                  {x.name} - {x.repeat}
                </div>
                <div className={styles['service-options-checkout-addon-regular']}>
                  {x.rate}
                </div>
                {!x.purchased && <div className={styles['service-options-checkout-addon-edit']} onClick={() => handleEdit(x.id)}>
                  {staticContent.edit}
                </div>
                }
              </div>)
            )}
            <br />

            {apiError && <div className={styles['common-api-err']}>{staticContent.error}: {apiError}</div>}

            {/* show checkout page if not purchased */}
            {needCheckout ?
              <ProgressButton
                type='submit'
                loading={loading}
                color='primary'
                variant='contained'
                sx={{ mb: 3 }}
              >
                {staticContent.checkout}
              </ProgressButton>
              :
              <ProgressButton
                loading={loading}
                color='primary'
                variant='contained'
                onClick={handleContinue}
                sx={{ mb: 3 }}
              >
                {staticContent.continue}
              </ProgressButton>
            }

          </div>

        </form>

      </div>
    </Grid>
  )
})

export default PremiumAddonCheckout
