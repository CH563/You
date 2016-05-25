// 导入需要的模块
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create(),
    plumber = require('gulp-plumber'),
    minifyCss = require('gulp-minify-css');


// 编译sass，其中plumber是防止出错崩溃的插件
gulp.task('sass', function() {
    gulp.src('src/style.scss')
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0'],
            cascade: true, //是否美化属性值 默认：true
            remove:true //是否去掉不必要的前缀 默认：true
        }))
        .pipe(plumber())
        .pipe(sass())
        .pipe(minifyCss())
        .pipe(gulp.dest('dist'));
});

// 编译jade
gulp.task('html', function() {
    gulp.src('src/index.html')
        .pipe(plumber())
        .pipe(gulp.dest('dist'));
});



// 默认任务
gulp.task('default', ['watch']);


// 监听任务
gulp.task('watch', function() {
    // 建立浏览器自动刷新服务器
    browserSync.init({
        server: {
            baseDir: "dist"
        }
    });


    // 预处理
    gulp.watch('src/**', ['html']);
    gulp.watch('src/**', ['sass']);

    // 自动刷新
    gulp.watch('dist/**', function() {
        browserSync.reload();
    });

});