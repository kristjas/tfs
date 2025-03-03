const express = require('express');
const pool = require('./database');
const cors = require('cors');

const port = process.env.PORT || 3000;
const app = express();

app.use(cors({ origin: 'http://localhost:8080', credentials: true }));
app.use(express.json());

// Endpoint to fetch time slots for a specific date
app.get('/api/timeslots', async (req, res) => {
    try {
        const { date } = req.query; // Get the date from the query parameters
        const timeSlots = await pool.query(
            "SELECT * FROM time_slots WHERE date = $1 ORDER BY time_slot",
            [date]
        );
        res.json(timeSlots.rows); // Return the time slots for the selected date
    } catch (err) {
        console.error('Error fetching time slots:', err);
        res.status(500).send('Server error');
    }
});

// Endpoint to book a time slot
app.post('/api/bookings', async (req, res) => {
    try {
        const { date, time } = req.body; // Get the date and time from the request body

        // Check if the slot is already booked
        const slot = await pool.query(
            "SELECT * FROM time_slots WHERE date = $1 AND time_slot = $2",
            [date, time]
        );

        if (slot.rows.length === 0) {
            return res.status(404).send('Time slot not found');
        }

        if (slot.rows[0].is_booked) {
            return res.status(400).send('This slot is already booked');
        }

        // Update the slot status to 'booked'
        await pool.query(
            "UPDATE time_slots SET is_booked = true WHERE date = $1 AND time_slot = $2",
            [date, time]
        );

        res.status(200).send(`Slot booked for ${date} at ${time}`);
    } catch (err) {
        console.error('Error booking time slot:', err);
        res.status(500).send('Server error');
    }
});

// Add this to your existing server code (in the backend)

app.post('/api/timeslots', async (req, res) => {
    try {
        const { date, time } = req.body; // Get the date and time from the request body

        // Check if the slot already exists
        const existingSlot = await pool.query(
            "SELECT * FROM time_slots WHERE date = $1 AND time_slot = $2",
            [date, time]
        );

        if (existingSlot.rows.length > 0) {
            return res.status(400).send('Time slot already exists.');
        }

        // Insert the new time slot into the database
        await pool.query(
            "INSERT INTO time_slots (date, time_slot, is_booked) VALUES ($1, $2, false)",
            [date, time]
        );

        res.status(200).send(`Time slot for ${date} at ${time} added successfully.`);
    } catch (err) {
        console.error('Error adding time slot:', err);
        res.status(500).send('Server error');
    }
});

app.listen(port, () => {
    console.log("Server is listening to port " + port);
});
