const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");

const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const  copyMsg = document.querySelector("[data-copyMsg]")
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numberCheck = document.querySelector("#number");
const symbolCheck = document.querySelector("symbol");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateBtn");
const allcheckBox = document.querySelectorAll("input[typr=checkbox]");
const symbols = ' `!@#$%^&*()_+{}|\[];:"<,>.?/ ';
let password = "";
let passwordLentgh = 10;
let checkCount = 0;
handleSlider();
//set passwordlength
function handleSlider(){
    inputSlider.value = passwordLentgh;
    lengthDisplay.innerText =passwordLentgh;
}

function setIndicator(color){
    indicator.style.backgroundColor = color;
}

function getRanInteger(min, max){
    return Math.floor(Math.random() * (max -min))+min;
}

function generateRandomNumber(){
    return getRanInteger(0,9);
}

function generateLowerCase(){
    String.fromCharCode(getRanInteger(97,123));
}

function generateUpperCase(){
    String.fromCharCode(getRanInteger(65,91));
}

function generateSymbol(){
    const randNum = getRanInteger(0, symbols.length);
    return symbols.charAt[randNum];
}

function calcStrength(){
    let hasUpper = false;
    let  hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if (uppercaseCheck.checked) hasUpper =true;
    if(lowercaseCheck.checked) hasLower =true;
    if(numberCheck.checked) hasNum= true;
    if(symbolCheck.checked) hasSym = true;

    if (hasUpper && hasLower (hasNum || hasSym) && passwordLentgh>=8) {
        setIndicator("#0f0");
    } else if (
        (hasLower || hasUpper) && 
        (hasNum || hasSym) &&
        passwordLentgh>=6
    ){
        setIndicator("#0ff0");
    }else{
        setIndicator("#f00");
    }
    console.log("task one done")
}

async function copyContent(){
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText="copied";
    } catch (error) {
        copyMsg.innerText="failed";
    }
    copyMsg.classList.add("active");

    setTimeout(() => {
        copyMsg.classList.remove("active"); 
    }, 2000);
}

function shufflePassword(array){
    for(let i = array.length; i>0; i--){
        const j = Math.floor(Math.random() * (i+1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str ="";
    array.forEach((el)=>(str += el));
    return str;
}


function handleCheckBoxChanger(){
    checkCount =0;
    allcheckBox.forEach((checkbox)=>{
        if(checkbox.checked)
            checkCount++;
    });

    if(passwordLentgh<checkCount){
        passwordLentgh = checkCount;
        handleSlider();
    }
}

allcheckBox.forEach((checkbox)=>{
    checkbox.addEventListener('change', handleCheckBoxChanger);
})

inputSlider.addEventListener('input',(e)=>{
    passwordLentgh = e.target.value;
    handleSlider();
})

copyBtn.addEventListener('click' ,()=>{
    if(passwordDisplay.value)
        copyContent();
})

generateBtn.addEventListener('click',()=>{
    if(checkCount<=0) return;

    if(passwordLentgh<checkCount){
        passwordLentgh = checkCount;
        handleSlider();
    }

    password = "";

    // if(uppercaseCheck.checked){
    //     password += generateUpperCase();
    // }

    // if(lowercaseCheck.checked){
    //     password += generateLowerCase();
    // }

    // if(numberCheck.checked){
    //     password += generateRandomNumber();
    // }

    // if(symbolCheck.checked){
    //     password += generateSymbol();
    // }

    let funArr = [];
        
    if(uppercaseCheck.checked){
        funArr.push(generateUpperCase);
    }
    
    if(lowercaseCheck.checked){
        funArr.push(generateLowerCase);
    }

    if(numberCheck.checked){
        funArr.push(generateRandomNumber);
    }

    if(symbolCheck.checked){
        funArr.push(generateSymbol);
    }

    for(let i=0; i<funArr.length; i++){
        password += funArr[i]();
    }

    for(let i=0; i=passwordLentgh-funArr.length; i++){
        let ranIndex = getRanInteger(0,funArr.length);
        password += funArr[ranIndex]();
    }

    password = shufflePassword(Array.from(password));

    passwordDisplay.value= password;
    calcStrength();
});