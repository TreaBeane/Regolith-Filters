"use strict";
/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/naming-convention */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var Jimp = require("jimp");
var font_choice_1 = require("./font-choice");
var fs = require("fs");
var crypto_1 = require("crypto");
var index = 0;
var cache = undefined;
function run() {
    return __awaiter(this, void 0, void 0, function () {
        var assetDirExist, fonts, data, enteries, i, hologramEntry, namespace, trigger, text;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!fs.existsSync("data/create_holograms")) {
                        fs.mkdirSync("data/create_holograms");
                    }
                    assetDirExist = fs.existsSync("data/create_holograms/assets");
                    if (!assetDirExist) {
                        console.error("Asset directory was not create. You must copy the asset directory from sample over to use this filter!");
                        return [2 /*return*/];
                    }
                    if (!fs.existsSync("data/create_holograms/holograms.lang")) {
                        fs.writeFileSync("data/create_holograms/holograms.lang", Buffer.from("", "utf-8"));
                    }
                    fs.mkdirSync("../../create_holograms/", { recursive: true });
                    if (!fs.existsSync("../../create_holograms/cache.json")) {
                        fs.writeFileSync("../../create_holograms/cache.json", Buffer.from(JSON.stringify({}, null, 4), "utf-8"));
                    }
                    cache = JSON.parse(fs.readFileSync("../../create_holograms/cache.json", "utf-8"));
                    return [4 /*yield*/, (0, font_choice_1.scanFontChoice)()];
                case 1:
                    fonts = _a.sent();
                    data = fs.readFileSync("data/create_holograms/holograms.lang", "utf-8");
                    enteries = data.split("\n");
                    // Creates default hologram files if BP is missing (lazy since I don't actually check all files, just assume if BP is missing they all are :PP)
                    createBPHologramEntityFile();
                    createRPHologramEntityFile();
                    createHologramRenderFile();
                    createHologramAnimationFile();
                    i = 0;
                    _a.label = 2;
                case 2:
                    if (!(i < enteries.length)) return [3 /*break*/, 7];
                    if (enteries[i][0] === "#" || !enteries[i].includes('=')) {
                        // This is for comments or not a valid line
                        return [3 /*break*/, 6];
                    }
                    hologramEntry = enteries[i];
                    namespace = hologramEntry.substring(0, hologramEntry.indexOf("="));
                    trigger = undefined;
                    if (namespace.includes("<") && namespace.includes(">")) {
                        trigger = namespace.substring(namespace.indexOf("<") + 1, namespace.indexOf(">"));
                        namespace = namespace.substring(0, namespace.indexOf("<"));
                        //console.log(' > ' + namespace);
                        //console.log('   - trigger: ' + trigger);
                    }
                    else {
                        //console.log(' > ' + namespace);
                    }
                    text = hologramEntry.substring(hologramEntry.indexOf("=") + 1, hologramEntry.length);
                    if (!fs.existsSync('RP/' + text.replace(/\r/g, ''))) return [3 /*break*/, 4];
                    return [4 /*yield*/, createHologramWithImage(namespace, trigger, text, cache[namespace])];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 6];
                case 4: 
                //console.log('   - text: ' + text);
                return [4 /*yield*/, createHologram(namespace, trigger, text, true, fonts, cache[namespace])];
                case 5:
                    //console.log('   - text: ' + text);
                    _a.sent();
                    _a.label = 6;
                case 6:
                    i++;
                    return [3 /*break*/, 2];
                case 7:
                    fs.writeFileSync('../../create_holograms/cache.json', JSON.stringify(cache, null, 4));
                    return [2 /*return*/];
            }
        });
    });
}
function createHologram(namespace, trigger, text, background, fonts, cacheData) {
    return __awaiter(this, void 0, void 0, function () {
        var lines, i, line, trueText, cleanText, texturePath, width, height, path, index, fileData, BPHologramEntity, fileData, RPHologramEntity, fileData, renderController;
        var _a;
        return __generator(this, function (_b) {
            if (cacheData === undefined) {
                cacheData = {
                    text: undefined,
                    variant: undefined,
                    texture: undefined
                };
            }
            //Ensure user input values are not undefined (if undefined means they hit esc and want to cancel the command)
            if (background === undefined || text === undefined) {
                return [2 /*return*/];
            }
            lines = text.split("\\n");
            // Need a color code to start each line.
            for (i = 0; i < lines.length; i++) {
                line = lines[i];
                lines[i] = "§f" + line.replace("&", "§");
            }
            trueText = "";
            lines.forEach(function (line) {
                line.split("§").forEach(function (part) {
                    trueText += part.substring(1);
                });
                trueText += "_";
            });
            trueText = trueText.slice(0, -1);
            cleanText = "".concat(trueText === null || trueText === void 0 ? void 0 : trueText.replace(/(?:\r\n|\r|\n| )/g, "_").replace("/", "").toLocaleLowerCase()).replace(/\W/g, "");
            if (namespace === undefined) {
                namespace = cleanText;
            }
            texturePath = "RP/textures/entity/hologram/" +
                namespace.substring(namespace.indexOf(":") + 1, namespace.length) +
                ".png";
            width = measureWidth(lines, fonts) + 10;
            height = measureHeight(lines, fonts) + 10;
            path = "RP/textures/entity/hologram";
            if (!fs.existsSync(path)) {
                fs.mkdirSync(path);
            }
            // Export Texture file.
            if (cacheData.texture === undefined || (cacheData.text !== undefined && cacheData.text.replace(/Â/g, '') !== text)) {
                createHologramTexture(width, height, background, lines, namespace, texturePath, fonts);
            }
            else {
                fs.writeFileSync(texturePath, Buffer.from(cacheData.texture, 'base64'));
            }
            if (!fs.existsSync("RP/models/entity/hologram")) {
                fs.mkdirSync("RP/models/entity/hologram");
            }
            index = (cacheData.variant === undefined ? (0, crypto_1.randomInt)(999999) + 1 : cacheData.variant);
            cacheData.variant = index;
            // Insert new hologram into BP entity
            {
                fileData = fs.readFileSync("BP/entities/hologram.bpe.json", "utf-8");
                BPHologramEntity = JSON.parse(fileData);
                BPHologramEntity["minecraft:entity"].component_groups[namespace] =
                    getComponetGroupJSON(index);
                BPHologramEntity["minecraft:entity"].events[namespace] = getEventJSON(namespace, trigger);
                fs.writeFileSync("BP/entities/hologram.bpe.json", Buffer.from(JSON.stringify(BPHologramEntity, null, 4).replace(/\n/g, "\r\n"), "utf-8"));
            }
            // Insert new hologram into RP entity
            {
                fileData = fs.readFileSync("RP/entity/hologram.rpe.json", "utf-8");
                RPHologramEntity = JSON.parse(fileData);
                RPHologramEntity["minecraft:client_entity"].description.textures[namespace.substring(namespace.indexOf(":") + 1, namespace.length)] =
                    "textures/entity/hologram/" +
                        namespace.substring(namespace.indexOf(":") + 1, namespace.length);
                RPHologramEntity["minecraft:client_entity"].description.geometry[namespace.substring(namespace.indexOf(":") + 1, namespace.length)] =
                    "geometry.hologram." +
                        namespace.substring(namespace.indexOf(":") + 1, namespace.length);
                RPHologramEntity["minecraft:client_entity"].description.render_controllers.push((_a = {},
                    _a["controller.render.hologram.".concat(namespace.substring(namespace.indexOf(":") + 1, namespace.length))] = "query.variant == " + index,
                    _a));
                fs.writeFileSync("RP/entity/hologram.rpe.json", Buffer.from(JSON.stringify(RPHologramEntity, null, 4).replace(/\n/g, "\r\n"), "utf-8"));
            }
            // Insert new hologram into Render
            {
                fileData = fs.readFileSync("RP/render_controllers/hologram.render.json", "utf-8");
                renderController = JSON.parse(fileData);
                renderController.render_controllers["controller.render.hologram." +
                    namespace.substring(namespace.indexOf(":") + 1, namespace.length)] = getHologramRenderJSON(namespace.substring(namespace.indexOf(":") + 1, namespace.length));
                fs.writeFileSync("RP/render_controllers/hologram.render.json", Buffer.from(JSON.stringify(renderController, null, 4).replace(/\n/g, "\r\n"), "utf-8"));
            }
            // Create Geometry
            createHologramGeoFile(namespace, width, height);
            cacheData.text = text;
            cache[namespace] = cacheData;
            return [2 /*return*/];
        });
    });
}
function createHologramWithImage(namespace, trigger, texture, cacheData) {
    return __awaiter(this, void 0, void 0, function () {
        var texturePath, image, path, existingFiles, index, fileData, BPHologramEntity, fileData, RPHologramEntity, fileData, renderController;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (cacheData === undefined) {
                        cacheData = {
                            text: undefined,
                            variant: undefined,
                            texture: undefined
                        };
                    }
                    texturePath = "RP/" + texture.replace(/\r/g, '');
                    return [4 /*yield*/, Jimp.read(texturePath)];
                case 1:
                    image = _b.sent();
                    path = "RP/textures/entity/hologram";
                    if (!fs.existsSync(path)) {
                        fs.mkdirSync(path);
                    }
                    existingFiles = isBPEntityFileCreated();
                    // Creates default hologram files if BP is missing (lazy since I don't actually check all files, just assume if BP is missing they all are :PP)
                    if (!existingFiles) {
                        createBPHologramEntityFile();
                        createRPHologramEntityFile();
                        createHologramRenderFile();
                        createHologramAnimationFile();
                    }
                    if (!fs.existsSync("RP/models/entity/hologram")) {
                        fs.mkdirSync("RP/models/entity/hologram");
                    }
                    index = (cacheData === undefined || cacheData.variant === undefined ? (0, crypto_1.randomInt)(999999) + 1 : cacheData.variant);
                    cacheData.variant = index;
                    // Insert new hologram into BP entity
                    {
                        fileData = fs.readFileSync("BP/entities/hologram.bpe.json", "utf-8");
                        BPHologramEntity = JSON.parse(fileData);
                        BPHologramEntity["minecraft:entity"].component_groups[namespace] =
                            getComponetGroupJSON(index);
                        BPHologramEntity["minecraft:entity"].events[namespace] = getEventJSON(namespace, undefined);
                        fs.writeFileSync("BP/entities/hologram.bpe.json", Buffer.from(JSON.stringify(BPHologramEntity, null, 4).replace(/\n/g, "\r\n"), "utf-8"));
                    }
                    // Insert new hologram into RP entity
                    {
                        fileData = fs.readFileSync("RP/entity/hologram.rpe.json", "utf-8");
                        RPHologramEntity = JSON.parse(fileData);
                        RPHologramEntity["minecraft:client_entity"].description.textures[namespace.substring(namespace.indexOf(":") + 1, namespace.length)] = texture.replace(/\\/g, '/').replace(/\r/g, '').replace('.png', '');
                        RPHologramEntity["minecraft:client_entity"].description.geometry[namespace.substring(namespace.indexOf(":") + 1, namespace.length)] = "geometry.hologram." + namespace.substring(namespace.indexOf(":") + 1, namespace.length);
                        RPHologramEntity["minecraft:client_entity"].description.render_controllers.push((_a = {},
                            _a["controller.render.hologram.".concat(namespace.substring(namespace.indexOf(":") + 1, namespace.length))] = "query.variant == " + index,
                            _a));
                        fs.writeFileSync("RP/entity/hologram.rpe.json", Buffer.from(JSON.stringify(RPHologramEntity, null, 4).replace(/\n/g, "\r\n"), "utf-8"));
                    }
                    // Insert new hologram into Render
                    {
                        fileData = fs.readFileSync("RP/render_controllers/hologram.render.json", "utf-8");
                        renderController = JSON.parse(fileData);
                        renderController.render_controllers["controller.render.hologram." + namespace.substring(namespace.indexOf(":") + 1, namespace.length)] = getHologramRenderJSON(namespace.substring(namespace.indexOf(":") + 1, namespace.length));
                        fs.writeFileSync("RP/render_controllers/hologram.render.json", Buffer.from(JSON.stringify(renderController, null, 4).replace(/\n/g, "\r\n"), "utf-8"));
                    }
                    // Create Geometry
                    createHologramGeoFile(namespace, image.getWidth(), image.getHeight());
                    cacheData.text = texture;
                    cache[namespace] = cacheData;
                    return [2 /*return*/];
            }
        });
    });
}
function createHologramTexture(width, height, background, lines, identifier, path, fonts) {
    return new Jimp(width, height, "#000000", function (err, image) {
        // Again this is pretty much useless until entity based holograms!
        image.opacity(background ? 0.25 : 0.0);
        // Offset on the width axis to help center the text
        var offX = 0;
        var offY = 0;
        // Storing text format here to resemble how bedrock edition proccess formatted text.
        var bold = false;
        var italic = false;
        var lastCode = "f";
        //Draw and color each line individually
        lines.forEach(function (text) {
            // Split text into parts depending on the color code to proccess color.
            offX = (width - measureLineWidth(text, fonts)) / 2;
            text === null || text === void 0 ? void 0 : text.split("§").forEach(function (parts) {
                var code = parts.charAt(0).toLocaleLowerCase();
                var textPart = parts.substring(1);
                if (code === "l") {
                    bold = true;
                    code = lastCode;
                }
                else if (code === "o") {
                    italic = true;
                    code = lastCode;
                }
                else if (code === "r") {
                    bold = false;
                    italic = false;
                    code = "f";
                }
                //Draw text
                image.print((0, font_choice_1.getFontChoice)(fonts, bold, italic), offX, offY, textPart);
                //Translate color code into a color pallet
                var colorPallet = getPallet(code);
                lastCode = code;
                image.scan(offX, offY, Jimp.measureText((0, font_choice_1.getFontChoice)(fonts, bold, italic), textPart + " "), Jimp.measureTextHeight((0, font_choice_1.getFontChoice)(fonts, bold, italic), textPart, width), function (x, y) {
                    var color = image.getPixelColor(x, y);
                    if (color === 4294967295) {
                        image.setPixelColor(colorPallet[0], x, y);
                    }
                    else if (color === 2459079321 || color === parseInt("0x929292ff", 16)) {
                        image.setPixelColor(colorPallet[1], x, y);
                    }
                });
                // OLD WAY, KEEP INCASE NEW WAY TURNS OUT TO BE BAD.....
                // for (let x = offX; x <= offX + Jimp.measureText(getFontChoice(fonts, bold, italic),textPart); x++) {
                //     for (let y = offY; y <= offY + Jimp.measureTextHeight(getFontChoice(fonts, bold, italic), textPart, width); y++) {
                //         const color = image.getPixelColor(x, y);
                //         if (color === 4294967295) {
                //             image.setPixelColor(colorPallet[0], x, y);
                //         } else if (color === 2459079321 || color === parseInt("0x929292ff", 16)) {
                //             image.setPixelColor(colorPallet[1], x, y);
                //         }
                //     }
                // }
                offX += Jimp.measureText((0, font_choice_1.getFontChoice)(fonts, bold, italic), textPart);
            });
            offY += Jimp.measureTextHeight(fonts.bold, removeFormating(text), 9999999);
        });
        // Export texture
        exportTexture(image, identifier, path);
    });
}
function measureWidth(lines, fonts) {
    var width = 0;
    lines.forEach(function (text) {
        var lineWidth = measureLineWidth(text, fonts);
        if (lineWidth >= width) {
            width = lineWidth;
        }
    });
    return width;
}
function measureLineWidth(text, fonts) {
    var width = 0;
    var bold = false;
    var italic = false;
    text === null || text === void 0 ? void 0 : text.split("§").forEach(function (parts) {
        var code = parts.charAt(0).toLocaleLowerCase();
        var textPart = parts.substring(1);
        if (code === "l") {
            bold = true;
        }
        else if (code === "o") {
            italic = true;
            width += 10;
        }
        else if (code === "r") {
            bold = false;
            italic = false;
        }
        width += Jimp.measureText((0, font_choice_1.getFontChoice)(fonts, bold, italic), textPart);
    });
    return width;
}
function measureHeight(lines, fonts) {
    var height = 0;
    var bold = false;
    var italic = false;
    lines.forEach(function (text) {
        var lineHeight = 0;
        text === null || text === void 0 ? void 0 : text.split("§").forEach(function (parts) {
            var code = parts.charAt(0).toLocaleLowerCase();
            var textPart = parts.substring(1);
            if (code === "l") {
                bold = true;
            }
            else if (code === "o") {
                italic = true;
            }
            else if (code === "r") {
                bold = false;
                italic = false;
            }
            var textHeight = Jimp.measureTextHeight((0, font_choice_1.getFontChoice)(fonts, bold, italic), textPart, 999999);
            if (textHeight >= lineHeight) {
                lineHeight = textHeight;
            }
        });
        height += lineHeight;
    });
    return height;
}
function removeFormating(text) {
    var trueText = "";
    text.split("§").forEach(function (part) {
        trueText += part.substring(1);
    });
    return trueText;
}
function getPallet(code) {
    switch (code) {
        case "0": {
            return [parseInt("0x000000FF", 16), parseInt("0x000000FF", 16)];
        }
        case "1": {
            return [parseInt("0x0000AAFF", 16), parseInt("0x00002AFF", 16)];
        }
        case "2": {
            return [parseInt("0x00AA00FF", 16), parseInt("0x002A00FF", 16)];
        }
        case "3": {
            return [parseInt("0x00AAAAFF", 16), parseInt("0x002A2AFF", 16)];
        }
        case "4": {
            return [parseInt("0xAA0000FF", 16), parseInt("0x2A0000FF", 16)];
        }
        case "5": {
            return [parseInt("0xAA00AAFF", 16), parseInt("0x2A002AFF", 16)];
        }
        case "6": {
            return [parseInt("0xFFAA00FF", 16), parseInt("0x2A2A00FF", 16)];
        }
        case "7": {
            return [parseInt("0xAAAAAAFF", 16), parseInt("0x2A2A2AFF", 16)];
        }
        case "8": {
            return [parseInt("0x555555FF", 16), parseInt("0x151515FF", 16)];
        }
        case "9": {
            return [parseInt("0x5555FFFF", 16), parseInt("0x15153FFF", 16)];
        }
        case "a": {
            return [parseInt("0x55FF55FF", 16), parseInt("0x153F15FF", 16)];
        }
        case "b": {
            return [parseInt("0x55FFFFFF", 16), parseInt("0x153F3FFF", 16)];
        }
        case "c": {
            return [parseInt("0xFF5555FF", 16), parseInt("0x3F1515FF", 16)];
        }
        case "d": {
            return [parseInt("0xFF55FFFF", 16), parseInt("0x3F153FFF", 16)];
        }
        case "e": {
            return [parseInt("0xFFFF55FF", 16), parseInt("0x3F3F15FF", 16)];
        }
        default: {
            return [parseInt("0xFFFFFFFF", 16), parseInt("0x3F3F3FFF", 16)];
        }
    }
}
function exportTexture(image, identifier, path) {
    image = image.scale(0.5, Jimp.RESIZE_NEAREST_NEIGHBOR);
    roundEdges(image, 64, image.getWidth(), image.getHeight());
    image.write(path, function (err, image) {
        if (err) {
            //console.log(err);
        }
        var data = fs.readFileSync(path, 'base64');
        var cacheData = cache[identifier];
        cacheData.texture = data;
        cache[identifier] = cacheData;
        fs.writeFileSync('../../create_holograms/cache.json', Buffer.from(JSON.stringify(cache, null, 4), 'utf-8'));
    });
}
function roundEdges(image, fontSize, width, height) {
    var i = fontSize / 16;
    for (var x = 0; x < i; x++) {
        for (var z = 0; z < i; z++) {
            image.setPixelColor(0x0, x, z);
        }
    }
    for (var x = 1; x <= i; x++) {
        for (var z = 0; z < i; z++) {
            image.setPixelColor(0x0, width - x, z);
        }
    }
    for (var x = 0; x < i; x++) {
        for (var z = 1; z <= i; z++) {
            image.setPixelColor(0x0, x, height - z);
        }
    }
    for (var x = 1; x <= i; x++) {
        for (var z = 1; z <= i; z++) {
            image.setPixelColor(0x0, width - x, height - z);
        }
    }
}
function isBPEntityFileCreated() {
    return fs.existsSync("BP/entities/hologram.bpe.json");
}
function createFile(path, content) {
    fs.writeFileSync(path, content);
}
function createBPHologramEntityFile() {
    var path = "BP/entities";
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
    }
    createFile("BP/entities/hologram.bpe.json", Buffer.from(JSON.stringify(getDefaultBPHologramEntityJSON(), null, 4).replace(/\n/g, "\r\n"), "utf-8"));
}
function createRPHologramEntityFile() {
    var path = "RP/entity";
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
    }
    createFile("RP/entity/hologram.rpe.json", Buffer.from(JSON.stringify(getDefaultRPHologramEntityJSON(), null, 4).replace(/\n/g, "\r\n"), "utf-8"));
}
function createHologramRenderFile() {
    var path = "RP/render_controllers";
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
    }
    createFile("RP/render_controllers/hologram.render.json", Buffer.from(JSON.stringify(getDefaultHologramRenderJSON(), null, 4).replace(/\n/g, "\r\n"), "utf-8"));
}
function createHologramGeoFile(identifier, width, height) {
    var path = "RP/models/entity/hologram/" +
        identifier.substring(identifier.indexOf(":") + 1, identifier.length) +
        ".geo.json";
    if (!fs.existsSync("RP/models/entity/hologram/")) {
        fs.mkdirSync("RP/models/entity/hologram/");
    }
    createFile(path, Buffer.from(JSON.stringify(getHologramGeometryJSON(identifier.substring(identifier.indexOf(":") + 1, identifier.length), width, height), null, 4).replace(/\n/g, "\r\n"), "utf-8"));
}
function createHologramAnimationFile() {
    var path = "RP/animations/holograms";
    fs.mkdirSync(path, { recursive: true });
    createFile("RP/animations/holograms/hologram.animation.json", Buffer.from(JSON.stringify(getHologramAnimationJSON(), null, 4).replace(/\n/g, "\r\n"), "utf-8"));
}
//RP: Default hologram entity JSON (if not already created!)
function getDefaultRPHologramEntityJSON() {
    return getTemplate().rp_entity;
}
//RP: Default hologram render JSON (if not already created!)
function getDefaultHologramRenderJSON() {
    return {
        format_version: "1.8.0",
        render_controllers: {}
    };
}
//RP: Default hologram render JSON (if not already created!)
function getHologramRenderJSON(identifier) {
    return JSON.parse(JSON.stringify(getTemplate().render_controller).replace(/\$identifier\$/gi, identifier));
}
//BP: Default hologram entity JSON (if not already created!)
function getDefaultBPHologramEntityJSON() {
    return getTemplate().bp_entity;
}
// RP: Hologram Animation Billboard
function getHologramAnimationJSON() {
    return getTemplate().animations;
}
// RP: Standard hologram geo part.
function getHologramGeometryJSON(identifier, width, height) {
    return {
        format_version: "1.12.0",
        "minecraft:geometry": [
            {
                description: {
                    identifier: "geometry.hologram." + identifier,
                    texture_width: width,
                    texture_height: height,
                    visible_bounds_width: 2,
                    visible_bounds_height: 1.5,
                    visible_bounds_offset: [0, 0.25, 0]
                },
                bones: [
                    {
                        name: "root",
                        pivot: [0, 0, 0],
                        cubes: [
                            {
                                origin: [
                                    -(width / 20 / 2),
                                    -(height / 20 / 2),
                                    0,
                                ],
                                size: [width / 20, height / 20, 0],
                                uv: {
                                    north: {
                                        uv: [0, 0],
                                        uv_size: [width, height]
                                    },
                                    east: { uv: [0, 0], uv_size: [0, height] },
                                    south: { uv: [0, 0], uv_size: [0, 0] },
                                    west: {
                                        uv: [width, 0],
                                        uv_size: [0, height]
                                    },
                                    up: {
                                        uv: [width, 0],
                                        uv_size: [-width, 0]
                                    },
                                    down: {
                                        uv: [width, 0],
                                        uv_size: [-width, 0]
                                    }
                                }
                            },
                        ]
                    },
                ]
            },
        ]
    };
}
// BP: Standard event part.
function getEventJSON(identifier, trigger) {
    return trigger !== undefined
        ? {
            trigger: trigger,
            add: {
                component_groups: [identifier]
            }
        }
        : {
            add: {
                component_groups: [identifier]
            }
        };
}
// BP: Standard componet group part.
function getComponetGroupJSON(index) {
    return {
        "minecraft:variant": {
            value: index
        }
    };
}
function getTemplate() {
    return JSON.parse(fs.readFileSync("data/create_holograms/assets/template.json", 'utf-8'));
}
run();
function getColorCode(code) {
    throw new Error('Function not implemented.');
}
