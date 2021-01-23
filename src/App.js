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
                        <ListItemAvatar style={{marginRight : 10}}>
                          <Avatar style={{padding : 15}}> {item.symbol} </Avatar>
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
                              {"Price USD "+ item.quote.USD.price.toFixed(2)}
                              </Typography>
                              {" —  Circulating supply "+ item.circulating_supply.toFixed(2)}
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
 
