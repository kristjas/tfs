<template>
  <div>

    <nav>
      <router-link to="/">Avaleht</router-link> |
      <router-link to="/routemanagement"> Broneeri aeg</router-link> 
      <router-link to="/add-slot"> Lisa aeg</router-link> 
    </nav>
    <router-view />
  
   
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: bisque;
}
nav {
  display: flex;
  justify-content: flex-end; 
  align-items: center;
}
nav a {
  font-weight: bold;
  color: #2c3e50;
}
nav a.router-link-exact-active {
  color: #42b983;
}
button{
/*   margin-top: 30px;*/  
  border-radius: 36px;
  background: #FEE996;
  border:0;
  font-weight: 700;
  font-size: 0.8em;
  padding: 10px 16px;
  letter-spacing: 2px;
}
</style>
