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
  var ring_array = []
  var f = new Fuse(store.points,options)
  var results_array = f.search(searchword)
  results_array = results_array.map(er =>{return er = er.item})
  results_array.map(er => {
    if(ring_array[er.ring]){
      ring_array[er.ring].push(er)
    }else{
      ring_array[er.ring] = new Array()
      ring_array[er.ring].push(er)
    }
  })
  //show_searches(searches_array,results_array,0)//in Actions/actions_text
  show_searches(ring_array,results_array,searchword)
}
