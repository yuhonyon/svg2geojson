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

        var properties = content.replace(/[\f\n\r\t\v]/g, "").match(/"properties":[^\}]*\}/g);

        var coordJson={};

        for (var i = 0; i < properties.length; i++) {
            (function(i) {

                var coordName=properties[i].match(/"name":"[^"]*/)[0].replace(/"name":"/,"");
                var coord=properties[i].match(/"cp":[^\}]*/)[0].replace(/"cp":/,"");

                coordJson[coordName]=JSON.parse(coord);
            })(i);
        }


        coordJson = JSON.stringify(coordJson);

        file.contents = Buffer.from(coordJson);

        this.push(file);
        cb();
    });
};
