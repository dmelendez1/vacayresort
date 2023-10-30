window.onload = function() {
    const estimateTotalButton = document.getElementById("estimateTotalButton");

    estimateTotalButton.onclick = estimateTotalButtonClicked;

}
//for email full name, pickup date, number of days input
function estimateTotalButtonClicked() {
    const estimateTotal = {};

    estimateTotal.email = document.getElementById("emailInput").value.trim();
    estimateTotal.fullName = document.getElementById("fullNameInput").value.trim();
    estimateTotal.pickupDate = document.getElementById("pickupDate").value;
    estimateTotal.numberDays = parseInt(document.getElementById("numberDays").value.trim(), 10); 
  
    
// for radio buttons, yes or no
    const yesUnder25Radio = document.getElementById("yesUnder25");
    const noUnder25Radio = document.getElementById("noUnder25");
    
estimateTotal.basePrice = 29.99; //auto rental price

    if (yesUnder25Radio.checked) {  // fi they click yes for under age
        estimateTotal.surcharge = 0.3; //30%
        
        
    } else if(noUnder25Radio.checked) {
        estimateTotal.surcharge = 0; // won't get charged the 30% 
        estimateTotal.under25Price = 0;
    } 

// option check form for toll tag, gps, roadside
    const tollTag = document.getElementById("tollTag")
    const gps = document.getElementById("gps");
    const roadsideAssistance = document.getElementById("roadsideAssistance");


    estimateTotal.hastollTag = tollTag.checked;
    estimateTotal.hasgps = gps.checked;
    estimateTotal.hasroadsideAssistance = roadsideAssistance.checked;

    estimateTotal.under25Price = estimateTotal.basePrice * estimateTotal.surcharge;
    estimateTotal.total = (estimateTotal.basePrice + estimateTotal.under25Price); //ADD

    
    /*estimateTotal.total = estimateTotal.under25Price*/
    if(estimateTotal.hastollTag) estimateTotal.total += 3.95 * estimateTotal.numberDays  //multiply by number of days but its not working:(
    if(estimateTotal.hasgps) estimateTotal.total += 2.95 * estimateTotal.numberDays
    if(estimateTotal.hasroadsideAssistance) estimateTotal.total += 2.95 * estimateTotal.numberDays

    estimateTotal.total *= estimateTotal.numberDays;
    estimateTotal.total = +estimateTotal.total.toFixed(2); //$$ 2 decimal place

    displayEstimateCost(estimateTotal)

}

function displayEstimateCost(estimateTotal) {
    document.getElementById("emailDisplay").innerText = estimateTotal.email
    document.getElementById("nameDisplay").innerText = estimateTotal.fullName;
    document.getElementById("pickupDateDisplay").innerText = estimateTotal.pickupDate;
    document.getElementById("numberDaysDisplay").innerText = estimateTotal.numberDays;
    document.getElementById("sizePriceCell").innerText = estimateTotal.basePrice 
    document.getElementById("under25Total").innerText = estimateTotal.basePrice * estimateTotal.surcharge.toFixed(2);
    document.getElementById("totalPriceDisplay").innerText = estimateTotal.total;

if (estimateTotal.hastollTag) {
    document.getElementById("tollTagFee").style.display = "table-row";
} else {
    document.getElementById("tollTagFee").style.display = "none";
}

if(estimateTotal.hasgps) {
    document.getElementById("gpsFee").style.display = "table-row"
} else {
     document.getElementById("gpsFee").style.display = "none";

}

if (estimateTotal.hasroadsideAssistance) {
    document.getElementById("roadsideFee").style.display = "table-row";
} else {
    document.getElementById("roadsideFee").style.display = "none";
}


}



