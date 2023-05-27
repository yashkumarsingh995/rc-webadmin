import React from 'react'
import { Link } from 'react-router-dom'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'

import { rootOnboarding } from '../../static/Roots';
import styles from './Base.module.css';

const BackButton = ({ navigateTo, color }) => {
  return (
    <div className={styles['abs']}>
      <Link to={`${rootOnboarding}${navigateTo}`}><KeyboardBackspaceIcon sx={{ fontSize: '18px', m: 1, color }} /></Link>
    </div>
  );
}

export default BackButton;