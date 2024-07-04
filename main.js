import {getMovisById } from './js/model/movis.js';
import{getAuthorsWithOscar} from './js/model/authors.js';
import{getTotalAuthorAwards} from './js/model/authors.js';
import{authorsBornAfter1980} from './js/model/authors.js';
import {getAuthorWithMoreAwards}from './js/model/authors.js'
import {getAllDifferentGenres} from './js/model/movis.js'
import {getAllMoviesWithAuthor1} from './js/model/movis.js'
import{getDvdCopiesTotalValue} from './js/model/movis.js'
import {getJohnDoeMovies}from './js/model/movis.js'
import{getTotalAuthors}from './js/model/authors.js'
import {AvgAuthorsAge} from './js/model/authors.js'
import {getAllAuthorsWithInstagram} from './js/model/authors.js'
import {getAllMoviesWithPrincipalAuthors} from "./js/model/movis.js"
import {getTotalMoviesAwards} from './js/model/movis.js'
import {getJohnDoeBluerayMovies} from './js/model/movis.js'
import {getFictionMoviesWithAuthor3}from './js/model/movis.js'
import{getMoviWithMostDvdCopies} from './js/model/movis.js'
import{getAuthorsAwardsAfter2015} from './js/model/authors.js'
import {getBlurayCopiesValue} from './js/model/movis.js'
import{getMoviesWithAuthor2}from './js/model/movis.js'


///MOVIS
// console.log(await getMovisById()) //1 
// console.log(await getAllDifferentGenres() )//6
// console.log(await getAllMoviesWithAuthor1())//7 
// console.log(await getDvdCopiesTotalValue()) // 8
// console.log(await getJohnDoeMovies()) // 9
// console.log(await getTotalMoviesAwards())//14
// console.log(await getJohnDoeBluerayMovies()) //15
// console.log( await getFictionMoviesWithAuthor3())// 16
// console.log(await getMoviWithMostDvdCopies())//17

//  console.log(await getBlurayCopiesValue())// 19 
console.log(await getMoviesWithAuthor2())//20
//AUTHORS
// console.log(await getAuthorsWithOscar())//2 
// console.log(await getTotalAuthorAwards())//3
// console.log(await authorsBornAfter1980())//4
// console.log(await getAuthorWithMoreAwards()) //5 
// console.log(await getTotalAuthors())//10
// console.log(await AvgAuthorsAge())//11
// console.log(await getAllAuthorsWithInstagram())//12
// console.log(await getAllMoviesWithPrincipalAuthors())// 13
// console.log(await getAuthorsAwardsAfter2015())// 18
