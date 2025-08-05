const bcrypt = require('bcrypt');


async function hashPasswords(password) {
    const saltRounds = 10;
    const hashpass = await bcrypt.hash(password,saltRounds);
    console.log(
        {
            password,
            hashPass
        }
    )
    return
}

const passwords = await hashPasswords("nishav2015$");