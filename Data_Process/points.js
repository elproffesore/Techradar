d3.json('Data/radar_data.json')
.then((data) => {
  data = data.issues;
  return data;
})
.then((data) => {
  clear_data(data)
  return data
})
.then((data) => {
  create_coordinate(points)
  create_clustering(points,"topic")
  create_clustering(points,"category")
})
.then(() => {
  draw_radar()
  draw_points()
  draw_radargadgets()
  static_html()
})
.then(() => {
  d3.selectAll("svg > g")
  .attr("transform","translate("+offsets[0]+","+offsets[1]+")")
})
const clear_data = (data) => {
  data.map((datapoint,dpi) => {
    Object.keys(datapoint.fields).forEach((key) => {
      if(datapoint.fields[key] != null && datapoint.fields[key].value  ){
        datapoint.fields[key] = datapoint.fields[key].value
      }
    })
    var point = {
      "id":dpi,
      "name":datapoint.fields.summary,
      "ring":datapoint.fields.status.name,
      "topic":datapoint.fields.customfield_13502,
      "subtopic":datapoint.fields.customfield_13503,
      "category":datapoint.fields.customfield_13501,
      "description":datapoint.fields.customfield_13513,
      "coordinates":{
        "start":{
          "x":0,
          "y":0
        },
        "category":{
          "x":0,
          "y":0
        },
        "topic":{
          "x":0,
          "y":0
        }
      }
    }
    points.push(point)
  })
}
const create_coordinate = (points) => {
    Object.keys(circles).forEach((r,ri) => {
      var array = points.filter(p => p.ring == r)
      var radiant_ring = r =="Work"?(2*Math.PI)/Math.ceil(array.length/4):(2*Math.PI)/array.length
      var distance = circles[r]-30
      array.map((p,pi) => {
        if(r == "Work" && pi % Math.ceil(array.length/4) == 0){
          distance = circles[r] - ((pi/Math.ceil(array.length/4))*30)-20
        }
        var x = Math.round((distance*Math.cos(pi*radiant_ring))*100)/100
        var y = Math.round((distance*Math.sin(pi*radiant_ring))*100)/100
        p.coordinates.start.x = x
        p.coordinates.start.y = y
      })
    })
}
const create_clustering = (points,cluster) => {
  //get densitys
  var densitys_cluster = calculate_density(points,cluster)
  //calc the clusters coordinates
  const private_calc_cluster = (points,densitys) => {
    //Creating the weighted radiants for each cluster element
      var radiants = {}
      var off = 0
      Object.keys(densitys.clusters).forEach(key => {
        var part = Math.round((densitys.clusters[key]/densitys.max)*100)/100
        var puffer = part* 0.15
        var puffered_part = part - puffer
        var cluster_part = {
          part:puffered_part,
          offset:off+(puffer/2)
        }
        off += part
        radiants[key] = cluster_part
      })
      //create the Coordinates for each Cluster Element
      Object.keys(circles).forEach((r,ri) => {
        //standard distance
        distance = circles[r] - 20
        Object.keys(densitys.clusters).forEach((cl,cli) => {
          var array = points.filter(p => (p.ring == r && p[cluster] == cl))
          var cluster_item = 0;
          var cluster_length = array.length
          var cluster_item_part = 0;
          r == "Work" || r == "Reduce"
          //Math.round(circles[r]/50) => 2 for Reduce 4 for Work => dividing in more rings
          ? cluster_item_part = radiants[cl].part/Math.ceil(cluster_length/Math.round(circles[r]/50))
          : cluster_item_part = radiants[cl].part/cluster_length
          array.map((p,pi) => {

            if(r == "Work" && pi%Math.ceil(cluster_length/4) == 0){
              cluster_item = 0
              distance = circles[r] - ((pi/Math.ceil(cluster_length/4))*30)-20
            }
            if(r == "Reduce" && pi%Math.ceil(cluster_length/2) == 0){
              cluster_item = 0
              distance = circles[r] - ((pi/Math.ceil(cluster_length/2))*20)-20
            }

            var rad = (2*Math.PI)*(radiants[cl].offset + (cluster_item*cluster_item_part))
            var x = Math.round(distance*(Math.cos(rad))*100)/100
            var y = Math.round(distance*(Math.sin(rad))*100)/100

            p.coordinates[cluster].x = x;
            p.coordinates[cluster].y = y;

            cluster_item++;
          })
        })
      })
  }
  private_calc_cluster(points,densitys_cluster)
}
