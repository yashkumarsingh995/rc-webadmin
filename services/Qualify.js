export async function checkIfUserQualifies(objUser) {

    const { firstName, lastName, eMail, strState, isLicensed, isInsured, isAgreeBgCheck } = objUser;

    const objUserToCheck = {
        "first_name": firstName,
        "last_name": lastName,
        "email": eMail,
        "state": strState,
        "licensed": isLicensed,
        "insured": isInsured,
        "agree_to_background_check": isAgreeBgCheck
    }

    const response = await fetch(`${process.env.REACT_APP_PUBLIC_API_URL}/qualify`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(objUserToCheck),
    });

    const userResponse = await response.json();

    return userResponse;
}