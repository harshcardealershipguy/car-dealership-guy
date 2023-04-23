#!/usr/bin/env node

const fs = require('fs');

const env = {
    production: 'production',
    staging: 'staging',
};

function createEnvFile() {
    const target = env[process.env.NEXT_JS_ENV] || env.staging;
    const dotenvPath = process.cwd() + `/.env.production`;

    console.log(process.env);


    const prodDotEnv = '.env.production';
    try {
        fs.writeFile(dotenvPath, JSON.stringify(process.env), (err) => {

            // In case of a error throw err.
            if (err) throw err;
        })

        console.log(`${prodDotEnv} successfully copied with TARGET_ENV=${target}`);
    } catch (error) {
        console.error(
            `[copyEnvFile] there was an error copying ${prodDotEnv} file`
        );
        console.error(error);
    }


    fs.readFile(dotenvPath, 'utf8', (err, data) => {

        if (err) {
            console.error(err);
            return;
        }
        console.log(data);
    })

    return;
}

createEnvFile();
