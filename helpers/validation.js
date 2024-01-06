exports.validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(/^[^@\s]+@[^@\s]+$/);
};
exports.validateLength = (text, min, max) => {
  if (text.length > max || text.length < min) {
    return false;
  }
  return true;
};
