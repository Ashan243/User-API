
const express = require("express")
const app = express()


const port = process.env.PORT || 4001
const nodeServer = app.listen(port, () => console(`Listening on port ${port}`))

module.exports = nodeServer