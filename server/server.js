const express = require('express');
const pool = require('./database');
const cors = require('cors');

const port = process.env.PORT || 3000;
const app = express();

app.use(cors({ origin: 'http://localhost:8080', credentials: true }));
app.use(express.json());

app.get('/api/timeslots', async (req, res) => {
    try {
        const { date } = req.query; 
        const timeSlots = await pool.query(
            "SELECT * FROM time_slots WHERE date = $1 ORDER BY time_slot",
            [date]
        );
        res.json(timeSlots.rows); 
    } catch (err) {
        console.error('Error fetching time slots:', err);
        res.status(500).send('Server error');
    }
});


app.post('/api/bookings', async (req, res) => {
    try {
        const { date, time } = req.body; 

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



app.post('/api/timeslots', async (req, res) => {
    try {
        const { date, time } = req.body; 

     
        const existingSlot = await pool.query(
            "SELECT * FROM time_slots WHERE date = $1 AND time_slot = $2",
            [date, time]
        );

        if (existingSlot.rows.length > 0) {
            return res.status(400).send('Time slot already exists.');
        }

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
