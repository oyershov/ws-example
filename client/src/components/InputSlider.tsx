import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const MIN_VALUE = 0;
const MAX_VALUE = 3600;
const STEP = 1;

interface Props {
  setPrice: (value: number) => void;
}

export const InputSlider = ({setPrice}: Props) => {
  const [value, setValue] = React.useState(MIN_VALUE);

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  const handleInputChange = (event: any) => {
    setValue(Number(event.target.value || MIN_VALUE));
  };

  const handleBlur = () => {
    if (value < MIN_VALUE) {
      setValue(MIN_VALUE);
    } else if (value > MAX_VALUE) {
      setValue(MAX_VALUE);
    }
  };

  React.useEffect(() => {
    setPrice(value);
  }, [value]);

  return (
    <Container style={{marginTop: 36, marginBottom: 12}}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <Slider
            value={value}
            min={MIN_VALUE}
            step={STEP}
            max={MAX_VALUE}
            onChange={handleChange}
            valueLabelDisplay="auto"
            aria-labelledby="non-linear-slider"
          />
        </Grid>
        <Grid item>
          <Input
            value={value}
            margin="dense"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: STEP,
              min: MIN_VALUE,
              max: MAX_VALUE,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
      </Grid>
      <Typography id="non-linear-slider" style={{textAlign: 'center', marginTop: 24}}>
        <span style={{fontWeight: 600, textDecoration: 'underline'}}>{value}</span> Messages per minute!
      </Typography>
      <Typography id="non-linear-slider" style={{textAlign: 'center', marginTop: 12, fontWeight: 600}}>
        OR
      </Typography>
      <Typography id="non-linear-slider" style={{textAlign: 'center', marginTop: 12}}>
        1 message every <span style={{fontWeight: 600, textDecoration: 'underline'}}>{value ? (60 / (value || 1)).toFixed(value.toString().length - 1) : '--'}</span> sec.
      </Typography>
    </Container>
  );
}
