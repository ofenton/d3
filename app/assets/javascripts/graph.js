$.ajax({
           type: "GET",
           contentType: "application/json; charset=utf-8",
           url: 'data',
           dataType: 'json',
           success: function (data) {
               //draw(data);
               drawLineGraph(data);
           },
           error: function (result) {
               error();
           }
       });
 
// Input like: [{"date":"2015-02-01", "impressions":1234, "clicks":12, "conversions":1, "revenue":24.34},{"date":"2015-02-02", "impressions":1534, "clicks":16, "conversions":2, "revenue":54.34}]
function drawLineGraph(data) {
    // Set the dimensions of the canvas / graph
    var margin = {top: 30, right: 20, bottom: 30, left: 50},
        width = 600 - margin.left - margin.right,
        height = 270 - margin.top - margin.bottom;
    
    // Parse the date / time
    var parseDate = d3.time.format("%Y-%m-%d").parse;
    
    // Set the ranges
    var x = d3.time.scale().range([0, width]);
    var y = d3.scale.linear().range([height, 0]);
    
    // Define the axes
    var xAxis = d3.svg.axis().scale(x)
        .orient("bottom").ticks(5);
    
    var yAxis = d3.svg.axis().scale(y)
        .orient("left").ticks(5);
    
    // Define the line
    var valueline = d3.svg.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.impressions); });
        
    // Adds the svg canvas
    var svg = d3.select("body")
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform", 
                  "translate(" + margin.left + "," + margin.top + ")");

    // Get the data
    data.forEach(function(d) {
        d.date = parseDate(d.date);
        //d.date = d.date;
        d.impressions = +d.impressions;
    });

    // Scale the range of the data
    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain([0, d3.max(data, function(d) { return d.impressions; })]);

    // Add the valueline path.
    svg.append("path")
        .attr("class", "line")
        .attr("d", valueline(data));

    // Add the X Axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    // Add the Y Axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

}

/* Input like: [1,2,3,4,5] */
function draw(data) {
    var color = d3.scale.category20b();
    var width = 420,
        barHeight = 20;
 
    var x = d3.scale.linear()
        .range([0, width])
        .domain([0, d3.max(data)]);
 
    var chart = d3.select("#graph")
        .attr("width", width)
        .attr("height", barHeight * data.length);
 
    var bar = chart.selectAll("g")
        .data(data)
        .enter().append("g")
        .attr("transform", function (d, i) {
                  return "translate(0," + i * barHeight + ")";
              });
 
    bar.append("rect")
        .attr("width", x)
        .attr("height", barHeight - 1)
        .style("fill", function (d) {
                   return color(d)
               })
 
    bar.append("text")
        .attr("x", function (d) {
                  return x(d) - 10;
              })
        .attr("y", barHeight / 2)
        .attr("dy", ".35em")
        .style("fill", "white")
        .text(function (d) {
                  return d;
              });
}
 
function error() {
    console.log("error")
}
