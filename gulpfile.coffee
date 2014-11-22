# npm install -g bower
# npm install -g gulp
# npm install --save-dev coffee-script
# npm install --save-dev gulp-coffee

gulp   = require 'gulp'
coffee = require 'gulp-coffee'

files =
  coffee: 'src/**/*.coffee'

gulp.task 'coffee', () ->
  gulp.src files.coffee
    .pipe coffee()
    .pipe gulp.dest('js')

gulp.task 'watch', ->
  gulp.watch files.coffee, ['coffee']

gulp.task 'default', ['watch', 'coffee']
