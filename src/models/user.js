// 몽구스 라이브러리 요청
const mongoose = require('mongoose');

// 사용자 DB 스키마 정의
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      index: { unique: true },
    },
    email: {
      type: String,
      required: true,
      index: { unique: true },
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    test: {
      type: String,
    },
  },
  {
    // Date 자료형으로 createAt, updateAt 필드 할당
    timestamps: true,
  },
);

// 스키마와 함께 'Note' 모델 정의
const User = mongoose.model('User', UserSchema);
// 모듈 익스포트
module.exports = User;
