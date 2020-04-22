import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './components/home/Home';
import Extension from './components/extension/Extension';
import AboutUs from './components/aboutUs/AboutUs';
import Article from './components/article/Article';
import TrueFalse from './components/truefalse/TrueFalse';
import Blog from './components/blog/Blog';

const headerLinks = [
  { label: 'নীড়পাতা', link: '/' },
  { label: 'সত্য/মিথ্যা', link: '/trueFalse' },
  { label: 'করোনা তথ্য', link: '/blog' },
  { label: 'এক্সটেনশন', link: '/extension' },
  { label: 'আমাদের সম্পর্কে', link: '/aboutUs' },
];

function App() {
  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <BrowserRouter>
        <Header
          homePageLink="/"
          searchLink="/blog"
          links={headerLinks}
        />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/trueFalse" component={TrueFalse} />
          <Route path="/blog" component={Blog} />
          <Route path="/article/:articleId" component={Article} />
          <Route path="/extension" component={Extension} />
          <Route path="/aboutUs" component={AboutUs} />
        </Switch>
        <Footer aboutUsLink="/aboutUs" />
      </BrowserRouter>
    </div>
  );
}

export default App;
