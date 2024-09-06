const base_url ="https://v6.exchangerate-api.com/v6/b215d7e8221e1d27cd61a990/pair/"

const dropdowns= document.querySelectorAll(".dropdown select");
let btn =document.querySelector("form button");
let fromcurr = document.querySelector(".from select");
let tocurr = document.querySelector(".To select");
let msg =document.querySelector(".msg");

for(let select of dropdowns){
    for(currcode in countryList){
        let newopt =document.createElement("option");
        newopt.innerText =currcode;
        newopt.value=currcode;
        if(select.name==="from"&& currcode=="USD"){
            newopt.selected="selected";
        }else if(select.name==="to"&& currcode=="INR"){
            newopt.selected="selected";
        };
        select.append(newopt);

        select.addEventListener("change",(evt)=>{
            updateflag(evt.target);
        })
    };
};

const updatexcngrate = async ()=>{
    let amount =document.querySelector(".amount input");
    let amtval =amount.value;
    if(amtval ==="" || amtval<1){
        amtval=1;
        amount.value="1";
    }
    const url =`${base_url}/${fromcurr.value}/${tocurr.value}`;
    let response = await fetch(url);
    let data =await response.json();
    let rate =data.conversion_rate;

    let finalamount = amtval*rate;
    console.log(finalamount);
    msg.innerText=`${amtval} ${fromcurr.value}=${finalamount} ${tocurr.value}`;
}

const updateflag =(element)=>{
    let currcode = element.value;
    let concode = countryList[currcode];
    let newsrc =`https://flagsapi.com/${concode}/flat/64.png`;
    let img =element.parentElement.querySelector("img");
    img.src=newsrc;
};

btn.addEventListener("click", async (evt)=>{
    evt.preventDefault();
    updatexcngrate();
});
window.addEventListener("load", () => {
    updatexcngrate();
  });

