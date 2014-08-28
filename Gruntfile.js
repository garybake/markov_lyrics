module.exports = function(grunt){

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.config('clean',{
    // clean:dist - cleans build and tmp folder
    dist: {
      src: ["build", "tmp"]
    },
    // clean:just - cleans tmp folder
    justTmp: {
      src: ["tmp"]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.config('jshint', {
    all: {
      src: ['tmp/compiled.js'],
      options: {
      // more options here if you want to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true
        }
      }
    }
  });

  // npm install grunt-contrib-concat --save-dev
  // Concatenates files 
  grunt.loadNpmTasks('grunt-contrib-concat');
  // grunt concat:scripts
  grunt.config('concat', {
    scripts: {
      src: [
        'bower_components/jquery/dist/jquery.js',
        'resources/scripts/appWords.js'
      ],
      dest: 'tmp/app.js'
    }
  });

  // npm install grunt-contrib-uglify --save-dev
  // grunt uglify:scripts
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.config('uglify', {
    scripts: {
      files: {
        'build/app.min.js': 'tmp/app.js'
      }
    }
  });

  // // minify css
  // grunt.loadNpmTasks('grunt-contrib-cssmin');
  // grunt.config('cssmin',{
  //   app:{
  //     files:{
  //       'build/app.min.css':['bower_components/bootstrap/dist/css/bootstrap.css']
  //     }
  //   }
  // });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.config('copy', {
    css: {
        src: 'bower_components/bootstrap/dist/css/bootstrap.min.css',
        dest: 'build/bootstrap.min.css'
    },
    html: {
        src: 'devindex.html',
        dest: 'build/index.html'
    },
    data: {
        src: 'resources/data/*',
        dest: 'build/'
    },
  });

  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.config('compress', {
    main: {
        options: {
          archive: 'archive.zip'
        },
        files: [
          {
            expand: true,
            src: ['**/*'],
            cwd: 'build/'
          },
        ]
      }
  });

  grunt.registerTask('build', "Builds the application.",
    ['clean:dist', 'concat:scripts', 'copy', 'uglify', 'clean:justTmp']);

  grunt.registerTask('buildProd', "Builds the application.",
    ['build', 'compress']);
};