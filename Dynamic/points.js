var show_points = (cluster, spec, part) => {//cluster bsp:ring spec bsp:Build-Up part bsp: Cloud
    history.pushState({page:"points"},"",window.location.origin+"#points")
  change_view("points");
  d3.selectAll(".pages-arrows")
      .style("display", "none");
  //Create the HTML elements if they are missing
  var points_length = d3.selectAll("#points > div").nodes().length;
  if (points_length < (65 / 5)) {
    var diff = (65 / 5) - points_length;
    for (let i = 0; i < diff; i++) {
      let div = d3.select("#points").append("div");
      for (let y = 0; y < 5; y++) {
        div.append("p")
      }
    }
  }
  //Passing the array to the show function ->  could be in one function in future, but need a seperate
  //function for showing the search results later
  var array = points.filter(p => p[cluster] == spec && (cluster == "ring" ? p.topic : p.ring) == part);
  show_points_array(cluster, spec, part, array, 0)
};
var show_points_array = (cluster, spec, part, array, page) => {
    history.pushState({page:"points"},"",window.location.origin+"#points#page"+page)
  change_view("points");
  var array_length = array.length;
  d3.select("#points > .header > img").attr("src", "Data/Pics/arrow_left.svg")
      .on("click", () => {
          if(oldview === cache_view.func.slice(5,11)){
              cache_view.func = "show_filter"
              cache_view.args = [cluster,spec]
              backToOldView()
          }else{
              backToOldView()
          }
      });
  d3.select("#points > .header > h1").html(() => {
    if (cluster == "ring") {
      return `<img class='pictogram' src='Data/Pics/${spec}.svg'> ${spec} / ${part || "No Topic"} /${array_length} Items`
    } else {
      return `${spec} / ${part} /${array_length} Items`
    }
  });
  var sliced = array.slice((page * 45), ((page + 1) * 45));
  sliced.map((point, pointIndex) => {
    d3.selectAll("#points > div:not(.parts_holder):not(.pages) > p").filter((d, i) => (i == pointIndex)).html(point.name)
        .on("mouseover", () => {
          single_highlight(point.id)
        })
        .on("mouseout", () => {
          delight()
        })
        .on("click", () => {
          show_point(point)
            cache_view.func = "show_points_array";
            cache_view.args = [cluster, spec, part, array, page];
        })
  });
  var parts = cluster == "ring"
        ? [...new Set(points.filter(p => p["ring"] == spec).map(p => p=p.topic))].sort()
        : ["Observe", "Evaluate", "Build-Up", "Work", "Reduce"]

  var parts_holder_length = d3.select(".parts_holder > p").nodes().length;
  if (parts.length > parts_holder_length) {
    var diff = parts.length - parts_holder_length;
    for (let i = 0; i < diff; i++) {
      let div = d3.select(".parts_holder").append("p")
    }
  }
  parts.map((parts, partsIndex) => {
    d3.selectAll(".parts_holder > p").filter((d, i) => (i == partsIndex)).html(parts || "No Topic")
        .style("color", (d, i) => {
          if (parts == part) {
            return colors.red
          }
        })
        .on("click", (d, i) => {
          show_points(cluster, spec, parts)
            cache_view.func = "show_points_array";
            cache_view.args = [cluster, spec, part, array, page];
        })
  });
  var sites = Math.floor(array_length / 46);

  d3.selectAll("#footer > .pages > p")
      .html((p, i) => {
        if (i <= sites && sites > 0) {
          return i + 1
        }
      })
      .style('text-decoration', (p, i) => {
        if (i == page) {
          return 'underline'
        }
      })
      .on("click", (p, i) => {
        show_points_array(cluster, spec, part, array, i)
          cache_view.func = "show_points_array";
          cache_view.args = [cluster, spec, part, array, page];
      })
};
