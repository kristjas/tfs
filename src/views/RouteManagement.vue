<template>
  <div>
    <h2>Select Date</h2>
    <flat-pickr 
      v-model="selectedDate" 
      :config="dateConfig"
      class="date-picker"
    />
    <p>Selected Date: {{ selectedDate }}</p>

    <h2>Available Time Slots</h2>
    <div v-if="timeSlots.length > 0" class="slots">
      <div 
        v-for="(slot, index) in timeSlots" 
        :key="index" 
        :class="['slot', { booked: slot.status === 'booked', selected: selectedSlot === slot }]" 
        @click="bookSlot(slot)"
      >
        {{ slot.time }}
      </div>
    </div>
    <p v-else>Please select a date to see available time slots.</p>

    <h3>Selected Date and Time: {{ selectedDateTime }}</h3>
  </div>
</template>

<script>
import FlatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";

export default {
  components: { FlatPickr },
  data() {
    return {
      selectedDate: null, // Selected date
      selectedSlot: null, // Selected time slot
      timeSlots: [], // Slots for the selected date
      dateConfig: {
        enableTime: false, // Date only
        dateFormat: "Y-m-d", // Date format
      },
    };
  },
  computed: {
    selectedDateTime() {
      return this.selectedDate && this.selectedSlot
        ? `${this.selectedDate} ${this.selectedSlot.time}`
        : "Not selected yet.";
    },
  },
  methods: {
    fetchSlotsForDate(date) {
        // Fetch slots from the backend for the selected date
        fetch(`http://localhost:3000/api/timeslots?date=${date}`)
            .then((response) => response.json())
            .then((data) => {
                this.timeSlots = data.map((slot) => ({
                    time: slot.time_slot, // Time slot (e.g., "9:00 - 10:00")
                    status: slot.is_booked ? 'booked' : 'available', // "available" or "booked"
                }));
            })
            .catch((err) => console.error("Error fetching slots:", err));
    },
    bookSlot(slot) {
        if (slot.status === 'booked') {
            alert("This slot is already booked.");
            return;
        }
        
        // Mark the slot as booked locally
        slot.status = 'booked';

        // Send the booking to the backend
        fetch("http://localhost:3000/api/bookings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                date: this.selectedDate,
                time: slot.time,
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to book slot.");
                }
                alert(`Slot booked for ${this.selectedDate} at ${slot.time}`);
            })
            .catch((err) => {
                console.error("Error booking slot:", err);
                // Revert to available if booking fails
                slot.status = 'available';
            });
    },
},

  watch: {
    selectedDate(newDate) {
      if (newDate) {
        this.fetchSlotsForDate(newDate); // Fetch time slots for the selected date
      } else {
        this.timeSlots = [];
      }
    },
  },
};
</script>

<style scoped>
h2 {
  font-size: 18px;
  margin-bottom: 10px;
}
.date-picker {
  width: 300px;
  padding: 10px;
  font-size: 16px;
  margin-bottom: 20px;
}
.slots {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-bottom: 20px;
}
.slot {
  padding: 10px;
  border: 1px solid #ccc;
  text-align: center;
  cursor: pointer;
  background-color: #f9f9f9;
  border-radius: 5px;
  transition: background-color 0.3s;
}
.slot:hover {
  background-color: #e6e6e6;
}
.slot.booked {
  background-color: #f44336;
  color: white;
  cursor: not-allowed;
}
.slot.selected {
  background-color: #4caf50;
  color: white;
  font-weight: bold;
}
</style>
