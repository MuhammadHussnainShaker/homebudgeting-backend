import { app } from './app.js'
import connectDB from './db/index.js'

const port = process.env.PORT || 3000

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Express server listening at port: ${port}`)
    })
  })
  .catch((error) =>
    console.log(
      `Following error occured while connecting to the MongoDB: ${error}`
    )
  )

const testArray = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
]

app.get('/test', (req, res) => {
  console.log(`HomeBudgeting API hit at: ${new Date().toLocaleTimeString()}`)
  res.json(testArray)
})
