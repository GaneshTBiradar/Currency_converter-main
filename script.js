let base_url="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/";
// let base_url="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/inr/js.json()"  ;   this was the actual apu
let btn=document.querySelector("button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const dropdown=document.querySelectorAll(".dropdown select");
const msg=document.querySelector(".message");
// let ac=document.querySelector("#new");
// ac.value="700";
// for(code in countryList ){
//     console.log(code);
// }

for (let select of dropdown){
    for(currCode in countryList){
        let newopt=document.createElement("option");
        newopt.innerText=currCode;
        newopt.value=currCode;
        if(select.name==="from" && currCode==="USD"){
            newopt.selected="selected";
        }
        else if(select.name==="to" && currCode==="INR"){
            newopt.selected="selected";
        }
        select.append(newopt);
    }

    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
}

const updateFlag=(element)=>{
    //  console.log(element);   returns an html element which has made the chanhe
    // console.log(element);
    let currcode=element.value;
    // console.log(currcode);  you cant run it in the console because it is inside the function bro
    let countrycode=countryList[currcode];
    let newsrc=`https://flagsapi.com/${countrycode}/flat/64.png`;

    let img=element.parentElement.querySelector("img");
    img.src=newsrc;
    
};
btn.addEventListener("click", async (evt) => {    
  
    evt.preventDefault(); 
    let amount=document.querySelector(".amount input");
    let amtval=amount.value;
    if(amtval==="" || amtval<1){
        amtval=1;
       amount.value="1";     //element.innerHTMl or text will not work 
    }
    // console.log(amount);
    // console.log(amtVal);
    console.log(fromCurr);
    console.log(toCurr);
    console.log(fromCurr.value);
    const URL=`${base_url}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;  //ourapi works in lowercase only
  //this URL(API) wil give the exchange rate between 2 countries;
   let responce=await fetch(URL);
   console.log(responce);
   let  data=await responce.json();
   console.log(data);
   let rate=data[toCurr.value.toLowerCase()];
   let final_value=amtval*rate;
   console.log(final_value);
   console.log(rate);

   msg.innerText=`${amtval} ${fromCurr.value}= ${final_value} ${toCurr.value} `;



});
