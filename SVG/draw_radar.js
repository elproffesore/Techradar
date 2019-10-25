const draw_radar = () => {
  var keys = Object.keys(circles)
  keys.forEach((r, ri) => {
    var ir = ri == 4 ? 0 : circles[keys[ri + 1]]
    var or = circles[r]
    var arc = d3.arc().innerRadius(ir).outerRadius(or).startAngle(0).endAngle(2 * Math.PI)
    radar_group.append("path")
      .attr("class", "main_circs")
      .attr("id", "main_circle_" + r)
      .attr("d", arc)
      .attr("fill", "rgba(255,255,255,0." + (ri + 2) + ")")
      .attr("stroke", "white")
      .attr("stroke-width", "0.5px")
      .on("click", function() {
        redraw_rings(r)
        change_view("ring_topics_" + r);
      })
  })
}
const redraw_rings = (ring) => {
  svg.selectAll(".ci").attr("fill", "rgba(255,255,255,0.7)")
  svg.selectAll(".main_circs").attr("fill",(d,i) =>{ return "rgba(255,255,255,0."+(i+2)+")"})
  svg.selectAll("#main_circle_" + ring).attr("fill", colors.purple)
}
const clear_rings = () => {
  svg.selectAll(".ci").attr("fill", "rgba(255,255,255,0.7)")
  svg.selectAll(".main_circs").attr("fill",(d,i) =>{ return "rgba(255,255,255,0."+(i+2)+")"})
}
const draw_radargadgets = () => {
  var radar_needle =
  gadget_group.append("line")
    .attr("x1", 0)
    .attr("y1", 0)
    .attr("x2", 0)
    .attr("y2", -400)
    .attr("stroke", "rgb(52,255,20)")
    .attr("stroke-width", "2.5px")
  radar_needle.append("animateTransform")
    .attr("attributeName", "transform")
    .attr("attributeType", "XML")
    .attr("type", "rotate")
    .attr("from", "0 0 0")
    .attr("to", "360 0 0")
    .attr("dur", "17s")
    .attr("repeatCount", "indefinite")

  var radar_ping =
  gadget_group.append("circle")
    .attr("r", 0)
    .attr("cx", 0)
    .attr("cy", 0)
    .attr("stroke", "rgb(57,255,20)")
    .attr("stroke-width", "2px")
    .attr("fill", "none")
  radar_ping.append("animate")
    .attr("attributeName", "r")
    .attr("attributeType", "XML")
    .attr("from", 0)
    .attr("to", 400)
    .attr("dur", "3s")
    .attr("repeatCount", "indefinite")
  radar_ping.append("animate")
    .attr("attributeName", "opacity")
    .attr("attributeType", "XML")
    .attr("from", 1)
    .attr("to", 0)
    .attr("dur", "3s")
    .attr("repeatCount", "indefinite")
}
const create_hulls = (points,cluster) => {
  var group = hull_group.append("g").attr("class","hull_"+cluster+"_group").attr("display","none")
  var group_names = hullnames_group.append("g").attr("class","hullnames_"+cluster+"_group").attr("display","none")
  var clusters = [...new Set(points.map(p => p = p[cluster]))]
  clusters.map((cl,cli) => {
    if(cl != null){
      var array = points.filter(p => p[cluster] == cl)
      var points_processed = [...array.map(p => {return [p.coordinates[cluster].x,p.coordinates[cluster].y]})]
      var hull = array.length > 2 ?d3.polygonHull(points_processed):points_processed
      draw_hulls(hull,cl,cluster,group,group_names)
    }
  })
}
const draw_hulls = (hull,cl,cluster,group,group_names) => {
  var path = d3.line()
      .x(function (d) {
           return d[0];
      })
      .y(function (d) {
           return d[1];
      })
  var cl_wsc = cl.split(" (")[0].replace(/&/g,"u").replace(/ /g,"_")
  var polygonPath = path(hull)
  var polygon = group.append("path")
  .attr("class","hull")
  .attr("id","hull_"+cl_wsc)
  .attr("d",polygonPath)
  .attr("fill",opacity_colors.red+"0.5)")
  .on("mouseover",function(d){d3.select(this).attr("fill",opacity_colors.red+"0.7)").attr("stroke",colors.red).attr("stroke-width","5px")})
  .on("mouseout",function(d){d3.select(this).attr("fill",opacity_colors.red+"0.5").attr("stroke","none")})
  .on("click",function(){show_cluster_info(cl_wsc)})
  draw_hull_names(hull,cl,cluster,group_names)

}
const draw_hull_names = (hull,cl,cluster,group) => {
  var center = new Array();
  if(hull.length > 2){
    center = d3.polygonCentroid(hull)
  }
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
