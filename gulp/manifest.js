'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var manifest = require('gulp-manifest');

var $ = require('gulp-load-plugins')();

gulp.task('manifest', function(){
    gulp.src(['src/**/*'])
        .pipe(manifest({
            hash: true,
            preferOnline: true,
            network: ['http://*', 'https://*', '*'],
            filename: 'app.manifest',
            exclude: 'app.manifest'
        }))
        .pipe(gulp.dest('src'));
});

gulp.task('manifest:dist', function(){
    gulp.src(['dist/**/*'])
        .pipe(manifest({
            hash: true,
            preferOnline: true,
            network: ['http://*', 'https://*', '*'],
            filename: 'app.manifest',
            exclude: 'app.manifest'
        }))
        .pipe(gulp.dest('dist'));
});