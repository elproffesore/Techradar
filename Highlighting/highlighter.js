const highlighter = (classes) =>{
  d3.selectAll("."+classes).on("mouseover",function(){
    d3.select(this).attr("fill",colors.red)
    d3.select(this).attr("color",colors.red)
  })
}
