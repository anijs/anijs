module.exports = function(grunt) {
  // Project Configuration
	grunt.initConfig({
		uglify: {
			my_target: {
				options: {
      				mangle: true,
					compress: {
						drop_console: true
					}      				
    			},
				files: {
					'dist/anijs-min.js': ['src/anijs.js'],
				}
			}
		},
		copy: {
			remoteProduction: {
				src: [
						'src/anijs.js'
					],
				dest: 'dist/anijs.js',
				options: {
				}
			}
		}
	});

  	// Load task-providing plugins.
  	grunt.loadNpmTasks('grunt-contrib-copy');
  	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask(
		'prod',
		'Compiles all of the assets and copies the files to the build directory.', 
		[ 'uglify', 'copy' ]
	);
};