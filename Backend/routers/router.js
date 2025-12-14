const router = require('express').Router()
const controller = require('../controllers/controllers.js')

router.get('/get-task',controller.getTask)
router.post('/create-task',controller.createTask)
router.put('/update-task/:id',controller.updateTask)
router.delete('/delete-task/:id',controller.deleteTask)

module.exports = router