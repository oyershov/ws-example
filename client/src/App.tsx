import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import {OutlinedCard} from './components/OutlinedCard';

const useStyles = makeStyles({
  root: {
    marginTop: '25vh',
    width: 300,
  },
});

interface Props {
  ws: WebSocket;
}

function App({ws}: Props) {
  const [price, setPrice] = React.useState(0);
  const classes = useStyles();

  const updatePrice = (value: number) => {
    ws.readyState === WebSocket.OPEN && ws.send(`setInterval:${value}`);
  }

  React.useEffect(() => {
    ws.onmessage = function(e) {
      setPrice(e.data);
    };

    return ws.close;
  }, [])

  return (
    <div className="App">
      <Container className={classes.root} >
        <OutlinedCard price={price} setPrice={updatePrice} />
      </Container>
    </div>
  );
}

export default App;
