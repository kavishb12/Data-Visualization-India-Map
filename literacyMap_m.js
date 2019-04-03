(function() {
    d3.queue()
        .defer(d3.json, "data(1).json")
        .defer(d3.json, "ne_10m_admin_0_Kashmir_Occupied.json")
        .await(function(error, topoMain, topoKashmir) {
            var districts, disputed;
            if (error) throw error;

            // Features for districts and disputed areas
            districts   = topojson.feature(topoMain, topoMain.objects.IND1);
            disputed    = topojson.feature(topoKashmir, topoKashmir.objects.ne_10m_admin_0_Kashmir_Occupied);

            // Radio HTML
            d3.select("#select").call(selectFilter());
            var filter  = d3.select('#select input[name="gender"]:checked').node().value;

            // Color codes for districts based on Literacy Rates
            colorCode(districts.features, filter);
            colorDisputed(disputed.features);

            // Map render
            var map     = districtMap(districts, disputed).width(800).height(700).scale(1200).propTag(filter);
            d3.select("#map").call(map);

            // On change of selection re-render
            d3.selectAll("#select input[name=gender]").on("change", function() {
                filter  = d3.select('#select input[name="gender"]:checked').node().value;
                colorCode(districts.features, filter);
                map     = districtMap(districts, disputed).width(800).height(700).scale(1200).propTag(filter);
                d3.select("#map").call(map);
            });
        });
}());

function selectFilter() {
    function render(selection) {
      selection.each(function() {
        d3.select(this).html("<form>"+
                             "<input type='radio' name='gender' value='TotalMarried' checked> ALL<br>"+
                             "<input type='radio' name='gender' value='FemaleMarried'> FEMALE<br>"+
                             "<input type='radio' name='gender' value='MaleMarried'> MALE"+
                             "</form>");
      });
    } // render
return render;
} // selectFilter

function colorCode(data, filter) {
    var color = d3.scale.threshold()
                  .domain([40, 42, 44, 46, 48, 50, 54])
                  .range(["#f1eef6", "#d0d1e6", "#a6bddb", "#74a9cf", "#3690c0","#0570b0","#034e7b"]);
    data.forEach(function(d) {
        if (isNaN(d.properties[filter])) { d.properties[filter] = 77; }
        d.color       = color(d.properties[filter]);
    });
}

function colorDisputed(data) {
    var color         = "#8484a8";
    data.forEach(function(d) {
        d.color       = color;
    });
}
