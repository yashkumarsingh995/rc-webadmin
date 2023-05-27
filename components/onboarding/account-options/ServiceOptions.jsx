
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Grid, CircularProgress } from '@mui/material'

import { useStore } from '../../../stores/OnBoardStore'
import { adminUpdateProfile } from '../../../services/Admin'
import styles from '../Main.module.css'
import staticContent from '../../../static/Onboarding'
import { rootOnboarding } from '../../../static/Roots'
import { Toolbar } from '../../base/Toolbar'
import ProgressButton from '../../base/ProgressButton'
import { CustomCheckbox } from '../../base/CustomCheckbox'
import { WebModal } from '../../base/WebModal'
import { SvgHelp } from '../../helpers/Images'
import { getPaymentRates } from '../../../services/Admin'

const ServiceOptions = observer(() => {

  const store = useStore()
  const navigate = useNavigate()

  const { basic = false,
    intermediate = false,
    advanced = false,
    advanced80 = false,
    commercial = false } = store.currentUser.serviceOptions

  const userInit = {
    serviceOptions: {
      basic, intermediate,
      advanced, advanced80, commercial
    }
  }

  const [objUser, setObjUser] = useState(userInit)
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState('')
  const [modalShow, setModalShow] = useState(false)
  const [modalShowData, setModalShowData] = useState({})

  const [rates, setRates] = useState({})

  const handleChangeCheckbox = async (e) => {

    const name = e.target.id
    const newUserData = { ...objUser, serviceOptions: { ...objUser.serviceOptions, [name]: e.target.checked } }
    store.saveUserInfo(newUserData)
    setObjUser(newUserData);
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setApiError('')
    store.saveUserInfo(objUser)

    const { basic, intermediate, advanced, advanced80, commercial } = objUser.serviceOptions

    setLoading(true)

    const res = await adminUpdateProfile({
      serviceOptions: {
        basic,
        intermediate,
        advanced,
        advanced80,
        commercial
      }
    })

    setLoading(false)

    if (res && res.error) {
      setApiError(res.error)
      console.log(res.error)
    }
    else {
      navigate(`${rootOnboarding}/service-area`)
    }
  }

  const { basicInstallation: l1, intermediateInstallation: l2,
    advancedInstallation: l3, advanced80Installation: l4,
    commercialInstallation: l5 } = staticContent.formLabels

  const { basicInstallation: t1, intermediateInstallation: t2,
    advancedInstallation: t3, advanced80Installation: t4,
    commercialInstallation: t5 } = staticContent.formTooltips

  useEffect(() => {
    const getRates = async () => {
      const res = await getPaymentRates()
      if (res && !res.error) {
        setRates(res)
      }
      else {
        console.warn('Could not get rates from API, res=', res)
      }
    }

    getRates()

  }, [])

  const fields = [
    {
      id: 'basic',
      value: objUser.serviceOptions.basic,
      label: rates['BI-1']? `${l1} ${rates['BI-1']}`: l1,
      tooltip: t1,
      placeholder: '',
      type: 'text',
      spinner: true,
    },
    {
      id: 'intermediate',
      value: objUser.serviceOptions.intermediate,
      label: rates['II-1']? `${l2} ${rates['II-1']}`: l2,
      tooltip: t2,
      placeholder: '',
      type: 'text',
      spinner: true,
    },
    {
      id: 'advanced',
      value: objUser.serviceOptions.advanced,
      label: rates['AI-1']? `${l3} ${rates['AI-1']}`: l3,
      tooltip: t3,
      placeholder: '',
      type: 'text',
      spinner: true,
    },
    {
      id: 'advanced80',
      value: objUser.serviceOptions.advanced80,
      label: rates['AI80-1']? `${l4} ${rates['AI80-1']}`: l4,
      tooltip: t4,
      placeholder: '',
      type: 'text',
      spinner: true,
    },
    {
      id: 'commercial',
      value: objUser.serviceOptions.commercial,
      label: l5,
      tooltip: t5,
      placeholder: '',
      type: 'text',
    },
  ]

  return (
    <Grid className={styles['fixed-width-container']}>

      <Toolbar
        label='Setup: options' value={store.setupProgress}
        navigateBack='/certification-in-progress'>
      </Toolbar>

      <div className={styles['form-container']}>

        <div className={styles['form-subheading']}>{staticContent.serviceOptions}</div>

        <form style={{ width: '100%' }} onSubmit={handleSubmit}>

          <div className={styles['service-options-form']}>

            <div className={styles['service-options-regular']}>{staticContent.serviceOptionsInfoRegular}</div>
            <div className={styles['service-options-bold']}>{staticContent.serviceOptionsInfoBold}</div>

            {fields.map((f, index) => (
              <div key={`fields-wrapper-${index}`}>
                <div key={`fields-${index}`} className={styles['service-options-checkbox-flex']}>
                  <CustomCheckbox
                    id={f.id}
                    checked={f.value}
                    onChange={handleChangeCheckbox}
                    label={f.label}
                    labelStyle={{ fontFamily: 'LatoBold' }} // custom font for first label part
                  />

                  {(!rates['BI-1'] && f.spinner) && <CircularProgress className={styles['service-options-spin-item']} size={14} />}

                  <div onClick={() => {
                    setModalShowData(staticContent[f.id])
                    setModalShow(true)
                  }} className={styles['service-options-icon-div']}>
                    <img src={SvgHelp} alt="Help" />
                  </div>

                </div>
              </div>
            ))}

            <WebModal
              open={modalShow}
              onClose={() => setModalShow(false)}
              data={modalShowData}
              rates={rates}
            />

            <div className={styles['btn-container']}>
              {apiError && <div className={styles['common-api-err']}>{staticContent.error}: {apiError}</div>}
              <ProgressButton
                type='submit'
                loading={loading}
                color='primary'
                variant='contained'
                sx={{ mb: 2 }}
              >
                {staticContent.continue}
              </ProgressButton>
            </div>
          </div>

        </form>

      </div>
    </Grid>
  )
})

export default ServiceOptions
