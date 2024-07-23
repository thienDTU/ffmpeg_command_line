const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const inputVideo = 'input.mp4';
const outputDirectory = 'output_hls';
const outputFile = path.join(outputDirectory, 'output.m3u8');

if (!fs.existsSync(outputDirectory)) {
    fs.mkdirSync(outputDirectory);
}

const ffmpegCommand = `ffmpeg -i ${inputVideo} -codec: copy -start_number 0 -hls_time 10 -hls_list_size 0 -f hls ${outputFile}`;

exec(ffmpegCommand, (error, stdout, stderr) => {
    if (error) {
        console.error(`Error executing FFmpeg: ${error.message}`);
        return;
    }

    if (stderr) {
        console.log(`FFmpeg stderr: ${stderr}`);
    }

    console.log(`FFmpeg stdout: ${stdout}`);
    console.log('Chuyển đổi video thành công!');
});
