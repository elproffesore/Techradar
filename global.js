var svg = d3.select("svg")
var points = [];
var circles = {
  "Observe":400,
  "Evaluate":340,
  "Build-Up":280,
  "Work":220,
  "Reduce":100
}//radius of each ring from outer to inner
var offsets = [500,550] //x,y offsets of the radar
var oldview = null;//Global visible View
var colors = {
  red:"rgba(231,69,79,1.0)",
  purple:"rgba(92,72,151,0.8)",
  lightblue:"rgba(55,188,236,1.0)",
  green:"rgba(31,175,152,1.0)",
  gray:"rgba(255,255,255,0.7)"
}
