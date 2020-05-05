const { src, series, task } = require("gulp");
const clean = require("gulp-clean");
const shell = require("gulp-shell");
const { add, status, push } = require("gulp-git");

require('dotenv').config();

const stitch = require("./stitch.json");

// Run git add
// src is the file(s) to add (or ./*)
function addTask() {
    return src('./hosting/files')
      .pipe(add());
};

function statusTask() {
      status({args: '--porcelain'}, function (err, stdout) {
        if (err) throw err;
      });
};

// Run git push with options
// branch is the remote branch to push to
function pushTask(){
      push('origin', 'master', {args: " -f"}, function (err) {
        if (err) throw err;
      });
};

function cleanTask() {
    return src(["./hosting/files"], { read: false, allowEmpty: true })
       .pipe(clean());
 }
 function generateTask() {
    return src("./hugo", { read: true })
       .pipe(shell([
             `cd <%= file.path %> && hugo --baseURL https://${stitch.hosting.app_default_domain}`
       ]));
 }
 function deployTask() {
    return src("./hosting", { read: true })
       .pipe(shell([
             `stitch-cli login --private-api-key=${process.env.STITCH_PRIVATE_API_KEY} --api-key=${process.env.STITCH_API_KEY} --yes`,
             `stitch-cli import --include-hosting --yes`
       ]));
 }
exports.status = statusTask;
exports.push = pushTask;
exports.add = addTask;
exports.clean = cleanTask;
exports.generate = generateTask;
exports.build = series(cleanTask, generateTask);
exports.deploy = series(cleanTask, generateTask, deployTask);
