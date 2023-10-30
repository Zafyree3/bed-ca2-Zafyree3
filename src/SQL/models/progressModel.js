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

	const VALUES = [data.progress];

	pool.query(SQLQUERY, VALUES, callback);
}

function updateTaskProgressById(data, callback) {
	const SQLQUERY = `

    `;
}
