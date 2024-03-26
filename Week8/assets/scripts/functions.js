let gasLevel = 0;
let chargeLevel = 0;
let tracLevel = 1;
let brakeLevel = 1;


showtime();

function getGas() {
    if (gasLevel == 0) {
        gasLevel = 1;
        document.getElementById('gas').src = './assets/images/gas1.png';
        document.getElementById('bttn_gas').src = './assets/images/bttn_gas_1.png';

    } else {
        gasLevel = 0;
        document.getElementById('gas').src = './assets/images/gas0.png';
        document.getElementById('bttn_gas').src = './assets/images/bttn_gas_0.png';
    }
}

function getCharge() {
    if (chargeLevel == 0) {
        chargeLevel = 1;
        document.getElementById('batt').src = './assets/images/batt1.png';
        document.getElementById('bttn_batt').src = './assets/images/bttn_batt_1.png';

    } else {
        chargeLevel = 0;
        document.getElementById('batt').src = './assets/images/batt0.png';
        document.getElementById('bttn_batt').src = './assets/images/bttn_batt_0.png';
    }
}

function engageTrac() {
    if (tracLevel == 1) {
        tracLevel = 0;
        document.getElementById('trac').src = './assets/images/trac1.png';
        document.getElementById('bttn_trac').src = './assets/images/bttn_trac_0.png';
    } else {
        tracLevel = 1;
        document.getElementById('trac').src = './assets/images/trac0.png';
        document.getElementById('bttn_trac').src = './assets/images/bttn_trac_1.png';
    }
}

function engageBrake() {
    if (brakeLevel == 1) {
        brakeLevel = 0;
        document.getElementById('brake').src = './assets/images/p0.png';
        document.getElementById('bttn_park').src = './assets/images/bttn_park_0.png';
    } else {
        brakeLevel = 1;
        document.getElementById('brake').src = './assets/images/p1.png';
        document.getElementById('bttn_park').src = './assets/images/bttn_park_1.png';
    }
}