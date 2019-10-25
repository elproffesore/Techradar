const static_html = () => {
  var anchor = null;
  //Append start HTML
  anchor = d3.select(".ringe")
  anchor.append("p").attr("class","aheader").html("Novatec Techradar")
  Object.keys(circles).forEach((r, ri) => {
    var array = points.filter(p => p.ring == r)
    var length = points.filter(p => p.ring == r).length
    var ring_anchor = anchor.append("div").attr("class", "start_" + r)
    ring_anchor.append("p")
      .attr("class", "bheader hover")
      .attr("id", "start_" + r + "_header")
      .html("<img class='picto' src='Data/Pics/" + r + ".svg'> " + r)
      .on("mouseover", () => {
        d3.selectAll("." + r).attr("fill", colors.red).attr("r", points_radius*2).transition().duration(500).attr("r", points_radius)
      })
      .on("mouseout", () => {
        d3.selectAll("." + r).attr("fill", colors.gray)
      })
      .on("click", () => {
        change_view("ring_topics_" + r, r)
      })
    array.slice(0, 5).map((p, pi) => {
      ring_anchor.append("p")
        .attr("id", "start_" + r + "_" + pi)
        .attr("class", "hover")
        .html(p.name)
        .on("mouseover", () => {
          d3.select(".id" + p.id).attr("fill", colors.red).attr("r",points_radius*2).transition().duration(500).attr("r", points_radius)
        })
        .on("mouseout", () => {
          d3.select(".id" + p.id).attr("fill", colors.gray)
        })
        .on("click", () => {
          change_view("point_view")
        })
    })
    // ring_anchor.append("br")
    // ring_anchor.append("p")
    //   .attr("class", "hover")
    //   .html("See All " + length + " Items")
    //   .on("click", () => {
    //     change_view("ring_topics_" + r, r)
    //   })
  })
  //Rings and their Topics
  anchor = d3.select(".ring_topics")
  Object.keys(circles).forEach((r, ri) => {
    var topics = [...new Set(points.filter(p => p.ring == r).map(p => p = p.topic))]
    var length = points.filter(p => p.ring == r).length
    var ring_anchor = anchor.append("div")
      .attr("class", "ring_topics_" + r)
    ring_anchor.append("p")
      .attr("class", "aheader hover")
      .attr("id", "ring_topics_header_"+r)
      .html("<img class='picto' src='Data/Pics/" + r + ".svg'> " + r + " / " + length + " Items")
      .on("click", () => {
        change_view("ringe");
        clear_rings()
      })
    topics.sort().map((t, ti) => {
      var topic = t || "No Topic"
      var topic_wsc = t != null ? topic.replace(/&/g, "u").replace(/ /g, "_") : t
      var length = points.filter(p => p.ring == r && p.topic == t).length
      ring_anchor.append("p")
        .attr("class", "hover")
        .html("<span class='cheader'>" + topic + "</span><br> " + length + " Items")
        .on("mouseover", () => {
          d3.selectAll("." + r + "." + topic_wsc).attr("fill", colors.red).attr("r", points_radius*2).transition().duration(500).attr("r", points_radius)
        })
        .on("mouseout", () => {
          d3.selectAll("." + r + "." + topic_wsc).attr("fill", colors.gray)
        })
        .on("click", () => {
          change_view("ring_topic_points_" + r + "_" + topic_wsc)
        })
    })

  })
  // Rings Topics Points
  anchor = d3.select(".ring_topic_points")
  Object.keys(circles).forEach((r, ri) => {
    var topics = [...new Set(points.filter(p => p.ring == r).map(p => p = p.topic))]
    var ring_anchor = anchor.append("div")
      .attr("class", "ring_topic_points")
    topics.sort().map((t, ti) => {
      var topic = t || "No Topic"
      var topic_wsc = t != null ? topic.replace(/&/g, "u").replace(/ /g, "_") : t //withour special Characters e.g " ","&"
      var length = points.filter(p => p.ring == r && p.topic == t).length
      var array = points.filter(p => p.ring == r && p.topic == t)
      var ring_topic_anchor = ring_anchor.append("div")
        .attr("class", "ring_topic_points_" + r + "_" + topic_wsc)
      ring_topic_anchor.append("p")
        .attr("class", "aheader hover")
        .attr("id", "ring_topic_points_" + r + "_" + topic_wsc + "_header")
        .html("<img class='picto' src='Data/Pics/" + r + ".svg'> " + r + " / " + topic + " / " + length + " Items")
        .on("click", () => {
          change_view("ring_topics_" + r)
        })
      var ring_topic_points_anchor = ring_topic_anchor.append("div")
      array.map((p, pi) => {
        if (pi % 5 == 0 && pi != 0) {
            ring_topic_points_anchor = ring_topic_anchor.append("div")
        }
        ring_topic_points_anchor.append("p")
          .attr("class", "hover")
          .attr("id", "ring_topics_points_" + r + "_" + topic_wsc + "_" + pi)
          .html(p.name)
          .on("mouseover", () => {
            d3.select(".id" + p.id).attr("fill", colors.red).attr("r", points_radius*2).transition().duration(500).attr("r", points_radius)
          })
          .on("mouseout", () => {
            d3.select(".id" + p.id).attr("fill", colors.gray)
          })
          .on("click", () => {
            change_view("point_view")
          })
      })
      var topics_holder = ring_topic_anchor.append("div").attr("class", "topics_holder")
      topics.sort().map((p,pi) => {
        var topic = p || "No Topic"
        var topic_wsc = p != null ? p.replace(/&/g, "u").replace(/ /g, "_") : p
        topics_holder.append("p")
          .attr("class", "hover")
          .attr("style", () => {
            if (p == t) {
              return "color:" + colors.red
            }
          })
          .html(topic)
          .on("click", () => {
            change_view("ring_topic_points_" + r + "_" + topic_wsc)
          })
      })
    })
  })
  //Search View
  anchor = d3.select(".search")
  anchor.append("p")
    .attr("class", "aheader")
    .attr("id", "search_header")
  Object.keys(circles).forEach((r, ri) => {
    var ring_anchor = anchor.append("div")
      .attr("class", "search_" + r)

    ring_anchor.append("p")
    .attr("class","hover bheader")
    .attr("id","search_"+r+"_header")
    for (let i = 0; i < 5; i++) {
      ring_anchor.append("p").attr("class", "hover").attr("id", "search_" + r + "_" + i)
    }
  })
  //Search Topics View
  var max_topic = 0
  Object.keys(circles).forEach((r, ri) => {
    var ring_topic_length = [...new Set(points.filter(p => p.ring == r).filter(p => p.topic != null).map(p => p = p.topic))].length
    ring_topic_length > max_topic ? max_topic = ring_topic_length : null
  })
  anchor = d3.select(".search_topics")
  anchor.append("p")
    .attr("class", "aheader")
    .attr("id", "seach_topics_header")
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
    .attr("class", "aheader")
    .attr("id", "seach_topic_points_header")
  var anchor_stp = anchor.append("div")
  for (let i = 0; i < max_points; i++) {
    if (i % 5 == 0 && i != 0) {
      anchor_stp = anchor.append("div")
    }
    anchor_stp.append("p").attr("class", "hover").attr("id", "search_topic_points_" + i)
  }
  change_view("ringe")
}
