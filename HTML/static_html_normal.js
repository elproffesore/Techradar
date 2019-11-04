const append_static_html = () => {
  append_static_html_normal()
  append_static_html_search()
  append_static_html_cluster()
}
const append_static_html_normal = () => {
  var anchor = null;
  //Append start HTML
  anchor = d3.select(".rings")
  Object.keys(circles).forEach((r, ri) => {
    var array = points.filter(p => p.ring == r)
    var length = points.filter(p => p.ring == r).length
    var ring_anchor = anchor.append("div").attr("class", "start_" + r)
    ring_anchor.append("p")
      .attr("class", "aheader header hover")
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
          d3.select("#" + p.id).attr("fill", colors.red).attr("r",points_radius*2).transition().duration(500).attr("r", points_radius)
        })
        .on("mouseout", () => {
          d3.select("#" + p.id).attr("fill", colors.gray)
        })
        .on("click", () => {
          show_point(p)
        })
    })
    ring_anchor.append("p")
      .attr("class", "hover")
      .html("... and " + (length-5) + " more Items")
      .on("click", () => {
        change_view("ring_topics_" + r, r)
      })
  })
  //Rings and their Topics
  anchor = d3.select(".ring_topics")
  Object.keys(circles).forEach((r, ri) => {
    var topics = [...new Set(points.filter(p => p.ring == r).map(p => p = p.topic))]
    var length = points.filter(p => p.ring == r).length
    var ring_anchor = anchor.append("div")
      .attr("class", "ring_topics_" + r)
    ring_anchor.append("p")
      .attr("class", "aheader header hover")
      .attr("id", "ring_topics_header_"+r)
      .html("<img class='picto' src='Data/Pics/" + r + ".svg'> " + r + " / " + length + " Items")
      .on("click", () => {
        change_view("rings");
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
        .attr("class", "aheader header hover")
        .attr("id", "ring_topic_points_" + r + "_" + topic_wsc + "_header")
        .html("<img class='picto' src='Data/Pics/" + r + ".svg'> " + r + " / " + topic + " / " + length + " Items")
        .on("click", () => {
          change_view("ring_topics_" + r)
        })
      var ring_topic_points_anchor = ring_topic_anchor.append("div")
      array.map((p, pi) => {
        if (pi % 5 == 0 && pi != 0) {
          ring_topic_points_anchor = ring_topic_anchor.append("div")
          if(pi == 45){
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
            topics_holder.append("img")
                          .attr("class","picto arrows arrow-right")
                          .attr("src","Data/Pics/Reduce.svg")
                          .on("click",() => {change_view("ring_topic_points_" + r + "_" + topic_wsc+"2")})
            ring_topic_anchor = ring_anchor.append("div")
            .attr("class", "ring_topic_points_" + r + "_" + topic_wsc+"2")
            ring_topic_anchor.append("p")
              .attr("class", "aheader header hover")
              .attr("id", "ring_topic_points_" + r + "_" + topic_wsc + "_header2")
              .html("<img class='picto' src='Data/Pics/" + r + ".svg'> " + r + " / " + topic + " / " + length + " Items")
              .on("click", () => {
                change_view("ring_topics_" + r)
              })
              ring_topic_points_anchor = ring_topic_anchor.append("div")
          }
        }
        ring_topic_points_anchor.append("p")
          .attr("class", "hover")
          .attr("id", "ring_topics_points_" + r + "_" + topic_wsc + "_" + pi)
          .html(p.name)
          .on("mouseover", () => {
            d3.select("#" + p.id).attr("fill", colors.red).attr("r", points_radius*2).transition().duration(500).attr("r", points_radius)
          })
          .on("mouseout", () => {
            d3.select("#" + p.id).attr("fill", colors.gray)
          })
          .on("click", () => {
            show_point(p)
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
      if(length > 45){
        topics_holder.append("img")
                      .attr("class","picto arrows arrow-left")
                      .attr("src","Data/Pics/Reduce.svg")
                      .on("click",() => {change_view("ring_topic_points_" + r + "_" + topic_wsc)})
      }
    })
  })
  change_view("rings")
}
