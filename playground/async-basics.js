console.log('Starting app')

setTimeout( () => {
    /* This is the callback, it is what will happen once the event has completed,
        Which in this case will be to fire console.log() */
    console.log('Inside of callback function')
}, 2000 /* This is the event, which is a pause for 2000 milliseconds */ )

setTimeout( () => {
    console.log('Second setTimeout works!')
}, 0 )

console.log('Ending app')

