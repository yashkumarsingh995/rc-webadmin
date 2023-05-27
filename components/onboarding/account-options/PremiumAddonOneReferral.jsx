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

const PremiumAddonOneReferral = observer(() => {

  const store = useStore()
  const navigate = useNavigate()

  const {
    addonReferral = '', addonReferralPurchased = false,
  } = store.currentUser

  console.log(`addonReferral='${addonReferral}'`)
  console.log(`addonReferralPurchased='${addonReferralPurchased}'`)
  
  const userInit = { addonReferral }

  const [rate, setRate] = React.useState("$250/year");
  const [subType, setSubType] = React.useState("yearly");

  const [objUser, setObjUser] = useState(userInit)
  const [loadingSkip, setLoadingSkip] = useState(false)
  const [loadingAdd, setLoadingAdd] = useState(false)
  const [apiError, setApiError] = useState('')
  const [modalShow, setModalShow] = useState(false)
  const [modalShowData, setModalShowData] = useState({})

  const handleSkip = async () => {
    setLoadingSkip(true)
    // save to local store only
    store.saveUserInfo({ addonReferral: "" })
    setLoadingSkip(false)
    navigate(`${rootOnboarding}/premium-addon-priority`)
  }

  const handleContinue = async () => {
    navigate(`${rootOnboarding}/premium-addon-priority`)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setApiError('')
    // save to store only
    store.saveUserInfo({ addonReferral: subType })

    navigate(`${rootOnboarding}/premium-addon-priority`)

  }

  return (
    <Grid className={styles['fixed-width-container']}>

      <Toolbar
        label='Setup: options' value={store.setupProgress}
        navigateBack='/service-area'>
      </Toolbar>

      <div className={styles['form-container']}>

        <form style={{ width: '100%' }} onSubmit={handleSubmit}>

          <div className={styles['service-options-form']}>

            <div className={styles['form-heading']}>{staticContent.addonReferral.title}</div>
            <div className={styles['form-subheading']}>{staticContent.addonReferral.subtitle}</div>

            {staticContent.addonReferral.description.map((x, index) =>
              <div key={`desc-${index}`} className={styles['service-options-bullets']}>{x}</div>
            )}

            <div className={[styles['service-options-bold'], styles['service-options-uppercase']].join(' ')}>{staticContent.addonReferral.bulletTitle}</div>

            <ul className={styles['service-options-bullets-ul']}>
              {staticContent.addonReferral.bullets.map((x, index) =>
                <li key={`bullet-${index}`} className={styles['service-options-bullets']}>{x}</li>
              )}
            </ul>

            <div className={styles['service-options-rate-static']}>{staticContent.addonReferral.rateStatic}</div>

            <div className={styles['service-options-rate-dynamic']}>
              {rate}
            </div>
            <div className={styles['service-options-rate-switch']}>
              <ColorButton
                subType={subType}
                setRate={setRate}
                setSubType={setSubType}
                rateMonth={staticContent.addonReferral.rate.monthly}
                rateYear={staticContent.addonReferral.rate.yearly}
              />
            </div>


            {apiError && <div className={styles['common-api-err']}>{staticContent.error}: {apiError}</div>}

            {addonReferralPurchased ?
              <>
                <ProgressButton
                  color='primary'
                  variant='outlined'
                  sx={{ mb: 1 }}
                  disabled={true}
                >
                  Already purchased: {addonReferral === 'yearly' ? 'annual' : addonReferral }
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

export default PremiumAddonOneReferral
