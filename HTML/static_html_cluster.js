const append_static_html_cluster = () => {
  var categorys = [...new Set(points.map(p => p = p.category))]
  //Cluster View Category
  var anchor = d3.select(".cluster")
  categorys.map((cat, cati) => {
    var array = points.filter(p => p.category == cat)
    var length = array.length
    var cat_wsc = cat.split(" (")[0].replace(/ /g, "_").replace(/&/g, "u")
    console.log(cat_wsc)
    var cat_anchor = anchor.append("div").attr("class", "cluster_" + cat_wsc)
    cat_anchor.append("p")
      .attr("class", "aheader header hover")
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
          d3.select("#" + p.id).attr("fill", colors.red).attr("r", points_radius * 2).transition().duration(500).attr("r", points_radius)
        })
        .on("mouseout", () => {
          d3.select("#" + p.id).attr("fill", colors.gray)
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
    cat_anchor.append("p").attr("class","aheader header hover")
    .html(cat.split("(")[0]+" / "+cat_length +" Items")
    .on("click",() => {change_view("cluster")})
    Object.keys(circles).forEach((r,ri) => {
      var array = points.filter(p => p.ring == r && p.category == cat)
      var length = array.length
      if(length > 0){
        cat_anchor.append("p")
        .attr("class","hover")
        .html("<img class='picto' src='Data/Pics/" + r + ".svg'><span class='bheader'> " +r+"</span><br>"+length +" Items")
        .on("mouseover",() => {d3.selectAll("."+r+"."+cat_wsc).attr("fill",colors.red).attr("r",points_radius*2).transition().duration(500).attr("r",points_radius)})
        .on("mouseout",() =>
        {d3.selectAll("."+r+"."+cat_wsc).attr("fill",colors.gray).attr("r",points_radius)})
        .on("click",() =>
        {change_view("cluster_ring_points_"+cat_wsc+"_"+r)})
      }
    })
  })
  anchor = d3.select(".cluster_ring_points")
  categorys.map((cat,cati) => {
    var cat_wsc = cat.split(" (")[0].replace(/ /g, "_").replace(/&/g, "u")
    var cat_anchor = anchor.append("div").attr("class","cluster_ring_points_"+cat_wsc)
    Object.keys(circles).forEach((r,ri) => {
      var array = points.filter(p => p.category == cat && p.ring == r)
      var length = array.length
      var cat_ring_anchor = cat_anchor.append("div").attr("class","cluster_viewable cluster_ring_points_"+cat_wsc+"_"+r)
      cat_ring_anchor.append("p")
      .attr("class","hover aheader header")
      .html(cat+" / "+r+" / "+length+" Items")
      .on("click",() => {change_view("cluster_rings_"+cat_wsc)})
      var cat_ring_div_anchor = cat_ring_anchor.append("div")
      array.map((p,pi) => {
        if(pi % 5 == 0 && pi != 0){
          cat_ring_div_anchor = cat_ring_anchor.append("div")
          if(pi  == 45){
            var rings_holder  = cat_ring_anchor.append("div").attr("class","rings_holder")
            Object.keys(circles).forEach((rhc,rhci) => {
              rings_holder.append("p")
              .attr("class","hover")
              .attr("style",() => {if(rhc == r){return "color:"+colors.red}})
              .html(rhc)
              .on("click",() =>{change_view("cluster_ring_points_"+cat_wsc+"_"+rhc)})
            })
            rings_holder.append("img")
                          .attr("class","picto arrows arrow-right")
                          .attr("src","Data/Pics/Reduce.svg")
                          .on("click",() => {change_view("cluster_ring_points_" +cat_wsc+ "_" +r+"2")})

            cat_ring_anchor = cat_anchor.append("div")
            .attr("class", "cluster_viewable cluster_ring_points_" + cat_wsc + "_" + r+"2")
            cat_ring_anchor.append("p")
              .attr("class", "aheader header hover")
              .attr("id", "cluster_ring_points_" + cat_wsc + "_" +r+ "_header2")
              .html( cat + " / " + r + " / " + length + " Items")
              .on("click", () => {
                change_view("cluster_rings_"+cat_wsc)
              })
            cat_ring_div_anchor = cat_ring_anchor.append("div")
          }

        }
        cat_ring_div_anchor.append("p").attr("class","hover")
        .html(p.name)
        .on("mouseover",()=>{d3.select("#"+p.id).attr("fill",colors.red).attr("r",points_radius*2)})
        .on("mouseout",()=>{d3.select("#"+p.id).attr("fill",colors.gray).attr("r",points_radius)})
        .on("click",() => {show_point(p)})
      })
      var rings_holder  = cat_ring_anchor.append("div").attr("class","rings_holder")
      Object.keys(circles).forEach((rhc,rhci) => {
        rings_holder.append("p")
        .attr("class","hover")
        .attr("style",() => {if(rhc == r){return "color:"+colors.red}})
        .html(rhc)
        .on("click",() =>{change_view("cluster_ring_points_"+cat_wsc+"_"+rhc)})
      })
      if(length > 45){
      rings_holder.append("img")
                    .attr("class","picto arrows arrow-left")
                    .attr("src","Data/Pics/Reduce.svg")
                    .on("click",() => {change_view("cluster_ring_points_" +cat_wsc+ "_" +r)})
      }
    })
  })
//cluster_view
  anchor = d3.select(".cluster_view")
  var anchor_div = anchor.append("div").attr("class","cluster_view_div0")
  anchor_div.append("p").attr("class","cluster_view_header aheader header hover").attr("id","cluster_view_header")
  var anchor_cluster_div = anchor_div.append("div")
  for(var i = 0; i < 200 ; i++){
    if(i%5 == 0 && i != 0){
      anchor_cluster_div = anchor_div.append("div")
      if(i%40 == 0){
        anchor_cluster_div.append("p").attr("class","cluster_button hover").attr("id","cluster_next_"+(i/40))
        if(i > 45){
          anchor_cluster_div.append("p").attr("class","cluster_button hover").attr("id","cluster_back_"+(i/40))
        }
        anchor_div = anchor.append("div").attr("class","cluster_view_div"+(i/40))
        anchor_div.append("p").attr("class","cluster_view_header aheader header hover").attr("id","cluster_view_header_"+(i/40))
        anchor_cluster_div = anchor_div.append("div")
      }
    }
    anchor_cluster_div.append("p").attr("class","cluster_view_p hover").attr("id","cluster_view_"+i)
  }
}
