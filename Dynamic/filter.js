var show_filter = (cluster, spec) => {
  cache_view.func = "show_filter";
  cache_view.args = [cluster, spec];
  if (cluster == "ring") {
    redraw_rings(spec)
  }
  change_view("filter");
  var spec_wsc = spec.split(" (")[0].replace(/ /g, "_").replace(/&/g, "u");
  var spec_length = points.filter(p => p[cluster] == spec).length;
  var filter_parts = [...new Set(points.filter(p => p[cluster] == spec).map(p => p = (cluster == "ring" ? p.topic : p.ring)))];
  var parts_length = filter_parts.length;
  var filter_length = d3.selectAll("#filter > div").nodes().length - 1;
  if (parts_length > filter_length) {
    var diff = parts_length - filter_length;
    for (let i = 0; i < diff; i++) {
      let div = d3.select("#filter").append("div");
      div.append("h2")
    }
  }
  d3.select("#filter > .header > img").attr("src", "Data/Pics/arrow_left.svg")
      .on("click", () => {
        backToOldView()
      });
  d3.select("#filter > .header > h1").html(() => {
    if (cluster == "ring") {
      return `<img class='pictogram' src='Data/Pics/${spec}.svg'> ${spec} / ${spec_length} Items`
    } else {
      return `${spec} / ${spec_length} Items`
    }
  });
  filter_parts.sort().map((part, partIndex) => {
    var array = points.filter(p => p[cluster] == spec && (cluster == "ring" ? p.topic : p.ring) == part);
    var array_length = array.length;
    var part_wsc = part == null ? null : part.split(" (")[0].replace(/ /g, "_").replace(/&/g, "u");
    d3.select(d3.selectAll("#filter > div > h2").nodes()[partIndex])
        .html(
            cluster == "ring"
                ? (part || "No Topic") + ` <br> <span> ${array_length} Items </span>`
                : `<img class='pictogram-filter' src='Data/Pics/${part}.svg'> ${part} <br> <span> ${array_length} Items </span>`
        )
        .on("mouseover", () => {
          transition_highlight(`${spec_wsc}.${part_wsc}`)
        })
        .on("mouseout", () => {
          delight()
        })
        .on("click", () => {
          show_points(cluster, spec, part)
        })
  })
};
