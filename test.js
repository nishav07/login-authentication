const bcrypt = require('bcrypt');

let pass = "Nishav"
let hash = await bcrypt.hash(pass,10);

console.log({
    pass,
    hash
})