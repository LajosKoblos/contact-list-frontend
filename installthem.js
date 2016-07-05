var fs = require('fs');
const execSync = require('child_process').execSync;

repos = ["contact-list-frontend-auth-service", "contact-list-frontend-contact-group-service", "contact-list-frontend-contact-service"]

process.chdir('..');

var prepRepo = function (repo) {
    if (!fs.existsSync(repo)) {
        console.log(repo);
        var cmd = execSync('git clone https://github.com/LajosKoblos/' + repo);
    } else {
        stats = fs.statSync(repo)
        if (stats.isDirectory()) {
            console.log(repo);
            process.chdir(repo);
            execSync('git clean -xfd');
            execSync('git pull origin master');
            process.chdir('..');
        }
    }

}

repos.forEach(prepRepo);

var packRepo = function (repo) {
    process.chdir(repo);
    console.log("building: "+ repo)
    execSync('npm pack');
//    execSync('copy *.tgz ' + repo + '.tgz');
    process.chdir('..');
}

repos.forEach(packRepo);


process.chdir('contact-list-frontend');

execSync('npm prune');

execSync('npm install');

execSync('npm run-script bundle');

