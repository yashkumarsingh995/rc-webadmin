import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Grid, MenuItem } from '@mui/material'

import { rootOnboarding } from '../../../static/Roots'
import { adminUpdateProfile } from '../../../services/Admin'
import { useStore } from '../../../stores/OnBoardStore'
import ProgressButton from '../../base/ProgressButton'
import { CssTextField } from '../../base/CssTextField'
import { Toolbar } from '../../base/Toolbar'
import styles from '../Main.module.css'
import { usStates } from '../../../services/Common'
import { validZip, isNotEmpty } from '../../helpers/Main'
import staticContent from '../../../static/Onboarding'
import { formIsValid } from '../../helpers/Validation'
import { SvgHelp } from '../../helpers/Images'
import { WebModal } from '../../base/WebModal'

const UpdateCompanyInfo = observer(() => {

  const store = useStore()
  const navigate = useNavigate()

  const { strState, companyName = "", ein = "",
    addressLine1 = "", addressLine2 = "", city = "", zip = "" } = store.currentUser

  const userInit = { strState, companyName, ein, addressLine1, addressLine2, city, zip }

  const errorInit = {
    strState: '', companyName: '', addressLine1: '', addressLine2: '', city: '', zip: ''
  }

  const [objUser, setObjUser] = useState(userInit)
  const [objError, setObjError] = useState(errorInit)

  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState('')
  const [hasValidationIssues, setHasValidationIssues] = useState(false)
  const [formValidationInfo, setFormValidationInfo] = useState('')

  const [modalShow, setModalShow] = useState(false)
  // const [modalShowData, setModalShowData] = useState()

  const { company: l1, address1: l2, address2: l3,
    city: l4, zip: l5, state: l6, ein: l7 } = staticContent.formLabels
  const { company: t1, address1: t2,
    city: t4, zip: t5, state: t6 } = staticContent.formTooltips

  const fields = [
    { id: 'companyName', value: objUser.companyName, validate: isNotEmpty, label: l1, type: 'text', tooltip: t1, helperText: '', isRequired: true },
    { id: 'ein', value: objUser.ein, label: l7, type: 'text', tooltip: '', helperText: '', isRequired: false },
    { id: 'addressLine1', value: objUser.addressLine1, validate: isNotEmpty, label: l2, type: 'text', tooltip: t2, helperText: '', isRequired: true },
    { id: 'addressLine2', value: objUser.addressLine2, validate: null, label: l3, type: 'text', tooltip: '', helperText: '', isRequired: false },
    { id: 'city', value: objUser.city, validate: isNotEmpty, label: l4, type: 'text', tooltip: t4, helperText: '', isRequired: true },
    { id: 'zip', value: objUser.zip, validate: validZip, label: l5, type: 'text', tooltip: t5, helperText: '', isRequired: true },
  ]

  useEffect(() => {
    const { text, isValid } = formIsValid(objUser, objError, fields)
    setFormValidationInfo(text)
    setHasValidationIssues(!isValid)
  }, [])

  const handleChange = (e, id) => {
    const newData = { ...objUser, [id]: e.target.value }

    // find corresponding validation function

    const fieldsList = fields.filter(f => (f.id === id))
    let currField = null
    let considerValid = true
    if (fieldsList.length === 1 ){
      currField = fieldsList[0]
      considerValid = currField.validate ? currField.validate(e.target.value) : true
    }
    
    let newError = null
    if (considerValid) {
      newError = { ...objError, [e.target.id]: '' }
    }
    else {
      newError = { ...objError, [e.target.id]: currField.tooltip }
    }

    const { text, isValid } = formIsValid(newData, newError, fields)

    setFormValidationInfo(text)
    setHasValidationIssues(!isValid)

    setObjUser(newData)
    setObjError(newError)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const form = e.currentTarget
    if (form.checkValidity()) {

      setLoading(true)

      store.setProgress(1)
      store.saveUserInfo(objUser)

      const { companyName: company,
        ein,
        addressLine1: address_one,
        addressLine2: address_two,
        city,
        strState: state,
        zip } = objUser

      const res = await adminUpdateProfile({
        company,
        ein,
        address_one,
        address_two,
        city,
        state,
        zip,
      })

      setLoading(false)

      if (res && res.error) {
        setApiError(res.error)
        console.log(res.error)
      }
      else {
        navigate(`${rootOnboarding}/steps`, { state: { from: '/update-company-info', to: '/state-license' } })
      }
    }
  }

  return (
    <Grid className={styles['fixed-width-container']}>

      <Toolbar label='Setup: account' value={store.setupProgress}
        navigateBack='/create-account' />

      <div className={styles['form-subheading']}>{staticContent.companyInformation}</div>

      <div className={styles['form-container']}>

        <form style={{ width: '100%' }} onSubmit={handleSubmit}>

          {/* TODO: test ui */}
          {/* <div onClick={() => {
            // setModalShowData(staticContent[f.id])
            setModalShow(true)
          }} className={styles['service-options-icon-div-ein']}>
            <img src={SvgHelp} alt="Help" />
          </div> */}

          {fields.map((f, index) => (
            <div key={`sum-${index}`}>
              <div key={`textdiv-${index}`} className={styles['textfield-flex-parent']}>

                <CssTextField
                  id={f.id} label={f.label}
                  key={`textfield-${index}`}
                  required={f.isRequired}
                  // tooltip={f.tooltip}
                  error={f.error}
                  helperText={f.helperText}
                  type={f.type}
                  variant='filled'
                  value={f.value}
                  onChange={(e) => handleChange(e, f.id)}
                  sx={{ margin: '5px 0' }}
                />

              </div>
              {<div className={styles['common-field-err']}>{objError[f.id]}</div>}
            </div>
          ))}

          <CssTextField
            id='strState' label='State' required={true} type='text'
            key={`state-textfield`}
            // tooltip='State'
            value={objUser.strState || ''}
            onChange={(e) => handleChange(e, 'strState')}
            select={true} variant='filled'
            sx={{ margin: '5px 0' }}
          >{usStates.map((x, index) => <MenuItem key={`menu-${index}`} value={x.abbreviation}>{x.name}</MenuItem>)}</CssTextField>

          <div className={styles['btn-container']}>
            {apiError && <div className={styles['common-api-err']}>{staticContent.error}: {apiError}</div>}
            <ProgressButton type='submit'
              loading={loading}
              color='primary'
              // tooltip={formValidationInfo}
              variant='contained'
              disabled={hasValidationIssues}
              sx={{ mb: 2 }}
            >{staticContent.continue}</ProgressButton>
          </div>
        </form>

        <WebModal
          open={modalShow}
          onClose={() => setModalShow(false)}
          data={staticContent.ein}
          dividers={false}
        />

      </div>
    </Grid>
  )
})

export default UpdateCompanyInfo