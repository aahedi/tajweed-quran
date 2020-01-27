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
  return (
    <div id='container'>
      <p id='surah'>{props.surah}</p>
      {ayahobject[props.ayahNumber].numberInSurah === 1 &&
       ayahobject[props.ayahNumber].surah.number > 1 &&
      <p id='bismillah'>بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ</p>}
      <p id='text'>{props.text}</p>
      <button id='button' onClick={props.handleClick} className='next-button'>
        آية تالية
      </button>
    </div>
  )
}

export default App
