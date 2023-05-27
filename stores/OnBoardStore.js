import { makeAutoObservable, runInAction } from 'mobx'
import { createContext, useContext } from 'react'

import { numbersOnly } from '../components/helpers/Formatter'
import { DEBUG } from '../components/helpers/Debug'

const AUTOFILL = process.env.REACT_APP_FORMS_AUTOFILL === 'true' ? 1 : 0
class OnBoardStore {

  currentUser = getDefaults(AUTOFILL)

  setupProgress = 0

  constructor() {
    makeAutoObservable(this)
  }

  resetStoreUser() {
    const user = getDefaults(AUTOFILL)
    if (DEBUG) console.log(`DEBUG Local store: ${JSON.stringify(user)}`)
    runInAction(() => {
      this.currentUser = user
    })
  }

  saveUserInfo(objUser) {
    const user = {
      ...this.currentUser, ...objUser,
      ['phone']: numbersOnly(objUser.phoneNumber),
    }

    if (DEBUG) console.log(`DEBUG Local store: ${JSON.stringify(objUser)}`)

    runInAction(() => {
      this.currentUser = user
    })
  }

  savePreqalificationResults(annualRate, perJob, qualify, reasons) {
    const user = { ...this.currentUser, annualRate, perJob, qualify, reasons }
    runInAction(() => {
      this.currentUser = user
    })
  }

  setProgress(newVlaue) {
    this.setupProgress = newVlaue
  }

}

const StoreContext = createContext()

function StoreProvider({ store, children }) {
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}

const useStore = () => {
  return useContext(StoreContext)
}

const getDefaults = (autofill) => {

  if (autofill) {
    return {
      firstName: "Natalia N.",
      lastName: "Babicheva",
      eMail: "natalia.n.babicheva@example.com",
      phone: "1234567890",
      strState: "MI",
      isLicensed: false,
      isInsured: false,
      isAgreeBgCheck: false,
      password: "Password1@Password1",
      password2: "Password1@Password1",
      companyName: "Electric Smart",
      phoneNumber: "7087673821",
      addressLine1: "2958 Morningside Dr",
      addressLine2: "",
      city: "Northville",
      zip: "48167",
      stateLicenseNumber: "P80879712",
      businessState: "MI",
      businessInsCompany: "H.L.C Insurance Agency",
      businessAgentPhone: "7541127537",
      businessPolicyNo: "PS67887908",
      businessInsName: "Wide Marketing",
      businessEffD1: "2019-07-08",
      businessEffD2: "2023-07-08",
      bondingInsCompany: "Insurance Fusion",
      bondingAgentPhone: "6547740980",
      bondingPolicyNo: "BN678906412",
      bondingInsName: "Business Zen",
      bondingAmount: "150000",
      bondingEffD1: "2018-03-25",
      bondingEffD2: "2025-03-25",
      agreement: false,
      isAgreeToBgCheck: false,
      bgDriverLicenseNo: "S530-4600-1215",
      bgSSN: "435876098",
      radius: 200,
      serviceOptions: {
        basic: true,
        intermediate: true,
        advanced: true,
        advanced80: true,
        commercial: true,
      },
    }
  }

  return {
    firstName: "",
    lastName: "",
    eMail: "",
    phone: "",
    strState: "",
    isLicensed: false,
    isInsured: false,
    isAgreeBgCheck: false,
    radius: 25,
    serviceOptions: {
      basic: true,
    },
  }

}

export { OnBoardStore, StoreProvider, useStore }