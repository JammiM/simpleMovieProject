module.exports = function(grunt) {

	// Seting up some configuration.
	grunt.initConfig({

		pug: {
		  compile: {
	        options: {
	          pretty: true,
	        },
		    files: [{
		      expand: true,
		      cwd: "source/jade",
		      src: "*.jade",
		      dest: "build",
		      ext: ".html"
		    }]
		  }
		},

		// Grabs both JQuery and modernizr and merges them into one.
		uglify: {
		  bower_js_files: {
		    files: {
		      'build/output.min.js': [
		        'bower_components/jquery/dist/jquery.js',
		        'bower_components/modernizr/modernizr.js'
		      ]
		    }
		  }
		},

		// Local Server via Express.
		express: {
		  all: {
		    options: {
		      bases: 'build',
		      livereload: true,
		      open: 'http://localhost:3000'
		    }
		  }
		},

		// Watches for changes in code.
		watch: {
		  pug: {
		    files: [ 'source/jade/*.jade' ],
		    tasks: ['jade']
		  }
		},

	});//grunt.initConfig




    // Loading the grunt plugins.
	grunt.loadNpmTasks('grunt-contrib-pug');
	grunt.loadNpmTasks('grunt-autoprefixer');
 	grunt.loadNpmTasks('grunt-contrib-uglify');
 	grunt.loadNpmTasks('grunt-contrib-watch');
 	grunt.loadNpmTasks('grunt-express');


 	// The 'default' command runs these processes.
 	grunt.registerTask('default', ['pug', 'uglify']);

 	// The 'start' command starts the server and watch processes.
 	grunt.registerTask('start', ['express', 'watch']);

};//module.exports