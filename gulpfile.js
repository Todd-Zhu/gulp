/**
 * 组件安装
 * npm install gulp-util gulp-imagemin gulp-ruby-sass gulp-minify-css gulp-jshint gulp-uglify gulp-rename gulp-concat gulp-clean gulp-livereload tiny-lr --save-dev
 */

// 引入 gulp及组件
var gulp    = require('gulp'),                 //基础库
    htmlmin = require('gulp-htmlmin'),         //html压缩
    imagemin = require('gulp-imagemin'),       //图片压缩
    sass = require('gulp-ruby-sass'),          //sass
    minifycss = require('gulp-minify-css'),    //css压缩
    jshint = require('gulp-jshint'),           //js检查
    uglify  = require('gulp-uglify'),          //js压缩
    rename = require('gulp-rename'),           //重命名
    concat  = require('gulp-concat'),          //合并文件
    clean = require('gulp-clean'),             //清空文件夹
    tinylr = require('tiny-lr'),               //livereload
    server = tinylr(),
    port = 8001,
    livereload = require('gulp-livereload');   //livereload

// HTML处理
gulp.task('html', function() {
    var htmlSrc = './src/*.html',
        htmlDst = './dist/';

    gulp.src(htmlSrc)
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(htmlDst));
});

// sass编译为css,并压缩
gulp.task('scssmin', function () {
    var scssSrc = './src/scss/*.scss',
        scssDst = './dist/css';

    return sass(scssSrc)
    .on('error', sass.logError)
    .pipe(minifycss())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(scssDst));
});

// sass编译为css,不压缩
gulp.task('scss', function () {
    var scssSrc = './src/scss/*.scss',
        scssDst = './dist/css';

    return sass(scssSrc)
    .on('error', sass.logError)
    // .pipe(minifycss())
    // .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(scssDst));
});

// 图片处理
gulp.task('images', function(){
    var imgSrc = './src/images/**/*',
        imgDst = './dist/images';
    gulp.src(imgSrc)
        .pipe(imagemin())
        .pipe(gulp.dest(imgDst));
})

// js处理
gulp.task('js', function () {
    var jsSrc = './src/js/*.js',
        jsDst ='./dist/js';

    gulp.src(jsSrc)
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
        // .pipe(concat('main.js')) //合并
        .pipe(gulp.dest(jsDst))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest(jsDst));
});

// 清空图片、样式、js
gulp.task('clean', function() {
    gulp.src(['./dist/css', './dist/js', './dist/images'], {read: false})
        .pipe(clean());
});

// 默认任务 清空图片、样式、js并重建 运行语句 gulp
gulp.task('default', ['clean'], function(){
    gulp.start('html','scssmin','images','js');
});

// 监听任务 运行语句 gulp watch
gulp.task('watch',function(){
    // 监听html
    gulp.watch('./src/*.html', function(event){
        gulp.run('html');
    })

    // 监听css
    gulp.watch('./src/scss/*.scss', function(){
        gulp.run('scssmin');
    });

    // 监听images
    gulp.watch('./src/images/**/*', function(){
        gulp.run('images');
    });

    // 监听js
    gulp.watch('./src/js/*.js', function(){
        gulp.run('js');
    });
});