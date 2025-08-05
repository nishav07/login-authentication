const bcrypt = require('bcrypt');


async function hashPasswords(password) {
    const saltRounds = 10;
    const hashPass = await bcrypt.hash(password,saltRounds);
    console.log(
        {
            password,
            hashPass
        }
    )
    return
}


async function checkPass(orignal,hash) {
    const isMatch = await bcrypt.compare(orignal,hash)
    return isMatch;
}


verify = async() => {
const hashdb = hashPasswords("Nishav2015$");
const userinput = "Nishav2015$";
const isMatch = checkPass(userinput,hashdb)

if(isMatch){
    console.log("password is correct")
} else {
    console.log("password is wrong")
}
}