import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import { Pagination, Navigation } from 'swiper'

import SplashScreenCard from './SplashScreenCard'
import ProgressButton from '../../base/ProgressButton'
import { rootOnboarding, rootAdmin } from '../../../static/Roots'
import splashLogo from '../../../assets/images/logo-installers@3x.png'
import styles from '../Main.module.css';
import staticContent from '../../../static/Onboarding'
import { ReactComponent as ArrowLeft } from '../../../assets/images/icon-arrow-left.svg'
import { ReactComponent as ArrowRight } from '../../../assets/images/icon-arrow-right.svg'

import jsonBolt from '../../../assets/animations/bolt.json'
import jsonConnected from '../../../assets/animations/connected.json'
import jsonGetCertified from '../../../assets/animations/get_certified.json'
import jsonInstallerSchedule from '../../../assets/animations/schedule-installer.json'
import jsonJobDetails from '../../../assets/animations/job_details.json'
import jsonCoin from '../../../assets/animations/earn_coin.json'

import 'swiper/css/navigation'

const localStyle = {
  navigation: {
    cursor: 'pointer',
    borderRadius: '50%',
    width: '35px',
    height: '35px',
    backgroundColor: 'white',
    margin: '10px',
    display: 'flex',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  offsetPrev: {
    marginRight: '3px',
  },
  offsetNext: {
    marginLeft: '3px',
  }
}

const SplashScreen = () => {

  const navigate = useNavigate();

  const navigateToPrequalification = () => {
    navigate(`${rootOnboarding}/prequalification`)
  }

  const navigateToLoginPage = () => {
    navigate(`${rootOnboarding}/login`)
  }

  const pagination = {
    clickable: true,
    el: '.my-custom-pagination-div',
    renderBullet: function (index, className) {
      return '<span class="' + className + '"> </span>'
    },
  }

  const cards = [
    { id: 0, src: jsonBolt, styleAdd: { paddingLeft: 25, paddingRight: 25 } },
    { id: 1, src: jsonConnected, styleAdd: { paddingLeft: 30, paddingRight: 30 } },
    { id: 2, src: jsonGetCertified, styleAdd: { paddingLeft: 35, paddingRight: 35 } },
    { id: 3, src: jsonInstallerSchedule, styleAdd: { paddingLeft: 30, paddingRight: 30 } },
    { id: 4, src: jsonJobDetails, styleAdd: { paddingLeft: 15, paddingRight: 15 } },
    { id: 5, src: jsonCoin, styleAdd: { paddingLeft: 60, paddingRight: 60, paddingTop: 5 } },
  ]

  return (
    <div className={styles['container']}>
      <div className={styles['div-logo']}>
        <img src={splashLogo} alt="logo-installers" className={styles['img-card-logo']}></img>
      </div>

      <div className={styles['div-card']}>
        <div className={styles['card-up']}>

          <div className={styles['lottie-container']}>

            <div className={styles['lottie-left']}>
              <i id="review-swiper-button-prev" style={localStyle.navigation}>
                <ArrowLeft style={localStyle.offsetPrev} />
              </i>
            </div>

            <div className={styles['lottie-middle']}>
              <Swiper key='swiper-1'
                id='swiper-main'
                className='swiper'
                // onSwiper={(swiper) => console.log("::OnSwiper event", swiper)}
                effect={'fade'}
                slidesPerView={1}
                spaceBetween={20}
                autoplay={true}
                modules={[Navigation, Pagination]}
                pagination={pagination}
                navigation={{
                  prevEl: '#review-swiper-button-prev',
                  nextEl: '#review-swiper-button-next',
                }}
                allowTouchMove={false}
              >
                {cards.map((card, index) =>
                  <SwiperSlide key={`${index}-slide`} className={styles['swiper-slide']}>
                    <SplashScreenCard card={card} />
                  </SwiperSlide>)
                }
              </Swiper>
            </div>

            <div className={styles['lottie-right']}>
              <i id="review-swiper-button-next" style={localStyle.navigation}>
                <ArrowRight style={localStyle.offsetNext} />
              </i>
            </div>

          </div>
          <div className="my-custom-pagination-div"></div>

        </div>
      </div>

      <div className={styles['card-down']}>
        <div className={styles['btn-container-landing']}>
          <ProgressButton type="submit"
            color="primary"
            variant="contained"
            onClick={navigateToPrequalification}
          >{staticContent.getStarted}</ProgressButton>

          <button onClick={navigateToLoginPage} className={styles['btn-link']}>{staticContent.iAlreadyHaveAnAccount}</button>
        </div>
      </div>
    </div >
  )
}

export default SplashScreen