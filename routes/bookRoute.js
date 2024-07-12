const express = require('express')
const router = express.Router()
const bookData = require('../data/bookData')

const {getAllBookData, getBookDataByIsbn, addNewBookData, updateBookData, deleteBookData} = require('../controllers/bookController')
const {getAllUserData, registerNewUser, authUser, deleteUser} = require('../controllers/bookController')

router.get('/getAllBookData', getAllBookData);

router.get('/getBookDataByIsbn/:isbn', getBookDataByIsbn);

router.post('/addNewBookData', addNewBookData);

router.put('/updateBookData/:isbn', updateBookData);

router.delete('/deleteBookData/:isbn', deleteBookData);

router.get('/getAllUserData', getAllUserData)

router.post('/registerNewUser', registerNewUser);

router.get('/authUser/:uname/:upwd',authUser);

router.delete('/deleteUser/:uname/:upwd', deleteUser);

module.exports = router