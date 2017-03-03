
'use strict';

// Basic template description.
exports.description = 'Create a Grunt plugin';


// Any existing file or directory matching this wildcard will cause a warning.
//exports.warnOn = '*';

// The actual init template.
exports.template = function(grunt, init, done) {

  init.process({type: 'grunt'}, [
    // Prompt for these values.
    init.prompt('name', function(value, props, done) {
      // Prepend grunt- to default name.
      var name = 'grunt-' + value;
      
      done(null, name);
    }),
    init.prompt('description', 'The best Grunt plugin'),
    init.prompt('version'),
    init.prompt('homepage'),
    init.prompt('licenses'),
    init.prompt('author_name'),
    init.prompt('grunt_version'),
    init.prompt('node_version', grunt.package.engines.node)
  ], function(err, props) {
    // Set a few grunt-plugin-specific properties.
    props.short_name = props.name.replace(/^grunt[\-_]?/, '').replace(/[\W_]+/g, '_').replace(/^(\d)/, '_$1');
    props.npm_test = 'grunt test';
    props.keywords = ['gruntplugin'];
    props.devDependencies = {
      'grunt-contrib-jshint': '^0.9.2',
      'grunt-contrib-clean': '^0.5.0',
      'grunt-contrib-nodeunit': '^0.3.3',
    };

    // Files to copy (and process).
    var files = init.filesToCopy(props);

    // Add properly-named license files.
    init.addLicenseFiles(files, props.licenses);

    // Actually copy (and process) files.
    init.copyAndProcess(files, props);

    // Generate package.json file.
    init.writePackageJSON('package.json', props);

    // All done!
    done();
  });

};
