var svg = d3.select("svg");
var points = [];
var points_radius = 6;
//radius of each ring from outer to inner
var circles = {
    "Observe": 400,
    "Evaluate": 340,
    "Build-Up": 280,
    "Work": 220,
    "Reduce": 100
};
var offsets = [500, window.innerHeight/2];//x,y offsets of the radar
var oldview = null;//Global visible View
var clusterview = null;
var cache_view = {
    func: null,
    args: []
};
var cache_searchword = null;
var colors = {
    red: "rgba(231,69,79,1.0)",
    purple: "rgba(92,72,151,0.8)",
    lightblue: "rgba(55,188,236,1.0)",
    green: "rgba(31,175,152,1.0)",
    gray: "rgba(255,255,255,0.7)"
};
//In a specified arrangement because render layer is specified by Order and hullnames
//and Gadgets have to be on top of all
var text_group = svg.append("g").attr("class", "text_group");
var radar_group = svg.append("g").attr("class", "radar_group");
var hull_group = svg.append("g").attr("class", "hull_group");
var circles_group = svg.append("g").attr("class", "circles_group");
var gadget_group = svg.append("g").attr("class", "gadget_group");
var hullnames_group = svg.append("g").attr("class", "hullnames_group").attr("pointer-events", "none");

//Some helper functions for highlighting the points
const transition_highlight = (selector) => {
    d3.selectAll(`.${selector}`).attr("fill", "rgba(231,69,79,0.8)").attr("r", points_radius * 2).transition().duration(500).attr("r", points_radius)
};
const normal_highlight = (selector) => {
    d3.selectAll(`.${selector}`).attr("r", points_radius * 1.5)
};
const single_highlight = (selector) => {
    d3.select(`#${selector}`).attr("fill", "rgba(231,69,79,0.8)").attr("r", points_radius * 2).transition().duration(500).attr("r", points_radius)
};
const delight = () => {
    d3.selectAll(".circles").attr("r", points_radius).attr("fill", "rgba(245,245,245,0.5)")
};
d3.select('#info-tooltip')
    .on('mouseover', () => {
        d3.select('#info').style('visibility', 'visible')
    })
    .on('mouseout', () => {
        d3.select('#info').style('visibility', 'hidden')
    });
d3.select('#home-button').on('click', () => {
    show_cluster(clusterview)
});


//Back Button functionality
const backToOldView = () => {
    window[cache_view.func](...cache_view.args);
};
//View and cluster changer
const change_view = (newview) => {

        d3.select('main').selectAll("p,h1,h2").html("");
        d3.select('main').selectAll('img').attr('src', "");
        d3.select("#point-line").attr("display", "none");
        d3.selectAll(".circles").attr("fill", "rgba(245,245,245,0.5)");
        d3.select(`#${oldview}`).style("display", "none");
        d3.select(`#${newview}`).style("display", "grid");
        oldview = newview
};
const change_cluster = (cluster) => {
    if(oldview !== "start") {
        if (cluster === "topic") {
            d3.selectAll(".null").attr("display", "none")
        } else {
            d3.selectAll(".circles").attr("display", "block")
        }
        d3.selectAll(".hull_group > g , .hullnames_group > g").attr("display", "none");
        d3.selectAll(".circles")
            .transition()
            .duration(500)
            .attr("cx", (d) => {
                return d.coordinates[cluster].x
            })
            .attr("cy", (d) => {
                return d.coordinates[cluster].y
            })
        d3.selectAll(`.hull_${cluster}_group , .hullnames_${cluster}_group`)
            .transition()
            .delay(500)
            .attr("display", "block")
    }
};
history.pushState({page: "start"}, "", window.location.origin + "#start")

window.onpopstate = function (event) {
    console.log(event)
    window[event.currentTarget.cache_view.func](...event.currentTarget.cache_view.args);
};
const start = () => {
    d3.select('#start').style('visibility', 'hidden');
    draw_radar();
    d3.selectAll("svg > g")
        .attr("transform", "translate(" + offsets[0] + "," + offsets[1] + ")")
    change_view('cluster');
    show_cluster("ring");
    d3.selectAll('.circles').attr('visibility','visible');
    d3.select(".hull_category_group").attr("display", "block");
    d3.select(".hullnames_category_group").attr("display", "block")

};
