const show_points = (cluster,spec,part) => {//cluster bsp:ring spec bsp:Build-Up part bsp: Cloud
  change_view("points")
  d3.selectAll(".pages-arrows")
  .style("display","none")
  //Create the HTML elements if they are missing
  var points_length = d3.selectAll("#points > div").nodes().length
  if(points_length < (65/5)){
    var diff = (65/5) - points_length
    for(let i = 0; i < diff;i++){
      let div = d3.select("#points").append("div")
      for(let y = 0; y < 5;y++){
        div.append("p")
      }
    }
  }
  //Passing the array to the show function ->  could be in one function in future, but need a seperate
  //function for showing the search results later
  var array = points.filter(p => p[cluster] == spec && (cluster == "ring"?p.topic:p.ring) == part)
  show_points_array(cluster,spec,part,array,0)
}
const show_points_array = (cluster,spec,part,array,page) => {
  change_view("points")
  var array_length = array.length
  d3.select("#points > .header > img").attr("src","Data/Pics/arrow_left.svg")
   .on("click",() => {show_filter(cluster,spec)})
  d3.select("#points > .header > h1").html(() => {
    if(cluster == "ring"){
      return `<img class='pictogram' src='Data/Pics/${spec}.svg'> ${spec} / ${part||"No Topic"} /${array_length} Items`
    }else{
      return `${spec} / ${part} /${array_length} Items`
    }
  })
  var sliced = array.slice((page*45),((page+1)*45))
    sliced.map((point,pointIndex) => {
      d3.selectAll("#points > div:not(.parts_holder):not(.pages) > p").filter((d,i) => (i == pointIndex)).html(point.name)
      .on("mouseover",() => {single_highlight(point.id)})
      .on("mouseout",() => {delight()})
      .on("click",() => {show_point(point)})
    })
  var parts = [...new Set(points.filter(p => p[cluster] == spec).map(p => p = (cluster == "ring"?p.topic:p.ring)))]
  var parts_holder_length = d3.select(".parts_holder > p").nodes().length
  if(parts.length > parts_holder_length){
    var diff = parts.length - parts_holder_length
    for(let i = 0; i < diff;i++){
      let div = d3.select(".parts_holder").append("p")
    }
  }
  parts.sort().map((parts,partsIndex) => {
    d3.selectAll(".parts_holder > p").filter((d,i) => (i == partsIndex)).html(parts || "No Topic")
    .style("color",(d,i) => {if(parts == part){return colors.red}})
    .on("click",(d,i) => {show_points(cluster,spec,parts)})
  })

  if(array_length > ((page+1)*45)){
    d3.selectAll("#points > .pages > p")
    .html((p,i) => {
      if(i <= (page+1)){
        return i+1
      }
    })
    .style('text-decoration',(p,i) => {
      if(i == page){
        return 'underline'
      }
    })
    .on("click",(p,i) => {show_points_array(cluster,spec,part,array,i)})
  }else{
    d3.select("#points > .pages > #pages-arrow-right")
    .style("display","none")
  }
}
