const pool = require("../services/db");

async function selectSpentPoints() {
	const SQLQUERY = `
		SELECT SUM(points_change) AS total_spent FROM Transactions
		WHERE points_change < 0;
	`;

	const [header, _] = await pool.query(SQLQUERY);

	return header;
}

async function selectAll() {
	const SQLQUERY = `
        SELECT * FROM Transactions
        ORDER BY Transactions.transaction_id;
    `;

	const [header, _] = await pool.query(SQLQUERY);

	return header;
}

async function selectAllByUserId(data) {
	const SQLQUERY = `
        SELECT * FROM Transactions
        WHERE user_id = ?
        ORDER BY Transactions.transaction_id;
    `;

	const VALUES = [data.user_id];

	const [header, _] = await pool.query(SQLQUERY, VALUES);

	return header;
}

async function insertSingle(data) {
	const SQLQUERY = `
        INSERT INTO Transactions (user_id, points, points_change)
        VALUES (?, ?, ?);
    `;

	const VALUES = [data.user_id, data.points, data.points_change];

	const [header, _] = await pool.query(SQLQUERY, VALUES);

	return header;
}

module.exports = {
	selectAll,
	selectAllByUserId,
	insertSingle,
	selectSpentPoints,
};
