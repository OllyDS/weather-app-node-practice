const getUser = (id, callback) => {
    const user = {
        id: id,
        name: 'Oliver'
    }
    callback(user)
}

getUser(13, (user) => {
    console.log(user)
})