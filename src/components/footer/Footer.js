import React, {useState, useEffect} from 'react';
import "./Footer.css"
import Typography from '@material-ui/core/Typography';
import Axios from 'axios'


/*
    Website footer
    @author A.M. Aahad
*/

function Footer() {
  const [contacts, setState] = useState({ data: null });

  useEffect(() => { 
    setState({ data: null });
    Axios({
      method: 'GET',
      url: 'http://192.168.0.105:1337/contact-us'
    }).then(x => {
      setState({data: x.data.contacts.Email});
    })
  }, []);

  return (
    <div className="Footer">
      <div className="col col1">
        <Typography style={{color: "#ffffff"}} variant="body1" gutterBottom>
          সতর্ক হোন, গুজব প্রতিহত করুন
        </Typography>
        <Typography style={{color: "#ffffff"}} variant="body1" gutterBottom>
          <a className="link aboutLink" href="#aboutus">
            আমাদের সম্পর্কে
          </a>
        </Typography>
      </div>
      <div className="col col2">
        <Typography style={{color: "#ffffff"}} variant="body1" gutterBottom>
          যোগাযোগ:
        </Typography>
        <Typography style={{color: "#ffffff"}} variant="body1" gutterBottom>
          ই-মেইল: <a className="link e_mail" href="/">{contacts.data}</a>
        </Typography>
      </div>
    </div>
  );
}

export default Footer;
