const pool = require("../services/db");

//module.exports.selectAll = (callback) => {
async function selectAll(callback) {
	const SQLSTATMENT = `
    SELECT * FROM Messages;
    `;

	const [header, _] = await pool.query(SQLSTATMENT, callback);

	return header;
}

//module.exports.selectById = (data, callback) => {
async function selectById(data, callback) {
	const SQLSTATMENT = `
    SELECT * FROM Messages
    WHERE id = ?;
    `;
	const VALUES = [data.id];

	const [header, _] = await pool.query(SQLSTATMENT, VALUES, callback);

	return header;
}

//module.exports.insertSingle = (data, callback) => {
async function insertSingle(data, callback) {
	const SQLSTATMENT = `
    INSERT INTO Messages (message_text, user_id)
    VALUES (?, ?);
    `;
	const VALUES = [data.message_text, data.user_id];

	const [header, _] = await pool.query(SQLSTATMENT, VALUES, callback);

	return header;
}

//module.exports.updateById = (data, callback) => {
async function updateById(data, callback) {
	const SQLSTATMENT = `
    UPDATE Messages 
    SET message_text = ?, user_id = ?
    WHERE id = ?;
    `;
	const VALUES = [data.message_text, data.user_id, data.id];

	const [header, _] = await pool.query(SQLSTATMENT, VALUES, callback);

	return header;
}

//module.exports.deleteById = (data, callback) => {
async function deleteById(data, callback) {
	const SQLSTATMENT = `
    DELETE FROM Messages 
    WHERE id = ?;
    `;
	const VALUES = [data.id];

	const [header, _] = await pool.query(SQLSTATMENT, VALUES, callback);

	return header;
}

module.exports = {
	selectAll,
	selectById,
	insertSingle,
	updateById,
	deleteById,
};
