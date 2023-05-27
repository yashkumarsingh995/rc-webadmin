import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Grid, CircularProgress } from '@mui/material'
import { observer } from 'mobx-react-lite'

import { rootOnboarding } from '../../../static/Roots'
import { adminUpdateProfile } from '../../../services/Admin'
import ProgressButton from '../../base/ProgressButton'
import { Toolbar } from '../../base/Toolbar'
import { MapWrapper } from '../../base/MapWrapper'
import { useStore } from '../../../stores/OnBoardStore'
import styles from '../Main.module.css'
import staticContent from '../../../static/Onboarding'

const ServiceArea = observer(() => {

  const navigate = useNavigate()
  const store = useStore()

  const { radius = '', lat = '', lng = '', fetchedAddress = null } = store.currentUser

  const userInit = {
    radius,
    lat,
    lng,
  }

  const [loading, setLoading] = useState(false)
  const [addressLoading, serAddressLoading] = useState(false)
  const [objUser, setObjUser] = useState(userInit)
  const [currAddress, setCurrAddress] = useState(fetchedAddress)
  const [errorText, setErrorText] = useState('')
  const [apiError, setApiError] = useState('')

  const handleChange = (e, name) => {
    const newData = { ...objUser, [name]: e.target.value }
    store.saveUserInfo(newData)
    setObjUser(newData)
  }

  function showPosition(position) {

    const dataLng = position.coords.longitude
    const dataLat = position.coords.latitude

    console.log(`Lat=${dataLat}, Lng=${dataLng}`)

    if (dataLat && dataLng && !currAddress) {
      fetchAddress(dataLat, dataLng)
    }
    else {
      console.log(`Not fetching. currAddress=${currAddress}`)
      serAddressLoading(false)
    }
    setObjUser({ ...objUser, 'lat': dataLat, 'lng': dataLng })
  }

  function handleError(error) {
    let errorStr
    switch (error.code) {
      case error.PERMISSION_DENIED:
        errorStr = staticContent.geolocationUserDenied
        break
      case error.POSITION_UNAVAILABLE:
        errorStr = staticContent.geolocationUnavailable
        break
      case error.TIMEOUT:
        errorStr = staticContent.geolocationTimeout
        break
      case error.UNKNOWN_ERROR:
        errorStr = staticContent.geolocationErrorUnknown
        break
      default:
        errorStr = staticContent.geolocationErrorUnknown
    }

    console.error(`${errorStr}`)
    setErrorText(`${errorStr}`)
    serAddressLoading(false)
  }

  const fetchAddress = (dataLat, dataLng) => {

    serAddressLoading(true)

    if (dataLat && dataLng && !currAddress) {

      console.log('Fetching address from accurate API...')

      fetch(`https://api.geocodify.com/v2/reverse?api_key=4ac371a24b42a8db7fee81b0357a26a21dfe1940&lat=${dataLat}&lng=${dataLng}`)
        .then(function (response) {
          return response.json()
        }).then(function (json) {
          console.log('geocodify return=', json)
          if (json.response && json.response.features && json.response.features.length > 0) {
            const { locality, name, postalcode, region_a, country_code } = json.response.features[0].properties

            if (region_a != store.currentUser.strState) {
              throw 'Wrong address'
            }

            const dataAddress = {
              city: locality,
              address1: name,
              zip: postalcode ? postalcode.split('-')[0] : '',
              state: region_a,
              country: country_code
            }
            console.log('currAddress=', dataAddress)
            setCurrAddress(dataAddress)
            serAddressLoading(false)
          }
        })
        .catch((e) => {

          console.log('error=', e)
          // try nominatim
          console.log('fetch nominatim... free but not very accurate')

          fetch(`http://nominatim.openstreetmap.org/reverse?format=json&lon=${dataLng}&lat=${dataLat}`)
            .then(function (response) {
              return response.json()
            }).then(function (json) {
              console.log('nominatim return=', json)

              const { town, city, municipality, road, postcode, state, country } = json.address
              const dataAddress = {
                city: town ? town : city ? city : municipality ? municipality : 'n/a',
                address1: road,
                zip: postcode,
                state: state,
                country: country
              }

              console.log('currAddress=', dataAddress)
              setCurrAddress(dataAddress)
              serAddressLoading(false)

            })
            .catch((e) => {
              setErrorText(`Error fetching address ${e}`)
              serAddressLoading(false)
            })
        })
    }
    else {
      console.log(`currAddress is already loaded: ${currAddress}`)
      serAddressLoading(false)
    }

  }

  function getLocation() {

    serAddressLoading(true)

    if (objUser.lat && objUser.lng) {
      console.log('Lat and Lng are loaded from the store')
      fetchAddress(objUser.lat, objUser.lng)
    }
    else {
      if (navigator.geolocation) {
        console.log('Getting Lat and Lng from browser navigator')
        navigator.geolocation.getCurrentPosition(showPosition, handleError)
      } else {
        setErrorText('Geolocation is not supported by your browser.')
        console.error("Geolocation is not supported by your browser.")
        serAddressLoading(false)
      }
    }
  }

  const handleSubmit = async () => {
    store.saveUserInfo({ ...objUser, fetchedAddress: currAddress })
    store.setProgress(3.5)

    store.saveUserInfo(objUser)

    const { radius, lat, lng } = objUser

    setLoading(true)

    const res = await adminUpdateProfile({
      serviceArea: {
        radius, lat, lng
      }
    })

    setLoading(false)

    if (res && res.error) {
      setApiError(res.error)
      console.log(res.error)
    }
    else {
      navigate(`${rootOnboarding}/premium-addon-referral`)
    }
  }

  useEffect(() => {
    getLocation()
  }, [])


  return (
    <Grid className={styles['fixed-width-container']}>

      <Toolbar label='Setup: options' value={store.setupProgress}
        navigateBack='/service-options' />

      <div className={styles['form-subheading']}>{staticContent.setYourServiceArea}</div>

      <div className={styles['form-container']}>

        <div className={styles['service-area-flex']}>

          <div className={styles['spin-parent']}>
            {(addressLoading) && <CircularProgress className={styles['spin-item-map']} size={24} />}
          </div>

          {(errorText) && <div className={styles['service-area-location-header']}>{errorText}</div>}

          <MapWrapper
            radius={objUser.radius}
            lat={objUser.lat}
            lng={objUser.lng}
            currAddress={currAddress}
            onChange={handleChange}
          />

          <div className={styles['btn-container']}>
            {apiError && <div className={styles['common-api-err']}>{staticContent.error}: {apiError}</div>}
            <ProgressButton
              onClick={handleSubmit}
              loading={loading}
              color='primary'
              variant='contained'
              sx={{mb: 2}}
            >
              {staticContent.continue}
            </ProgressButton>
          </div>
        </div>
      </div>
    </Grid>
  )
})

export default ServiceArea