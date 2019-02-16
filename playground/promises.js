const asyncAdd = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (typeof a === 'number' && typeof b === 'number') {
                resolve( a + b)
            } else {
                reject('Arguments must be numbers')
            }
        }, 1500)
    })
}

asyncAdd(1, 2).then((res) => {
    console.log('Result: ', res)
    return asyncAdd(res, 33)
}).then((res) => {
    console.log('Expected: 36, Actual:', res)
}).catch((errorMessage) => {
    console.log(errorMessage)
})

// const somePromise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve('Promise resolved')
//         reject('Promise rejected!')
//     }, 2000)
// })

// somePromise.then((message) => {
//     console.log('Success: ', message)
// }, (errorMessage) => {
//     console.log('Error: ', errorMessage)
// })