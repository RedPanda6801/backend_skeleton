const express = require("express");
const router = express.Router();
const logger = require("../lib/logger");
const userService = require("../service/userService");
const { isLoggedIn } = require("../lib/middleware");

// 회원가입, 개인정보 조회 및 수정 삭제...(CRUD)

// 등록
router.post("/", async (req, res) => {
  try {
    const params = {
      name: req.body.name,
      userid: req.body.userid,
      password: req.body.password,
      email: req.body.email,
      role: req.body.role,
      age: req.body.age,
    };
    logger.info(`(user.reg.params) ${JSON.stringify(params)}`);

    // 입력값 null 체크
    if (!params.name || !params.userid || !params.password) {
      const err = new Error("Not allowed null (name, userid, password)");
      logger.error(err.toString());

      return res.status(500).json({ err: err.toString() });
    }

    // 비즈니스 로직 호출
    const result = await userService.reg(params);
    logger.info(`(user.reg.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// 리스트 조회
router.get("/all", isLoggedIn, async (req, res) => {
  try {
    const params = {
      name: req.query.name,
      userid: req.query.userid,
    };
    logger.info(`(user.list.params) ${JSON.stringify(params)}`);

    const result = await userService.list(params);
    logger.info(`(user.list.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// 상세정보 조회
router.get("/", isLoggedIn, async (req, res) => {
  try {
    const params = {
      id: req.decoded.id,
    };
    logger.info(`(user.info.params) ${JSON.stringify(params)}`);

    const result = await userService.info(params);
    logger.info(`(user.info.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// 수정
router.put("/", isLoggedIn, async (req, res) => {
  try {
    const params = {
      id: req.decoded.id,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      age: req.body.age,
      role: req.body.role,
    };
    logger.info(`(user.update.params) ${JSON.stringify(params)}`);

    // 입력값 null 체크
    if (!params.name) {
      const err = new Error("Not allowed null (name)");
      logger.error(err.toString());

      return res.status(500).json({ err: err.toString() });
    }

    const result = await userService.edit(params);
    logger.info(`(user.update.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// 삭제
router.delete("/", isLoggedIn, async (req, res) => {
  try {
    const params = {
      id: req.decoded.id, // 권한 확인용 decoded
    };
    logger.info(`(user.delete.params) ${JSON.stringify(params)}`);

    const result = await userService.delete(params);
    logger.info(`(user.delete.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

module.exports = router;
