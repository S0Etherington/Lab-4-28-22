const express = require('express')
const path = require('path')

const app = express()

app.use(express.json())


// include and initialize the rollbar library with your access token
var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: 'efd02e94897c4e728ab868d3b9ffabb0',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

// record a generic message and send it to Rollbar
rollbar.log('Hello world!')

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '../index.html'))
})

const port = process.env.PORT || 4500

// let text = []

// app.post('user/api', (req, res)=>{
//     let {input} = req.body
//     input = input.trim()
//     text.push(input)
//     rollbar.log('array works')
//     res.status(200).send(text)
// })

let inputText = ['1', 'b', 'hello']

app.get('/user/api', (req, res) => {
  rollbar.log('succesfully recieved input text')
  res.status(200).send(inputText)
})

try {
    nonExistentFunction();
  } catch (error) {
    rollbar.error(error);
    // expected output: ReferenceError: nonExistentFunction is not defined
    // Note - error messages will vary depending on browser
  }

  try{
      nonExistentFunction()
  } catch (error) {
      rollbar.critical('Critical error')
  }

  try{
      nonExistentFunction()
  } catch (error) {
      rollbar.warning('Warning')
  }


app.use(rollbar.errorHandler())

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})