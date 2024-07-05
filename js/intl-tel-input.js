let connection = {
    country_code: 'US',
    languages: 'en-US'
};

const getIp = callback => {
    fetch("https://ipapi.co/json")
        .then(res => res.json())
        .then(data => {
            connection = { ...connection, ...data }
            callback(connection)
        })
        .catch(() => callback(connection))
}

const telInputIntl = {
    promise: {
        then: getIp
    }
}

export { telInputIntl}