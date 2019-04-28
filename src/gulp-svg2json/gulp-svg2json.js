var through2 = require('through2');

module.exports = function(options) {
    return through2.obj(function(file, enc, cb) {

        if (file.isNull()) {
            this.push(file);
            return cb();
        }

        if (file.isStream()) {
            this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
            return cb();
        }
        var content = file.contents.toString();
        var alljson = {
            "type": "FeatureCollection",
            "features": []
        }
        var g = content.replace(/[\f\n\r\t\v]/g, "").match(/<g([\s\S](?!\/g>))*<\/g>/g);

        for (var i = 0; i < g.length; i++) {
            (function(i) {
                var name = g[i].match(/id="[^"]*/)[0].replace(/id="/, "");
                var points = g[i].match(/points="[^"]*/);
                if (points) {
                    points = points[0].replace(/points="\s*/, "[[").replace(/(\s)+/g, "],[").replace(/,\[$/, "]");
                }
                var cx = g[i].match(/cx="[^"]*/);
                var cy = g[i].match(/cy="[^"]*/);
                var cp = null;
                if (cx && cy) {
                    cp = cx[0].replace(/cx="/, "") + "," + cy[0].replace(/cy="/, "");
                }

                var features = '{"type":"Feature","properties":{"name":"' + name + '","cp":[' + cp + ']},"geometry":{"type":"Polygon","coordinates":[' + points + ']}}';
                features = JSON.parse(features)
                alljson.features.push(features);
            })(i);
        }




        alljson = JSON.stringify(alljson);

        file.contents = Buffer.from(alljson);

        this.push(file);
        cb();
    });
};
