function draw_points() {
  var circles_group = svg.append("g").attr("class", "circles_group").attr("transform","translate("+offsets[0]+","+offsets[1]+")")
  //Iterate over every Ring Array then create a circle svg ovject for every point object with their specific start points
    circles_group.selectAll(".new")
      .data(points)
      .enter()
      .append("circle")
      .attr("class", function(d) {
        var string = null
        d.topic != null
        ? string = d.topic.replace(/"/g, '').replace(/ /g, '_').replace(/&/g, "u"):null
        var category = d.category.split(" (")[0].replace(/ /g,'_').replace(/&/g, "u")
        return "ci id" + d.id + " " + string+" "+d.ring+" "+category
      })
      .attr("r", 5)
      .attr("cx", function(d){
        return d.coordinates.start.x
      })
      .attr("cy", function(d){
        return d.coordinates.start.y
      })
      .attr("fill", "rgba(255,255,255,0.7)")
      .attr("stroke", "black")
      .attr("stroke-width", "1px")
      .on("mouseover",function(d){
        d3.select(this).attr("r",10)
      })
      .on("mouseout",function(d){
        d3.select(this).attr("r",5)
      })
      .on("click",function(d){
        d3.select(this).attr("fill",colors.red)
      })
}
