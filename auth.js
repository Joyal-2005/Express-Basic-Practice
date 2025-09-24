
module.exports = function mockAuth(req, res, next) {
  const role = req.get('x-user-role') || (req.body && req.body.role) || 'Guest';
  const name = req.get('x-user-name') || (req.body && req.body.name) || 'Anonymous';
  const id = req.get('x-user-id') || (req.body && req.body.userId) || null;
  req.user = { role, name, id };
  next();
};
