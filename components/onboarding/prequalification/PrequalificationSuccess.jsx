import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Grid } from '@mui/material'

import { rootOnboarding } from '../../../static/Roots'
import { useStore } from '../../../stores/OnBoardStore'
import BackButton from '../../base/BackButton'
import styles from '../Main.module.css'
import iconBolt from '../../../assets/images/icon-bolt@3x.png'
import { WebModal } from '../../base/WebModal'
import staticContent from '../../../static/Onboarding'
import { termsOfService, privacyPolicy } from '../../../static/TermsAndConditions'
import ProgressButton from '../../base/ProgressButton'
import svgHelp from '../../../assets/images/icon-solid-help.svg'
import officialColors from '../../../styles/Colors'

const PrequalificationSuccess = observer(() => {

  const store = useStore()
  const navigate = useNavigate()

  const [modalShow, setModalShow] = useState(false)
  const [modalShowData, setModalShowData] = useState({})
  const [html, setHtml] = useState('')

  const handleClick = () => {
    store.setProgress(0.5)
    navigate(`${rootOnboarding}/steps`, { state: { from: '/prequalification-success', to: '/create-account' } })
  }
  const handleClickFAQ = () => {
    setHtml('')
    setModalShowData(staticContent.faqs)
    setModalShow(true)
  }
  const handleTermsOfService = () => {
    setHtml('terms')
    setModalShowData(termsOfService)
    setModalShow(true)
  }
  const handlePrivacyPolicy = () => {
    setHtml('policy')
    setModalShowData(privacyPolicy)
    setModalShow(true)
  }

  const localParams = {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }

  const { annualRate, perJob } = store.currentUser
  const strAnnual = annualRate ? annualRate.toLocaleString('en-US', localParams) : staticContent.na

  localParams.maximumFractionDigits = 2
  const strPerJob = perJob ? perJob.toLocaleString('en-US', localParams) : staticContent.na

  return (
    <Grid className={styles['fixed-width-container']}>
      <BackButton navigateTo='/prequalification' color='blueMain' />

      <div className={styles['form-container-small']}>

        <div className={styles['prequalification-header']}>{staticContent.prequalification}</div>

        <div className={styles['form-heading']}>
          <img src={iconBolt} alt="icon-bolt" className={styles['img-card-logo']}></img>
          <div>{staticContent.yes}</div>
        </div>
        <div className={styles['form-subheading']}>{staticContent.yourCompanyIsQualified}</div>
        <div className={styles['prequalification-info']}>{staticContent.installersInYourArea}</div>
        <div className={styles['prequalification-rate']}>{strPerJob}</div>
        <div className={styles['prequalification-info']}>{staticContent.perBasicInstallation}</div>
        <div className={styles['prequalification-info']}><div>{staticContent.atTheCurrentRate} {strAnnual} {staticContent.annually}</div></div>

        <div className={styles['btn-container-no-margin']}>
          <ProgressButton
            type="submit"
            color="secondary"
            variant='outlined'
            svg={svgHelp}
            sx={{ mb: 3, fontWeight: 'bold', color: officialColors.darkBlue }}
            onClick={handleClickFAQ}
          >{staticContent.seeFaqs}</ProgressButton>
        </div>

        <div className={styles['prequalification-terms']}>
          <div className={styles['nowrap']} onClick={handleTermsOfService}>
          {/* <div className={styles['nowrap']}> */}
            <Link to=''>{staticContent.termsOfService}</Link>
            {/* <a href={tacInstallers} target = "_blank">{staticContent.termsOfService}</a> */}
          </div>
          {staticContent.and}
          <div className={styles['nowrap']} onClick={handlePrivacyPolicy}>
            <Link to=''>{staticContent.privacyPolicy}</Link>
          </div>
        </div>

        <WebModal
          open={modalShow}
          onClose={() => setModalShow(false)}
          html={html}
          data={modalShowData}
        />

        <div className={styles['btn-container']}>
          <ProgressButton
            type="submit"
            color="primary"
            variant="contained"
            sx={{ mb: 2 }}
            onClick={handleClick}
          >{staticContent.continue}</ProgressButton>
        </div>
      </div>
    </Grid>
  )
})

export default PrequalificationSuccess

