const draw_radar = () => {

  var radar_group = svg.append("g").attr("class","radar_group").attr("transform","translate("+offsets[0]+","+offsets[1]+")")
  console.log(Object.keys(circles))
  var keys = Object.keys(circles)
  keys.forEach((r,ri) => {
      var ir = ri == 4 ? 0 : circles[keys[ri+1]]
      var or = circles[r]
      console.log(or,ir)
      var arc = d3.arc().innerRadius(ir).outerRadius(or).startAngle(0).endAngle(2 * Math.PI)
      radar_group.append("path")
        .attr("class", "main_circs")
        .attr("id", "main_circle_" + r)
        .attr("d", arc)
        .attr("fill", "rgba(255,255,255,0." + (ri + 2) + ")")
        .attr("stroke", "white")
        .attr("stroke-width", "0.5px")
        .on("click", function() {
          redraw_rings();
          svg.selectAll(".ci").attr("fill","rgba(255,255,255,0.7)")
          svg.selectAll("#main_circle_" + r).attr("fill", "rgba(92,72,151,0.7)")
          change_view("ring_topics_"+r);
        })
  })
}
