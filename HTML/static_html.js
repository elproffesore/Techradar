const static_html = () => {
  var anchor = null;
  //Append start HTML
  anchor = d3.select(".ringe")
  Object.keys(circles).forEach((r,ri) => {
    var array = points.filter(p => p.ring == r)
    var ring_anchor =anchor.append("div").attr("class","start_"+r)
    ring_anchor.append("p")
    .attr("class","bheader hover")
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
      var ring_topic_points_anchor = ring_topic_anchor.append("div")
      array.map((p,pi) => {
        if(pi%5 == 0 && pi!=0){
          ring_topic_points_anchor = ring_topic_anchor.append("div")
        }
        ring_topic_points_anchor.append("p")
        .attr("class","hover")
        .attr("id","ring_topics_points_"+r+"_"+topic_wsc+"_"+pi)
        .html(p.name)
      })
    })
  })
  //Search View
  anchor = d3.select(".search")
  anchor.append("p")
  .attr("class","aheader")
  .attr("id","search_header")
  Object.keys(circles).forEach((r,ri) => {
    var ring_anchor = anchor.append("div")
    .attr("class","search_"+r)
    for (let i = 0; i <5 ; i++){
      ring_anchor.append("p").attr("class","hover").attr("id","search_"+r+"_"+i)
    }
  })
  //Search Topics View
  var max_topic = 0
  Object.keys(circles).forEach((r,ri) => {
    var ring_topic_length =
    [...new Set(points.filter(p => p.ring == r).filter(p => p.topic != null).map(p => p = p.topic))].length
    ring_topic_length > max_topic? max_topic = ring_topic_length:null
  })
  anchor = d3.select(".search_topics")
  anchor.append("p")
  .attr("class","aheader")
  .attr("id","seach_topics_header")
  for(let i = 0; i< max_topic ; i++){
    anchor.append("p").attr("class","hover").attr("id","search_topics_"+i)
  }
  //Search Topic Points View
  var max_points = 0
  Object.keys(circles).forEach((r,ri) => {
    var ring_topics =
    [...new Set(points.filter(p => p.ring == r).map(p => p = p.topic))]
    ring_topics.map((t,ti) => {
      var points_length = points.filter(p => p.ring == r && p.topic == t).length
      points_length > max_points? max_points = points_length:null
    })
  })
  anchor = d3.select(".search_topic_points")
  anchor.append("p")
  .attr("class","aheader")
  .attr("id","seach_topic_points_header")
  var anchor_stp = anchor.append("div")
  for(let i = 0; i< max_points ; i++){
    if(i%5 == 0 && i != 0){
      anchor_stp = anchor.append("div")
    }
    anchor_stp.append("p").attr("class","hover").attr("id","search_topic_points_"+i)
  }
  change_view("ringe")
}
