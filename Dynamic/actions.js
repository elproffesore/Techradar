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
        show_search_topics(r,search_array,searchword)
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
          show_point(p)
        })
      })
      if(length > 5) {
        d3.select("#search_"+r+"_seeall")
        .html("... and "+(length-5)+" more Items")
        .on("click",() => {show_search_topics(r,search_array,searchword)})
      }
    })
    change_view("search")
  }
}
const show_search_topics = (ring,array,searchword) => {
  d3.selectAll(".search_topics > p").html("")
  d3.selectAll(".ci").attr("fill",colors.gray)
  var ring_array = array.filter(p => p.ring == ring)
  d3.select("#search_topics_header")
  .html("<img class='picto' src='Data/Pics/"+ring+".svg'> "+'"'+searchword+'"'+" / "+ring+" / "+ring_array.length+" Items")
  .on("click",()=>{show_searches(array,searchword)})
  var topics = [...new Set(ring_array.map(p => p = p.topic))]
  ring_array.map(p => {d3.select(".id"+p.id).attr("fill",colors.red)})
  topics.sort().map((t,ti) => {
    var topic = t || "No Topic"
    var topic_array = ring_array.filter(p => p.topic == t)
    var length = topic_array.length
    d3.select("#search_topics_"+ti)
    .html("<span class='cheader'>" + topic + "</span><br> " + length + " Items")
    .on("mouseover", () => {
      topic_array.map(p=> {
              d3.select(".id" + p.id).attr("fill", colors.red).attr("r", points_radius*2)
      })
    })
    .on("mouseout",()=>{
      d3.selectAll(".ci").attr("r", points_radius)
    })
    .on("click", () => {
      show_search_topic_points(t,ring,ring_array,searchword)
    })
  })
  change_view("search_topics")
}
const show_search_topic_points = (topic,ring,ring_array,searchword) => {
d3.selectAll(".search_topic_points > div > p").html("")
d3.selectAll(".ci").attr("fill",colors.gray)
var ring_topic_array = ring_array.filter(p => p.topic == topic)
var ring_topic = topic || "No Topic"
d3.select("#search_topic_points_header")
.html("<img class='picto' src='Data/Pics/"+ring+".svg'> "+'"'+searchword+'"'+" / "+ring+" / "+ring_topic+" / "+ring_topic_array.length+" Items")
.on("click",()=>{show_search_topics(ring,ring_array,searchword)})
ring_topic_array.map((p,pi) => {
  d3.select("#search_topic_points_"+pi).html(p.name)
  .on("mouseover", () => {
    d3.select(".id" + p.id).attr("fill", colors.red).attr("r", points_radius*2)
  })
  .on("mouseout",()=>{
    d3.select(".id"+p.id).attr("r", points_radius)
  })
  .on("click", () => {
    show_point(p)
  })

})
change_view("search_topic_points")
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
const show_point = (point) => {
  clear_rings()
  d3.select(".id"+point.id).attr("fill",colors.red)
  d3.select("#point_view_header")
  .attr("style","grid-column:1 /span 2")
  .html("<img class='picto' src='Data/Pics/"+point.ring+".svg'> "+point.name)
  var topic = point.topic || "No Topic"
  var topic_wsc = point.topic == null ? null : point.topic.replace(/ /g,"_").replace(/&/g,"u")
  d3.select("#point_0").html("Ring: "+point.ring).on("click",() => {change_view("ring_topics_"+point.ring)})
  d3.select("#point_1").html("Topic: "+topic).on("click",() => {change_view("ring_topic_points_"+point.ring+"_"+topic_wsc)})
  d3.select("#point_2").html("Subtopic: "+point.subtopic)
  d3.select("#point_3").html("Category: "+point.category)
  d3.select("#point_4").html(point.description)
  change_view("point_view")
}
const show_cluster_info = (single_cluster) => {
  
}
