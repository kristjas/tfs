const { Pool } = require('pg');

// Configure the database connection
const pool = new Pool({
    user: "postgres",
    password: "fmgd5hnCff", // Replace with your database password
    database: "testWad",    // Replace with your database name
    host: "localhost",
    port: "5433"
});

const execute = async (createTblQuery, insertDataQuery) => {
    try {
        await pool.connect(); // Establish connection
        await pool.query(createTblQuery); // Create the table if it doesn't exist
        await pool.query(insertDataQuery); // Insert default time slots if not already present
        console.log('Table setup and default slots insertion complete.');
        return true;
    } catch (error) {
        console.error('Error executing queries:', error.stack);
        return false;
    }
};

// SQL query to create the "time_slots" table
const createTblQuery = `
    CREATE TABLE IF NOT EXISTS "time_slots" (
        "id" SERIAL PRIMARY KEY,
        "date" DATE NOT NULL,
        "time_slot" TIME NOT NULL,
        "is_booked" BOOLEAN DEFAULT false
    );
`;

// SQL query to insert default time slots for a range of dates and times
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

// Execute the queries to set up the table and populate it with default data
execute(createTblQuery, insertDataQuery).then(result => {
    if (result) {
        console.log('Time slots table is ready and default slots have been added.');
    }
}).catch(err => {
    console.error('Failed to set up time slots table:', err);
});

// Export the pool for use in other parts of the application
module.exports = pool;
