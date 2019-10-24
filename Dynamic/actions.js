const change_view = (newview) => {
  d3.select("."+oldview).attr("style","display:none")
  d3.select("."+newview).attr("style","display:grid")
  oldview  = newview;
}
