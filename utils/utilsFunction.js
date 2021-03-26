const jwt = require("jsonwebtoken");

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};

const isValidDate = (dateString) => {
    // Validates that the input string is a valid date formatted as "mm/dd/yyyy"
    // First check for the pattern
    if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString)) return false;

    // Parse the date parts to integers
    var parts = dateString.split("/");
    var day = parseInt(parts[1], 10);
    var month = parseInt(parts[0], 10);
    var year = parseInt(parts[2], 10);

    // Check the ranges of month and year
    if (year < 1000 || year > 3000 || month == 0 || month > 12) return false;

    var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // Adjust for leap years
    if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
        monthLength[1] = 29;

    // Check the range of the day
    return day > 0 && day <= monthLength[month - 1];
};

const formatDate = (dateString) => {
    var parts = dateString.split("/");
    var day = parts[1].padStart(2, "0");
    var month = parts[0].padStart(2, "0");
    var year = parseInt(parts[2], 10);

    return `${month}/${day}/${year}`;
};

const formatJSDate = (date) => {
    var year = date.getFullYear();

    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : "0" + month;

    var day = date.getDate().toString();
    day = day.length > 1 ? day : "0" + day;

    return month + "/" + day + "/" + year;
};

const generateTicketNo = () => {
    return ("" + Math.random()).substring(2, 12);
};

module.exports = {
    generateToken,
    isValidDate,
    formatDate,
    generateTicketNo,
    formatJSDate,
};
