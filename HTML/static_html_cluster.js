const append_static_html_cluster = () => {
  var categorys = [...new Set(points.map(p => p = p.category))]
  //Cluster View
  var anchor = d3.select(".cluster")
  categorys.map((cat, cati) => {
    var array = points.filter(p => p.category == cat)
    var length = array.length
    var cat_wsc = cat.split(" (")[0].replace(/ /g, "_").replace(/&/g, "u")
    console.log(cat_wsc)
    var cat_anchor = anchor.append("div").attr("class", "cluster_" + cat_wsc)
    cat_anchor.append("p")
      .attr("class", "aheader hover")
      .attr("id", "cluster_" + cat_wsc + "_header")
      .html(cat.split("(")[0])
      .on("mouseover", () => {
        d3.selectAll("." + cat_wsc).attr("fill", colors.red).attr("r", points_radius * 2).transition().duration(500).attr("r", points_radius)
      })
      .on("mouseout", () => {
        d3.selectAll("." + cat_wsc).attr("fill", colors.gray)
      })
      .on("click", () => {
        change_view("cluster_rings_" + cat_wsc)
      })
    array.slice(0, 5).map((p, pi) => {
      cat_anchor.append("p")
        .attr("id", "cluster_" + cat_wsc + "_" + pi)
        .attr("class", "hover")
        .html(p.name)
        .on("mouseover", () => {
          d3.select(".id" + p.id).attr("fill", colors.red).attr("r", points_radius * 2).transition().duration(500).attr("r", points_radius)
        })
        .on("mouseout", () => {
          d3.select(".id" + p.id).attr("fill", colors.gray)
        })
        .on("click", () => {
          show_point(p)
        })
    })
    cat_anchor.append("p")
      .attr("class", "hover")
      .html("... and " + (length - 5) + " more Items")
      .on("click", () => {
        change_view("cluster_rings_" + cat_wsc)
      })
  })
  //Cluster Rings View
  anchor = d3.select(".cluster_rings")
  categorys.map((cat,cati) => {
    var cat_wsc = cat.split(" (")[0].replace(/ /g, "_").replace(/&/g, "u")
    var cat_anchor = anchor.append("div").attr("class","cluster_rings_"+cat_wsc)
    var cat_length = points.filter(p => p.category == cat).length
    cat_anchor.append("p").attr("class","aheader hover")
    .html(cat.split("(")[0]+" / "+cat_length +" Items")
    .on("click",() => {change_view("cluster")})
    Object.keys(circles).forEach((r,ri) => {
      var array = points.filter(p => p.ring == r && p.category == cat)
      var length = array.length
      if(length > 0){
        cat_anchor.append("p")
        .attr("class","hover")
        .html("<img class='picto' src='Data/Pics/" + r + ".svg'><span class='cheader'> " +r+"</span><br>"+length +" Items")
      }
    })
  })
}
