import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { InputSlider } from './InputSlider';

const useStyles = makeStyles({
  root: {
    width: 300,
  },
  h2: {
    alignItems: 'center',
    display: 'flex',
    marginBottom: 24
  }
});

interface Props {
  price: number;
  setPrice: (value: number) => void;
}

export const OutlinedCard = ({price, setPrice}: Props) => {
  const [currentPrice, setCurrentPrice] = React.useState(0);
  const [isPositive, setIsPositive] = React.useState(true);
  const classes = useStyles();
  const priceColor = currentPrice ? (
    isPositive ? 'green' : 'red'
  ) : 'black';

  React.useEffect(() => {
    setIsPositive(price - currentPrice >= 0);
    setCurrentPrice(price);
  }, [price])

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography
          variant="h4"
          component="h2"
          className={classes.h2}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1024px-Bitcoin.svg.png"
            alt="BTC"
            width="34px"
            height="34px"
          />&nbsp;Bitcoin price
        </Typography>

        <Typography variant="h5" component="p" style={{textAlign: 'center', color: priceColor}}>
          ${(+price).toFixed(2)}
        </Typography>
      </CardContent>
      <CardActions>
        <InputSlider setPrice={setPrice}/>
      </CardActions>
    </Card>
  );
}
