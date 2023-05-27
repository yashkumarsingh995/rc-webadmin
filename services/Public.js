export async function mailingListSignup(email) {
  try {
    const response = await fetch(`${process.env.REACT_APP_PUBLIC_API_URL}/customers/mailing_list/signup?email_address=${email}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const signupResponse = await response.json()

    return signupResponse

  } catch (e) {
    console.error(`Email signup error ${e}`)
  }
}