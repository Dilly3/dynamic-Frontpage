const headSpan = document.querySelector('.header-span');
const words = JSON.parse(headSpan.dataset.words);

class TypeWriter{
/*
@description A function that gives a typewriter kind effect by collect array of words from Element data Attribute
@param {element} DOM element to manipulate its TextContent with word from words Array 
@param {words} Words array 
@param {speed} speed variable is used to vary the speed of the SetTimeout.
@param{subTxt} a temporary storage for currentWord, used to update Element textcontent With.
*/ 

    constructor(element,words){
        this.element = element;
        this.words = words;
        this.speed = 300;
        this.isDeleting = false;
        this.count = 0;
        this.startingIndex = 0;
        this.type;
        this.subTxt = "";

    }
/* @description type function collects a word from an array and words and display 
its characters as the textContent of an Element.
*/
    type = ()=>{
        //get single word from words array
        let currentWord = words[this.startingIndex % this.words.length];
       

// check if word is typing out or erasing, erase one letter at a time from subTxt
        if(this.isDeleting){
            this.subTxt = this.subTxt.substring(0,--this.count);
            this.element.textContent = this.subTxt;
            this.speed = 200;
        }
// check if word is not erasing, take one letter at a time from currentWord and add to subText
        else if(!this.isDeleting){
            this.speed=300
        this.subTxt = currentWord.substring(0,++this.count);
        this.element.textContent = this.subTxt;
        }
        //check if subTxt is same as currentWord, if so turn isDeleting to true to start removing letters of subTxt)
        if(this.subTxt === currentWord){
            this.speed= 200;
            this.isDeleting = true;    
        } else 
//check if subtXt is an empty String, if true, set isDeleting to false, and move to the next word in array
        if(this.subTxt === ""){
            this.isDeleting= false;
            this.startingIndex++;
            this.count =0;
        }
        
        
// repeat function using the speed variable.
        setTimeout(()=>{
            this.type();
        },this.speed)
    }
}



// create a TypeWriter Class Object
const myTypeWriter = new TypeWriter(headSpan,words)
// run the type function.
myTypeWriter.type();


