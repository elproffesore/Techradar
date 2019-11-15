const draw_points = () => {
  d3.select(".circles_group")
  .selectAll("circle")
  .data(points)
  .enter()
  .append("circle")
  .attr("class",(d,i) => {
    var class_string = "circles "
    class_string += d.ring+" "
    class_string += d.category.split(" (")[0].replace(/ /g,"_").replace(/&/,"u")+" "
    class_string += d.topic != null?d.topic.replace(/ /g,"_").replace(/&/g,"u"):null
    return class_string
  })
  .attr("id",(d) => {return d.id})
  .attr("cx",(d) => {return d.coordinates.category.x})
  .attr("cy",(d) => {return d.coordinates.category.y})
  .attr("fill","rgba(245,245,245,0.9)")
  .attr("r",points_radius)
  .on("mouseover",function(d,i){
    d3.select(this).attr("r",points_radius*2)
    d3.select("#tooltip").style("display","block")
    .style("left",(event.clientX)+"px")
    .style("top",(event.clientY-75)+"px")
    d3.select("#tooltip > p").html(d.name)
  })
  .on("mouseout",function(d,i){
    d3.select(this).attr("r",points_radius)
    d3.select("#tooltip").style("display","none")
  })
  .on("click",(d) => {
    show_point(d)
    d3.select("#tooltip").style("display","none")
  })
}
