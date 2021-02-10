const crypto = require('crypto');

/*
    This function return a identification number for order request.
    1) Generate a hash number with date as seem. This number has 96 characters HEX (See sha384 algorithm).
    2) Split hash number in 16 parts the foreach par there are 6 characters.
    3) XOR operation between (((Part1 XOR Part2)XOR Part3)...XORPart16)
    4) Operation convert from binary to hex.
    5) Return Result
 */

const orderNumberGenerator = function (){

    // Create hash value with Date as seed
    let hash = crypto.createHash('sha384').update(new Date() .toISOString()).digest("hex");
    // Initialize Variables
    let i = 0;
    let start= 0;
    let binaryCode;
    let hexaCode;
    // Foreach part:
    while (i < 16) {
        let num = hash.slice(start,start + 6)
        // Convert Hex part -> Dec -> Bin. Complete with 0's if lenght is lower tha 24
        let binPart = parseInt(`${num}`,16).toString(2).padStart(24, "0")

        start +=6 ;
        // Operation XOR betweeen binaries part.
        binaryCode = (i == 0 )? binPart :((binaryCode.split('').map(function (currentValue, index) {
            return currentValue ^ binPart[index]
        })).join(''))
        i +=1;
    }
    // Convert from binary to Hexa. Complete with 0, if the conversion result start with 0's (functions omitted this).
    hexaCode = parseInt(binaryCode,2).toString(16).padStart(6,"0")
    console.info(`HexaCode for Order Request: ${hexaCode}`)
    return hexaCode
}

module.exports =  orderNumberGenerator