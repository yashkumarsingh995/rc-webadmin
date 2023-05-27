import { styled } from '@mui/system'
import { Slider } from '@mui/material'

const CustomSlider = styled(Slider)(({ }) => ({
    "& .MuiSlider-thumb": {
        width: 0,
        height: 0,
    },
    "& .MuiSlider-rail": {
        color: '#ccc' //color of the slider outside the area between thumbs
    }
}));

export { CustomSlider }