import React, { useState, useEffect } from 'react';
import './Footer.css';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { serverUrl } from '../../util';

/*
    Website footer
    @author A.M. Aahad
*/

function Footer({ aboutUsLink }) {
  const [contacts, setContacts] = useState({ email: '' });

  useEffect(() => {
    Axios({
      method: 'GET',
      url: `${serverUrl}/contact-us`,
    }).then((x) => {
      setContacts({ email: x.data.contacts.email });
    }).catch((error) => {
      console.error(error);
      console.log('failed to load contacts');
    });
  }, []);

  return (
    <div className="Footer">
      <div className="col col1">
        <Typography style={{ color: '#ffffff' }} variant="body1" gutterBottom>
          সতর্ক হোন, গুজব প্রতিহত করুন
        </Typography>
        <Typography style={{ color: '#ffffff' }} variant="body1" gutterBottom>
          <Link to={aboutUsLink} style={{ textDecoration: 'none' }}>
            <div className="link aboutLink">
              আমাদের সম্পর্কে
            </div>
          </Link>
        </Typography>
      </div>
      <div className="col col2">
        <Typography style={{ color: '#ffffff' }} variant="body1" gutterBottom>
          যোগাযোগ:
        </Typography>
        <Typography style={{ color: '#ffffff' }} variant="body1" gutterBottom>
          ই-মেইল:
          {' '}
          <a
            className="link e_mail"
            href={`mailto:${contacts.email}`}
          >
            {contacts.email}
          </a>
        </Typography>
      </div>
    </div>
  );
}

export default Footer;
