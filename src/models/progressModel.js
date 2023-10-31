const pool = require("../services/db");

async function insertNewTaskProgress(data) {
	const SQLQUERY = `
        INSERT INTO TaskProgress (user_id, task_id, completion_date, notes)
        VALUES (?,?,?,?);
    `;

	const VALUES = [data.user_id, data.task_id, data.completion_date, data.notes];

	const [header, _] = await pool.query(SQLQUERY, VALUES);

	return header;
}

async function selectTaskProgressById(data) {
	const SQLQUERY = `
        SELECT * FROM TaskProgress
        WHERE progress_id = ?;
    `;

	const VALUES = [data.progress_id];

	const [header, _] = await pool.query(SQLQUERY, VALUES);

	return header;
}

async function updateTaskProgressById(data) {
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

	const [header, _] = await pool.query(SQLQUERY, VALUES);

	return header;
}

async function deleteTaskProgressById(data) {
	const SQLQUERY = `
        DELETE FROM TaskProgress
        WHERE progress_id = ?;

        ALTER TABLE TaskProgress AUTO_INCREMENT = 1;
    `;

	const VALUES = [data.progress_id];

	const [header, _] = await pool.query(SQLQUERY, VALUES);

	return header;
}

async function deleteTaskProgressByUserId(data) {
	const SQLQUERY = `
        DELETE FROM TaskProgress
        WHERE user_id = ?;

        ALTER TABLE TaskProgress AUTO_INCREMENT = 1;
    `;

	const VALUES = [data.user_id];

	const [header, _] = await pool.query(SQLQUERY, VALUES);

	return header;
}

async function deleteTaskProgressByTaskId(data) {
	const SQLQUERY = `
        DELETE FROM TaskProgress
        WHERE task_id = ?;

        ALTER TABLE TaskProgress AUTO_INCREMENT = 1;
    `;

	const VALUES = [data.task_id];

	const [header, _] = await pool.query(SQLQUERY, VALUES);

	return header;
}

module.exports = {
	insertNewTaskProgress,
	selectTaskProgressById,
	updateTaskProgressById,
	deleteTaskProgressById,
	deleteTaskProgressByUserId,
	deleteTaskProgressByTaskId,
};
