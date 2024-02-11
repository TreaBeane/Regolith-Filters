import * as fs from 'fs';
import * as Canvas from 'canvas';
import { glob } from 'glob';

const glyph_E1 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAYAAABccqhmAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwwAADsMBx2+oZAAAABl0RVh0U29mdHdhcmUAcGFpbnQubmV0IDQuMC4yMfEgaZUAAAUCSURBVHhe7do9iB1VFAfwNR+aNYiCqAsWNoIQEcFOCKiksBPTpQ1WRgQFC8HCxt5OTGGVzi5CIPax004LJURIodimsVAc77kzd3LfvDv7Pnaj+fj94Dgz5955CTL/s++97M59pFtRD6yu6x4aTuG+1V25cqVZsdZvaaqHRF2h1Y/6TxxGcOM1Uj0yXMLd6/VTO11dZ148vknYmuGPirV+S1P32++3Fip6pWbW2o4c6ZbqkGwzDNI9R4d6NNWxoQ0r7f+gL2vt3+g1Iuzd3z8s1WsvHFv3NZrhj4q1fkvTUshL0Of6+a6pFPZf/ri1VAcdAim4xcmhFb1cq+S7eul/brc7tBek/nAGve6bvb3ux1On5h/2RTkYV7+9Vu9v9Wbl8P/zc9ddf7qvm+8s1JpDoBn+qFjrtzQtBLzUfv18V60K/9sXv+vOfnltrFc+/GLrIZDC+USkd/BMqrXfBaS9J/NdvadS+R6Albqrn53L4f/18ufrDoEc9FKt67xrRoS7hP/7i+k5LUOgXMcQSOdrDIH8pMfxxo0buepebJgxG/S5fr6rNgyACP8b5z8a6xAGQMif3+MkNyupNQY7jqniJ30c6/AXRyb7Ho5rKHL4v3r/zDgE4p1A9PvlWd27Fz5YCH2p6Md6v60tD4Ac+L0c+H4I1Of9MLgXBkD5qV/Cv80AyH/hytBu9tPh8byYpPMI9bryoBhuhSyHP+qTsy91508/237Y25oDIPr98rzpAFg+rhwA5c8Z3/KXATD5CFBqajbo1XmtXN/uH+4AeCwSOlwuibXk+HC5IPWf7Jf3dSJVfjcAtRz8LcIf/tcB8OmFN8ufNVvVnqmF4FehL8eieW/+7zAA4iNA+RhwgAFQ3tIv3dPqTcX9sW9G/peAcoQQD1V386ev87GqTRzCACjfAeyNVQbA5Y/3Vg6A8tN+rrYZAP1yVl9P+0sDoA7/Nt8BpIDmEA+Xo1avJfbNaL5z4MHWdX9ejwdro4d0In/en1b0++X9vfXy7hD6fhDcrr0c/hW/D7A0AP7a3c1V97YYAEW5XuhNjnkIlMDXtWn4QwrqOADiGMp5HFfJN7QZADTFg7XxgzpRXqOutZ1+fieHfVrxC0HDljljuOcGQL0nbphYCv8Q+IW1OO9b2bg+HHsR9mltaQjseP9wudbrDVvDc6nydwqDo8MWuPvEEJjWsLSfMdyXLl1qVr0nbpgo/bG2HgCHKIX1xHCapet4V5D/6S4dm5/hU38469X70nkO/3QP3OvGcL937tV8rKv09hkALWVfvmcyAOrXqM/vqDq46bz5u/3rhNsA4H4zvs0vP+1ztzf2yp7c3dzcvdu+3oGkEG/8LX4EX/i5H5Vw1lXst7ap6b0Hea07pgS9DrzgAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMDdaGfnX42LMUEz4JvlAAAAAElFTkSuQmCC'

