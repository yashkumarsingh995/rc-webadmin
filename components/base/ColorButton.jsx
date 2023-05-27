import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import officialColors from "../../styles/Colors";

const ColorButton = ({ subType, setSubType, setRate, rateMonth, rateYear }) => {

  return (
    <Box sx={{ display: "flex", alignItems: 'center', alignContent: 'center', justifyContent:"center" }}>
      <Box className="mask-box">
        <Box
          className="mask"
          style={{
            transform: `translateX(${subType === "monthly" ? 0 : "80px"})`
          }}
        />
        {/* fontFamily: 'Lato', fontWeight: 'bold', fontSize: '10', */}
        <Button
          disableRipple
          variant="text"
          sx={{ color: subType === "monthly" ? officialColors.darkBlue : officialColors.darkGray }}
          onClick={() => {
            setRate(rateMonth)
            setSubType("monthly")
          }}
        >
          Monthly
        </Button>
        <Button
          disableRipple
          variant="text"
          sx={{ color: subType === "yearly" ? officialColors.darkBlue : officialColors.darkGray }}
          onClick={() => {
            setRate(rateYear)
            setSubType("yearly")
          }}
        >
          Annual
        </Button>
      </Box>
    </Box>
  );
}

export { ColorButton }