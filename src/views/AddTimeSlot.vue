<template>
    <div>
      <h2>Add New Time Slot</h2>
  
      <div>
        <label for="date">Select Date:</label>
        <flat-pickr
          v-model="newDate"
          :config="dateConfig"
          class="date-picker"
          placeholder="Select a Date"
        />
      </div>
  
      
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
  
      
      <button @click="addTimeSlot" :disabled="!newDate || !newTime">Add Slot</button>
  
      
      <p v-if="message">{{ message }}</p>
    </div>
  </template>
  
  <script>
  
  import FlatPickr from "vue-flatpickr-component";
  import "flatpickr/dist/flatpickr.css";
  
  export default {
    components: {
      FlatPickr, 
    },
    data() {
      return {
        newDate: null, 
        newTime: null, 
        message: "", 
        dateConfig: {
          enableTime: false, 
          dateFormat: "Y-m-d", 
        },
      };
    },
    methods: {
        addTimeSlot() {
    
    if (!this.newDate || !this.newTime) {
        this.message = "Please select both date and time.";
        return;
    }

    
    const formattedTime = `${this.newTime}:00`;

    
    const timeSlot = {
        date: this.newDate, 
        time: formattedTime, 
    };

    
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
            this.newTime = null; 
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
  