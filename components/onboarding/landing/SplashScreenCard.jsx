import React from 'react'
import Lottie from 'react-lottie-player'

import styles from '../Main.module.css'
import content from './StaticContent'

const SplashScreenCard = ({ card }) => {

  return (
    <div className={styles['swiper-inner-card-flex']}>
      <div className={styles['lottie-card-animation']}>
        <Lottie
          loop
          animationData={card.src}
          play
          className={styles['lottie-json']}
        />
      </div>

      <div>{content.nextBlurb[card.id].split('\n').map((x, index) => (<div key={`lottie-card-${index}`} className={styles['lottie-text-head']}>
        {x}</div>))}
      </div>

      <div>
        <div className={styles['lottie-text-info']} style={card.styleAdd}>
          {content.nextBlurbParagraph[card.id]}
        </div>
      </div>

    </div>
  )
}

export default SplashScreenCard
