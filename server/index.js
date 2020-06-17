const express = require('express')
const app = express()
const path = require('path')

// app.use(express.static(path.resolve(__dirname, '..', 'client', 'dist')))

// app.use('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, '..', 'client', 'dist', 'index.html'))
// })

const PORT = process.env.PORT || 3000
app.listen(PORT, console.log(`Server is running on PORT: ${PORT}`))