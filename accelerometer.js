const { init } = require('raspi');
const { Serial } = require('raspi-serial');
 
const US = Buffer.from([0x55, 0x51, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]);
const UR = Buffer.from([0x55, 0x52, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]);
const UQ = Buffer.from([0x55, 0x53, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]);

init(() => {
  var serial = new Serial({
    baudRate: 9600,
    portId: '/dev/serial0'
  });
  serial.open(() => {

    var capture = false;
    var set = null;
    var index = 0;

    // serial.write(Buffer.from([0x64]))
     
    serial.on('data', (data) => {
      data.forEach(byte => {
          if(capture && set){
            set[index] = byte;
            index++;
            
            if(index == 12){
              capture = false;
              set = null;
              // console.log('END');
            }
          }else if(!capture){
            if(byte == 0x55){
              // console.log('START');
              capture = true;
              index = 2;
            }
          }else if(!set){
            switch (byte) {
              case 0x51:
                set = US;
                break;
              case 0x52:
                set = UR;
                break;
              case 0x53:
                set = UQ;
                break;
            
              default:
                capture = false;
                break;
            }
          }
          // console.log(byte);
      });
    });
    
    setInterval(() => {
      // console.log("US",US);
      // console.log("UR",UR);
      // console.log("UQ",UQ);
      console.log(getRoll());
      console.log('--------')
    }, 500);
  });
});


function getRoll(){
  var RollL = US[2];
  var RollH = US[3];
  // ((RollH << 8 ) | RollL) / 32768 * 180 (°)
  var n = ((RollH << 8 ) | RollL);
  if(n > 32768){

  }else{
    return n
  }
}
function getPitch(){
  var PitchL = US[4];
  var PitchH = US[5];
  
  return ((PitchH << 8 ) | PitchL) / 32768 * 180;
}
function getTemperature() {
  var TL = US[8];
  var TH = US[9];

  // console.log(TL, TH);
  return ((TH << 8)|TL) /340+36.53
}