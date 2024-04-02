const errMsg = document.getElementById('msg')
const sputter = new Audio('./assets/media/sputter.mp3');
const launch = new Audio('./assets/media/launch.mp3');


function startEngine() {
    if (gasLevel == 1){
        if(chargeLevel == 1) {
            if(tracLevel == 0) {
                if(brakeLevel == 0) {
                    if(intStatus == 2) {
                    errMsg.innerText = ''
                    launch.play();
                    } else {
                        errMsg.innerText = 'Set the transmition to SPORT!'
                        sputter.play();
                    }
                } else {
                    errMsg.innerText = 'Hey dummy your parking brake!'
                    sputter.play();
                }
            } else {
                errMsg.innerText = 'Turn off track controll!';
                sputter.play();
            }
        } else {
            errMsg.innerText = 'Charge your Battery!';
            sputter.play();
        }
    } else {
        errMsg.innerText = 'Tank up your car!';
        sputter.play();
    }
}