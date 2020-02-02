import React from 'react'
import './App.css'
import ayahobject from './ayahobject.json'
import tajweed from './tajweed'

class App extends React.Component {
  state = {
    uthmani: '',
    surahName: '',
    color: '',
    ayahNumber: 1,
    surahNumber: 1,
    ayahNumberInSurah: 1
  }

  handleClick = () => {
    if (getAyah(1,10)){

      this.setState({ ayahNumber: Number(this.state.ayahNumber) + 1 }
      , () =>
      this.apiCallNext()
      )
    }
  }

  goto = (e) => {
    e.preventDefault();
    // let gotoNumber = e.target[0].value
    this.setState({ayahNumber: this.state.ayahNumber}, () => this.apiCall())
  }

  handleChange = (e) => {
    this.setState({ayahNumberInSurah : e.target.value})
  }

  handleChangeSurah = (e) => {
    this.setState({surahNumber : e.target.value})
  }

  componentDidMount = () => {
    this.apiCall()
  }

  apiCallNext = () => {
    let currentAyah = this.state.ayahNumber
    this.setState({
      uthmani:
        ayahobject[currentAyah].uthmaniText +
        ' ' +
        ayahobject[currentAyah].numberInSurahNativeReverse,
      surahName: ayahobject[currentAyah].surah.name
    })
  }

  apiCall = () => {
    let currentAyah = this.state.ayahNumber
    this.setState({
      uthmani: getAyah(this.state.ayahNumberInSurah,this.state.surahNumber)+ ' ' +
      getAyahNumberInSurah(this.state.ayahNumberInSurah,this.state.surahNumber),
      surahName: getSurah(this.state.surahNumber)
    })
  }
  render() {
    let { surahName, surahNumber, ayahNumber, uthmani, ayahNumberInSurah } = this.state
    return (
      <div>
        <AyahContainer
          text={uthmani}
          surahName={surahName}
          surahNumber={surahNumber}
          handleClick={this.handleClick}
          ayahNumber={ayahNumber}
          ayahNumberInSurah={ayahNumberInSurah}
          handleChange={this.handleChange}
          goto={this.goto}
          handleChangeSurah={this.handleChangeSurah}
        />
      </div>
    )
  }
}

const AyahContainer = props => {
  return (
    <div id='container'>
 
      <div className="goto">
        <form onSubmit={props.goto}>Ayah 
        
        <input type='text' className='input' 
        onChange={props.handleChange}
        value={props.ayahNumberInSurah}
        /> 
        Surah
        <input type='text' className='input' 
        onChange={props.handleChangeSurah}
        value={props.surahNumber}/>
        <button>go to</button>
        </form>
      </div>
 
      <p id='surah'>{props.surahName}</p>
      {ayahobject[props.ayahNumber].numberInSurah === 1 &&
        ayahobject[props.ayahNumber].surah.number > 1 && (
          <p id='bismillah'>بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ</p>
        )}

      <p id='text' dangerouslySetInnerHTML={{ __html: tajweed(props.text)} } />
 
      <button id='button' onClick={props.handleClick} className='next-button'>
        آية تالية
      </button>
    </div>
  )
}

export default App


let getAyah = (a,s) => ayahobject.filter(e => {
  if (e.surah) return e.surah.number == s && e.numberInSurah == a
})[0].uthmaniText

let getAyahNumberInSurah = (a,s) => ayahobject.filter(e => {
  if (e.surah) return e.surah.number == s && e.numberInSurah == a
})[0].numberInSurahNativeReverse

let getSurah = (s) => ayahobject.filter(e => {
  if (e.surah) return e.surah.number == s
})[0].surah.name