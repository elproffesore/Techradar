var svg = d3.select("svg")
var points = [];
var points_radius = 6
//radius of each ring from outer to inner
var circles = {
  "Observe":400,
  "Evaluate":340,
  "Build-Up":280,
  "Work":220,
  "Reduce":100
}
var offsets = [500,550] //x,y offsets of the radar
var oldview = "NoD";//Global visible View
var colors = {
  red:"rgba(231,69,79,1.0)",
  purple:"rgba(92,72,151,0.8)",
  lightblue:"rgba(55,188,236,1.0)",
  green:"rgba(31,175,152,1.0)",
  gray:"rgba(255,255,255,0.7)"
}
var opacity_colors = {
  red:"rgba(231,69,79,",
  purple:"rgba(92,72,151,",
  lightblue:"rgba(55,188,236,",
  green:"rgba(31,175,152,",
  gray:"rgba(255,255,255,"
}
//In a specified arrangement because render layer is specified by Order and hullnames
//and Gadgets have to be on top of all
var radar_group = svg.append("g").attr("class", "radar_group")
var hull_group = svg.append("g").attr("class","hull_group")
var circles_group = svg.append("g").attr("class", "circles_group")
var hullnames_group = svg.append("g").attr("class","hullnames_group")
var gadget_group = svg.append("g").attr("class", "gadget_group")
