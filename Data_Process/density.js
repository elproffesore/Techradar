//Creates a density based on the highest density per cluster element in a ring
const calculate_density = (points,cluster) => {
  var maxDensity = 0
  var density = 0;
  var length = 0;
  var densitysCluster = {
    clusters:{},
    max:0,
  };
  Object.keys(circles).forEach((r,ri) => {
    var ringDensity = 0
    var array = points.filter(p => p.ring == r)
    var cluster_all = array.map(p => p[cluster])
    var cluster_unique = [...new Set(cluster_all)]
    cluster_unique.map((c,ci) => {
       //Ignore the null cluster Elements and the Reduce Elements(to much power)
       if(c != null && r != "Reduce"){
        if(r == "Work"){
          length = points.filter(p => p[cluster] == c && p.ring == r).length/4
          density = Math.ceil(length *(circles["Observe"]/130))//130 because its the smallest Work ring
        }else{
          length = points.filter(p => p[cluster] == c && p.ring == r).length
          density = Math.ceil(length *(circles["Observe"]/(circles[r]-30)))
        }
        if(densitysCluster.clusters[c]){
          if(density > densitysCluster.clusters[c]){
            densitysCluster.clusters[c] = density
          }
        }else{
          densitysCluster.clusters[c] = density
        }
        ringDensity += density
       }
    })
  })
  Object.keys(densitysCluster.clusters).forEach(key => maxDensity += densitysCluster.clusters[key])
  densitysCluster.max = maxDensity
  return densitysCluster
}
