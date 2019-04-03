var color = d3.scale.ordinal()
    .domain(["1450"])
    .range(["#1a9850", "#66bd63", "#a6d96a","#d9ef8b","#ffffbf","#fee08b","#fdae61","#f46d43","#d73027"]);

    var legend = d3.select('svg')
        .append("g")
        .selectAll("g")
        .data(color.domain())
        .enter()
        .append('g')
          .attr('class', 'legend')
          .attr('transform', function(d, i) {
            var height = legendRectSize;
            var x = 0;
            var y = i * height;
            return 'translate(' + x + ',' + y + ')';
        });
        legend.append('rect')
            .attr('width', legendRectSize)
            .attr('height', legendRectSize)
            .style('fill', color)
            .style('stroke', color);

        legend.append('text')
            .attr('x', legendRectSize + legendSpacing)
            .attr('y', legendRectSize - legendSpacing)
            .text(function(d) { return d; });
