import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import './AboutUs.css';
import Axios from 'axios';
import { serverUrl } from '../../util';

function AboutUs() {
  const [data, setState] = useState({
    title: '',
    desc: '',
  });

  useEffect(() => {
    Axios({
      method: 'GET',
      url: `${serverUrl}/about-us`,
    }).then((x) => {
      console.log('log', x.data);
      setState({
        title: x.data.title,
        desc: x.data.desc,
      });
    });
  }, []);

  return (
    <div className="aboutUs">
      <Container maxWidth="lg">
        <h2>
          <div dangerouslySetInnerHTML={{ __html: data.title }} />
        </h2>
        <div dangerouslySetInnerHTML={{ __html: data.desc }} />
      </Container>
    </div>
  );
}

export default AboutUs;
