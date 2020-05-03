const checkWriteAccess = (_req, res, next) => {
  const write_allowed = parseInt(process.env.WRITE_ALLOWED);
  if (!write_allowed) {
    res.status(400).json({
      status: "error",
      message: "Access denied for write operation",
    });
    return;
  }
  next();
};

module.exports = {
  checkWriteAccess,
};
