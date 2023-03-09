const STATUS = {
  SUCCESS: 'success',
  FAIL: 'fail'
};
const STATUS_CODE = {
  OK: 200,
  CREATE: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
}
const MESSAGE = {
  SUCCESS: {
    CREATE_BOOK: {
      OK: 'Buku berhasil ditambahkan'
    },
    EDIT_BOOK: {
      OK: 'Buku berhasil diperbarui'
    },
    DELETE_BOOK: {
      OK: 'Buku berhasil dihapus'
    }
  },
  FAIL: {
    COMMON: {
      NOT_FOUND: 'Buku tidak ditemukan'
    },
    CREATE_BOOK: {
      NAME_REQUIRED: 'Gagal menambahkan buku. Mohon isi nama buku',
      READPAGE_BIGGER: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
      INTERNAL_SERVER_ERROR: 'Buku gagal ditambahkan'
    },
    EDIT_BOOK: {
      NOT_FOUND: 'Gagal memperbarui buku. Id tidak ditemukan',
      NAME_REQUIRED: 'Gagal memperbarui buku. Mohon isi nama buku',
      READPAGE_BIGGER: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    },
    DELETE_BOOK: {
      NOT_FOUND: 'Buku gagal dihapus. Id tidak ditemukan'
    }
  },


}

module.exports = { STATUS_CODE, STATUS, MESSAGE };