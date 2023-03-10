// eslint-disable-next-line import/no-extraneous-dependencies
const { nanoid } = require('nanoid');
const books = require('./books');
const { STATUS, STATUS_CODE, MESSAGE } = require('./constant');

// redundant func
const badResponse = (h, status, message, code) => {
  const response = h.response({
    status,
    message,
  });
  response.code(code);
  return response;
};

const getAllResponse = (h, booksFound) => {
  const response = h.response({
    status: STATUS.SUCCESS,
    data: {
      books: booksFound.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      })),
    },
  });
  response.code(STATUS_CODE.OK);
  return response;
};

const addBookHandler = (request, h) => {
  const {
    name, year, author, summary, publisher, readPage, pageCount, reading,
  } = request.payload;
  if (name === undefined) {
    return badResponse(h, STATUS.FAIL, MESSAGE.FAIL.CREATE.NAME_REQUIRED, STATUS_CODE.BAD_REQUEST);
  }

  if (readPage > pageCount) {
    return badResponse(h, STATUS.FAIL, MESSAGE.FAIL.CREATE.READ_BIGGER, STATUS_CODE.BAD_REQUEST);
  }

  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = pageCount === readPage;

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };
  books.push(newBook);

  const isSuccess = books.filter((book) => book.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: STATUS.SUCCESS,
      message: MESSAGE.SUCCESS.CREATE.OK,
      data: {
        bookId: id,
      },
    });
    response.code(STATUS_CODE.CREATE);
    return response;
  }

  return badResponse(h, STATUS.FAIL, MESSAGE.FAIL.CREATE.SERVER_ERROR, STATUS_CODE.SERVER_ERROR);
};

const getAllBooksHandler = (request, h) => {
  const { name, reading, finished } = request.query;
  if (name) {
    const booksFound = books.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()));
    return getAllResponse(h, booksFound);
  }
  if (reading) {
    const booksFound = books.filter((book) => Number(book.reading) === Number(reading));
    return getAllResponse(h, booksFound);
  }
  if (finished) {
    const booksFound = books.filter((book) => Number(book.finished) === Number(finished));
    return getAllResponse(h, booksFound);
  }

  return getAllResponse(h, books);
};

const getBookByIdHandler = (request, h) => {
  const { bookId } = request.params;

  const book = books.filter((bookFound) => bookFound.id === bookId)[0];

  if (book !== undefined) {
    return {
      status: STATUS.SUCCESS,
      data: {
        book,
      },
    };
  }

  return badResponse(h, STATUS.FAIL, MESSAGE.FAIL.COMMON.NOT_FOUND, STATUS_CODE.NOT_FOUND);
};

const editBookByIdHandler = (request, h) => {
  const { bookId } = request.params;
  const {
    name, year, author, summary, publisher, readPage, pageCount, reading,
  } = request.payload;

  if (name === undefined) {
    return badResponse(h, STATUS.FAIL, MESSAGE.FAIL.EDIT.NAME_REQUIRED, STATUS_CODE.BAD_REQUEST);
  }

  if (readPage > pageCount) {
    return badResponse(h, STATUS.FAIL, MESSAGE.FAIL.EDIT.READ_BIGGER, STATUS_CODE.BAD_REQUEST);
  }

  const finished = pageCount === readPage;
  const updatedAt = new Date().toISOString();
  const index = books.findIndex((book) => book.id === bookId);
  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      readPage,
      pageCount,
      finished,
      reading,
      updatedAt,
    };

    const response = h.response({
      status: STATUS.SUCCESS,
      message: MESSAGE.SUCCESS.EDIT.OK,
    });

    response.code(STATUS_CODE.OK);
    return response;
  }

  return badResponse(h, STATUS.FAIL, MESSAGE.FAIL.EDIT.NOT_FOUND, STATUS_CODE.NOT_FOUND);
};

const deleteBookByIdHandler = (request, h) => {
  const { bookId } = request.params;
  const index = books.findIndex((book) => book.id === bookId);

  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: STATUS.SUCCESS,
      message: MESSAGE.SUCCESS.DELETE.OK,
    });
    response.code(STATUS_CODE.OK);
    return response;
  }

  return badResponse(h, STATUS.FAIL, MESSAGE.FAIL.DELETE.NOT_FOUND, STATUS_CODE.NOT_FOUND);
};

module.exports = {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler,
};
