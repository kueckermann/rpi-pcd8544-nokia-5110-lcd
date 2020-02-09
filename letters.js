
const letters = {
    "A" : `
    . . . . . .
    . # # # . .
    # . . . # .
    # . . . # .
    # . . . # .
    # # # # # .
    # . . . # .
    # . . . # .
    `
}


function toBuffer(a){
    a = letters[a].replace(/\s/g, '').replace(/\./g, '0').replace(/#/g, '1');

    return Buffer.from([
        getColumn(a, 0),
        getColumn(a, 1),
        getColumn(a, 2),
        getColumn(a, 3),
        getColumn(a, 4),
        getColumn(a, 5),
    ])
}

function getColumn(a, c){
    return parseInt([
        a[0+c], 
        a[6+c], 
        a[12+c], 
        a[18+c], 
        a[24+c], 
        a[3.+c], 
        a[36+c], 
        a[42+c]
    ].reverse().join(''),2)
}

const toExport = {
    "A" : toBuffer('A')
}

console.log(toExport)

module.exports = toExport;