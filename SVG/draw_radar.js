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