function run() {
    mkdirSync('data/create_glyphs');
    mkdirSync('data/create_glyphs/textures');

    // if (!fs.existsSync('data/create_glyphs/config.json')){
    //     fs.writeFileSync('data/create_glyphs/config.json', Buffer.from(JSON.stringify(defaultConfig(), null, 4)));
    // }

    const config = getConfig();
    const textures = fs.readdirSync('data/create_glyphs/textures')

    if (config.startingIndex === undefined){
        config.startingIndex = 30;
    }

    var glyphImage = new Canvas.Image();
    glyphImage.src = glyph_E1;

    var canvas = new Canvas.Canvas(glyphImage.width * config.scale, glyphImage.height * config.scale);
    var ctx = canvas.getContext('2d');

    ctx.imageSmoothingEnabled = config.imageSmoothing;
    ctx.drawImage(glyphImage, 0, 0, glyphImage.width * config.scale, glyphImage.height * config.scale);

    var index = 0;
    console.log(`Compiling glyphs at ${config.scale} scale and with image smoothing ${!config.imageSmoothing ? "disabled" : "enabled"}!`);

    const translateKeys = new Map();

    textures.forEach(texture => {
        var sortType = (config.legacySort !== undefined && !config.legacySort ? 10 : 16)
        var textureImage = new Canvas.Image();
        textureImage.src = fs.readFileSync('data/create_glyphs/textures/' + texture);
        var hRatio = (16 * config.scale) / textureImage.width;
        var vRatio = (16 * config.scale) / textureImage.height;
        var ratio = Math.min(hRatio, vRatio);
        var x = ((index % sortType) * (16 * config.scale));
        var y = (Math.floor(index / sortType) * (16 * config.scale)) + ((16 * config.scale) * parseInt(config.startingIndex)) / 10;

        //center
        var whr = textureImage.width / textureImage.height;
        var nw = (16 * config.scale);
        var nh = nw / whr;
        if (nh > (16 * config.scale)) {
            nh = (16 * config.scale);
            nw = nh * whr;
        }
        var offX = nw < (16 * config.scale) ? (((16 * config.scale) - nw) / 2) : 0;
        var offY = nh < (16 * config.scale) ? (((16 * config.scale) - nh) / 2) : 0;

        console.log(' > ' + texture);
        console.log('    - Hex value: 0xE1' + (parseInt(config.startingIndex, 16) + index).toString(16));
        let letter = String.fromCodePoint(parseInt('0xE1' + (parseInt(config.startingIndex, 16) + index).toString(16), 16));
        console.log('    - Letter: ' + letter);
        ctx.imageSmoothingEnabled = config.imageSmoothing;
        ctx.drawImage(textureImage, 0, 0, textureImage.width, textureImage.height, x + offX, y + offY, textureImage.width * ratio, textureImage.height * ratio);
        translateKeys.set(texture.substring(0, texture.indexOf('.')), letter);
        index++;
    });

    config.previousIndex = index
    let str = JSON.stringify(config)
    console.log("  >  Rewriting")
    console.log(str)
    fs.writeFileSync('data/create_glyphs/config.json', JSON.stringify(config))

    mkdirSync('RP/font');
    fs.writeFileSync('RP/font/glyph_E1.png', canvas.toBuffer());

    if (config.createTranslateKeys !== undefined && config.createTranslateKeys){
        glob.sync('RP/texts/**/*.lang').forEach(langFile => {
            let langData = fs.readFileSync(langFile, 'utf-8');
            translateKeys.forEach((value, key) => {
                langData += `\nglyph.${key}=${value}`;
            });
            fs.writeFileSync(langFile, langData);
        });
    }


}

function mkdirSync(path: string) {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
    }
}

function defaultConfig() {
    return {
        scale: 5.0625,
        imageSmoothing: false
    }
}

function getConfig() {
    const path = 'data/create_glyphs/config.json'
    const exists = fs.existsSync(path)
    return !exists ? defaultConfig() : JSON.parse(fs.readFileSync('', 'utf-8'));
}

run();