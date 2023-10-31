const pool = require("../services/db");
const ic = require("node-icecream")();

async function insertNewTask(data) {
	const SQLQUERY = `
        INSERT INTO Task (title, description, points)
        VALUES (?,?,?);
    `;

	const VALUES = [data.title, data.description, data.points];

	const [header, _] = await pool.query(SQLQUERY, VALUES);

	return header;
}

async function selectAllTasks() {
	const SQLQUERY = `
        SELECT * FROM Task
        ORDER BY task_id;
    `;

	const [header, _] = await pool.query(SQLQUERY);

	return header;
}

async function selectTaskById(data) {
	const SQLQUERY = `
        SELECT * FROM Task
        WHERE task_id = ?;
    `;

	const VALUES = [data.task_id];

	const [header, _] = await pool.query(SQLQUERY, VALUES);

	return header;
}

async function updateTaskById(data) {
	const SQLQUERY = `
        UPDATE Task
        SET title = ?, description = ?, points = ?
        WHERE task_id = ?;
		`;

	const VALUES = [data.title, data.description, data.points, data.task_id];

	const [header, _] = await pool.query(SQLQUERY, VALUES);

	return header;
}

async function deleteTaskById(data) {
	const SQLQUERY = `
        DELETE FROM Task
        WHERE task_id = ?;

        ALTER TABLE User AUTO_INCREMENT = 1;
    `;

	const VALUES = [data.task_id];

	const [header, _] = await pool.query(SQLQUERY, VALUES);

	return header;
}

module.exports = {
	insertNewTask,
	selectAllTasks,
	selectTaskById,
	updateTaskById,
	deleteTaskById,
};
