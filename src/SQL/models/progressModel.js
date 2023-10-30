const pool = require("../services/db");

function insertNewTaskProgress(data, callback) {
	const SQLQUERY = `
        INSERT INTO TaskProgress (user_id, task_id, completion_date, notes)
        VALUES (?,?,?,?);
    `;

	const VALUES = [data.user_id, data.task_id, data.completion_date, data.notes];

	pool.query(SQLQUERY, VALUES, callback);
}

function selectTaskProgressById(data, callback) {
	const SQLQUERY = `
        SELECT * FROM TaskProgress
        WHERE progress_id = ?;
    `;

	const VALUES = [data.progress_id];

	pool.query(SQLQUERY, VALUES, callback);
}

function updateTaskProgressById(data, callback) {
	const SQLQUERY = `
        UPDATE TaskProgress
        SET user_id = ?, task_id = ?, completion_date = ?, notes = ?
        WHERE progress_id = ?;
    `;

	const VALUES = [
		data.user_id,
		data.task_id,
		data.completion_date,
		data.notes,
		data.progress_id,
	];

	pool.query(SQLQUERY, VALUES, callback);
}

function deleteTaskProgressById(data, callback) {
	const SQLQUERY = `
        DELETE FROM TaskProgress
        WHERE progress_id = ?;

        ALTER TABLE User AUTO_INCREMENT = 1;
    `;

	const VALUES = [data.progress_id];

	pool.query(SQLQUERY, VALUES, callback);
}

module.exports = {
	insertNewTaskProgress,
	selectTaskProgressById,
	updateTaskProgressById,
	deleteTaskProgressById,
};
