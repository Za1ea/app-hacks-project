import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';
import Tree from '/tree.png'
import Bus from '/Bus.png'
import WaterBucket from '/water.png'

const Input = styled(MuiInput)`
  width: 3.5em;
`;

export default function InputSlider({ onChange, page, labelText }) {
  const [value, setValue] = React.useState(0);
  var imgSrc = Tree;

  if (page == "transportation") {
    var imgSrc = Bus
  }
  else if (page == "water") {
    var imgSrc = WaterBucket
  }

  const handleSliderChange = (e) => {
    const newValue = parseFloat(e.target.value);
    setValue(newValue);
    onChange(newValue); // Pass raw slider value up
  };

  const handleInputChange = (event) => {
    const newValue = (event.target.value === '' ? 0 : Number(event.target.value))
    setValue(newValue);
    onChange(newValue);
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 1000) {
      setValue(1000);
    }
  };

  return (
    <Box sx={{ width: "70%", marginTop: "1em" }}>
      <Typography id="input-slider" gutterBottom>
        {labelText}
      </Typography>
      <Grid container spacing={2} style={{ alignItems: 'center' }}>
        <Grid size={2}>
          <img src={imgSrc} alt="tree" className="small-img"/>
        </Grid>
        <Grid size={9}>
          <Slider
            defaultValue={0}
            value={value}
            valueLabelDisplay="auto"
            min={0}
            max={1000}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
          />
        </Grid>
        <Grid size={1}>
          <Input
            value={value}
            size="small"
            onChange={handleInputChange}
            onBlur={handleBlur}
            color="#fff"
            inputProps={{
              step: 10,
              min: 0,
              max: 1000,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
