import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import { Parser } from 'html-to-react'

import styles from './Base.module.css'
import { terms } from '../../assets/pdf/js/terms'
import { policy } from '../../assets/pdf/js/policy'

const WebModal = ({ data, html='', rates={}, dividers=true, ...rest }) => {

  return <Dialog 
    {...rest}
    PaperProps={{ sx: { paddingBottom: '20px' } }}
  >

    <div className={styles['modal-close-button']} onClick={rest.onClose}>X</div>

    <DialogTitle>
      <div className={styles['modal-title']}>{data.modalTitle}</div>
    </DialogTitle>

    <DialogContent dividers={dividers}>

      {(html === 'terms') && <div>
        {Parser().parse(terms)}
      </div>
      }

      {(html === 'policy') && <div style={{minWidth: '200px'}}>
        {Parser().parse(policy)}
      </div>
      }

      {!html && <div className={styles['modal-dialog-container']}>

        {data.modalNotes && data.modalNotes.map((x, index) => (
          <div key={`note-${index}`} className={styles['modal-note']}>{x}</div>
        ))}

        <ul className={styles['modal-list']}>
          {data.modalBullets && data.modalBullets.map((x, index) => (
            <li key={`bullet-${index}`} className={styles['modal-bullet']}>{x}</li>)
          )}
        </ul>

        {data.modalCategories && data.modalCategories.map((x, index) => (
          <ul key={`category-${index}`} className={styles['modal-unordered-list']}>
            <li className={styles['modal-text-bold']}>{x.header}</li>
            <li>{x.labor}</li>
            <li>{x.rate} {rates[`${data.rateId}${index+1}`]? rates[`${data.rateId}${index+1}`] : ``}</li>
            <li>{x.materials}</li>
          </ul>
        ))}

        {data.notes?.map((x, index) => (
          <div key={`notes-${index}`} className={styles['notes-advanced']}>
            <div className={styles['notes-advanced-title']}>{x.title}</div>
            <div className={styles['notes-advanced-body']}>
            {x.body.map ((x,index) => <div key={`note-body-${index}`} className={ x.style === 'bold' ? styles['notes-advanced-body-bold'] : styles['notes-advanced-body']}>{x.text}</div>)}
            </div>
          </div>
        ))}

      </div>
      }
    </DialogContent>
  </Dialog >
}

export { WebModal }