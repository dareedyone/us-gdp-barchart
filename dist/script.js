let tooltip = d3.select("#svgholder").
append("div").
attr("id", "tooltip").
style("opacity", 0);
let DrawBar = dataset => {
  const margin = { top: 50, right: 20, bottom: 50, left: 100 },
  width = 800,
  height = 400,
  padding = 60,
  barW = width / 275;
  // let minDate = dataset[0][0].substr(0,4);
  let minDate = d3.min(dataset, d => new Date(d[0]));
  let maxDate = d3.max(dataset, d => new Date(d[0]));
  console.log(JSON.stringify(maxDate));
  // console.log(dataset);
  maxDate.setMonth(maxDate.getMonth() + 3);
  console.log(JSON.stringify(maxDate));
  let xScale = d3.scaleTime().
  domain([minDate, maxDate]).
  range([0, width]);
  let yScale = d3.scaleLinear().
  domain([0, d3.max(dataset, d => d[1])]).
  range([height, 0]);

  let xAxis = d3.axisBottom(xScale);
  let yAxis = d3.axisLeft(yScale);

  const svg = d3.select('#svgholder').
  append("svg").
  attr("width", width + margin.left + margin.right).
  attr("height", height + margin.top + margin.bottom).
  style("border", "2px solid red");

  svg.append("g").
  attr("transform", `translate(${margin.left}, ${height + margin.top})`).
  attr("id", "x-axis").
  call(xAxis);

  svg.append("g").
  attr("transform", `translate(${margin.left}, ${0 + margin.top})`).
  attr("id", "y-axis").
  call(yAxis);

  svg.append("g").
  attr("transform", `translate(${margin.left}, ${margin.top})`).
  selectAll("rect").
  data(dataset).
  enter().
  append("rect").
  attr("class", "bar").
  attr("data-date", d => d[0]).
  attr("data-gdp", d => d[1]).
  attr("x", (d, i) => i * (width / dataset.length)).
  attr("y", d => yScale(d[1])).
  attr("width", width / dataset.length).
  attr("height", d => height - yScale(d[1])).
  style("fill", "#4f1b87").


  on('mouseover', function (d, i) {
    d3.select(this).
    style('opacity', .1).
    transition();
    // .duration(0);
    tooltip.html('<p class="m-0"> Date: ' + d[0] + '</p>' +
    '<p class="m-0"> Billions: ' + d[1] + '</p>').
    transition().
    duration(0).
    style('opacity', .9).
    style('left', i * barW + 180 + 'px').
    style('top', height + 'px').
    attr("data-date", d[0]);
    //     console.log("mine", d[0]);
    // console.log("teach", dataset[i][0]);


  }).
  on('mouseout', function (d) {
    d3.select(this).
    style('opacity', 1);
    tooltip.transition().
    duration(200).
    style('opacity', 0);
    // overlay.transition()
    //   .duration(200)
    //   .style('opacity', 0);
  });



};

d3.json('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json', { 'Access-Control-Allow-Origin': '*' }).
then(function (data) {
  var dataset = data.data;
  DrawBar(dataset);

}).
catch(function (err) {console.log(err);});