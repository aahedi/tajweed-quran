import React from 'react'
import './App.css'
import ayahobject from './ayahobject.json'

class App extends React.Component {
  state = {
    uthmani: '',
    surah: '',
    color: '',
    ayahNumber: 1
  }

  handleClick = () => {
    this.setState({ ayahNumber: this.state.ayahNumber + 1 }, () =>
      this.apiCall()
    )
  }

  // goto = (e) => {
  //   this.setState ( {ayahNumber: e.event.value})
  // }

  componentDidMount = () => {
    this.apiCall()
  }

  apiCall = () => {
    let currentAyah = this.state.ayahNumber
    this.setState({
      uthmani:
        ayahobject[currentAyah].uthmaniText +
        ' ' +
        ayahobject[currentAyah].numberInSurahNativeReverse,
      surah: ayahobject[currentAyah].surah.name
    })
  }

  render() {
    let { surah, ayahNumber, uthmani } = this.state
    return (
      <div>
        <Quote
          text={uthmani}
          surah={surah}
          handleClick={this.handleClick}
          ayahNumber={ayahNumber}
        />
      </div>
    )
  }
}

const Quote = props => {
  let te = props.text
    .split('')
    .map((a,i) => {
      if(a === 'م' && props.text[i+2] ==='\u0670') {
        return `<span id=circle>${a}</span>`
        // (\u0621\u064e\u0627\u0653\S)|(\u0653.\u0651) for openoffice
        /* Madd6 Muthakkal  98 occurances*/
      } else if ((a === '\u0627' || a === '\u0648') 
      && props.text[i+1] === '\u0653' 
      && props.text[i+3] === '\u0651') {
        return `<span class=madd6>${a}</span>`
        /* Madd6 madalfarq 7 occurances */ 
      } else if (a === 'ا' && props.text[i+1] === '\u0653' &&
        props.text[i-2] === 'ء' && props.text[i - 1] === '\u064e') {
        return `<span class=madd6>${a}</span>`
      } else if ((a === 'ٱ' && props.text[i-1] !== ' '  /* Hamzatalwasl*/
              && i > 0 && props.text[i+1]+props.text[i+2] !== 'لل') 
              /* Hamzatalwasl sukun alif*/
              || (a === '\u0627' && props.text[i+1] === '\u0652') 
              /* Hamzatalwasl sukun sukun*/
              || (a === '\u0652' && props.text[i-1] === '\u0627')
              /* Laam qamar */
              || (a === 'ل' && props.text[i-1] === 'ٱ' && props.text[i+2] === '\u0651' 
              && props.text[i]+props.text[i+1] !== 'لل')) {
        return `<span class=hamzawasl>${a}</span>`
      }
      else {
        return `<span>${a}</span>`
      }
    })
    .join('')
  return (
    <div id='container'>
 
      <div className="goto">
        <input type="text" />
        <button>go to</button>
      </div>
 
      <p id='surah'>{props.surah}</p>
      {ayahobject[props.ayahNumber].numberInSurah === 1 &&
        ayahobject[props.ayahNumber].surah.number > 1 && (
          <p id='bismillah'>بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ</p>
        )}

      <p id='text' dangerouslySetInnerHTML={{ __html: te }} />
 
      <button id='button' onClick={props.handleClick} className='next-button'>
        آية تالية
      </button>
    </div>
  )
}

export default App
