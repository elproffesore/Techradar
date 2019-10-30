const create_hulls = (points,cluster) => {
  var group = hull_group.append("g").attr("class","hull_"+cluster+"_group").attr("display","none")
  var group_names = hullnames_group.append("g").attr("class","hullnames_"+cluster+"_group").attr("display","none")
  var clusters = [...new Set(points.map(p => p = p[cluster]))]
  clusters.map((cl,cli) => {
    if(cl != null){
      var array = points.filter(p => p[cluster] == cl)
      var points_processed = [...array.map(p => {return [p.coordinates[cluster].x,p.coordinates[cluster].y]})]
      var hull = array.length > 2 ?d3.polygonHull(points_processed):points_processed
      draw_hulls(hull,cl,cluster,group,group_names,cli)
    }
  })
}
const draw_hulls = (hull,cl,cluster,group,group_names,index) => {
  var path = d3.line()
      .x(function (d) {
           return d[0];
      })
      .y(function (d) {
           return d[1];
      })
  var cl_wsc = cl.split(" (")[0].replace(/&/g,"u").replace(/ /g,"_")
  var polygonPathOpen = path(hull)
  var polygonPath = polygonPathOpen+"L"+polygonPathOpen.split("M")[1].split("L")[0]
  var polygon = group.append("path")
  .attr("class","hull")
  .attr("id","hull_"+cl_wsc)
  .attr("d",polygonPath)
  .attr("fill",cluster_colors[index])
  .attr("opacity",0.7)
  .on("mouseover",function(d){d3.select(this).attr("opacity",1).attr("stroke","rgba(0,0,0,0.5)").attr("stroke-width","5px")})
  .on("mouseout",function(d){d3.select(this).attr("opacity",0.7).attr("stroke","none")})
  .on("click",function(){show_cluster_view(cl,cluster)})
  draw_hull_names(hull,cl,cluster,group_names)

}
const draw_hull_names = (hull,cl,cluster,group) => {
  var center = new Array();
  if(hull.length > 2){
    center = d3.polygonCentroid(hull)
    group.append("text")
    .attr("class","hull_name")
    .attr("x",center[0])
    .attr("y",center[1])
    .attr("text-anchor","middle")
    .attr("font-family","Roboto")
    .attr("font-weight",700)
    .attr("font-size","3vh")
    .attr("cursor","normal")
    .text(cl)
    .attr("fill","white")
  }
}
