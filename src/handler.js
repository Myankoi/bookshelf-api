const { nanoid } = require('nanoid')
const books = require('./books')

// save book
const addBookHandler = (request, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload
  const id = nanoid(16)
  const finished = pageCount === readPage
  const insertedAt = new Date().toISOString()
  const updatedAt = insertedAt

  const failNoNameBook = books.find((book) => book.name !== name)
  if (failNoNameBook) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku'
    })
    response.code(400)
    return response
  }

  const failReadPage = readPage > pageCount
  if (failReadPage) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
    })
    response.code(400)
    return response
  }

  const newBook = {
    id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt
  }

  books.push(newBook)

  const isSuccess = books.find((book) => book.id === id)
  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id
      }
    })
    response.code(201)
    return response
  }
}

// get books
const getAllBooksHandler = (request, h) => {
  const { reading, name, finished } = request.query

  let filteredBooks = [...books]
  if (reading !== undefined) {
    filteredBooks = books.filter((book) => book.reading === '1')
  } else if (finished !== undefined) {
    filteredBooks = books.filter((book) => book.finished === '1')
  } else if (name !== undefined) {
    filteredBooks = books.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()))
  }

  filteredBooks = books.map((book) => ({
    id: book.id,
    name: book.name,
    publisher: book.publisher
  }))

  const response = h.response({
    status: 'success',
    data: {
      books: filteredBooks
    }
  })
  response.code(200)
  return response
}

// get book by id
const getBookByIdHandler = (request, h) => {
  const { bookId } = request.params
  const bookDetails = books.filter((book) => book.id === bookId)[0]

  if (!bookDetails) {
    const response = h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan'
    })
    response.code(404)
    return response
  }
  const response = h.response({
    status: 'success',
    data: {
      book: bookDetails
    }
  })
  response.code(200)
  return response
}

// edit note by id
const editBookByIdHandler = (request, h) => {
  const { bookId } = request.params
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload

  const failNoNameBook = name === undefined
  if (failNoNameBook) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku'
    })
    response.code(400)
    return response
  }

  const failReadPage = readPage > pageCount
  if (failReadPage) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
    })
    response.code(400)
    return response
  }

  const failBookId = !books.find((book) => book.id === bookId)
  if (failBookId) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan'
    })
    response.code(404)
    return response
  }

  const index = books.findIndex((book) => book.id === bookId)
  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading
    }
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui'
    })
    response.code(200)
    return response
  }
}

// delete book
const deleteBookByIdHandler = (request, h) => {
  const { bookId } = request.params

  const index = books.findIndex((book) => book.id === bookId)
  if (index !== -1) {
    books.splice(index, 1)
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus'
    })
    response.code(200)
    return response
  }

  const failBookId = books.filter((book) => book.id !== bookId)
  if (failBookId) {
    const response = h.response({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan'
    })
    response.code(404)
    return response
  }
}

module.exports = {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler
}
