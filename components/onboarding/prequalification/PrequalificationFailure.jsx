import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import CancelIcon from '@mui/icons-material/Cancel'
import { Grid } from '@mui/material'

import { useStore } from '../../../stores/OnBoardStore'
import BackButton from '../../base/BackButton'
import ProgressButton from '../../base/ProgressButton'
import { CustomCheckbox } from '../../base/CustomCheckbox'
import { CssTextField } from '../../base/CssTextField'
import { rootOnboarding } from '../../../static/Roots'
import styles from '../Main.module.css'
import staticContent from '../../../static/Onboarding'
import { emailIsValid } from '../../helpers/Main'
import { mailingListSignup } from '../../../services/Public'
import officialColors from '../../../styles/Colors'

const PrequalificationFailure = observer(() => {

  const store = useStore()
  const navigate = useNavigate()

  const { eMail: eMailInit } = store.currentUser
  const [email, setEmail] = useState(eMailInit)
  const [subscribed, setSubscribed] = useState('')
  const [loading, setLoading] = useState(false)

  const handleClickInformed = async () => {
    setLoading(true)
    const res = await mailingListSignup(email)
    if (res) {
      setSubscribed(staticContent.thankYouForProviding)
      setEMailVisible(false)
    }
    console.log(`subscribed: ${JSON.stringify(res)}`)
    setLoading(false)
  }

  const handleChange = (e) => {
    setEmail(e.target.value)
  }

  const handleClickTryAgain = () => {
    navigate(`${rootOnboarding}/prequalification`)
  }

  const { reasons } = store.currentUser
  const [eMailVisible, setEMailVisible] = useState(true)

  return (
    <Grid className={styles['fixed-width-container-600']}>
      <BackButton navigateTo='/prequalification' color='blueMain' />

      <div className={styles['form-container-small']}>

        <div className={styles['prequalification-header']}>{staticContent.prequalification}</div>
        <div className={styles['prequalification-unfortunately']}>{staticContent.unfortunately}</div>
        <div className={styles['prequalification-message']}>{staticContent.yourCompanyDoesNotMeet}</div>

        {reasons &&
          <ul>
            {reasons.map((x, index) => (
              <li key={index} className={styles['prequalification-reasons']}>
                <CancelIcon className={styles['prequalification-icon']} />{x}</li>))}
          </ul>
        }

        <div className={styles['prequalification-message']}>{staticContent.weCanKeep}</div>

        <div className={styles['subscribed-container']}>
          {subscribed ? subscribed.split('\n').map((x, index) =>
            <div key={`subscribed-${index}`} className={styles['fade-in-text']}>{x}</div>
          ) :
            <>
              <CssTextField
                id='input1' required={true}
                type="email" variant='filled'
                onChange={handleChange}
                value={email}
                label='Email'
                disabled={!eMailVisible}
              />

              <CustomCheckbox className={styles['checkbox-centered-left']} key='test' id='test' required={false} size='medium'
                onChange={() => setEMailVisible(!eMailVisible)}
                checked={eMailVisible}
                label={staticContent.iWantToReceive}
                sx={{ margin: '0' }}
              />
            </>}
        </div>

        <div className={styles['btn-container-prequalification-fail']}>
          <ProgressButton
            loading={loading}
            type="submit"
            color="secondary"
            variant="contained"
            sx={{ fontWeight: 'bold' }}
            onClick={handleClickInformed}
            disabled={!(eMailVisible && emailIsValid(email))}
          >{staticContent.keepMeInformed}</ProgressButton>
        </div>

        <div className={styles['btn-container-no-margin']}>
          <ProgressButton
            type="submit"
            color="secondary"
            variant='outlined'
            sx={{ mb: 3, fontWeight: 'bold', color: officialColors.darkBlue }}
            onClick={handleClickTryAgain}
          >{staticContent.tryAgain}</ProgressButton>
        </div>
      </div>
    </Grid>
  )
})

export default PrequalificationFailure