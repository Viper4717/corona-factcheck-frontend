import React, { Component } from 'react';
import "./Extension.css"
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

/*
    Extension page design
    @author A.M. Aahad
*/
class Extension extends Component {

  render() {
    return (
      <div className="extensionPage">
        <center>
        <Card className="card" variant="outlined">
          <CardContent>
            <Typography variant="h5" component="h2">
              আমাদের ক্রোম এক্সটেনশন ডাউনলোড করুন
            </Typography>
          </CardContent>
          <CardActions style={{justifyContent: "center"}}>
            <Button className="downloadBtn" variant="contained" 
              style={{backgroundColor: "#04b376"}} size="large">
              <Typography style={{color: "#ffffff", fontWeight: "bold", fontSize: 18}}>
                ডাউনলোড
              </Typography>
            </Button>
          </CardActions>
        </Card>
        </center>
      </div>
    );
  }
}

export default Extension;