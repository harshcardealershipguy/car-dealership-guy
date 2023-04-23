#!/usr/bin/env node

const fs = require('fs');

function createEnvFile() {
    const frontendEnvironmentArg = JSON.parse(JSON.parse(process.env.FRONTEND_ENVIRONMENT_ARG));
    const target = frontendEnvironmentArg.NEXT_JS_ENV;
    const dotenvPath = process.cwd() + `/.env.production`;

    let configFileContents = '';
    Object.keys(frontendEnvironmentArg).map((key) => {
        configFileContents += key + '=' + frontendEnvironmentArg[key] + '\n';
    })

    try {
        fs.writeFile(dotenvPath, configFileContents, (err) => {
            if (err) throw err;
        })

        console.log(`${dotenvPath} successfully copied with TARGET_ENV=${target}`);
    } catch (error) {
        console.error(
            `[copyEnvFile] there was an error copying ${dotenvPath} file`
        );
        console.error(error);
        throw err;
    }

    fs.readFile(dotenvPath, 'utf8', (err, data) => {
        if (err) {
            throw err;
        }
        console.log(data);
    })

    return;
}

createEnvFile();
