const pool = require("../services/db");

function insertNewTask(data, callback) {
	const SQLQUERY = `
        INSERT INTO Task (title, description, points)
        VALUES (?,?,?);
    `;

	const VALUES = [data.title, data.description, data.points];

	pool.query(SQLQUERY, VALUES, callback);
}

function selectAllTasks(data, callback) {
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
        SET title = ?, description = ?, 
    `;
}
