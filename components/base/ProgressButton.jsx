import React from 'react'
import { Button, CircularProgress, Tooltip } from '@mui/material'

import styles from './ProgressButton.module.css'

function ProgressButton({ loading, tooltip = '', className, classes, disabled, children, svg, ...props }) {
  return (
    <Tooltip title={tooltip} placement='top'>
      <div className={styles['pb-flex-root']}>
        {svg &&
          <div className={styles['pb-svg-root']}>
            <img src={svg}/>
          </div>
        }
        {loading && <CircularProgress className={styles['pb-spin-item']} size={24} />}
        <div className={styles['pb-flex']}>
          <Button disabled={disabled || loading} {...props} fullWidth>{children}</Button>
        </div>
      </div>
    </Tooltip>
  )
}

export default ProgressButton