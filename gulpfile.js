var gulp = require('gulp');
var concat = require('gulp-concat');
//压缩js的模块
var uglify = require('gulp-uglify');

gulp.task('jsmin', function() {
    //导入需要压缩的js
    gulp.src(['js/base/*.js'])
        .pipe(concat("core.js"))
        .pipe(uglify({
            //mangle: {except: ['require' ,'exports' ,'module' ,'$']}//排除混淆关键字
            mangle: true, //是否修改变量名(混淆)（类型：Boolean，默认：true）
            compress: true //类型：Boolean 默认：true 是否完全压缩
            //preserveComments: 'all' //保留所有注释
        }))
        //导出压缩完的js
        .pipe(gulp.dest('dist/js'));
})
//监听js的改变，一旦改变，执行压缩
gulp.watch('js/base/*.js', ['jsmin'])
gulp.task('default', ['jsmin']);