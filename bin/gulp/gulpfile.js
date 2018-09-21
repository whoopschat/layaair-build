'use strict';
const File = require('./utils/file');
const Html = require('./utils/html');
const Empty = require('./tasks/empty');
const Clean = require('./tasks/clean');
const Resources = require('./tasks/resources');
const Pngquant = require('./tasks/pngquant');
const Template = require('./tasks/template');
const Mergejs = require('./tasks/mergejs');
const Zipe = require('./tasks/zip');

const gulp = require('gulp');
const minimist = require('minimist');
const program = minimist(process.argv.slice(2), []);

if (!program.platform) {
    program.platform = 'h5';
}

if (!program.x) {
    console.log(`build to ...${program.platform}`);
}

if (program.input) {
    program.input = (program.bincwd || '.') + "/" + program.input;
}

if (program.output) {
    program.output = (program.bincwd || '.') + "/" + program.output + "/" + program.platform;
}

if (program.env) {
    if (program.env === 'prod' || program.env === 'production') {
        program.env = 'production';
    } else {
        program.env = 'development';
    }
}

const replaceList = [
]

const initReplaceList = (htmlFile) => {
    let projectname = program.projectname || Html.readValue({ file: htmlFile, selector: 'title' }, "WXGame");
    let orientation = program.orientation || Html.readValue({ file: htmlFile, selector: 'meta', attribute: 'screenorientation' }, "portrait");
    let app_id = program.appid || Html.readValue({ file: htmlFile, selector: 'meta', attribute: 'appid' }, "touristappid");
    replaceList.push(['${app_id}', app_id]);
    replaceList.push(['"${is_game_tourist}"', app_id === 'touristappid']);
    replaceList.push(['${orientation}', orientation]);
    replaceList.push(['${project_name}', projectname]);
    replaceList.push(['${env}', program.env || 'development']);
    replaceList.push(['${codeJs}', program.jsfile || 'code.js']);
}

const begin = () => {
    if ((program.platform == 'wechat' || program.platform == 'facebook' || program.platform == 'h5')
        && program.input && program.output) {
        let index = `${program.input}/${program.index || 'index.html'}`;
        if (File.existsSync(index)) {
            initReplaceList(index);
            return true;
        }
    }
    return false;
}

gulp.task('help', Empty.emptyTask(() => {
    console.log("");
    console.log("");
    console.log("Usage: layaair-build [options]");
    console.log("  --input            input dir");
    console.log("  --output           output dir");
    console.log("  --platform         [Optional] h5 || wechat || facebook def: h5");
    console.log("  --index            [Optional] index .html file def: index.html");
    console.log("  --env              [Optional] development || production(prod)");
    console.log("  --jsfile           [Optional] jsfile def: code.js");
    console.log("  --pngquality       [Optional] png quality def: 65-80");
    console.log("  --appid            [Optional] app id");
    console.log("  --projectname      [Optional] project name");
    console.log("  --orientation      [Optional] orientation");
    console.log("  --force            [Optional] [bool] ignore 'platform'-game.lock");
    console.log("  --min              [Optional] [bool] uglify js");
    console.log("  --x                [Optional] show this help");
    console.log("");
    console.log("");
    if (!program.x) {
        throw 'Invalid Parameters'
    }
}));

gulp.task('clean', Clean.cleanTask(program.output, `${program.platform}-game.lock`, program.force));

gulp.task('resources', Resources.resourcesTask(program.input, program.output));

gulp.task('pngquant', Pngquant.pngquantTask(program.input, program.output, program.pngquality || '65-80'));

gulp.task('mergejs', Mergejs.mergejsTask(`${program.input}/${program.index || 'index.html'}`, program.output, program.jsfile || 'code.js', program.min || program.env === 'production', replaceList));

gulp.task('template', Template.templateTask(`./dist/${program.platform}`, program.output, replaceList, `${program.platform}-game.lock`, program.force));

gulp.task('zip', Zipe.zipTask(program.platform, program.output));

gulp.task('build', function (done) {
    let tasks = [];
    if (program.x || !begin()) {
        tasks.push('help');
    } else {
        tasks.push('clean', 'resources', 'pngquant', 'mergejs', 'template', 'zip');
    }
    return gulp.series(tasks)(done);
});