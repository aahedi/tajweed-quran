const tajweed = text => {
  return text
    .split('')
    .map((a, i) => {
      if (a === 'م' && text[i + 2] === '\u0670') {
        return `<span id=circle>${a}</span>`
        // (\u0621\u064e\u0627\u0653\S)|(\u0653.\u0651) for openoffice
        /* Madd6 Muthakkal 1/2 98 occurances*/
      }  else if (
        (a === '\u0627' || a === '\u0648') &&
        text[i + 1] === '\u0653' && //madd
        text[i + 3] === '\u0651' &&   //shadda
        (text[i-2] === 'د' || text[i-2] === 'و' || text[i-2] === 'ر' || text[i-2] === 'ء')
      ) {
        return `<span class=madd6-1>${a}</span>`
        /* Madd6 Muthakkal 2/2  98 occurances*/
      } else if (
        (a === '\u0627' || a === '\u0648') &&
        text[i + 1] === '\u0653' && //madd
        text[i + 3] === '\u0651'    //shadda
      ) {
        return `<span class=madd6>${a}</span>`
      } else if (
        (a === '\u0653') &&
        text[i + 2] === '\u0651'  //shadda
      ) {
        return `<span class=madd6-1>${a}</span>`
      } else if ( a === '\u0670' && text[i+1] === '\u0653' && text[i+3] === '\u0651'){
        return `<span class=madd6-1>${a}</span>`
      }
        /* Madd6 madalfarq 7 occurances */
        else if (
        a === 'ا' &&
        text[i + 1] === '\u0653' && //madd
        text[i - 2] === 'ء' &&
        text[i - 1] === '\u064e'
      ) {
        return `<span class=madd6-1>${a}</span>`
        /* Madd6 Huroof 44 occourances */

      } else if ((text[i+1] === '\u0653' && i == 0)|| 
               a === '\u0653' && i == 1){
        return `<span class=madd6-1>${a}</span>`
      }
      
      else if (text[i+1] === '\u0653' && (text[i-1] === '\u0627'
                                         || text[i-1] === '\u0653'
                                         || text[i+3] === '\u0653'))  {
        return `<span class=madd6-1>${a}</span>`

      } else if (a=== '\u0653' && (text[i-2] === '\u0627'
                                || text[i-1] === '\u0653'
                                || text[i-2] === '\u0653'
                                || text[i+2] === '\u0653')){
        return `<span class=madd6-1>${a}</span>`

      } else if ((a === '\u0653' && i === 2)
                || text[i+1] === '\u0653' && i === 1){
        return `<span class=madd6-1>${a}</span>`

      }
      
      else if (
        (a === 'ٱ' &&
        text[i - 1] !== ' ' /* Hamzatalwasl*/ &&
          i > 0 &&
          text[i + 1] + text[i + 2] !== 'لل') ||
        /* Hamzatalwasl sukun alif*/
        (a === '\u0627' && text[i + 1] === '\u0652') ||
        /* Hamzatalwasl sukun sukun*/
        (a === '\u0652' && text[i - 1] === '\u0627') ||
        /* Laam qamar */
        (a === 'ل' &&
          text[i - 1] === 'ٱ' &&
          text[i + 2] === '\u0651' &&
          text[i] + text[i + 1] !== 'لل')
      ) {
        return `<span class=hamzawasl>${a}</span>`
      } else {
        return `<span>${a}</span>`
      }
    })
    .join('')
}

export default tajweed