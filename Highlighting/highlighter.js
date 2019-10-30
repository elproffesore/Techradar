// coi can either be id or class and this switches the handling
const highlighter = (coi,identifier) =>{
  if(coi == "id"){
    d3.selectAll("."+identifier).on("mouseover",function(){
      d3.select(this).attr("fill",colors.red)
      d3.select(this).attr("color",colors.red)
    })
  }else if(coi == "class"){
    d3.selectAll("#"+identifier).on("mouseover",function(){
      d3.select(this).attr("fill",colors.red)
      d3.select(this).attr("color",colors.red)
    })
    d3.selectAll("#"+identifier).on("mouseover",function(){
      d3.select(this).attr("fill",colors.red)
      d3.select(this).attr("color",colors.red)
    })
  }
}
