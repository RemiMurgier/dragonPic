const isValidName = name => {
    const isValidname = /^[A-Za-zàäâéèêëïîöôùüû0-9 ._-]+$/i.test(name)
    const isValidnameLength = name.length > 1
    return isValidname && isValidnameLength
}

export {
    isValidName
}