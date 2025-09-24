module.exports = function allowRoles(...allowedRoles) {
  return (req, res, next) => {
    const role = req.user && req.user.role;
    if (!role) return res.status(401).json({ error: 'Missing user role' });
    if (allowedRoles.includes(role)) return next();
    return res.status(403).json({ error: 'Access denied' });
  };
};
