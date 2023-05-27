import { FormControlLabel, Checkbox, Typography } from '@mui/material'
import CircleCheckedFilled from '@mui/icons-material/CheckCircle'
import CircleUnchecked from '@mui/icons-material/RadioButtonUnchecked'

import officialColors from '../../styles/Colors'

const labelContainer = {
  margin: '0 5px 0 5px',
  display: 'flex',
  flexDirection: 'column',
  alignContent: 'center',
}

const labelStyleMain = {
  color: officialColors.darkBlue,
  fontFamily: 'Lato',
  fontSize: '14px',
  textTransform: 'none',
}

// TODO: find better way to show multiline checkbox text
const CustomCheckbox = ({ id, required, checked, onChange, label,
  labelStyle: labelStyleCustom = {},
  labelContainerStyle: labelContainerStyleCustom = {}, size, ...rest }) => {
  return (
    <div style={{ margin: '5px 0' }}>
      <FormControlLabel
        control={
          <Checkbox
            id={id}
            size={size ? size : 'medium'}
            fullwidth="true"
            checked={checked}
            onChange={onChange}
            sx={{ color: officialColors.darkBlue, borderWidth: 1 }}
            icon={<CircleUnchecked />}
            checkedIcon={<CircleCheckedFilled />}
            required={required ? true : false} />
        }
        label={
          <div
            key={`option`}
            style={{ ...labelContainer, ...labelContainerStyleCustom }}>
            {label.split('\n').map(
              (x, index) => (
                <Typography
                  key={`line-${index}`}
                  sx={(index === 0) ? { ...labelStyleMain, ...labelStyleCustom } : labelStyleMain}
                  variant="variant"
                >
                  {x}
                </Typography>
              ))}
          </div>
        }
        {...rest}
      />
    </div>
  )
}

export { CustomCheckbox }