import { MenuItem } from '@mui/material'

import { CssTextField } from './CssTextField'
import styles from './Base.module.css'
import staticContent from '../../static/Onboarding'

function MapWrapper({ currAddress, radius, onChange }) {
  const fields = [
    { id: '10', name: '10 Miles' },
    { id: '25', name: '25 Miles' },
    { id: '50', name: '50 Miles' },
    { id: '75', name: '75 Miles' },
    { id: '100', name: '100 Miles' },
    { id: '200+', name: '200 Miles' },
  ]

  return (
    <>
      {currAddress &&
        <div className={styles['service-area-location-container']}>
          <div className={styles['service-area-location-header']}>{staticContent.yourBusinessLocation}</div>
          <div className={styles['service-area-description']}>{currAddress.address1}</div>
          <div className={styles['service-area-description']}>{currAddress.city}, {currAddress.state} {currAddress.zip}</div>
        </div>
      }

      <div className={styles['service-area-location-container']}>
        <div className={styles['service-area-description-inline']}>{staticContent.chooseAMile}</div>
        <div className={styles['service-area-description-inline-italic']}>{staticContent.radiusIsApproximate}</div>
      </div>

      <CssTextField
        id='radius'
        label='Radius'
        required={true}
        type='text'
        value={radius}
        onChange={(e) => onChange(e, 'radius')}
        select={true} variant='filled'
      >
        {fields.map((x, index) => <MenuItem key={index} value={x.id}>{x.name}</MenuItem>)}
      </CssTextField>

    </>
  )
}

export { MapWrapper }