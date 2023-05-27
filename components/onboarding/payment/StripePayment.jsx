import React, { useState } from 'react'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'

import ProgressButton from '../../base/ProgressButton'
import styles from '../Main.module.css'
import staticContent from '../../../static/Onboarding'
import { payForPremium } from '../../../services/Admin'


const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#171f58",
      color: "#171f58",
      fontWeight: 500,
      fontFamily: "Lato, Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": {
        color: "#171f58"
      },
      "::placeholder": {
        color: "#8ba7c7"
      }
    },
    invalid: {
      iconColor: "#cc0000",
      color: "#cc0000"
    }
  }
}

const CardField = ({ onChange }) => (
  <div className="FormRow">
    <CardElement options={CARD_OPTIONS} onChange={onChange} />
  </div>
)

const Field = ({ label, id, type, placeholder, required, autoComplete, value, onChange }) => (
  <div className="FormRow">
    <label htmlFor={id} className="FormRowLabel">
      {label}
    </label>
    <input
      className="FormRowInput"
      id={id}
      type={type}
      placeholder={placeholder}
      required={required}
      autoComplete={autoComplete}
      value={value}
      onChange={onChange}
    />
  </div>
)

const StripePayment = ({ name, email, phone, payment, setPurchased }) => {
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [cardComplete, setCardComplete] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState(null)
  const [billingDetails, setBillingDetails] = useState({
    email,
    phone,
    name
  })

  console.log('paying for', payment)
  const total = payment.reduce((accumulator, object) => {
    return accumulator + object.price
  }, 0)

  // console.log(`stripe details= ${JSON.stringify(payment)}`)

  const handlePayment = async (event) => {
    event.preventDefault()

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      console.log('return from payment. not ready')
      return
    }

    if (error) {
      elements.getElement("card").focus()
      console.log('return from payment. not valid')
      return
    }

    if (cardComplete) {
      setLoading(true)
    }

    const payload = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      billing_details: billingDetails
    })
    
    if (payload.error) {
      setError(payload.error)
    } else {
      // console.log('stripe success=', JSON.stringify(payload))
      await setPurchased()
      setPaymentMethod(payload.paymentMethod)
      // Submit to Stripe
      console.log('sneding to payment', { payment_method_id: payload.paymentMethod['id'], premium_options: payment, amount: total })
      await payForPremium({ payment_method_id: payload.paymentMethod['id'], premium_options: payment, amount: total })
    }

    setLoading(false)    
  }

  return paymentMethod ? (
    <div className="Result">
      {/* show nothing */}
      {/* <div className="ResultTitle" role="alert">
        Payment successful
      </div>
      <div className="ResultMessage">
        Thank you for choosing ReadiCharge!
      </div> */}
    </div>
  ) : (
    <form className="Form" onSubmit={handlePayment}>
      <fieldset className="FormGroup">
        <Field
          label="Name"
          id="name"
          type="text"
          placeholder="Name on the card"
          required
          autoComplete="name"
          value={billingDetails.name}
          onChange={(e) => {
            setBillingDetails({ ...billingDetails, name: e.target.value })
          }}
        />
        <Field
          label="Email"
          id="email"
          type="email"
          placeholder="email@example.com"
          required
          autoComplete="email"
          value={billingDetails.email}
          onChange={(e) => {
            setBillingDetails({ ...billingDetails, email: e.target.value })
          }}
        />
        <Field
          label="Phone"
          id="phone"
          type="tel"
          placeholder="(123) 456-7890"
          required
          autoComplete="tel"
          value={billingDetails.phone}
          onChange={(e) => {
            setBillingDetails({ ...billingDetails, phone: e.target.value })
          }}
        />
      </fieldset>
      <fieldset className="FormGroup">
        <CardField
          onChange={(e) => {
            setError(e.error)
            setCardComplete(e.complete)
          }}
        />
      </fieldset>

      <div className={styles['btn-container-stripe']}>
        {error?.message && <div className={styles['common-api-err']}>{staticContent.error}: {error.message}</div>}
        <ProgressButton
          loading={loading}
          color='primary'
          variant='contained'
          type='submit'
          sx={{ mb: 2 }}
        >{staticContent.pay} ${total.toFixed(2)}</ProgressButton>
      </div>
    </form>
  )
}

export default StripePayment
