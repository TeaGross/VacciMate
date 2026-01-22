export const patterns = {
    onlyNumbers: {
        value: /^[0-9]+$/,
        message: 'Endast siffror är tillåtna'
    },
    email: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Ange en giltig e-postadress',
    },
    password: {
        value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
        message: 'Lösenordet måste vara minst 6 tecken och innehålla minst en bokstav och en siffra',
    },

};