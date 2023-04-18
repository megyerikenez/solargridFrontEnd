const password = require('secure-random-password')
export const generatePassword = () => {
    const passwordLength = 12
    const passwordOptions = {
        length: passwordLength,
        characters: [
            password.lower,
            password.upper,
            password.digits,
            password.symbols,
        ],
    }
    console.log(password.randomPassword(passwordOptions), 'password')
    return password.randomPassword(passwordOptions)
}
