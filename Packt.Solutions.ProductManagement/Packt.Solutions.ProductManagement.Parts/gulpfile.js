'use strict';

const replace = require("gulp-replace");
const rename = require("gulp-rename");
const semver = require('semver');

const build = require('@microsoft/sp-build-web');

let versionSubTask = build.subTask('version-subtask', function(gulp, buildOptions, done) {

  const version = buildOptions.args["newversion"];
  this.log(`Updating solution to version ${version}`);
  
  return gulp.src("**/*.template.json")
      .pipe(replace("{{VERSION}}", function handleReplace() {
        
        const semverVersion = `${semver.major(version)}.${semver.minor(version)}.${semver.patch(version)}`;

        if (this.file.basename.indexOf("package-solution") !== -1) {
          return `${semverVersion}.0`;
        }

        return semverVersion;
       
      }))
      .pipe(rename((path) => {
          return {
              dirname: path.dirname,
              basename: path.basename.replace(".template",""),
              extname: ".json"
          };
      }))
      .pipe(gulp.dest("./"));
});

build.configureWebpack.mergeConfig({
  additionalConfiguration: (generatedConfiguration) => {
    generatedConfiguration.module.rules.push(
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ["@babel/preset-env", {"targets": {"ie": "11"}}]
            ]
          }
        }
      }
    );
    return generatedConfiguration;
  }
});

// Register the custom gulp task
build.task('version', versionSubTask);

build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);

var getTasks = build.rig.getTasks;
build.rig.getTasks = function () {
  var result = getTasks.call(build.rig);

  result.set('serve', result.get('serve-deprecated'));

  return result;
};


build.initialize(require('gulp'));
