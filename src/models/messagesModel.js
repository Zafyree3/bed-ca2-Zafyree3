const pool = require("../services/db");

//module.exports.selectAll = (callback) => {
async function selectAll(data, callback) {
	const SQLSTATMENT = `
    SELECT Messages.id, Messages.message_text, user.user_id, user.username, messages.created_at , IF(User.user_id = ?,TRUE,FALSE) AS own_message FROM Messages
	LEFT JOIN User ON Messages.user_id = User.user_id
	ORDER BY Messages.created_at
	`;

	const [VALUES] = [data ? data.user_id : 0];

	const [header, _] = await pool.query(SQLSTATMENT, VALUES, callback);

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
