//Creates a density based on the highest density per cluster element in a ring
const calculate_density = (points,cluster) => {
  let maxDensity = 0;
  let density = 0;
  let length = 0;
  let densitysCluster = {
    clusters:{},
    max:0,
  };
  Object.keys(circles).forEach((r,ri) => {
    var ringDensity = 0
    var array = points.filter(p => p.ring == r)
    var cluster_all = array.map(p => p[cluster])
    var cluster_unique = [...new Set(cluster_all)]
    cluster_unique.map((c,ci) => {
       //Ignore the null cluster elements and the Reduce-Ring elements(to much power)
       if(c != null && r != "Reduce"){
        if(r == "Work"){
          length = points.filter(p => p[cluster] == c && p.ring == r).length/4
          //130 because its the smallest Work-ring
          density = Math.ceil(length *(circles["Observe"]/130))
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
  //return the calculated max density for each Cluster 
  Object.keys(densitysCluster.clusters).forEach(key => maxDensity += densitysCluster.clusters[key])
  densitysCluster.max = maxDensity
  return densitysCluster
}
