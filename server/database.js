const { Pool } = require('pg');

// Configure the database connection
const pool = new Pool({
    user: "postgres",
    password: "", 
    database: "testWad",    
    host: "localhost",
    port: "5433"
});

const execute = async (createTblQuery, insertDataQuery) => {
    try {
        await pool.connect(); 
        await pool.query(createTblQuery); 
        await pool.query(insertDataQuery); 
        console.log('Table setup and default slots insertion complete.');
        return true;
    } catch (error) {
        console.error('Error executing queries:', error.stack);
        return false;
    }
};


const createTblQuery = `
    CREATE TABLE IF NOT EXISTS "time_slots" (
        "id" SERIAL PRIMARY KEY,
        "date" DATE NOT NULL,
        "time_slot" TIME NOT NULL,
        "is_booked" BOOLEAN DEFAULT false
    );
`;


const insertDataQuery = `
    DO $$
    BEGIN
        -- Only generate default slots if the table is empty
        IF NOT EXISTS (SELECT 1 FROM "time_slots") THEN
            INSERT INTO "time_slots" ("date", "time_slot", "is_booked")
            SELECT 
                d::DATE, (t * interval '1 hour')::TIME, false
            FROM 
                generate_series(CURRENT_DATE, CURRENT_DATE + INTERVAL '7 days', INTERVAL '1 day') d,
                generate_series(8, 18) t;
        END IF;
    END $$;
`;

execute(createTblQuery, insertDataQuery).then(result => {
    if (result) {
        console.log('Time slots table is ready and default slots have been added.');
    }
}).catch(err => {
    console.error('Failed to set up time slots table:', err);
});


module.exports = pool;
