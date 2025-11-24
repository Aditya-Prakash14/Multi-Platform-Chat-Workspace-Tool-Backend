const service = require("./auth.service");

exports.register = async (req, res) => {
  try {
    const user = await service.register(req.body);
    res.json(user);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

exports.login = async (req, res) => {
  try {
    const data = await service.login(req.body);
    res.json(data);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};
