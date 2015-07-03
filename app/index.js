var generators  = require('yeoman-generator');
var path        = require('path');
var _string     = require('underscore.string');

module.exports = generators.Base.extend({
    constructor: function() {
        generators.Base.apply(this, arguments);

        this.sourcePath = path.join(process.cwd(), 'src');
    },

    prompting: function() {
        var done = this.async();

        this.prompt([{
            type     : 'input',
            name     : 'appname',
            message  : 'Plugin name',
            default  : this.appname
        }, {
            type     : 'list',
            name     : 'apptype',
            message  : 'Plugin type',
            choices  : ['Source', 'Global Script'],
            filter   : function(value) {
                return value.toLowerCase().replace(/ /ig, '-');
            }
        }, {
            type     : 'input',
            name     : 'appversion',
            message  : 'Plugin version',
            default  : '0.0.0'
        }], function(answers) {
            Object.keys(answers).forEach(function(key) {
                this[key] = answers[key];
            }.bind(this));
            this.propername = this.appname.toLowerCase().replace(/ /ig, '-');
            done();
        }.bind(this));
    },

    writing: function() {
        // Copy whole directory
        this.fs.copy(
            this.sourceRoot(),
            this.destinationRoot()
        );

        this.fs.copy(
            this.templatePath('.bowerrc'),
            this.destinationPath('.bowerrc')
        );

        // Update title of app
        this.fs.copyTpl(
            this.templatePath('index.html'),
            this.destinationPath('index.html'),
            { title: this.appname, apptype: this.apptype }
        );

        this.fs.copyTpl(
            this.templatePath('package.json'),
            this.destinationPath('package.json'),
            { name: this.propername, version: this.appversion }
        );

        this.fs.copyTpl(
            this.templatePath('bower.json'),
            this.destinationPath('bower.json'),
            { name: this.propername, version: this.appversion }
        );

        if (this.apptype === 'global-script') {
            this.fs.delete(
                this.destinationPath('index_config.html')
            );
            this.fs.delete(
                this.destinationPath('index.xml')
            );
        }
        else {
            this.fs.copyTpl(
                this.templatePath('index_config.html'),
                this.destinationPath('index_config.html'),
                { title: this.appname }
            );
            this.fs.copyTpl(
                this.templatePath('index.xml'),
                this.destinationPath('index.xml'),
                {
                    name     : this.appname,
                    propname : this.propername,
                    version  : this.appversion
                }
            );
        }
    },

    install: function() {
        this.npmInstall([
            'gulp',
            'gulp-tsc',
            'browser-sync'
        ]);
        this.bowerInstall('xui-framework');
    },

    end: function() {
        this.log('Renaming Files (Please press ENTER)');
        // Re-name es6-promise definition file
        var defPath = path.join(
            this.sourcePath,
            'bower_components',
            'es6-promise.d');

        process.chdir(defPath);

        this.fs.move('index.ts', 'index.d.ts');

        this.log('XUI Scaffolding complete!');
    }
});
