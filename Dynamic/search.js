function search(searchword){
  //Weights for the search
  var options = {
    includeScore: true,
    threshold: 0.1,
    keys: [{
        name: 'ring',
        weight: 0.4
      },
      {
        name: 'topic',
        weight: 0.8
      },
      {
        name: 'description',
        weight: 0.3
      },
      {
        name: 'name',
        weight: 1
      }
    ]
  }
  var f = new Fuse(points,options)
  var results_array = f.search(searchword)
  results_array = results_array.map(er =>{return er = er.item})
  show_searches(results_array,searchword)
}
