// ./app.js
const vm = new Vue({
  el: '#app',
  data: {
    results: [],
    name: '',
  },
  computed:{
    filterResults: function(){
        var results_array = this.results
        searchName = this.name;

        if(!searchName) return results_array

        searchName = searchName.toLowerCase();

        results_array = results_array.filter( function(item) {
          if(item.name.toLowerCase().indexOf(searchName) !== -1){
            return item;
          }
        })
        return results_array;
    }
  },
  mounted(){
    axios.get("https://swapi.co/api/people")
    .then(response => {this.results = response.data.results
      this.results.forEach( function(data){

        axios.get(data.species[0])
        .then(response => {
          data.species[0] = response.data
        })
        axios.get(data.homeworld)
        .then(response => {
          data.homeworld = response.data
        })

        axios.get(data.homeworld)
        .then(response => {
          data.homeworld = response.data
        })

        console.log(data);
      })
    })
  }
});
