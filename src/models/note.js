// 몽구스 라이브러리 요청
const mongoose = require('mongoose');

// 노트의 DB 스키마 정의
const NoteSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
  },
  {
    // Date 자료형으로 createAt, updateAt 필드 할당
    timestamps: true,
  },
);

// 스키마와 함께 'Note' 모델 정의
const Note = mongoose.model('Note', NoteSchema);
// 모듈 익스포트
module.exports = Note;
