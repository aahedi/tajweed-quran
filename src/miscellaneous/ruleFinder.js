// This script displays all occourances of any tajweed rule 

/*
Tajweed rules

madd_6
hamzat_wasl
lam_shamsiyyah
madd_2
madd_246
idghaam_no_ghunnah
silent
ghunnah
qalqalah
ikhfa
madd_munfasil
madd_muttasil
idghaam_ghunnah
ikhfa_shafawi
idghaam_shafawi
iqlab
idghaam_mutajanisayn
idghaam_mutaqaribayn
*/ 

let rule = 'iqlab' // The tajweed rule to search for

import ayahobject from '../../tajweed.json'
let count = 0
let array = []
for (let i = 0; i < ayahobject.length; i++) {
  for (let j = 0; j < ayahobject[i]['annotations'].length; j++) {
    if (ayahobject[i]['annotations'][j]['rule'] === rule){
      array.push(  'Surah ' + ayahobject[i]['surah'] +
        ' Ayah ' + ayahobject[i]['ayah'])
      count++
  }}
}

console.log(array);
console.log(`There are a number of ${count} ${rule} occurrences`)