import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Grid, Typography } from '@mui/material'

import { useStore } from '../../../stores/OnBoardStore'
import { useStyles } from '../../../styles/Theme'
import styles from '../Main.module.css'
import staticContent from '../../../static/Onboarding'
import { rootOnboarding } from '../../../static/Roots'
import { Toolbar } from '../../base/Toolbar'
import ProgressButton from '../../base/ProgressButton'
import officialColors from '../../../styles/Colors'
import { WebModal } from '../../base/WebModal'
import svgHelp from '../../../assets/images/icon-solid-help.svg'

const CertificationInProgress = observer(() => {

  const store = useStore()
  const navigate = useNavigate()
  const classes = useStyles()

  const [modalShow, setModalShow] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    store.setProgress(2.5)
    navigate(`${rootOnboarding}/steps`, { state: { from: '/certification-in-progress', to: '/service-options' } })

  }

  return (
    <Grid className={styles['fixed-width-container']}>

      <Toolbar
        label='Setup: certification' value={store.setupProgress}
        navigateBack='/attestation-of-accuracy'>
      </Toolbar>

      <div className={styles['form-container-small']}>

        <div className={styles['form-heading']}>{staticContent.certificationInProgress}</div>
        {staticContent.certificationProgressData.map((x, index) => (
          <div key={`data-${index}`} className={styles['certification-data']}>{x}</div>))}

        <form style={{ width: '100%', marginTop: 10, }} onSubmit={handleSubmit}>

          <ProgressButton
            color='secondary'
            variant='outlined'
            svg={svgHelp}
            onClick={() => setModalShow(true)}
            sx={{ mb: 10 }}
          >
            <Typography sx={{ fontFamily: 'LatoBold', fontSize: '12px', color: officialColors.deepBlue }}>
              {staticContent.seeFaqs}
            </Typography>
          </ProgressButton>

          <WebModal
            open={modalShow}
            onClose={() => setModalShow(false)}
            data={staticContent.certification}
          />

          <div className={styles['btn-container']}>
            <ProgressButton type='submit'
              color='primary'
              variant='contained'
              sx={{ mb: 2 }}
            >{staticContent.continue}</ProgressButton>
          </div>

        </form>

      </div>
    </Grid>
  )
})

export default CertificationInProgress
