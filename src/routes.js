const {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler
} = require('./handler')

const routes = [
  {
    method: 'GET',
    path: '/',
    handler: () => ({ success: true, data: { message: 'Hi, Server berfungsi' } })
  },
  {
    method: 'POST',
    path: '/books',
    handler: addBookHandler
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooksHandler
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: getBookByIdHandler
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: editBookByIdHandler
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteBookByIdHandler
  }
]
module.exports = routes
