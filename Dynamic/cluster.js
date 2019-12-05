var show_cluster = (cluster) => {
    clusterview = cluster;
    d3.select("#nav-view").property("value",cluster)
    cache_view.func = "show_cluster";
    cache_view.args = [cluster];
    clear_rings();
    change_view("cluster");
    d3.selectAll('#cluster > div > img')
        .attr('class', 'pictogram')
        .style('cursor', 'pointer')
        .style('transform', 'rotate(-90deg)');
    var cluster_parts = cluster == "ring"
        ? ["Observe", "Evaluate", "Build-Up", "Work", "Reduce"]
        : [...new Set(points.map(p => p = p[cluster]))];
    cluster_parts.map((part, partIndex) => {
        var array = points.filter(p => p[cluster] == part);
        var length = array.length;
        var part_wsc = part.split(" (")[0].replace(/ /g, "_").replace(/&/g, "u");
        d3.select(d3.selectAll("#cluster > div > .header").nodes()[partIndex]).html(() => {
            if (cluster == "ring") {
                return `<img class='pictogram' src='Data/Pics/${part}.svg'> ${part}`
            } else {
                return part
            }
        })
            .on("mouseover", () => {
                transition_highlight(part_wsc)
            })
            .on("mouseout", () => {
                delight()
            })
            .on("click", () => {
                show_filter(cluster, part);
                cache_view.func = "show_cluster";
                cache_view.args = [cluster];
            });

        var div = d3.select(d3.selectAll("#cluster > div").nodes()[partIndex]);

        div.selectAll("p").html((d, i) => {
            return array[i].name
        })
            .on("mouseover", (d, i) => {
                single_highlight(array[i].id)
            })
            .on("mouseout", (d, i) => {
                delight()
            })
            .on("click", (d, i) => {
                show_point(array[i])
                cache_view.func = "show_cluster";
                cache_view.args = [cluster];
            });

        d3.selectAll('#cluster > div > img')
            .attr('src', (d, i) => {
                if (i <= partIndex) {
                    return `Data/Pics/arrow_left.svg`
                }
            })
            .on("click", (d, i) => {
                show_filter(cluster, part)
                cache_view.func = "show_cluster";
                cache_view.args = [cluster];
            })
    })
};
