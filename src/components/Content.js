import "./Content.css";
//import allWords from "./allWords.txt";
import { useState } from 'react';
let validWords = [];
function fetchAndLogTextFile() {
  fetch('/allWords.txt')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.text();
    })
    .then(text => {
      const lines = text.split(/\r\n|\n/);
      lines.forEach((line, index) => {
        validWords.push(`${line}`);
      });
    })
    .catch(error => {
      console.error('Error fetching the text file:', error);
    });
}

// Call the function as soon as the script runs
fetchAndLogTextFile();

console.log(validWords[0] + "TESTSETSETEWST");



let answer = "rates";


let qwertyArray = [];
let currentGuess = [];
let keyAdded = false;
let qwertyList = ["Q","W","E","R","T","Y","U","I","O","P","A","S","D","F","G","H","J","K","L","ENTER","Z","X","C","V","B","N","M","BACK"]
function Content() {
  if(!keyAdded)
    window.addEventListener('keydown', handleKeyPress);
  keyAdded = true;
  let [currentWord, setCurrentWord] = useState([]);
  let [colors, setColors] = useState(['rgb(44, 44, 44)','rgb(44, 44, 44)','rgb(44, 44, 44)','rgb(44, 44, 44)','rgb(44, 44, 44)']);

  function generateQwerty(){
    for(let i = 0; i < 10; i++){
      qwertyArray.push(qwerty(71, 28.9-(i*8),qwertyList[i],30))
    }
    for(let i = 0; i < 9; i++){
      qwertyArray.push(qwerty(80, 24.8-(i*8),qwertyList[i+10],30))
    }
    for(let i = 0; i < 9; i++){
      if(i === 0 || i === 8)
        qwertyArray.push(qwerty(89, 24.8-(i*8),qwertyList[i+19],15))
      else
        qwertyArray.push(qwerty(89, 24.8-(i*8),qwertyList[i+19],30))
    }
  }
  
  let qwerty = (top, offset, text, size) => {
    let topVar = '' + top + 'vh';
    let offsetVar = 'calc(50% + ' + offset + 'vh)';
    let style = {
      width: '3vh',            
      height: '4vh' ,         
      backgroundColor: 'rgb(30, 30, 30)',
      color: 'rgb(255,255,255)',
      position:'fixed',
      top: topVar,              
      right: offsetVar, 
      transform: 'translateY(-50%)',
      border: '0.5vh solid rgb(255, 255, 255)',
      padding: '10px',
      margin: '20px',
      borderRadius: '10px',
      fontSize: ''+ size + 'px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    };  
    return(
      <div style={style}>{text}</div>
    )
  }
  
  
  let Square = (top, offset, letter, colorX) => {//need to get it to put arguments into the style sheet. Wierd interaction is JS and css.
    let topVar = '' + top + 'vh';
    let offsetVar = 'calc(50% + ' + offset + 'vh)';
    let style = {
      width: '6vh',            
      height: '6vh' ,         
      backgroundColor: colorX,
      position:'fixed',
      top: topVar,              
      right: offsetVar,       
      transform: 'translateY(-50%)',
      border: '4px solid rgb(23, 23, 23)',
      padding: '5px',
      margin: '20px',
      fontSize: '8vh',
      alignItems: 'center',         // Centers items vertically
      justifyContent: 'center',     // Centers items horizontally
      textAlign: 'center',  
      lineHeight: '0.7',    
      color: 'rgb(255, 255, 255)',
    };
    return(
      <div style={style}>{letter}</div>
    )
  }
  
  function button(){
    return(
      <sideButton
        style={{}} // Example style object
        onClick={handleClick}
      />
    )
  }
  
  function handleClick(){
    console.log('yoooo');
  }
  
  function handleKeyPress(event){
    console.log(event.key);
    try{
      if(event.key === 'Backspace' && currentGuess.length > 0){
        currentGuess.pop();
        setCurrentWord(currentWord = currentGuess); 
      }
      else if(currentGuess.length < 5 && (event.key.length === 1 && event.key.match(/[a-zA-Z]/))){
        let newGuess = [...currentGuess, event.key.toString().toUpperCase()];
        console.log(newGuess);
        currentGuess = newGuess;
        setCurrentWord(currentWord = currentGuess); 
      }
      else if(event.key === 'Enter' && currentGuess.length === 5){

        let guessStr = (currentGuess[0] + '' + currentGuess[1] + '' + currentGuess[2] + '' + currentGuess[3] + '' + currentGuess[4]).toLowerCase();
        if(validWords.includes(guessStr)){
          let rowColors = processGuess(guessStr);
          setColors(colors = [rowColors[0], rowColors[1], rowColors[2], rowColors[3], rowColors[4]])
        }
        else{
          setColors(colors = ['rgb(100, 44, 44)','rgb(100, 44, 44)','rgb(100, 44, 44)','rgb(100, 44, 44)','rgb(100, 44, 44)']);}
      }
      
      
    }
    catch(error){}
    console.log(currentGuess);
    
  };

  function processGuess(currentGuess){
      let retArray = ['rgb(44, 44, 44)','rgb(44, 44, 44)','rgb(44, 44, 44)','rgb(44, 44, 44)','rgb(44, 44, 44)'];
      let temp = answer;
      //green logic
      if(currentGuess[0] == answer[0]){
        retArray[0] = 'rgb(0, 255, 0)';
        temp = temp.substring(1);
      }
      if(currentGuess[1] == answer[1]){
        retArray[1] = 'rgb(0, 255, 0)';
        temp = temp.substring(0,temp.indexOf(answer[1])) + temp.substring(temp.indexOf(answer[1])+1,temp.length);
      }
      if(currentGuess[2] == answer[2]){
        retArray[2] = 'rgb(0, 255, 0)';
        temp = temp.substring(0,temp.indexOf(answer[2])) + temp.substring(temp.indexOf(answer[2])+1,temp.length);
      }
      if(currentGuess[3] == answer[3]){
        retArray[3] = 'rgb(0, 255, 0)';
        temp = temp.substring(0,temp.indexOf(answer[3])) + temp.substring(temp.indexOf(answer[3])+1,temp.length);
      }
      if(currentGuess[4] == answer[4]){
        retArray[4] = 'rgb(0, 255, 0)';
        temp = temp.substring(0,temp.indexOf(answer[4])) + temp.substring(temp.indexOf(answer[4])+1,temp.length);
      }
      //yellow logic
      if(temp.indexOf(currentGuess[0]) != -1){
        retArray[0] = 'rgb(255, 125, 225)';
        temp = temp.substring(0,temp.indexOf(currentGuess[0])) + temp.substring(temp.indexOf(currentGuess[0])+1,temp.length);
      }
      if(temp.indexOf(currentGuess[1]) != -1){
        retArray[1] = 'rgb(255, 125, 255)';
        temp = temp.substring(0,temp.indexOf(currentGuess[1])) + temp.substring(temp.indexOf(currentGuess[1])+1,temp.length);
      }
      if(temp.indexOf(currentGuess[2]) != -1){
        retArray[2] = 'rgb(255, 125, 255)';
        temp = temp.substring(0,temp.indexOf(currentGuess[2])) + temp.substring(temp.indexOf(currentGuess[2])+1,temp.length);
      }
      if(temp.indexOf(currentGuess[3]) != -1){
        retArray[3] = 'rgb(255, 125, 255)';
        temp = temp.substring(0,temp.indexOf(currentGuess[3])) + temp.substring(temp.indexOf(currentGuess[3])+1,temp.length);
      }
      if(temp.indexOf(currentGuess[4]) != -1){
        retArray[4] = 'rgb(255, 125, 255)';
        temp = temp.substring(0,temp.indexOf(currentGuess[4])) + temp.substring(temp.indexOf(currentGuess[4])+1,temp.length);
      }

      console.log(temp);
      return retArray;

  }


  generateQwerty();
  
  return (
    <>
      <background></background>
      <title>
        <h1>WORDLE ARCHIVE</h1>
      </title>
      {qwertyArray}
      {button()}

      {Square(14,10,currentGuess[0], colors[0])}
      {Square(14,1,currentGuess[1], colors[1])}
      {Square(14,-8,currentGuess[2], colors[2])}
      {Square(14,-17,currentGuess[3], colors[3])}
      {Square(14,-26,currentGuess[4], colors[4])}

      {Square(23,10,'')}
      {Square(23,1,'')}
      {Square(23,-8,'')}
      {Square(23,-17,'')}
      {Square(23,-26,'')}
      
      {Square(32,10,'')}
      {Square(32,1,'')}
      {Square(32,-8,'')}
      {Square(32,-17,'')}
      {Square(32,-26,'')}

      {Square(41,10,'')}
      {Square(41,1,'')}
      {Square(41,-8,'')}
      {Square(41,-17,'')}
      {Square(41,-26,'')}

      {Square(50,10,'')}
      {Square(50,1,'')}
      {Square(50,-8,'')}
      {Square(50,-17,'')}
      {Square(50,-26,'')}

      {Square(59,10,'')}
      {Square(59,1,'')}
      {Square(59,-8,'')}
      {Square(59,-17,'')}
      {Square(59,-26,'')}
    </>
  )
}


export default Content;