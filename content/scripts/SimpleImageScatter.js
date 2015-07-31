var w = 800,
    h = 100;

var data = d3.range(10).map(function (d) {
  return {
    d: d
  }
})

var svg = d3.select("#scatter-space").append("svg")
  .attr("width", w)
  .attr("height", h)
  .on("mousemove", moveNode)

var force = d3.layout.force()
  .size([w, h])
  .nodes(data)
  .charge(function (d, i) {
    return i == 0 ? -8 : 5;
  })
  .on("tick", tick)
  .start();

var nodes = svg.selectAll(".node")
  .data(data)
  .enter()
  .append("use")
  .attr("class", "node")
  .attr("xlink:href", "#vinemaple")
  .attr("transform", "scale(0.5)");

function moveNode() {
  var m = d3.mouse(this);
  force.nodes()[0].x = m[0];
  force.nodes()[0].y = m[1];
}

function tick() {
  svg.selectAll(".node")
  .attr("transform", function (d,i) {
      if (i!=0){
          return "scale(0.5) translate(" + d.x + "," + d.y + ")";
      }
      else{
          return"scale(0)"
      }});
  force.start();
}