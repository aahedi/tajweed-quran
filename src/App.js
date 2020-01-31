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
  let text = (
    <p id='text'>
      hel<span style={{ color: 'red' }}>l</span>o
    </p>
  )
  let te = props.text
    .split('')
    .map((a,i) => {
      if (a=== 'ل' && props.text[i+2] === 'ّ') {
        return `<span style=color:red>${a}</span>`
      } else if (a === 'م' && props.text[i+2] ==='\u0670') {
        return `<span id=circle>${a}</span>`
      } else if (a === 'ي') {
        return `<span class=orange>${a}</span>`
      } else if (a === 'ٱ' && props.text[i-1] !== ' '  /* Hamzatalwasl*/
              && i > 0 && props.text[i+1]+props.text[i+2] !== 'لل'){
        return `<span class=hamzawasl>${a}</span>`
      }
      else {
        return `<span>${a}</span>`
      }
    })
    .join('')
  console.log(te)
  return (
    <div id='container'>
      <p id='surah'>{props.surah}</p>
      {ayahobject[props.ayahNumber].numberInSurah === 1 &&
        ayahobject[props.ayahNumber].surah.number > 1 && (
          <p id='bismillah'>بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ</p>
        )}
      {/* <p id='text'>{props.text}</p> */}
      <p id='text' dangerouslySetInnerHTML={{ __html: te }} />
      {/* {te} */}
      <button id='button' onClick={props.handleClick} className='next-button'>
        آية تالية
      </button>
    </div>
  )
}

export default App
