
const dropdown = document.querySelectorAll(".dropdown select");
const b = document.querySelector("form button");
const currFrom = document.querySelector(".from select");
const currTo = document.querySelector(".to select");
const m = document.querySelector(".msg");


for (let select of dropdown) 
{
  for (let cntry in countryList) 
  {
    let newOpt = document.createElement("option");

    newOpt.innerText = cntry;
    newOpt.value = cntry;


    if (select.name === "fromCountry" && cntry === "USD") {
      newOpt.selected = "selected";
    } 

    else if (select.name === "toCountry" && cntry === "INR") {
      newOpt.selected = "selected";
    }

    select.append(newOpt);
  }

  select.addEventListener("change", (event) => {
    updateFlag(event.target);
  });
}  


const updateFlag = (element) => {
  let selCntry = element.value;
  let cntry = countryList[selCntry];

  let newImgSrc = `https://flagsapi.com/${cntry}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
    
  img.src = newImgSrc;

};

  
let amtInp = document.querySelector(".amount input");

const getExchangeRate = async () => {
  let amt = amtInp.value;

  const URL = `https://api.exchangerate-api.com/v4/latest/${currFrom.value}`;

  let res = await fetch(URL);
  let data = await res.json();
  const rate = data.rates[currTo.value];
  console.log(rate);

  let finalAmt = amt * rate;

  msg.style.display = "block";
  msg.innerText =  `${amt} ${currFrom.value} = ${finalAmt} ${currTo.value}`;

};

let excVal = document.querySelector("#get");

excVal.addEventListener("click", () =>  {
  getExchangeRate();
});

let input = document.getElementById("myInput");

input.addEventListener("keypress", function(event) {
  
  if (event.key === "Enter") {
    event.preventDefault();
    excVal.click();
  }
});

