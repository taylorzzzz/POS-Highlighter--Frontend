import React, { Component } from 'react';

import Container from '../Container/Container';
import Footer from '../Footer/Footer';
import FooterElement from '../Footer/FooterElement/FooterElement';

import './App.css';
import '../colors.css';

class App extends Component {
  
  render() {

    return (
      <div className="App">

        <header>
          <h1>Part of Speech Highlighter</h1>
        </header>
      
        <Container />

        <Footer>

          <FooterElement classes={['half']}>
            <p>This site uses the <a href="https://www.npmjs.com/package/wink-pos-tagger">wink-pos-tagger</a> library 
            to tag the different parts of speech. 
            </p>
          </FooterElement>
          
          <FooterElement classes={['quarter']}>
            <p>Created By <a href="https://twward.com">Taylor Ward</a></p>
          </FooterElement> 

        </Footer>
        
      </div> );
  }
}

export default App;
