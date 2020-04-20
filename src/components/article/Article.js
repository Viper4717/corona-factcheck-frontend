import React, {useState, useEffect} from 'react';
import Container from '@material-ui/core/Container';
import "./Article.css";
import Axios from 'axios'

function Article() {
  const [data, setState] = useState({
    title: "",
    desc: "",
  });

  useEffect(() => {
    Axios({
      method: 'GET',
      url: 'http://192.168.0.105:1337/about-us'
    }).then(x => {
      console.log("log", x.data)
      setState({
        title: x.data.title,
        desc: x.data.desc
      })
    })
  }, []);
  console.log("Data", data)
  var title = data.title
  var desc = data.desc
  return (
    <div className="article">
      <Container maxWidth="lg">
      <h2>
      <div dangerouslySetInnerHTML={{ __html: title }} />
      </h2>
      <div dangerouslySetInnerHTML={{ __html: desc }} />
      </Container>
    </div>
  );
}

export default Article;