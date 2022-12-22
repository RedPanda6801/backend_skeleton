const jwt = require("jsonwebtoken");

const options = {
  expiresIn: "2h", // 만료시간
};

const tokenUtil = {
  // 토큰 생성
  makeToken(user) {
    const payload = {
      id: user.id,
      userid: user.userid,
      name: user.name,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, options);

    return token;
  },
  // 토큰 검증
  verifyToken(token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      return decoded;
    } catch (err) {
      return null;
    }
  },
};

module.exports = tokenUtil;
