var gulp            = require("gulp");
var sass            = require("gulp-sass");
var minifyCss       = require("gulp-minify-css");
var rename          = require("gulp-rename");
var inject          = require("gulp-inject");
var series          = require("stream-series");
var angularFilesort = require("gulp-angular-filesort");
var autoprefixer    = require("gulp-autoprefixer");
var jshint 			= require('gulp-jshint');
var concat 			= require('gulp-concat');
var uglify 			= require('gulp-uglify');

// == PATH STRINGS ========

var paths = {
	root: "./www",
	sassFiles: [
		"./scss/**/*.scss"
	],
	sassMainFile: "./scss/main.scss",
	sassCompiledDestiny: "./dist/css/",
	vendorScripts: [
		"./www/lib/angular/angular.min.js",
		"./www/lib/angular-ui-router/release/angular-ui-router.min.js",
		"./www/lib/jquery/dist/jquery.min.js",
	],
	compiledVendorScripts: "./dist/libs/libs.min.js",
	appScripts: [
		"./www/app/**/*.js",
	],
	appViews: [
		"./www/app/**/*.html",
	],
	appImages: [
		"./www/images/**/*.*",
	],
	compiledAppScripts: [
		"./dist/app/**/*.js",
	],
	vendorStyles: [
	],
	appStyles: [
		"./dist/css/**/*.min.css",
		"./dist/app/app-core/components/3rd-party/jquery.bxslider/jquery.bxslider.css"
	],
	indexFile: "./www/index.html",
	indexCompiledDestiny: "./dist/index.html",
	distFolders:{
		distLibs: "./dist/libs/",
		distApp: "./dist/app/",
		distImages: "./dist/images/",
		distRoot: "./dist/"
	}
};

// == PIPE SEGMENTS ========

var pipes = {};

pipes.buildApp = function() {
	return gulp.src(paths.appScripts)
		.pipe(angularFilesort())
		.pipe(concat('app.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest(paths.distFolders.distApp));
}

pipes.buildViews = function() {
	return gulp.src(paths.appViews)
		.pipe(gulp.dest(paths.distFolders.distApp));
}

pipes.copyImages = function() {
	return gulp.src(paths.appImages)
		.pipe(gulp.dest(paths.distFolders.distImages));
}

pipes.buildLibs = function() {
	return gulp.src(paths.vendorScripts)
		.pipe(concat('libs.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest(paths.distFolders.distLibs));
}

pipes.compileSass = function() {
	return gulp.src(paths.sassMainFile)
		.pipe(sass())
		.on("error", sass.logError)
		.pipe(minifyCss({ keepSpecialComments: 0 }))
		.pipe(autoprefixer({
			browsers: ["last 2 versions"],
			cascade: false
		}))
		.pipe(rename({ extname: ".min.css" }))
		.pipe(gulp.dest(paths.sassCompiledDestiny));
};

pipes.validatedAppScripts = function() {
	var _files = paths.appScripts;
	_files.push("!**/*.html");

    return gulp.src(_files)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
};

pipes.buildIndex = function () {
	var vendorScripts = gulp.src(paths.compiledVendorScripts, {read: false});
	var appScripts = gulp.src(paths.compiledAppScripts, {read: false});
	var vendorStyles  = gulp.src(paths.vendorStyles, {read: false});
	var appStyles  = gulp.src(paths.appStyles, {read: false});

	return gulp.src(paths.indexFile)
		.pipe(inject(series(vendorScripts, appScripts, vendorStyles, appStyles), {ignorePath: 'dist/', addRootSlash: false}))
		.pipe(gulp.dest(paths.distFolders.distRoot));
};

pipes.sassWatcher = function() {
	gulp.watch(paths.sassFiles, ["sass"]);
};

pipes.scriptsWatcher = function() {
	gulp.watch(paths.appScripts, ["build:app", "build:index"]);
};

// == JS HINT ========
gulp.task('validate:scripts', pipes.validatedAppScripts);

// == SASS ========
gulp.task("sass", pipes.compileSass);
gulp.task('watch:sass', pipes.sassWatcher);
gulp.task("watch:scripts", pipes.scriptsWatcher);

// == DIST =======
gulp.task("build:app", pipes.buildApp);
gulp.task("build:views", pipes.buildViews);
gulp.task("build:libs", pipes.buildLibs);
gulp.task("copy:images", pipes.copyImages);

// == SURGE CNAME =======
gulp.task("copy:cname", function() {
	gulp.src("./CNAME")
		.pipe(gulp.dest(paths.distFolders.distRoot));
});

// == INJECTORS ========
gulp.task("build:index", ["sass", "build:app", "build:views", "build:libs", "copy:images"], pipes.buildIndex);

gulp.task("default", [
	"build:index"
]);
