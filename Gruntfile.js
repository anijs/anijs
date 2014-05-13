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
		},

		replace: {
		  example: {
		    src: ['dist/anijs-min.js'],             // source files array (supports minimatch)
		    dest: 'dist/anijs-min.js',             // destination directory or file
		    replacements: [
		    	{ from: '_createDefaultHelper', to: '_a' },
		    	{ from: '_createParser', to: '_b' },
		    	{ from: '_setupElementAnim', to: '_c' },
		    	{ from: '_setupElementSentenceAnim', to: '_d' },
		    	{ from: '_eventHelper', to: '_e' },
		    	{ from: '_eventTargetHelper', to: '_f' },
		    	{ from: '_behaviorTargetHelper', to: '_g' },
		    	{ from: '_behaviorHelper', to: '_h' },
		    	{ from: '_afterHelper', to: '_i' },
		    	{ from: '_beforeHelper', to: '_j' },
		    	{ from: '_callbackHelper', to: '_k' },
		    	{ from: '_helperHelper', to: '_l' },
		    	{ from: '_eventProviderHelper', to: '_m' },
		    	{ from: '_getParsedAniJSSentenceCollection', to: '_n' },
		    	{ from: '_findAniJSNodeCollection', to: '_o' },
		    	{ from: '_animationEndPrefix', to: '_p' },
		    	{ from: '_transitionEndPrefix', to: '_q' },
		    	{ from: '_endPrefixBrowserDetectionIndex', to: '_r' },
		    	{ from: '_animationEndPrefix', to: '_s' },
		    ]
		  }
		}


	});

  	// Load task-providing plugins.
  	grunt.loadNpmTasks('grunt-contrib-copy');
  	grunt.loadNpmTasks('grunt-contrib-uglify');
  	grunt.loadNpmTasks('grunt-text-replace');


	grunt.registerTask(
		'prod',
		'Compiles all of the assets and copies the files to the build directory.', 
		[ 'uglify', 'copy', 'replace']
	);
};