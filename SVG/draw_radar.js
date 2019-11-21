const draw_radar = () => {
  var keys = Object.keys(circles)
  keys.forEach((r, ri) => {
    var ir = ri === 4 ? 0 : circles[keys[ri + 1]]
    var or = circles[r]
    var arc = d3.arc().innerRadius(ir).outerRadius(or).startAngle(0).endAngle(2 * Math.PI)
    var ring = radar_group.append("path")
      .attr("class", "main_circs")
      .attr("id", "main_circle_" + r)
      .attr("d", arc)
      .attr("fill", "rgba(92,72,151,0.25)")
      .attr("stroke","rgba(231,69,79,0.5)")
      .attr("stroke-width","2px")
      .on("click", function() {
        clusterview = 'ring'
        clear_rings()
        redraw_rings(r)
        show_filter("ring",r);
        d3.select("#nav-view").property("value","ring")
      })
    var text = text_group.append('text')
        .attr('x',0)
        .attr('y',-(or-(or-ir)/2))
        .attr('fill',"rgba(255,255,255,1)")
        .attr('font-family',"Roboto")
        .attr('font-weight',700)
        .attr('font-size',"2.5vh")
        .attr('text-anchor',"middle")
        .attr("dominant-baseline","middle")
        .text(r)
        text.append("animate")
          .attr("id","text-animation")
          .attr("attributeName", "opacity")
          .attr("attributeType", "XML")
          .attr("values","0.5;1;0.5")
          .attr("dur","8s")
          .attr("repeatCount", "indefinite")

  })
  draw_radargadgets()
}
const redraw_rings = (ring) => {
  svg.selectAll(`#main_circle_${ring}`).attr("fill","rgba(92,72,151,0.5")
}
const clear_rings = () => {
  svg.selectAll(".ci").attr("fill", "rgba(255,255,255,0.7)")
  svg.selectAll(".main_circs").attr("fill","rgba(92,72,151,0.25")
}
const draw_radargadgets = () => {
  for(var i = 0; i < 3;i+=2){
  var radar_ping = gadget_group.append("circle")
    .attr("r", 0)
    .attr("cx", 0)
    .attr("cy", 0)
    .attr("stroke", "rgba(57,255,20,0.8)")
    .attr("stroke-width", "1.5px")
    .attr('pointer-event','none')
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
  gadget_group.append("line")
  .attr("stroke","rgba(245,245,245,0.8)")
  .attr("stroke-width","1.5px")
  .attr("id","point-line")
  .attr("display","none")

}
