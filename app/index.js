var generators  = require('yeoman-generator');
var _string     = require('underscore.string');

module.exports = generators.Base.extend({
    constructor: function() {
        generators.Base.apply(this, arguments);
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

        // Update title of app
        this.fs.copyTpl(
            this.templatePath('index.html'),
            this.destinationPath('index.html'),
            { title: this.appname }
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
        this.bowerInstall('https://raw.githubusercontent.com/SplitmediaLabsLimited/xui/gh-pages/dist/xui.js');
    },

    end: function() {
        this.log('XUI Scaffolding complete!');
    }
});
