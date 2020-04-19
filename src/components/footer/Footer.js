import React from 'react';
import "./Footer.css"
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';


/*
    Website footer
    @author A.M. Aahad
*/

function Footer() {
  return (
    <div className="Footer">
      <div className="col col1">
        <Typography style={{color: "#ffffff"}} variant="body1" gutterBottom>
          সতর্ক হোন, গুজব প্রতিহত করুন
        </Typography>
        <Typography style={{color: "#ffffff"}} variant="body1" gutterBottom>
          &copy; সর্বস্বত্ব সংরক্ষিত - করোনা অনুসন্ধান ২০২০
        </Typography>
      </div>
      <div className="col col2">
        <Typography style={{color: "#ffffff"}} variant="body1" gutterBottom>
          <a className="aboutLink" href="#aboutus">
            আমাদের সম্পর্কে
          </a>
        </Typography>
        <Typography style={{color: "#ffffff"}} variant="body1" gutterBottom>
          যোগাযোগ
        </Typography>
      </div>
    </div>
  );
}

export default Footer;
