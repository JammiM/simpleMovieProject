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
		/*
		express: {
		  all: {
		    options: {
		      bases: 'build',
		      livereload: true,
		      open: 'http://localhost:3000'
		    }
		  }
		},
		*/

		// browserSync for cross browser and cross device testing.
		browserSync: {
		  bsFiles: {
		    src : ['build/*.css', 'build/*.html']
		  },
		  options: {
		    watchTask: true,
		    server: {
		      baseDir: "build"
		    }
		  }
		},


		// Added grunt-parallel due to a optional dependency
		parallel: {
	    assets: {
	      options: {
	        grunt: true
	      },
	      tasks: ['fast', 'block', 'fast']
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
	grunt.loadNpmTasks('grunt-browser-sync');   //  'grunt-express' needs to be disabled for 'grunt-browser-sync' to work.
 //	grunt.loadNpmTasks('grunt-express');
	grunt.loadNpmTasks('grunt-parallel');


 	// The 'default' command runs these processes.
 	grunt.registerTask('default', ['pug', 'uglify']);

 	// The 'start' command starts the server and watch processes.
 	grunt.registerTask('start', ['browserSync', 'watch']);

};//module.exports
