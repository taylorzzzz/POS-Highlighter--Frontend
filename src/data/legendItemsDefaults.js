const legendItemsDefaults = {
  adjective: {
    selected: true,
    beingEdited: false
  },
  adverb: {
    selected: false,
    beingEdited: false
  },
  conjunction: {
    selected: false,
    beingEdited: false
  },
  determiner: {
    selected: false,
    beingEdited: false
  },
  noun: {
    selected: true,
    beingEdited: false
  },
  number: {
    selected: false,
    beingEdited: false
  },
  other: {
    selected: false,
    beingEdited: false
  },
  preposition: {
    selected: true,
    beingEdited: false
  },
  pronoun: {
    selected: false,
    beingEdited: false
  },
  punctuation: {
    selected: false,
    beingEdited: false
  },
  verb: {
    selected: true,
    beingEdited: false
  },

}


function getColor(pos) {
  
  var style = getComputedStyle(document.body);
  var color = style.getPropertyValue(`--color-${pos}`);

  return color.trim();
}

function setColors(legend) {

  for (let pos in legend) {
    legend[pos].color = getColor(pos);
  }

}

setColors(legendItemsDefaults);

export default legendItemsDefaults;