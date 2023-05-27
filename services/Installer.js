import { getIdToken, getAccessToken } from './Aws';

export async function installerCreateUser(objUser) {
  const { firstName, lastName, eMail, companyName, phoneNumber,
    addressLine1, addressLine2, city, strState, zip } = objUser;

  const objUserToAdd = {
    'given_name': firstName,
    'family_name': lastName,
    'name': 'test',
    'password': 'Q-123456789',
    'email': eMail,
    'company': companyName,
    'phone_number': phoneNumber,
    'addressOne': addressLine1,
    'addressTwo': addressLine2,
    'city': city,
    'homeState': strState,
    'zip': zip,
  };
  console.log(objUserToAdd);

  try {
    const response = await fetch(`${process.env.REACT_APP_PUBLIC_API_URL}/installer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(objUserToAdd),
    });
    
    const installerResponse = await response.json()
    console.log('installer::POST response', installerResponse)

    return installerResponse;

  } catch (e) {
    console.log(`Installer POST error ${e}`)
  }
}

export async function installerUpdateUser(update) {

  try {
    console.log('before try');

    const idToken = await getIdToken();
    const accessToken = await getAccessToken();
    const response = await fetch(`${process.env.REACT_APP_INSTALLER_API_URL}/installer`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': idToken,
        'X-Amz-Access-Token': accessToken,
      },
      body: JSON.stringify(update),
    });

    const installerResponse = await response.json();

    return installerResponse;
  } catch (e) {
    console.error(`Installer user update error ${e}`);
  }
}