import pool from './db.js';

const checkDb = async () => {
    try{
        const connection = await pool.getConnection();
        const result = connection.query('SELECT 1 + 1 AS solution');
        connection.release();
        return true;
    }catch(err){
        console.error(err);
        return false;
    }
};

export default checkDb;