function exec() {
    var endpoint = d3.select("#endpoint").property("value")
    var sparql = d3.select("#sparql").property("value")
    d3sparql.query(endpoint, sparql, render)
}
function render(json) {
    // set options and call the d3sparql.xxxxx visualization methods in this library ...
    var config = {
        "margin": {"top": 10, "right": 10, "bottom": 10, "left": 10},
        "selector": "#result"
    }
    d3sparql.forcegraph(json, config)
}