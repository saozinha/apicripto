import logo from './assets/img/crypto1.png';
import './App.css';
import React, { useState } from 'react';
import {Api} from './api/api'
import {Button, Avatar, ListItemAvatar, List, ListItem, ListItemText, Grid, Typography} from '@material-ui/core'

export default function App() {

  const  [coins, setCoins] = useState([]); 

  const getAllData = () => {  
    console.log("GetAllData");

      Api.get('v1/cryptocurrency/listings/latest')
      .then((response) => {
        if(!response.data) throw new Error('Erro ao executar a resquisição , status ' + response.status);
       // newCoins = response.data;
        setCoins(response.data.data)
      })
      .catch((error) => {
        console.error(error.message)
      })
      
    console.log("Coins " , coins.length);
  }

  return (
    <div className="App">
      <header className="App-header"> 
        <p>
           Api Crypto Coins
        </p>
          <Button color="primary"  onClick={getAllData}>Show coins</Button>
      </header>   
      {coins.length > 0 &&
      <Grid style={{ marginTop: 10 }} container>
          <Grid item xs={12} md={12}>
            <List>
                {coins.map(item => (
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                          <Avatar alt={item.symbol} src={item.symbol} />
                        </ListItemAvatar>
                        <ListItemText
                          primary={item.name}
                          secondary={
                            <React.Fragment>
                              <Typography
                                component="span"
                                variant="body2" 
                                color="textPrimary"
                              >
                              {"Price "+ item.quote.USD.price.toFixed(3)}
                              </Typography>
                              {" —  Circulating supply "+ item.circulating_supply}
                            </React.Fragment>
                          }
                        />
                      </ListItem>  
                ))}
            </List>
        </Grid>
      </Grid> }


    </div>
  );
}
 
