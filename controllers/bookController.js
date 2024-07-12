const {request, response} = require('express')
const {userData, bookData} = require('../data/bookData')
const bookModel = require('../models/bookModel')
const userModel = require('../models/userModel')

const getAllBookData = async(request, response) => {
    try{
        let books = await bookModel.find();
        if(books.length === 0)
        {
            const initialBooks = await bookModel.insertMany(bookData);
        }
        response.status(200).json(books);
    }
    catch(error)
    {
        response.status(500).json({message: error.message})
    }
}

const addNewBookData = async(request, response) => {
    const newBook = request.body
    try{
        const existingBook = await bookModel.findOne({title: newBook.title})
        console.log(existingBook);
        if(existingBook)
        {
            return response.status(409).json({message: `A book with ${newBook.title} already exists`})
        }
        const insertedBook = await bookModel.create(newBook)
        response.status(201).json(insertedBook)
    }
    catch(error)
    {
        response.status(500).json({message: error.message})
    }
}

const getBookDataByIsbn = async (request, response) => {
    const ISBNtoFetch = request.params.isbn;
    try{
        const expectedBookData = await bookModel.findOne({isbn: ISBNtoFetch})
        if(expectedBookData)
        {
            return response.status(200).json(expectedBookData);
        }
        return response.status(404).json({message: `No book was found with ISBN ${ISBNtoFetch}`})
    }
    catch(error)
    {
        response.status(500).json({message: error.message})
    }
}

const updateBookData = async (request, response) => {
    const isbn = request.params.isbn;
    const bookTobeUpdated = request.body;
    try{
        const updatedBook = await bookModel.findByIdAndUpdate({isbn : isbn}, bookTobeUpdated, { new : true});
        if(updatedBook) {
            return response.status(200).json({message: 'Updated Successfully', updatedBook})
        }
        else {
            return response.status(404).json({message: 'Invalid ID'});
        }
    }
    catch(error)
    {
        return response.status(500).json({message: error.message});
    }
}

const deleteBookData = async(request, response) => {
    const isbn = request.params.isbn;
    try{
        const deletedBook = await bookModel.findOneAndDelete({isbn : isbn});
        if(deletedBook) {
            return response.status(200).json({message: 'Deleted Successfully'});
        }
        else {
            return response.status(400).json({message: 'Invalid ID'});
        }
    }
    catch(error)
    {
        return response.status(500).json({message: error.message});
    }
}

const getAllUserData = async(request, response) => {
    try{
        let users = await userModel.find();
        if(users.length === 0)
        {
            const initialUser = await userModel.insertMany(userData);
        }
        response.status(200).json(users);
    }
    catch(error)
    {
        response.status(500).json({message: error.message})
    }
}

const registerNewUser = async (request, response) => {
    const newUserData = request.body;
    try{
        const existingUser = await userModel.findOne({uname : newUserData.uname})
        console.log(existingUser);
        if(existingUser)
        {
            return response.status(409).json({message: `A user with ${newUserData.uname} already exists`})
        }
        const insertedUser = await userModel.create(newUserData)
        response.status(201).json(insertedUser);
    }
    catch(error)
    {
        response.status(500).json({message: error.message})
    }
};

const authUser = async (request, response) => {
    const newUname = request.params.uname;
    const newUpwd = request.params.upwd;
    try{
        const expectedUser = await userModel.findOne({uname : newUname})
        if(!expectedUser)
        {
            return response.status(404).json({message: `User not found`})
        }
        if(newUpwd != expectedUser.upwd)
        {
            return response.status(404).json({message: `Invalid Password`})
        }
        return response.status(200).json({message: `Authentication Successful`, user : expectedUser})
    }
    catch(error)
    {
        response.status(500).json({message: error.message})
    }
}

const deleteUser = async (request, response) => {
    const delUname = request.params.uname;
    const delUpwd = request.params.upwd;
    try{
        const deletedUser = await userModel.findOneAndDelete({uname: delUname});
        if(delUname === deletedUser.uname && delUpwd === deletedUser.upwd)
        {
            return response.status(200).json({message: 'Deleted Successfully'});
        }
        else
        {
            return response.status(404).json({message: 'Invalid Username and password'})
        }
    }
    catch(error)
    {
        response.status(500).json({message: error.message})
    }
}

module.exports = {getAllBookData, addNewBookData, getBookDataByIsbn,updateBookData, deleteBookData, getAllUserData, registerNewUser, authUser, deleteUser};