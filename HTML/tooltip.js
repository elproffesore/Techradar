var tooltip = d3.select("body")
.append("div")
.attr("id","tooltip")

tooltip.append("img")
.attr("src","Data/Pics/nt-logo.png.svg")
.attr("width","200em")
tooltip.append("p")
.html("1. You can take a step back if you click the titles.")
tooltip.append("p")
.html("2. You can click on the radar and explore and interact.")
tooltip.append("p")
.html("3. You can combine clustering and views to get a more detailed overview.")

var hoverable = d3.select("body")
.append("div")
.attr("id","tooltip_hoverable")
.on("mouseover",() => {d3.select("#tooltip").attr("style","visibility:visible")})
.on("mouseout",() => {d3.select("#tooltip").attr("style","visibility:hidden")})
hoverable.append("p")
.attr("id","tooltip_mark")
.html("<img width='20em' src='Data/Pics/question.png'>")