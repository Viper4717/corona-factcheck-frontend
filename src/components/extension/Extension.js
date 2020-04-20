import React, { Component, useState, useEffect } from 'react';
import "./Extension.css"
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Axios from 'axios'

/*
    Extension page design
    @author A.M. Aahad
*/

function Extension() {
  const [data, setState] = useState({ 
    downloadLinks: []
  });

  useEffect(() => {
    Axios({
      method: 'GET',
      url: 'http://192.168.0.105:1337/extensions'
    }).then(x => {
      setState({
        downloadLinks: x.data
      })
    })
  }, []);
  let outputList = data.downloadLinks;
  return (
    <div>
    {outputList.map(s => 
      (
        <div className="extensionPage">
        <center>
        <Card className="card" variant="outlined">
          <CardContent>
            <Typography variant="h5" component="h2">
              {s.title}
            </Typography>
          </CardContent>
          <CardActions style={{justifyContent: "center"}}>
            <Button className="downloadBtn" variant="contained" 
              style={{backgroundColor: "#04b376"}} size="large"
              href={s.url}>
              <Typography style={{color: "#ffffff", fontWeight: "bold", fontSize: 18}}>
                ডাউনলোড
              </Typography>
            </Button>
          </CardActions>
        </Card>
        </center>
      </div>
    ))}
  </div>
  );
}

export default Extension;