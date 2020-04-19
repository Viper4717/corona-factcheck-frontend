import React from 'react';
import "./Footer.css"
import Typography from '@material-ui/core/Typography';


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
          <a className="aboutLink" href="#aboutus">
            আমাদের সম্পর্কে
          </a>
        </Typography>
      </div>
      <div className="col col2">
        <Typography style={{color: "#ffffff"}} variant="body1" gutterBottom>
          যোগাযোগ:
        </Typography>
        <Typography style={{color: "#ffffff"}} variant="body1" gutterBottom>
          ই-মেইল: abcde@gmail.com
        </Typography>
      </div>
    </div>
  );
}

export default Footer;
