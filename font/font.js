const LARGE = require('./large');
// const SMALL = require('./small');

function toByteCode(a){
    a = a.replace(/\s/g, '').replace(/[^#]/g, '0').replace(/[#]/g, '1');
    var arr = [];

    for(var i=0, length=a.length/8; i<length; i++){
        arr.push(getColumn(a, i));
    }
    return arr;
}

function getColumn(a, c){
    var b = a.length/8;

    var arr =[];
    for(var i = 0; i<8; i++){
        arr.push(a[(i*b)+c])
    }

    return parseInt(arr.reverse().join(''),2)
    
}

const path = require('path');
const fonts = {};
exports.fonts = fonts;

exports.loadFont = function(font_path, font_name){
    font_path = path.resolve(process.cwd(), font_path);

    var font = {};
    try{
        font = require(font_path);
    }catch(err){
        console.error(`Failed to load font at: ${font_path}`);
        return;
    }

    var pack = {};
    
    for(var i in font){
        pack[i] = toByteCode(font[i]);
    }

    fonts[font_name] = pack;
}