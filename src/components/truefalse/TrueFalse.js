import React, { Component, useState, useEffect } from 'react';
import "./TrueFalse.css"
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Axios from 'axios'
import { serverUrl } from '../../util';

/*
    True/False page design
    @author A.M. Aahad
*/

function TrueFalse() {
  const [data, setState] = useState({ 
    downloadLinks: []
  });

  useEffect(() => {
    Axios({
      method: 'GET',
      url: serverUrl + '/truefalse'
    }).then(x => {
      console.log(x)
      setState({
        downloadLinks: x.data
      })
    })
  }, []);
  let outputList = data.downloadLinks;
  return (
    <div className="trueFalsePage">
    {outputList.map(s => 
      (
        <div className="trueFalsePage">
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

export default TrueFalse;