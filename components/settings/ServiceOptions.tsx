
import React, { useState } from 'react'
import { Grid, Typography } from '@mui/material'
// import styles from '../onboarding/Main.module.css'
import staticContent from '../../static/Onboarding'
import { CustomCheckbox } from '../base/CustomCheckbox'
import { WebModal } from '../base/WebModal'
import { SvgHelp } from '../helpers/Images'
import styles from '../../styles/SettingsStyles'
import { BooleanField, BooleanInput, useRecordContext } from 'react-admin'


const ServiceOptions = () => {
  const [modalShow, setModalShow] = useState(false)
  const [modalShowData, setModalShowData] = useState({})

  const { basicInstallation: l1, intermediateInstallation: l2,
    advancedInstallation: l3, advanced80Installation: l4,
    commercialInstallation: l5 } = staticContent.formLabels

  const fields = [
    { id: 'basic', source: 'service_options.basic', label: l1, placeholder: '', type: 'text' },
    { id: 'intermediate', source: 'service_options.intermediate', label: l2, placeholder: '', type: 'text' },
    { id: 'advanced', source: 'service_options.advanced', label: l3, placeholder: '', type: 'text' },
    { id: 'advanced80', source: 'service_options.advanced80', label: l4, placeholder: '', type: 'text' },
    { id: 'commercial', source: 'service_options.commercial', label: l5, placeholder: '', type: 'date' },
  ]

  return (
    <Grid sx={styles.fixedWidthContainer}>
      <div style={styles.serviceOptionsForm}>
        {fields.map((f, index) => (
          <div key={`fields-${index}`} style={styles.serviceOptionscheckboxFlex}>
            <BooleanInput source={f.source} label={f.id} />
            {/* <CustomCheckbox
              id={f.id}
              checked={f.value}
              onChange={handleChangeCheckbox}
              label={f.label}
              required={false}
              size={''}
            /> */}
            <div
              onClick={() => {
                setModalShowData(staticContent[f.id])
                setModalShow(true)
              }}
              style={styles.serviceOptionsiconDiv}
            >
              <img src={SvgHelp} alt="Help" />
            </div>
          </div>
        ))}
        <WebModal
          open={modalShow}
          onClose={() => setModalShow(false)}
          data={modalShowData}
        />
      </div>
    </Grid>
  )
}

export default ServiceOptions
