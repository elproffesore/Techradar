const draw_radar = () => {
  var keys = Object.keys(circles)
  keys.forEach((r, ri) => {
    var ir = ri === 4 ? 0 : circles[keys[ri + 1]]
    var or = circles[r]
    var arc = d3.arc().innerRadius(ir).outerRadius(or).startAngle(0).endAngle(2 * Math.PI)
    radar_group.append("path")
      .attr("class", "main_circs")
      .attr("id", "main_circle_" + r)
      .attr("d", arc)
      .attr("fill", "rgba(255,255,255,0." + (ri + 2) + ")")
      .on("click", function() {
        redraw_rings(r)
        change_view("ring_topics_" + r);
      })
  })
  draw_radargadgets()
  draw_points()
}
const redraw_rings = (ring) => {
  svg.selectAll(".ci").attr("fill", "rgba(255,255,255,0.7)")
  svg.selectAll(".main_circs").attr("fill",(d,i) =>{ return "rgba(255,255,255,0."+(i+2)+")"})
  svg.selectAll("#main_circle_" + ring).attr("fill", opacity_colors.purple+"0.5)")
}
const clear_rings = () => {
  svg.selectAll(".ci").attr("fill", "rgba(255,255,255,0.7)")
  svg.selectAll(".main_circs").attr("fill",(d,i) =>{ return "rgba(255,255,255,0."+(i+2)+")"})
}
const draw_radargadgets = () => {
  for(var i = 0; i < 3;i+=2){
  var radar_ping = gadget_group.append("circle")
    .attr("r", 0)
    .attr("cx", 0)
    .attr("cy", 0)
    .attr("stroke", "rgba(57,255,20,0.8)")
    .attr("stroke-width", "1.5px")
    .attr("fill", "none")
  radar_ping.append("animate")
    .attr("attributeName", "r")
    .attr("attributeType", "XML")
    .attr("from", 0)
    .attr("to", 400)
    .attr("dur", "4s")
    .attr("begin",(i)+"s")
    .attr("repeatCount", "indefinite")
  radar_ping.append("animate")
    .attr("attributeName", "opacity")
    .attr("attributeType", "XML")
    .attr("from", 1)
    .attr("to", 0)
    .attr("dur", "4s")
    .attr("begin",(i)+"s")
    .attr("repeatCount", "indefinite")
  }
}
