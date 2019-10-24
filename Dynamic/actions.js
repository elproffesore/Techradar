const change_view = (newview) => {
  d3.select("."+oldview).attr("display","none")
  d3.select("."+newview).attr("display","grid")
  oldview  = newview;
}
