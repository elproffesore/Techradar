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
        return "ci "+string+" "+d.ring+" "+category
      })
      .attr("id",(d) => {return d.id})
      .attr("r", points_radius)
      .attr("cx", function(d){
        return d.coordinates.category.x
      })
      .attr("cy", function(d){
        return d.coordinates.category.y
      })
      .attr("fill", colors.gray)
      .on("mouseover",function(d){
        d3.select(this).attr("r",points_radius*2)

        d3.select("#tooltip")
        .style("display","block")
        .style("left",(event.clientX)+"px")
        .style("top",(event.clientY-75)+"px")
        d3.select("#tooltip > p")
        .html(d.name)

      })
      .on("mouseout",function(d){
        d3.select(this).attr("r",points_radius)

        d3.select("#tooltip")
        .style("display","none")
      })
      .on("click",function(d){
        show_point(d,this)
      })
}
