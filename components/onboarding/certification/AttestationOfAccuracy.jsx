import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Grid } from '@mui/material'

import { useStore } from '../../../stores/OnBoardStore'
// import { useStyles } from '../../../styles/Theme'
import styles from '../Main.module.css'
import staticContent from '../../../static/Onboarding'
import { rootOnboarding } from '../../../static/Roots'
import { Toolbar } from '../../base/Toolbar'
import ProgressButton from '../../base/ProgressButton'
import { CustomCheckbox } from '../../base/CustomCheckbox'
// import officialColors from '../../../styles/Colors'
// import { WebModal } from '../../base/WebModal'
// import svgHelp from '../../../assets/images/icon-solid-help.svg'

const AttestationOfAccuracy = observer(() => {

  const store = useStore()
  const navigate = useNavigate()
  // const classes = useStyles()

  const [agree, setAgree] = useState(false)

  // const [modalShow, setModalShow] = useState(false)

  const handleChangeCheckbox = (e) => {
    setAgree(e.target.checked)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    navigate(`${rootOnboarding}/certification-in-progress`)

  }

  return (
    <Grid className={styles['fixed-width-container']}>

      <Toolbar
        label='Setup: certification' value={store.setupProgress}
        navigateBack='/bonding'>
      </Toolbar>

      <div className={styles['form-container']}>

        <div className={styles['form-subheading']}>
          {staticContent.attestationHeading}
        </div>

        {staticContent.attestationProgressData.map((x, index) => (
          <div key={`data-${index}`} className={styles['attestation-paragraph']}>{x}</div>))}

        <form style={{ width: '100%', marginTop: 10, }} onSubmit={handleSubmit}>

          <div className={styles['attestation-checkbox']}>
            <CustomCheckbox id='attestationAgreement'
              required={true}
              checked={agree}
              onChange={handleChangeCheckbox}
              label={staticContent.iAttestThat}
              labelStyle={{ margin: 0, fontSize: 14, fontFamily: 'Lato'}}
              sx={{pl:1}}
              // labelContainerStyle={{ margin: 0, border: '2px solid lime' }}
              // sx={{ border: '2px solid purple', }}
            />
          </div>
          {/* <ProgressButton
            color='secondary'
            variant='outlined'
            svg={svgHelp}
            onClick={() => setModalShow(true)}
            sx={{ mb: 10 }}
          >
            <Typography sx={{ fontFamily: 'LatoBold', fontSize: '12px', color: officialColors.deepBlue }}>
              {staticContent.seeFaqs}
            </Typography>
          </ProgressButton> */}

          {/* <WebModal
            open={modalShow}
            onClose={() => setModalShow(false)}
            data={staticContent.certification}
          /> */}

          <div className={styles['btn-container']}>
            <ProgressButton type='submit'
              color='primary'
              variant='contained'
              sx={{ mb: 2 }}
              disabled={!agree}
            >{staticContent.continue}</ProgressButton>
          </div>

        </form>

      </div>
    </Grid>
  )
})

export default AttestationOfAccuracy
