import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Grid } from '@mui/material'

import { useStore } from '../../../stores/OnBoardStore'
import { Toolbar } from '../../base/Toolbar'
import { rootOnboarding, rootAdmin } from '../../../static/Roots'
import ProgressButton from '../../base/ProgressButton'
import styles from '../Main.module.css'
import staticContent from '../../../static/Onboarding'
import { steps, navCompletedTitle, navCompletedSubtitle } from '../../../static/StepsScreenInfo'

const StepsScreen = observer(() => {

  const store = useStore();
  const navigate = useNavigate();
  const location = useLocation();

  const [buttonText, setButtonText] = useState(staticContent.continue)

  useEffect(() => {
    if (location.state?.rcadmin) {
      setButtonText(staticContent.continueToApp)
    }
  })

  const handleClick = () => {
    if (location.state?.rcadmin) {
      // last page
      navigate(`${rootAdmin}/schedule`, { state: { showModal: true } })
      return
    }
    navigate(location.state ?
      `${rootOnboarding}${location.state.to}` :
      `${rootOnboarding}/prequalification`
    )
  }

  const floor = Math.floor(store.setupProgress)

  return (
    <Grid className={styles['steps-screen-parent']}>
      <Grid className={styles['fixed-width-bg']}>

        <div className={styles['steps-screen-container']}>

          <Toolbar label='Setup: account' value={store.setupProgress}
            navigateBack={location.state ? location.state.from : '/'} />

          <div className={styles['steps-screen-title']}>{(floor > 0 && floor <= steps.length) ? steps[floor - 1].title : navCompletedTitle}</div>

          <div className={styles['btn-container-steps-screen']}>
            <div className={styles['steps-screen-subtitle']}>{(floor > 0 && floor <= steps.length) ? steps[floor - 1].subtitle : navCompletedSubtitle}</div>
          </div>

          <div className={styles['steps-container']}>
            {steps.map((x, index) =>
              <div key={`${index}-p`} className={styles['step-container']}>
                {floor > index ? <div className={styles['step-progress-completed']}></div> :
                  (floor === index ? <div className={styles['step-progress-current']}></div> :
                    <div className={styles['step-progress-incomplete']}></div>)
                }
                <div key={index} className={(floor === index) ? styles['step-text-bold'] : styles['step-text']}>{x.name}</div>
              </div>
            )}
          </div>

          <div className={styles['btn-container-steps-screen']}>
            <ProgressButton
              color='primary'
              variant='contained'
              onClick={handleClick}
            >{buttonText}</ProgressButton>
          </div>
        </div>

      </Grid>
    </Grid>
  )
})

export default StepsScreen