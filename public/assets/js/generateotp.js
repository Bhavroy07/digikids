var totp = require('deathmoon-totp-generator');
// Function to generate OTP 
function generateOTP() { 
          
    // Declare a digits variable  
    // which stores all digits 
    var digits = '0123456789'; 
    let OTP = ''; 
    for (let i = 0; i < 6; i++ ) { 
        OTP += digits[Math.floor(Math.random() * 10)]; 
    } 
    return OTP; 
} 


 function genOTP() {
    var token = totp('JBSWY3DPEHPK3PXP', { time: new Date() });
    return token

}

module.exports=generateOTP