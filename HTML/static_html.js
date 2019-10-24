const static_html = () => {
  //Append start HTML
  var anchor = null;
  anchor = d3.select(".ringe")
  Object.keys(circles).forEach((r,ri) => {
    var array = points.filter(p => p.ring == r)
    var ring_anchor =anchor.append("div").attr("class","start_"+r)
    ring_anchor.append("p")
    .attr("class","aheader hover")
    .attr("id","start_"+r+"_header")
    .html("<img class='picto' src='Data/Pics/"+r+".svg'> "+r)
    array.slice(0,5).map((p,pi) => {
      ring_anchor.append("p")
      .attr("id","start_"+r+"_"+pi)
      .attr("class","hover")
      .html(p.name)
    })
  })
  //Rings and their Topics
  anchor = d3.select(".ring_topics")
  Object.keys(circles).forEach((r,ri) => {
    var topics = [...new Set((points.filter(p => p.ring == r)).map(p => p = p.topic))]
    var length = points.filter(p => p.ring == r).length
    var ring_anchor = anchor.append("div")
    .attr("class","ring_topics_"+r)
    ring_anchor.append("p")
    .attr("class","aheader")
    .attr("id","ring_topics_header")
    .html("<img class='picto' src='Data/Pics/"+r+".svg'> "+r+" / "+length+" Items")
    topics.map((t,ti) => {
      if(t != null){
        var length = points.filter(p => p.ring == r && p.topic == t)
        ring_anchor.append("p")
        .attr("class","hover")
        .html(t +" / "+length+" Items")
      }
    })
  })
  // Rings and for each topic the specific points
  anchor = d3.select(".ring_topic_points")
  Object.keys(circles).forEach((r,ri) => {
    var topics = [...new Set(points.filter(p => p.ring == r).map(p => p = p.topic))]
    var ring_anchor = anchor.append("div")
    .attr("class","ring_topic_points_"+r)
    topics.map((t,ti) => {
      if(t == null){t = "No Topic"}
      var topic_wsc = t.replace(/&/g,"u").replace(/ /g,"_")//withour special Characters e.g " ","&"
      var length = points.filter(p => p.ring == r && p.topic == t).length
      var array = points.filter(p => p.ring == r && p.topic == t)
      var ring_topic_anchor = ring_anchor.append("div")
      .attr("class","ring_tpic_points_"+r+"_"+topic_wsc)
      ring_topic_anchor.append("p")
      .attr("class","aheader")
      .attr("id","ring_topics_points_"+r+"_"+topic_wsc+"_header")
      .html("<img class='picto' src='Data/Pics/"+r+".svg'> "+r+" / "+t+" / "+length+" Items")
      array.map((p,pi) => {
        ring_topic_anchor.append("p")
        .attr("class","hover")
        .attr("id","ring_topics_points_"+r+"_"+topic_wsc+"_"+pi)
        .html(p.name)
      })
    })
  })
  anchor = d3.select(".search")
  anchor = d3.select(".search_topics")
  anchor = d3.select(".search_topic_points")
  anchor = d3.select(".point")
}
