// Packaging script for .next platform
const fs = require('fs');
const path = require('path');
const appRootDir = require('app-root-dir').get();
const childProcess = require('child_process');
const pkg = require('pkg');
const archiver = require('archiver');
const rimraf = require('rimraf');
const packageInfo = require(path.join(appRootDir, 'package.json'));
const { info, error } = require('../src/helpers/console');

async function packageFull() {
    info(':gear:  TDUF.next FULL packaging');

    const packPath = path.join(appRootDir, 'pack');
    info('🧹 Cleaning packaging target...', { packPath });
    rimraf(path.join(packPath, "*"), () => {} );
    
    const clientPath = path.resolve(appRootDir, '../client');
    info(':globe_with_meridians: Processing webapp...', { clientPath });
    childProcess.execSync('npm run build', { cwd: clientPath });

    const serverPath = path.resolve(appRootDir, '../server');
    info(':robot_face: Processing server (All platforms)...', serverPath);
    const sourceExecutablePath = path.join(packPath, 'index-linux');
    const targetExecutable = 'tduf.next';
    await pkg.exec([/*'--debug',*/ '-c', './scripts/pkg.json', 'src/index.js', '--out-path', packPath ]);

    info(':open_file_folder: Processing assets (README and co)...');
    const assetsPath = path.join(appRootDir, 'dist');
    await fs.promises.copyFile(path.join(assetsPath, 'README.txt'), path.join(packPath, 'README.txt'));    
    
    // TODO handle all platforms
    info(':package: Zipping release server (:penguin: Linux)...');
    const releaseArchivePath = path.join(appRootDir, 'releases', `tduf-next-${packageInfo.version}-linux64.zip`);
    const outputStream = fs.createWriteStream(releaseArchivePath);

    /**
     * zlib has 10 compression levels (0-9).
     * Different levels have different compression performance in terms of compression ratio and speed .
     * Level 0 means no compression, zlib will output the original data
     */
    const releaseArchive = archiver('zip', {
      zlib: { level: 9 }, // Sets the compression level.
    });
    // listen for all archive data to be written
    // 'close' event is fired only when a file descriptor is involved
    outputStream.on('close', function() {
        info(':heavy_check_mark:  Archive created', { platform: 'linux', releaseArchivePath, totalBytes: releaseArchive.pointer() });
        info(':beer: All done!');
    });

    releaseArchive.pipe(outputStream);
    releaseArchive.file(sourceExecutablePath, { name: targetExecutable });
    releaseArchive.file(path.join(packPath, 'README.txt'), { name: 'README.txt' });
    releaseArchive.finalize();
}

try {
    (async () => {
        await packageFull();
    })();
} catch (err) {
    error('', err);
    throw 'TDUF full packaging error!';
}