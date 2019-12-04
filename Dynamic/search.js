var search = (searchword) => {
  cache_searchword = searchword;
  cache_view.func = "search";
  cache_view.args = [searchword];
  if (searchword == "") {
    show_cluster(clusterview)
  } else {
    change_view("cluster");
    //Weights for the search
    var options = {
      includeScore: true,
      threshold: 0.1,
      keys: [{
        name: 'ring',
          weight: 0.4
        },
        {
          name: 'topic',
          weight: 0.8
        },
        {
          name: 'description',
          weight: 0.3
        },
        {
          name: 'name',
          weight: 1
        }
      ]
    };
    d3.selectAll('#cluster > div > img')
        .attr('class', 'pictogram showmore')
        .style('cursor', 'pointer')
        .style('transform', 'rotate(-90deg)');
    var f = new Fuse(points, options);
    var results_array = f.search(searchword);
    results_array = results_array.map(er => {
      return er = er.item
    });
    var rings = [...new Set(results_array.map(p => p = p.ring))];
    rings.sort().map((ring, ringIndex) => {
      var array = results_array.filter(p => p.ring == ring);
      d3.selectAll("#cluster > div >.header").filter((d, i) => (i == ringIndex))
          .html(`<img class='pictogram' src="Data/Pics/${ring}.svg"> ${ring} <br> / ${array.length} Items`)
          .on("mouseover", () => {
            array.map(p => d3.select("#" + p.id).attr("r", points_radius * 1.5))
          })
          .on("mouseout", () => {
            d3.selectAll(".circles").attr("r", points_radius)
          })
          .on("click", () => {
            show_filter_search(results_array, ring, searchword)
          });

      array.map((point, pointIndex) => {
        single_highlight(point.id);
        d3.selectAll("#cluster > div").filter((d, i) => (i == ringIndex))
            .selectAll("p").filter((d, i) => (i == pointIndex)).html(point.name)
            .on("click", () => {
              show_point(point)
            })
            .on("mouseover", () => {
              d3.select("#" + point.id).attr("r", points_radius * 1.5)
            })
            .on("mouseout", () => {
              d3.select("#" + point.id).attr("r", points_radius)
            })
      });
      if (array.length > 5) {
        d3.select(d3.selectAll(`.showmore`).nodes()[ringIndex])
            .attr('src', `Data/Pics/arrow_left.svg`)
            .on("click", () => {
              backToOldView()
            })
      }
    })
  }
};
var show_filter_search = (search_array, ring, searchword) => {
  cache_view.func = "show_filter_search";
  cache_view.args = [search_array, ring, searchword];
  change_view("filter");
  var topics = [...new Set(search_array.filter(p => p.ring == ring).map(p => p = p.topic))];
  var ring_array = search_array.filter(p => p.ring == ring);
  d3.select("#filter > .header > img").attr("src", "Data/Pics/arrow_left.svg")
      .on("click", () => {
        backToOldView()
      });
  d3.select("#filter > .header > h1").html(`"${searchword}" / <img class='pictogram' src='Data/Pics/${ring}.svg'>${ring} / ${ring_array.length} Items`);
  var filter_length = d3.selectAll("#filter > div").nodes().length - 1;
  if (topics.length > filter_length) {
    var diff = topics.length - filter_length;
    for (let i = 0; i < diff; i++) {
      let div = d3.select("#filter").append("div");
      div.append("h2")
    }
  }
  topics.sort().map((topic, topicIndex) => {
    var array = search_array.filter(p => p.ring == ring && p.topic == topic);
    var array_length = array.length;
    var topic_wsc = topic == null ? null : topic.split(" (")[0].replace(/ /g, "_").replace(/&/g, "u");
    d3.select(d3.selectAll("#filter > div > h2").nodes()[topicIndex])
        .html((topic || "No Topic") + `<br> <span> ${array_length} Items </span>`)
        .on("mouseover", () => {
          array.map(p => {
            single_highlight(p.id)
          })
        })
        .on("mouseout", () => {
          delight()
        })
        .on("click", () => {
          show_points_search(search_array, ring, topic, searchword, 0)
        })
  })
};
var show_points_search = (search_array, ring, topic, searchword, page) => {
  cache_view.func = "show_points_search";
  cache_view.args = [search_array, ring, topic, searchword, page];
  change_view("points");
  var points_length = d3.selectAll("#points > div").nodes().length;
  if (points_length < (60 / 5)) {
    var diff = (60 / 5) - points_length;
    for (let i = 0; i < diff; i++) {
      let div = d3.select("#points").append("div");
      for (let y = 0; y < 5; y++) {
        div.append("p")
      }
    }
  }
  var array = search_array.filter(p => p.ring == ring && p.topic == topic);
  d3.select("#points > .header > img").attr("src", "Data/Pics/arrow_left.svg")
      .on("click", () => {
        backToOldView()
      });
  d3.select("#points > .header > h1")
      .html(`"${searchword}" / <img class='pictogram' src='Data/Pics/${ring}.svg'>${ring} / ${topic || "No Topic"} / ${array.length} Items`);

  array.slice((page * 40), ((page + 1) * 40)).map((point, pointIndex) => {
    d3.selectAll("#points > div:not(.parts_holder) > p").filter((d, i) => (i == pointIndex)).html(point.name)
        .on("mouseover", () => {
          single_highlight(point.id)
        })
        .on("mouseout", () => {
          delight()
        })
        .on("click", () => {
          show_point(point)
        })
  });
  var parts = [...new Set(search_array.filter(p => p.ring == ring).map(p => p = p.topic))];
  var parts_holder_length = d3.select(".parts_holder > p").nodes().length;
  if (parts.length > parts_holder_length) {
    var diff = parts.length - parts_holder_length;
    for (let i = 0; i < diff; i++) {
      let div = d3.select(".parts_holder").append("p")
    }
  }
  parts.sort().map((parts, partsIndex) => {
    d3.selectAll(".parts_holder > p").filter((d, i) => (i == partsIndex)).html(parts || "No Topic")
        .style("color", (d, i) => {
          if (parts == topic) {
            return colors.red
          }
        })
        .on("click", (d, i) => {
          show_points_search(search_array, ring, parts, searchword, 0)
        })
  })
};
