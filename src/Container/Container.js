import React, { Component } from 'react';

import DayNight from '../DayNight/DayNight';
import Footer from '../Footer/Footer';
import FooterElement from '../Footer/FooterElement/FooterElement';
import Legend from '../Legend/Legend';
import TaggedText from '../TaggedText/TaggedText';
import InputText from '../InputText/InputText';

import partsOfSpeech from '../data/parts-of-speech-tags';
import legendData from '../data/legendItemsDefaults';
import initialText from '../data/initialInput';

import './Container.css';

class Container extends Component {

  constructor(props) {
    super(props);

    const defaultSelections = [];
    
    for (let pos in legendData) {
      if (legendData[pos].selected) defaultSelections.push(pos);
    }

    this.state = {
      legend: Object.assign({}, legendData),
      defaultSelections: defaultSelections,
      text: initialText,
      taggedText: {},
      markup: [],
      underlineHighlight: false,
      editActive: false,
      dayToggled: true,
    }
  }

  /* LEGEND FUNCTIONS */

  // Color Edit
  toggleEdit = () => {
    this.setState({editActive: !this.state.editActive}, () => {
      if (this.state.editActive) this.selectAll();
    });
  }
  changeColor = (pos, color) => {
    const colorHex = color.hex;

    const newLegend = { ...this.state.legend };
    newLegend[pos].color = colorHex;

    this.setState({legend: newLegend});

    this.updateColorVariableCSS(pos, colorHex);

    // Now we have it so that we can change the color. The
    // final thing we need to do is handle closing the 
    // color picker. 

  }
  updateColorVariableCSS = (pos, color) => {

    const varName = `--color-${pos}`;

    document.documentElement.style.setProperty(varName, color);
  }
  showPicker = (pos) => {

    const newLegend = { ...this.state.legend };
    newLegend[pos].beingEdited = true;

    this.setState({ legend: newLegend });
    
  }
  closePicker = (pos) => {
    const newLegend = { ...this.state.legend };
    newLegend[pos].beingEdited = false;

    this.setState({ legend: newLegend });
    //this.toggleEdit();
  }
  
  // Other Legend Functions 
  toggleLegendSelection = (e) => {


    const pos = e.currentTarget.getAttribute('data-pos');

    if (this.state.editActive) {
      this.showPicker(pos);
      return;
    }
  
    const newLegend = { ...this.state.legend };
    newLegend[pos].selected = !newLegend[pos].selected

    this.updateLegend(newLegend);
    
  }
  deselectAll = () => {
    const newLegend = { ...this.state.legend };

    for (let category in newLegend) {
      newLegend[category].selected = false;
    }

    this.updateLegend(newLegend);
  }
  selectAll = () => {
    const newLegend = { ...this.state.legend };

    for (let category in newLegend) {
      newLegend[category].selected = true;
    }

    this.updateLegend(newLegend);
  }
  selectDefaults = () => {

    const newLegend = { ...this.state.legend };

    for (let category in newLegend) {

      newLegend[category].selected = 
        this.state.defaultSelections.indexOf(category) !== -1
          ? true
          : false;
    }

    this.updateLegend(newLegend);
  }
  updateLegend = (newLegend) => {

    this.setState({ legend: newLegend }, () => {

      if (Object.keys(this.state.taggedText).length) {
        this.createMarkup(this.state.taggedText);
      }
    });

  }

  /* TEXT INPUT AND OUTPUT FUNCTIONS */
  handleTextChange = (e) => {
    const text = e.target.value;
    this.setState({ text: text });
  }
  submitText = () => {

    const url = process.env.NODE_ENV === 'development' ? '/api' 
      : 'https://pos-highlighter--api.herokuapp.com/api';

    const postBody = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({text: this.state.text}),
    }

    fetch(url, postBody)
      .then(res => res.json())
      .then(data => {
        this.createMarkup(data);
      })
  }
  isFullWord = (word) => {
    if (word.indexOf("'") >= 0 && word.indexOf("-") >= 0) {
      return false;
    } 
    return true;
  }

  getContent = (element, i) => {

    let content = element.value;

    let prevChar = 
      element.tag !== 'punctuation' && this.isFullWord(content)
        ? i !== 0
          ? ' '
          : ''
        : '';

    return [content, prevChar];
  }
  createMarkup = (taggedText) => {

    const updatedText = this.addProperties(taggedText);
    let shouldUnderline = this.state.underlineHighlight;

    const newMarkup = updatedText.map((el,i) => {

      let [content, spaceChar] = this.getContent(el, i);

      const isSelected = this.state.legend[el.category].selected;
      let category = null,
        underline = null;

      if (isSelected) {
        category = el.category;
        underline = shouldUnderline ? 'underline' : ''
      } else {
        category = '';
        underline = '';
      }
      

      return (
        <div className="grapheme" key={i}>

          <span key={`space.${i}`}>{ spaceChar }</span>

          <span key={`content.${i}`} className={`${category} ${underline}`}>
              {content}
          </span>

        </div>
      )
    });

    this.setState({
      taggedText: updatedText,
      markup: newMarkup
    });

  }
  addProperties = (taggedText) => {

    const updatedText = taggedText.map(el => {

      if (el.tag === 'punctuation') el.pos = "PUNC";

      const category = partsOfSpeech[el.pos].category;
      const description = partsOfSpeech[el.pos].description;
      
      el.category = category;
      el.description = description;

      return el;

    })

    return updatedText;

  }
  toggleUnderline = () => {
    const underline = this.state.underlineHighlight;

    this.setState({ underlineHighlight: !underline }, () => {

      if (Object.keys(this.state.taggedText).length) {
        this.createMarkup(this.state.taggedText);
      }

    })
  }

  componentWillMount = () => {
    this.submitText();
  }


  toggleDayNight = () => {
    this.setState({dayToggled: !this.state.dayToggled});
  }

  render() {

    const night = this.state.dayToggled ? '' : 'night';
    const classes = `Container ${night}`;

    return (
      <div className={classes}>

        <header>
          <h1>Part of Speech Highlighter</h1>
          <DayNight 
            toggleDayNight={this.toggleDayNight}
            dayToggled={this.state.dayToggled}/>
        </header>
        
        <div className="Content-Container">
          <div className="Legend-Input-Container">
            <Legend 
              items={this.state.legend}
              toggleSelection={ this.toggleLegendSelection }
              deselectAll={ this.deselectAll }
              selectAll={ this.selectAll }
              selectDefaults={ this.selectDefaults }
              
              editActive={this.state.editActive}
              toggleEdit={ this.toggleEdit }
              changeColor={ this.changeColor }
              handleClose={ this.closePicker }/>

            <InputText 
              text={this.state.text}
              handleTextChange={this.handleTextChange}
              submitText={this.submitText}/>
          </div>

          <div className="TaggedText-Container">
            <TaggedText 
              taggedText={this.state.taggedText} 
              markup={this.state.markup}
              underline={this.state.underlineHighlight}
              toggleUnderline={this.toggleUnderline}/>
          </div>
        
        </div>
        
      
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
      </div>
    )
    
  }

}

export default Container;