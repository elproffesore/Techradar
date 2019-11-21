const show_cluster = (cluster) => {
  clusterview = cluster
  clear_rings()
  change_view("cluster")
  d3.selectAll('#cluster > div > img')
   .attr('class','pictogram')
   .style('cursor','pointer')
  .style('transform','rotate(-90deg)')
  var cluster_parts = [...new Set(points.map(p => p = p[cluster]))]
  cluster_parts.sort().map((part,partIndex) => {
      var array = points.filter(p => p[cluster] == part)
      var length = array.length
      var part_wsc = part.split(" (")[0].replace(/ /g,"_").replace(/&/g,"u")
      d3.select(d3.selectAll("#cluster > div > .header").nodes()[partIndex]).html(() => {
        if(cluster == "ring"){
          return `<img class='pictogram' src='Data/Pics/${part}.svg'> ${part}`
        }else{
          return  part
        }
      })
      .on("mouseover",() => {transition_highlight(part_wsc)})
      .on("mouseout",() => {delight()})
      .on("click",() => {show_filter(cluster,part)})

      var div = d3.select(d3.selectAll("#cluster > div").nodes()[partIndex])

      div.selectAll("p").html((d,i) => {return array[i].name})
      .on("mouseover",(d,i) => {single_highlight(array[i].id)})
      .on("mouseout",(d,i) => {delight()})
      .on("click",(d,i) => {show_point(array[i])})

      d3.selectAll('#cluster > div > img')
        .attr('src',(d,i) => {if(i <= partIndex){return `Data/Pics/arrow_left.svg`}})
        .on("click",(d,i) => {show_filter(cluster,part)})
  })
}
