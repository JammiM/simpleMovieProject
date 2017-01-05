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

		less: {
			development: {
				options: {
					paths: ["assets/css"]
				},
				files: {"build/style.css": "source/less/style.less"}
			},
			 production: {
				options: {
					paths: ["assets/css"],
					cleancss: true
				},
				files: {"build/style.css": "source/less/style.less"}
			}
		},

		autoprefixer: {
		    options: {
					// List of browsers  https://github.com/ai/browserslist
		      browsers: ['last 2 versions', 'ie 8', 'ie 9', 'ff > 0', 'ie > 0', 'Opera > 0']
		    },
		    your_target: {
		      // Target-specific file lists and/or options go here.
					src: 'build/style.css',
          dest: 'build/style.css'
		    },
		  },

		// Local Server via Express.

		express: {
		  all: {
		    options: {
		      bases: ['build','bower_components'],
		      livereload: true,
		      open: 'http://localhost:3000'
		    }
		  }
		},


		// browserSync for cross browser and cross device testing.
		/*
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
		*/

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
		    tasks: ['pug']
		  }
		},

	});//grunt.initConfig


  // Loading the grunt plugins.
	grunt.loadNpmTasks('grunt-contrib-pug');
	grunt.loadNpmTasks('grunt-autoprefixer');
 	grunt.loadNpmTasks('grunt-contrib-uglify');
 	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-less');
	//grunt.loadNpmTasks('grunt-browser-sync');   // 'grunt-express' needs to be disabled for 'grunt-browser-sync' to work.
  grunt.loadNpmTasks('grunt-express');
	grunt.loadNpmTasks('grunt-parallel');


 	// The 'default' command runs these processes.
 	grunt.registerTask('default', ['pug', 'uglify', 'less', 'autoprefixer']);

 	// The 'start' command starts the server and watch processes.
 	grunt.registerTask('start', ['express', 'watch']);
 	//grunt.registerTask('start', ['browserSync', 'watch']);


};//module.exports
