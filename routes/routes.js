const express = require('express')
const Model = require('../models/model')
const router = express.Router()

//Post Method
// localhost:5500/api/post
router.post('/post', async (req, res) => {
  const data = await new Model({
    name: req.body.name,
    age: req.body.age,
  })

  try {
    const dataToSave = data.save()
    res.status(200).json(dataToSave)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

//Get all Method
// localhost:5500/api/getAll

router.get('/getAll', async (req, res) => {
  try {
    const data = await Model.find()
    res.json(data)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

//Get by ID Method
//localhost:5500/api/getOne/:id

router.get('/getOne/:id', async (req, res) => {
  try {
    const data = await Model.findById(req.params.id)
    res.json(data)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

//Update by ID Method
//localhost:5500/api/update/:id

router.patch('/update/:id', async (req, res) => {
  try {
    const id = req.params.id
    const updatedData = req.body
    const options = { new: true }

    const result = await Model.findByIdAndUpdate(id, updatedData, options)

    res.send(result)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

//Delete by ID Method
//// localhost:5500/api/delete/:id

router.delete('/delete/:id', async (req, res) => {
  try {
    const id = req.params.id
    const data = await Model.findByIdAndDelete(id)
    res.send(`Document with ${data.name} has been deleted..`)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

module.exports = router
