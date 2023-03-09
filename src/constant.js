const STATUS = {
  SUCCESS: 'success',
  FAIL: 'fail',
};
const STATUS_CODE = {
  OK: 200,
  CREATE: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
};
const MESSAGE = {
  SUCCESS: {
    CREATE: {
      OK: 'Buku berhasil ditambahkan',
    },
    EDIT: {
      OK: 'Buku berhasil diperbarui',
    },
    DELETE: {
      OK: 'Buku berhasil dihapus',
    },
  },
  FAIL: {
    COMMON: {
      NOT_FOUND: 'Buku tidak ditemukan',
    },
    CREATE: {
      NAME_REQUIRED: 'Gagal menambahkan buku. Mohon isi nama buku',
      READ_BIGGER: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
      SERVER_ERROR: 'Buku gagal ditambahkan',
    },
    EDIT: {
      NOT_FOUND: 'Gagal memperbarui buku. Id tidak ditemukan',
      NAME_REQUIRED: 'Gagal memperbarui buku. Mohon isi nama buku',
      READ_BIGGER: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    },
    DELETE: {
      NOT_FOUND: 'Buku gagal dihapus. Id tidak ditemukan',
    },
  },

};

module.exports = { STATUS_CODE, STATUS, MESSAGE };
