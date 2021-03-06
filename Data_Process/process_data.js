//Anonymous Data Funciton which fetches the data and starts the processing and the app in general
(async () => {
  var data = await d3.json('../Data/data.json').then((data) => {
    data = data.issues;
    return data;
  });
  clear_data(data) // coordinates will be made after the data cleaning
      .then(() => {
        create_coordinate(points);
        create_clustering(points, "topic");
        create_clustering(points, "category");
        draw_points();
        oldview = "start"
      })
      .then(() => {
        d3.select('#start').append('button')
            .html('Start')
            .on('click',() => {
                start();
                window.scrollTo(0,0)
            })
      })
})();
// This function creates a datapoint for each technologie in the json
const clear_data = (data) => {
  return Promise.all(data.map((datapoint,dpi) => {
    Object.keys(datapoint.fields).forEach((key) => {
      if (datapoint.fields[key] != null && datapoint.fields[key].value) {
        datapoint.fields[key] = datapoint.fields[key].value
      }
    });
    var point = {
      "id": "id" + dpi,
      "name": datapoint.fields.summary,
      "ring": datapoint.fields.status.name,
      "topic": datapoint.fields.customfield_13502,
      "subtopic": datapoint.fields.customfield_13503,
      "category": datapoint.fields.customfield_13501,
      "whatwedo": datapoint.fields.customfield_13513,
      "description": datapoint.fields.description,
      "coordinates": {
        "nocluster": {
          "x": 0,
          "y": 0
        },
        "category": {
          "x": 0,
          "y": 0
        },
        "topic": {
          "x": 0,
          "y": 0
        }
      }
    };
    if(datapoint.fields.customfield_13631 != "false" || datapoint.fields.customfield_13631 == null){
        points.push(point)
    }
  })
  );
};
//This function creates the normal coordinates which are simply calculated by 2*PI/ number of points in this ring
const create_coordinate = (points) => {
  Object.keys(circles).forEach((r, ri) => {
    var array = points.filter(p => p.ring == r);
    var radiant_ring = r == "Work" ? (2 * Math.PI) / Math.ceil(array.length / 4) : (2 * Math.PI) / array.length;
    var distance = circles[r] - 30;
    array.map((p, pi) => {
      if (r == "Work" && pi % Math.ceil(array.length / 4) == 0) {
        distance = circles[r] - ((pi / Math.ceil(array.length / 4)) * 30) - 20
      }
      var x = Math.round((distance * Math.cos(pi * radiant_ring)) * 100) / 100;
      var y = Math.round((distance * Math.sin(pi * radiant_ring)) * 100) / 100;
      p.coordinates.nocluster.x = x;
      p.coordinates.nocluster.y = y
    })
  })
};
//This function calculates the coordinates for the specifiv cluster views such as category and topic.
//The cluster get averaged before by the density function to get represential area.
const create_clustering = (points, cluster) => {
  //get densitys
  var densitys_cluster = calculate_density(points, cluster);
  //calculate the clusters coordinates
  const calc_cluster = (points, densitys) => {
    //creating the weighted radiants for each cluster element
    var radiants = {};
    var off = 0;
    Object.keys(densitys_cluster.clusters).forEach(key => {
      var part = Math.round((densitys_cluster.clusters[key] / densitys.max) * 100) / 100;
      var puffer = part * 0.1;
      var puffered_part = part - puffer;
      var cluster_part = {
        part: puffered_part,
        offset: off + (puffer / 2)
      };
      off += part;
      radiants[key] = cluster_part
    });
      //create the coordinates for each Cluster element
      Object.keys(circles).forEach((r,ri) => {
        //standard distance
        distance = circles[r] - 30;
        Object.keys(densitys_cluster.clusters).forEach((cl, cli) => {
          var array = points.filter(p => (p.ring == r && p[cluster] == cl));
          var cluster_item = 0;
          var cluster_length = array.length;
          var cluster_item_part = 0;
          //Special rules for the Work and Reduce -ring -> splited into 4 and 2 rings
          r == "Work" || r == "Reduce"
              //Math.round(circles[r]/50) => 2 for Reduce 4 for Work => dividing in more rings
              ? cluster_item_part = radiants[cl].part / Math.ceil(cluster_length / Math.round(circles[r] / 50))
              : cluster_item_part = radiants[cl].part / cluster_length;
          array.map((p, pi) => {

            if (r == "Work" && pi % Math.ceil(cluster_length / 4) == 0) {
              cluster_item = 0;
              distance = circles[r] - ((pi / Math.ceil(cluster_length / 4)) * 30) - 20
            }
            if (r == "Reduce" && pi % Math.ceil(cluster_length / 2) == 0) {
              cluster_item = 0;
              distance = circles[r] - ((pi / Math.ceil(cluster_length / 2)) * 20) - 20
            }

            var rad = (2 * Math.PI) * (radiants[cl].offset + (cluster_item * cluster_item_part));
            var x = Math.round(distance * (Math.cos(rad)) * 100) / 100;
            var y = Math.round(distance * (Math.sin(rad)) * 100) / 100;

            p.coordinates[cluster].x = x;
            p.coordinates[cluster].y = y;

            cluster_item++;
          })
        })
      })
  };
  //in cluster.js
  calc_cluster(points, densitys_cluster);
  create_hulls(points, cluster)
};
