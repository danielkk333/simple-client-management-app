
exports.getDate = function() {

  const today = new Date();

  const options = {
    year: "numeric",
    day: "numeric",
    month: "long"
  };

  return today.toLocaleDateString("en-US", options);

};
