import BackButton from './BackButton'
import { CustomSlider } from './CustomSlider'
import styles from './Base.module.css'
import { steps } from '../../static/StepsScreenInfo'

const Toolbar = ({label, value, navigateBack}) => {
  return <div className={styles['div-header']}>
    <div className={styles['form-header-text']}>
      {label}
    </div>
    <div className={styles['form-header-slider']}>
      <CustomSlider disabled aria-label="" value={value} color='secondary' min={0} max={steps.length} />
    </div>
    {navigateBack && <BackButton navigateTo={navigateBack} color='white' />}
  </div>
}

export { Toolbar }