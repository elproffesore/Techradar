const append_static_html_search = () => {

  //Search View
  var anchor = d3.select(".search")
  Object.keys(circles).forEach((r, ri) => {
    var ring_anchor = anchor.append("div")
      .attr("class", "search_" + r)

    ring_anchor.append("p")
      .attr("class", "hover aheader")
      .attr("id", "search_" + r + "_header")
    for (let i = 0; i < 5; i++) {
      ring_anchor.append("p").attr("class", "hover").attr("id", "search_" + r + "_" + i)
    }
    ring_anchor.append("p").attr("class", "hover").attr("id", "search_" + r + "_seeall")
  })
  //Search Topics View
  var max_topic = 0
  Object.keys(circles).forEach((r, ri) => {
    var ring_topic_length = [...new Set(points.filter(p => p.ring == r).filter(p => p.topic != null).map(p => p = p.topic))].length
    ring_topic_length > max_topic ? max_topic = ring_topic_length : null
  })
  anchor = d3.select(".search_topics")
  anchor.append("p")
    .attr("class", "aheader hover")
    .attr("id", "search_topics_header")
  for (let i = 0; i < max_topic; i++) {
    anchor.append("p").attr("class", "hover").attr("id", "search_topics_" + i)
  }
  //Search Topic Points View
  var max_points = 0
  Object.keys(circles).forEach((r, ri) => {
    var ring_topics = [...new Set(points.filter(p => p.ring == r).map(p => p = p.topic))]
    ring_topics.map((t, ti) => {
      var points_length = points.filter(p => p.ring == r && p.topic == t).length
      points_length > max_points ? max_points = points_length : null
    })
  })
  anchor = d3.select(".search_topic_points")
  anchor.append("p")
    .attr("class", "aheader hover")
    .attr("id", "search_topic_points_header")
  var anchor_stp = anchor.append("div")
  for (let i = 0; i < max_points; i++) {
    if (i % 5 == 0 && i != 0) {
      anchor_stp = anchor.append("div")
    }
    anchor_stp.append("p").attr("class", "hover").attr("id", "search_topic_points_" + i)
  }
}
