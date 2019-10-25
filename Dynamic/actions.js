const change_view = (newview,ring) => {
  ring?redraw_rings(ring):null
  d3.select("."+oldview).attr("style","display:none")
  d3.select("."+newview).attr("style","display:grid")
  if(oldview.includes("search") && !newview.includes("search")){
    d3.selectAll(".ci").attr("fill",colors.gray)
  }
  oldview  = newview;
}
const show_searches = (search_array,searchword) => {
  d3.selectAll(".ci").attr("fill",colors.gray)
  clear_rings()
  if(searchword == ""){
    change_view("ringe")
  }else{
    search_array.map(p => {d3.select(".id"+p.id).attr("fill", colors.red).attr("r", points_radius*2).transition().duration(500).attr("r", points_radius)})
    d3.selectAll(".search > div > p").html("")
    d3.select("#search_header").html('"'+searchword+'" / '+search_array.length+" Items found")
    Object.keys(circles).forEach((r,ri) => {
      var array = search_array.filter(p => p.ring == r)
      var length = array.length
      d3.select("#search_"+r+"_header")
      .html("<img class='picto' src='Data/Pics/"+r+".svg'> "+r+"/"+length+" Items")
      .on("mouseover", () => {
        array.map(p => {
          d3.selectAll(".id" + p.id).attr("fill", colors.red).attr("r", points_radius*2)
        })
      })
      .on("mouseout",()=>{
          d3.selectAll(".ci").attr("r", points_radius)
      })
      .on("click", () => {
        change_view("search_topics_"+r)
      })
      array.slice(0,5).map((p,pi) => {
        d3.select("#search_"+r+"_"+pi)
        .html(p.name)
        .on("mouseover", () => {
          d3.select(".id" + p.id).attr("fill", colors.red).attr("r", points_radius*2)
        })
        .on("mouseout",()=>{
          d3.select(".id"+p.id).attr("r", points_radius)
        })
        .on("click", () => {
          change_view("point_view")
        })
      })
    })
    change_view("search")
  }
}
const change_cluster = (cluster) => {
  d3.selectAll(".ci").attr("display","block")
  d3.selectAll(".hull_group > g").attr("display","none")
  d3.selectAll(".hullnames_group > g").attr("display","none")
  switch (cluster) {
    case "normal":
      d3.selectAll(".ci")
      .transition()
      .duration(500)
      .attr("cx",function(d){
        return d.coordinates.normal.x
      })
      .attr("cy",function(d){
        return d.coordinates.normal.y
      })
      break;
    case "category":
      d3.select(".hull_category_group").transition().delay(500).attr("display","block")
      d3.select(".hullnames_category_group").transition().delay(500).attr("display","block")
      d3.selectAll(".ci")
      .transition()
      .duration(500)
      .attr("cx",function(d){
        return d.coordinates.category.x
      })
      .attr("cy",function(d){
        return d.coordinates.category.y
      })
      break;
    case "topic":
      d3.selectAll(".null").attr("display","none")
      d3.select(".hullnames_topic_group").transition().delay(500).attr("display","block")
      d3.select(".hull_topic_group").transition().delay(500).attr("display","block")
      d3.selectAll(".ci")
      .transition()
      .duration(500)
      .attr("cx",function(d){
        return d.coordinates.topic.x
      })
      .attr("cy",function(d){
        return d.coordinates.topic.y
      })
      break;
  }
}
const show_point = (point,point_ref) => {
  d3.selectAll(".ci").attr("fill",colors.gray)
  d3.select(point_ref).attr("fill",colors.red)
  d3.select("#point_view_header")
  .attr("style","grid-column:1 /span 2")
  .html("<img class='picto' src='Data/Pics/"+point.ring+".svg'> "+point.name)
  d3.select("#point_0").html("Ring: "+point.ring)
  d3.select("#point_1").html("Topic: "+point.topic)
  d3.select("#point_2").html("Subtopic: "+point.subtopic)
  d3.select("#point_3").html("Category: "+point.category)
  d3.select("#point_4").html(point.description)
  change_view("point_view")
}
