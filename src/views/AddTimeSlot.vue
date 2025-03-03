<template>
    <div>
      <h2>Add New Time Slot</h2>
  
      <!-- Date Picker (FlatPickr) -->
      <div>
        <label for="date">Select Date:</label>
        <flat-pickr
          v-model="newDate"
          :config="dateConfig"
          class="date-picker"
          placeholder="Select a Date"
        />
      </div>
  
      <!-- Time Picker (Native HTML time input) -->
      <div>
        <label for="time">Select Time:</label>
        <input
          type="time"
          v-model="newTime"
          :disabled="!newDate"
          class="time-input"
          placeholder="Select Time"
        />
      </div>
  
      <!-- Button to Add Time Slot -->
      <button @click="addTimeSlot" :disabled="!newDate || !newTime">Add Slot</button>
  
      <!-- Success/Failure Message -->
      <p v-if="message">{{ message }}</p>
    </div>
  </template>
  
  <script>
  // Import FlatPickr and its CSS
  import FlatPickr from "vue-flatpickr-component";
  import "flatpickr/dist/flatpickr.css";
  
  export default {
    components: {
      FlatPickr, // Register FlatPickr component
    },
    data() {
      return {
        newDate: null, // Selected date for new time slot
        newTime: null, // Selected time for new time slot
        message: "", // Message for success or failure
        dateConfig: {
          enableTime: false, // Date only (no time)
          dateFormat: "Y-m-d", // Date format: "Year-Month-Day"
        },
      };
    },
    methods: {
        addTimeSlot() {
    // Ensure both date and time are selected
    if (!this.newDate || !this.newTime) {
        this.message = "Please select both date and time.";
        return;
    }

    // Convert time to include seconds (e.g., "10:30" -> "10:30:00")
    const formattedTime = `${this.newTime}:00`;

    // Prepare the data to send to the backend
    const timeSlot = {
        date: this.newDate, // This is already in "YYYY-MM-DD" format
        time: formattedTime, // Now the time is in "HH:MM:SS" format
    };

    // Send the POST request to the backend API
    fetch("http://localhost:3000/api/timeslots", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(timeSlot),
    })
        .then((response) => response.json())
        .then((data) => {
            this.message = `Time slot for ${this.newDate} at ${this.newTime} added successfully.`;
            this.newDate = null;
            this.newTime = null; // Reset form after submission
        })
        .catch((err) => {
            this.message = "Error adding time slot.";
            console.error("Error adding time slot:", err);
        });
},
    },
  };
  </script>
  
  <style scoped>
  h2 {
    font-size: 20px;
    margin-bottom: 20px;
  }
  
  .date-picker {
    width: 250px;
    padding: 10px;
    margin-bottom: 10px;
  }
  
  .time-input {
    padding: 10px;
    font-size: 16px;
  }
  
  button {
    padding: 10px;
    font-size: 16px;
    margin-top: 10px;
  }
  
  button:disabled {
    background-color: #ddd;
  }
  
  p {
    margin-top: 10px;
    font-size: 16px;
    color: green;
  }
  </style>
  