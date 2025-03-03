<template>
  <div class="Main">

    <FooterComponent />
  </div>
</template>


<script>
import FooterComponent from "@/components/FooterComponent.vue";
export default {
  components: {
    FooterComponent,
  },
  name: "AllRoutes",

  data() {
    return {
      toTallinn: 0,
      routes: [],

    };
  },
  methods: {
    fetchRouts() {
      fetch(`http://localhost:3000/api/routes/`)
        .then((response) => response.json())
        .then((data) => (this.routes = data))
        .catch((err) => console.log(err.message));
  },
  },
  mounted() {
    this.fetchRouts();
    console.log("mounted");
  } 
};
</script>

<style scoped>
div {
  background-color: bisque;
}




</style>