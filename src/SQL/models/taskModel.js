const pool = require("../services/db");

function insertNewTask(data, callback) {
	const SQLQUERY = `
        INSERT INTO Task (title, description, points)
        VALUES (?,?,?);
    `;

	const VALUES = [data.title, data.description, data.points];

	pool.query(SQLQUERY, VALUES, callback);
}

function selectAllTasks(callback) {
	const SQLQUERY = `
        SELECT * FROM Task
        ORDER BY task_id;
    `;

	pool.query(SQLQUERY, callback);
}

function selectTaskById(data, callback) {
	const SQLQUERY = `
        SELECT * FROM Task
        WHERE task_id = ?;
    `;

	const VALUES = [data.task_id];

	pool.query(SQLQUERY, VALUES, callback);
}

function updateTaskById(data, callback) {
	const SQLQUERY = `
        UPDATE Task
        SET title = ?, description = ?, points = ?,
        WHERE task_id = ?;
    `;

	const VALUES = [data.title, data.description, data.points, data.task_id];

	pool.query(SQLQUERY, VALUES, callback);
}

function deleteTaskById(data, callback) {
	const SQLQUERY = `
        DELETE FROM Task
        WHERE task_id = ?;

        ALTER TABLE User AUTO_INCREMENT = 1;
    `;

	const VALUES = [data.task_id];

	pool.query(SQLQUERY, VALUES, callback);
}

module.exports = {
	insertNewTask,
	selectAllTasks,
	selectTaskById,
	updateTaskById,
	deleteTaskById,
};
