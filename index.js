const core = require('@actions/core');
const exec = require('@actions/exec');
const io = require('@actions/io');
const path = require('path');

const main = async () => {
    try {
        var modules = core.getInput('modules');
        var versionFilePath = core.getInput('version-file-path');
        var args = `-modulesList \"${modules}\" -versionFilePath \"${versionFilePath}\"`;
        var pwsh = await io.which("pwsh", true);
        var install = path.resolve(__dirname, 'unity-install.ps1');
        var exitCode = 0;

        console.log(`::group:: Unity Setup`);

        try{
            exitCode = await exec.exec(`"${pwsh}" -Command`, `${install} ${args}`);
        } catch {
            // Nothing
        }

        console.log(`::endgroup::`);

        if (exitCode != 0) {
            throw Error(`Unity Installation Failed! exitCode: ${exitCode}`)
        }
    } catch (error) {
        core.setFailed(error.message);
    }
}

// Call the main function to run the action
main();