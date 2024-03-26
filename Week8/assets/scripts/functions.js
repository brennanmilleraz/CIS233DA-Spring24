let gasLevel = 0, chargeLevel = 0, tracLevel = 1, brakeLevel = 1, intStatus = 0;
const modeInd = document.getElementById('mode')
const shifter = document.getElementById('bttn_shifter')


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

function setMode() {
    switch(intStatus) {
        case 0:
            intStatus = 1;
            modeInd.innerText = 'ECO PRO';
            shifter.style.top = '720px';
            break;
        case 1:
            intStatus = 2;
            modeInd.innerText = 'SPORT';
            shifter.style.top = '740px';
            break;
        case 2:
            intStatus = 3;
            modeInd.innerText = 'COMFORT';
            shifter.style.top = '760px';
            break;
        default:
            intStatus = 0;
            modeInd.innerText = 'PARK';
            shifter.style.top = '700px';
            break;
    }
}