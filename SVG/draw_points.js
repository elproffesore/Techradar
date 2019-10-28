function draw_points() {
  //Iterate over every Ring Array then create a circle svg ovject for every point object with their specific start points
    circles_group.selectAll(".new")
      .data(points)
      .enter()
      .append("circle")
      .attr("class", function(d) {
        var string = d.topic != null
        ? string = d.topic.replace(/"/g, '').replace(/ /g, '_').replace(/&/g, "u")
        :null
        var category = d.category.split(" (")[0].replace(/ /g,'_').replace(/&/g, "u")
        return "ci id" + d.id + " " + string+" "+d.ring+" "+category
      })
      .attr("r", points_radius)
      .attr("cx", function(d){
        return d.coordinates.normal.x
      })
      .attr("cy", function(d){
        return d.coordinates.normal.y
      })
      .attr("fill", "rgba(255,255,255,0.7)")
      .attr("stroke", "black")
      .attr("stroke-width", "1px")
      .on("mouseover",function(d){d3.select(this).attr("r",points_radius*2)})
      .on("mouseout",function(d){d3.select(this).attr("r",points_radius)})
      .on("click",function(d){
        show_point(d,this)
      })
}
