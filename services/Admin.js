import { getIdToken, getAccessToken, getHeaders } from './Aws'

import { numbersOnly } from '../components/helpers/Formatter'

function CheckError(response) {
  if (response.status >= 200 && response.status <= 299) {
    return response.json()
  } else {
    throw Error(response.statusText)
  }
}

export async function createHeaders() {
  const idToken = await getIdToken()
  const accessToken = await getAccessToken()
  return {
    'Content-Type': 'application/json',
    'Authorization': idToken,
    'X-Amz-Access-Token': accessToken,
  }
}

export async function adminCreateUser(objUser) {
  const { firstName, lastName, eMail, phoneNumber, password } = objUser

  const objUserToAdd = {
    'given_name': firstName,
    'family_name': lastName,
    'password': password,
    'email': eMail,
    'phone_number': numbersOnly(phoneNumber),
  }
  
  try {
    const response = await fetch(`${process.env.REACT_APP_PUBLIC_API_URL}/company/admin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(objUserToAdd),
    })

    const adminResponse = await response.json()

    return adminResponse

  } catch (e) {
    console.error(`Admin create error ${e}`)
  }
}

export async function adminGetCurrentUser() {
  try {
    const headers = await getHeaders()
    const response = await fetch(`${process.env.REACT_APP_API_URL}/profile`, {
      method: 'GET',
      headers,
    })

    const adminResponse = await response.json()
    console.log(adminResponse)
    return adminResponse
  } catch (e) {
    console.log(`Admin profile get error: ${e}`)
  }
}

export async function getDashboardData(dataType) {
  try {
    console.log(`Fetching dashboard data for ${dataType}`)
    const headers = await getHeaders()
    const response = await fetch(`${process.env.REACT_APP_API_URL}/dashboard/${dataType}`, {
      method: 'GET',
      headers,
    })

    const dashboardResponse = await response.json()
    console.log('DASHBOARD::GET response', dashboardResponse)
    return dashboardResponse
  } catch (e) {
    console.log(`Dashboard data update error: ${e}`)
  }
}


export async function adminUpdateProfile(update) {
  const objUserToUpdate = { ...update }
  console.log(`Updating ${process.env.REACT_APP_ADMIN_API_URL}/profile with=${JSON.stringify(update)}`)

  try {
    const headers = await createHeaders()
    const response = await fetch(`${process.env.REACT_APP_ADMIN_API_URL}/profile`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(objUserToUpdate),
    })

    const adminResponse = await response.json()

    console.log('response=', adminResponse)

    return adminResponse

  } catch (e) {
    console.error(`Admin profile update error: ${e}`)
    return e.message ? { error: e.message } : { error: e }
  }
}


export async function adminGetProfile() {
  const headers = await createHeaders()
  try {
    const response = await fetch(`${process.env.REACT_APP_ADMIN_API_URL}/profile`, {
      method: 'GET',
      headers,
    })
    const adminResponse = await response.json()
    return adminResponse
  } catch (e) {
    console.error(`Admin profile get error: ${e}`)
  }
}

export async function getStripeOnboardingLink() {
  const headers = await createHeaders()
  try {
    const response = await fetch(`${process.env.REACT_APP_ADMIN_API_URL}/payment/account/onboarding`, {
      method: 'GET',
      headers,
    })
    console.log('getStripeOnboardingLink=', response)
    // const adminResponse = await response.json()
    return response
  } catch (e) {
    console.error(`Error getting stripe onboarding url: ${e}`)
  }
}

// TODO: cleanup debug messages

export async function getPaymentRates() {
  try {
    const headers = await getHeaders()
    const response = await fetch(`${process.env.REACT_APP_API_URL}/payment/rates`, {
      method: 'GET',
      headers,
    })

    console.log('PAYMENT rates SUCCESS 1=', JSON.stringify(response))
    const adminResponse = await response.json()
    console.log('PAYMENT rates SUCCESS 2=', JSON.stringify(adminResponse))
    console.log(adminResponse)
    return adminResponse

  } catch (error) {
    console.log(`Admin profile get error: ${error}`)
    return error.message? {error: error.message} : {error}
  }
}

export async function getAccountOnboarding() {
  const headers = await createHeaders()
  try {
    const response = await fetch(`${process.env.REACT_APP_ADMIN_API_URL}/payment/account/onboarding`, {
      method: 'GET',
      headers,
    })
    console.log('ACCOUNT ONBOARDING RES SUCCESS 1=', JSON.stringify(response))
    // const adminResponse = await response.json()
    const adminResponse = await response.json()
    console.log('ACCOUNT ONBOARDING ADMIN RES SUCCESS 2=', JSON.stringify(adminResponse))
    console.log(adminResponse)
    return adminResponse
  } catch (e) {
    console.warn('ACCOUNT ONBOARDING ERROR=', e)
    console.error(`Error account onboarding: ${e}`)
  }
}

export async function payForPremium(data) {
  console.log(`Submitting payment details for ${data}`)

  try {
    const headers = await createHeaders()
    const response = await fetch(`${process.env.REACT_APP_ADMIN_API_URL}/payment/premium/pay`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    })

    const adminResponse = await response.json()
    console.log('response=', adminResponse)
    return adminResponse
  } catch (e) {
    console.error(`Admin profile update error: ${e}`)
    return e.message ? { error: e.message } : { error: e }
  }
}