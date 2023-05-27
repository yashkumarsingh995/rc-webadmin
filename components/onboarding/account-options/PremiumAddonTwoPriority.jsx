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
import { ColorButton } from '../../base/ColorButton'

const PremiumAddonTwoPriority = observer(() => {

  const store = useStore()
  const navigate = useNavigate()

  const {
    addonReferral = "", addonReferralPurchased = false,
    addonPriority = "", addonPriorityPurchased = false,
  } = store.currentUser

  console.log(`addonPriority='${addonPriority}'`)
  console.log(`addonPriorityPurchased='${addonPriorityPurchased}'`)
  
  // premium addon two
  const userInit = { addonPriority }

  const [rate, setRate] = React.useState("$100/year")
  const [subType, setSubType] = React.useState("yearly")

  const [referral, setReferral] = React.useState(addonReferral)
  const [referralPurchased, setReferralPurchased] = React.useState(addonReferralPurchased)

  const [objUser, setObjUser] = useState(userInit)
  const [loadingSkip, setLoadingSkip] = useState(false)
  const [loadingAdd, setLoadingAdd] = useState(false)
  const [apiError, setApiError] = useState('')
  const [modalShow, setModalShow] = useState(false)
  const [modalShowData, setModalShowData] = useState({})

  const handleSkip = async () => {

    setLoadingSkip(true)
    store.saveUserInfo({ addonPriority: "" })
    setLoadingSkip(false)

    handleContinue()
  }

  const handleContinue = async () => {

    // choose flow
    if (referral && !referralPurchased) {
      // TODO: test this flow
      navigate(`${rootOnboarding}/premium-addon-checkout`)
    }
    else {
      navigate(`${rootOnboarding}/steps`, { state: { from: '/premium-addon-priority', to: '/stripe-onboard' } })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setApiError('')
    store.saveUserInfo({ addonPriority: subType })

    setLoadingAdd(true)

    const res = await adminUpdateProfile({ addonPriority: subType })

    setLoadingAdd(false)

    if (res && res.error) {
      setApiError(res.error)
      console.log(res.error)
    }
    else {
      navigate(`${rootOnboarding}/premium-addon-checkout`)
    }
  }

  return (
    <Grid className={styles['fixed-width-container']}>

      <Toolbar
        label='Setup: options' value={store.setupProgress}
        navigateBack='/premium-addon-referral'>
      </Toolbar>

      <div className={styles['form-container']}>

        <form style={{ width: '100%' }} onSubmit={handleSubmit}>

          <div className={styles['service-options-form']}>

            <div className={styles['form-heading']}>{staticContent.addonPriority.title}</div>
            <div className={styles['form-subheading']}>{staticContent.addonPriority.subtitle}</div>

            {staticContent.addonPriority.description.map((x, index) =>
              <div key={`desc-${index}`} className={styles['service-options-bullets']}>{x}</div>
            )}

            <div className={[styles['service-options-bold'], styles['service-options-uppercase']].join(' ')}>{staticContent.addonPriority.bulletTitle}</div>

            <ul className={styles['service-options-bullets-ul']}>
              {staticContent.addonPriority.bullets.map((x, index) =>
                <li key={`bullet-${index}`} className={styles['service-options-bullets']}>{x}</li>
              )}
            </ul>

            <div className={styles['service-options-rate-static']}>{staticContent.addonPriority.rateStatic}</div>

            <div className={styles['service-options-rate-dynamic']}>
              {rate}
            </div>
            <div className={styles['service-options-rate-switch']}>
              <ColorButton
                subType={subType}
                setRate={setRate}
                setSubType={setSubType}
                rateMonth={staticContent.addonPriority.rate.monthly}
                rateYear={staticContent.addonPriority.rate.yearly}
              />
            </div>

            {apiError && <div className={styles['common-api-err']}>{staticContent.error}: {apiError}</div>}

            {addonPriorityPurchased ?
              <>
              {console.log('addonPriorityPurchased= ', addonPriorityPurchased)}
                <ProgressButton
                  color='primary'
                  variant='outlined'
                  sx={{ mb: 1 }}
                  disabled={true}
                >
                  Already purchased: {addonPriority === 'yearly' ? 'annual' : addonPriority}
                </ProgressButton>
                <ProgressButton
                  loading={loadingSkip}
                  color='primary'
                  sx={{ mb: 1 }}
                  onClick={handleContinue}
                  variant='contained'
                >
                  {staticContent.continue}
                </ProgressButton>
              </>
              :
              <>
                <ProgressButton
                  type='submit'
                  loading={loadingAdd}
                  color='primary'
                  variant='contained'
                  sx={{ mb: 1 }}
                >
                  {staticContent.addOption}
                </ProgressButton>

                <ProgressButton
                  loading={loadingSkip}
                  color='primary'
                  variant='outlined'
                  sx={{ mb: 1 }}
                  onClick={handleSkip}
                >
                  {staticContent.skipForNow}
                </ProgressButton>
              </>
            }

            <div className={styles['service-options-footer']}>
              {staticContent.youCanAdd}
            </div>
          </div>

        </form>

      </div>
    </Grid>
  )
})

export default PremiumAddonTwoPriority
