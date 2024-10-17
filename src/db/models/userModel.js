import pool from "../db.js";

const userModel = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS user (
            id VARCHAR(255) PRIMARY KEY,
            email VARCHAR(255) NOT NULL,
            username VARCHAR(255) NOT NULL,
            role VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
    `
    try{
        const connection = await pool.getConnection();
        const status = await connection.query(query);
        return { status: true, msg: "Table Created Successfully" }
    }catch(err){
        console.error(err);
        return false;
    }
}

console.log(await userModel());

export default userModel;