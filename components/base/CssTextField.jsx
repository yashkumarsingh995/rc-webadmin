import { styled } from '@mui/system'
import { TextField, Tooltip } from '@mui/material'

import officialColors from '../../styles/Colors'

const TextFieldStyled = styled(TextField)(({ errorIndicator }) => ({
  "& .MuiInputBase-root": {
    color: officialColors.darkBlue,
  },
  "& .MuiOutlinedInput-root": {
    "& > fieldset": {
      borderColor: officialColors.green,
    }
  },
  "& .MuiOutlinedInput-root:hover": {
    "& > fieldset": {
      borderColor: '#ccc',
    }
  },
  "& .MuiOutlinedInput-root.Mui-focused": {
    "& > fieldset": {
      borderColor: "#ccc",
      borderWidth: '1px',
    }
  },
  "& .MuiFormLabel-root": {
    // color: errorIndicator? errorIndicator : officialColors.gray,
    color: errorIndicator? errorIndicator : officialColors.gray,
  },
}))

const CssTextField = ({ id, label, placeholder, tooltip = '', value, onChange, type, required, select, children, variant, disabled, ...rest }) => {
  return (
    <Tooltip title={tooltip ? (value ? '' : tooltip) : ''} placement="top" arrow>
      {(type === 'date') ?
        <TextFieldStyled
          id={id}
          placeholder={label}
          label={label}
          margin="normal"
          size="small"
          fullWidth
          InputLabelProps={{ shrink: true }}
          value={value}
          onChange={onChange}
          type={type}
          required={required ? true : false}
          variant={variant ? variant : "filled"}
          disabled={disabled ? true : false}
          select={select ? true : false}
          {...rest}
        />
        :
        <TextFieldStyled
          id={id}
          placeholder={label}
          label={label}
          margin="normal"
          size="small"
          fullWidth
          value={value}
          onChange={onChange}
          type={type}
          required={required ? true : false}
          // variant=outlined/filled
          variant={variant ? variant : "filled"}
          disabled={disabled ? true : false}
          select={select ? true : false}
          {...rest}
        >
          {children}
        </TextFieldStyled>
      }
    </Tooltip>)
}

export { CssTextField }