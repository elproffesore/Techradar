show_point = (point) => {
  change_view("point")
  single_highlight(point.id)
  d3.select("#point > .header > img").attr("src",`Data/Pics/arrow_left.svg`)
  .on("click",() => {
    clusterview == "ring"
    ?show_points(clusterview,point.ring,point.topic)
    :show_points(clusterview,point.category,point.ring)
  })
  d3.select("#point-line")
  .attr("display","block")
  .attr("x1",d3.select("#"+point.id).attr("cx"))
  .attr("y1",d3.select("#"+point.id).attr("cy"))
  .attr("x2",500)
  .attr("y2",(window.innerHeight*0.05)-400)


  d3.select("#point > .header > h1")
  .html(`<img class='pictogram' src='Data/Pics/${point.ring}.svg'> ${point.name}`)
  d3.selectAll("#point > p").filter((d,i) => (i == 0)).html("Ring: "+point.ring)
  d3.selectAll("#point > p").filter((d,i) => (i == 1)).html("Topic: "+(point.topic||"No Topic assigned"))
  d3.selectAll("#point > p").filter((d,i) => (i == 2)).html("Strategic Topic: "+(point.subtopic||"No Strategic Topic assigned"))
  d3.selectAll("#point > p").filter((d,i) => (i == 3)).html("Category: "+point.category)
  d3.select("#point > article").html(point.description || "No description available")

}
