const HttpError = require('../../middleware/http-error');

const chunkCount = (chunk) => {
    let text = chunk.toString();

    return {
        characters: text.split('').length,
        spaces: text.match(/\s/g).length,
        commas: text.match(/,/g).length,
        dots: text.match(/\./g).length,
        lines: text.split('\n')
    }
};

const readHudgeData = async (req) => {
    return new Promise((resolve, reject) => {
        let textData;
        let count = {
            characters: 0,
            spaces: 0,
            commas: 0,
            dots: 0
        };

        req.on('data', (chunk) => {
            count['characters'] += chunkCount(chunk).characters;
            count['spaces'] += chunkCount(chunk).spaces;
            count['commas'] += chunkCount(chunk).commas;
            count['dots'] += chunkCount(chunk).dots;
        });

        req.on('end', () => resolve(count));
        req.on('error', (error) => reject(new HttpError(500, error)));
    })
};

module.exports = {
    readHudgeData
};