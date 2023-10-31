window.onload = function() {
    const estimateCostButton = document.getElementById("estimateCost");
    estimateCostButton.onclick = calculateEstimate;
};

function calculateEstimate() {
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value; 
    const email = document.getElementById("email").value;
    const checkInDate = document.getElementById("checkin").value;
    const nights = parseInt(document.getElementById("nights").value, 10);
    const adults = parseInt(document.getElementById("adults").value, 10);
    const children = parseInt(document.getElementById("children").value, 10);
    
    const roomType = getCheckedValue("roomType");
    const discountType = getCheckedValue("discount");
    
    const roomRate = getRoomRate(checkInDate, roomType);
    let discount = 0;

    switch (discountType) {
        case "aaa":
            discount = 0.1;
            break;
        case "military":
            discount = 0.2;
            break;
        default:
            discount = 0;
            break;
    }
    
    const discountedRate = roomRate * (1 - discount);
    const tax = discountedRate * 0.12;
    const totalCost = discountedRate + tax;

    const confirmationNumber = generateConfirmationNumber(name, checkInDate, nights);

    displayDetails(name, phone, email, confirmationNumber, roomRate, discount, discountedRate, tax, totalCost);
}

function getRoomRate(checkInDate, roomType) {
    const month = new Date(checkInDate).getMonth() + 1; /* + 1 bc months are represented as 0-11, so Jan = 0*/
    switch (roomType) {
        case "queen":
            return (month >= 6 && month <= 8) ? 250 : 150; /*if-else, ? means if, : means else*/
        case "king":
            return (month >= 6 && month <= 8) ? 250 : 150;
        case "suite":
            return (month >= 6 && month <= 8) ? 350 : 210;
        default:
            return 0;
    }
}

function getCheckedValue(name) {
    const radios = document.getElementsByName(name);
    for (let radio of radios) {
        if (radio.checked) {
            return radio.value;
        }
    }
    return null;
}


