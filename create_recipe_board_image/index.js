"use strict";
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
var fs = require("fs");
var glob = require("glob");
var Canvas = require("canvas");
var Jimp = require("jimp");
var font_choice_1 = require("./font-choice");
var JSON = require("comment-json");
var recipeGridImageSrc = " data:image/png;base64,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";
var recipeBoardImageSrc = " data:image/png;base64,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";
function drawTextureFromPath(texture, ctx) {
    drawCustomTexture(fs.readFileSync(texture), ctx);
}
function drawCustomTexture(texture, ctx) {
    var resultImage = new Canvas.Image();
    resultImage.src = texture;
    var tempCanvas = new Canvas.Canvas(resultImage.width, resultImage.height);
    var tempCtx = tempCanvas.getContext('2d');
    tempCtx.drawImage(resultImage, 0, 0, resultImage.width, resultImage.height);
    for (var x = 0; x < resultImage.width; x++) {
        for (var y = 0; y < resultImage.height; y++) {
            var tempData = tempCtx.getImageData(x, y, 1, 1);
            if (tempData.data[3] > 0) {
                tempData.data[3] = 255;
                tempCtx.putImageData(tempData, x, y);
            }
        }
    }
    ctx.drawImage(tempCanvas, 956, 236, 184, 184);
}
function run() {
    return __awaiter(this, void 0, void 0, function () {
        function getTexture(key) {
            var itemName = key.item;
            if (!itemName.includes(":")) {
                itemName = "minecraft:" + itemName;
            }
            if (itemName.match(/:/g).length == 2) {
                key.data = Number.parseInt(itemName.substring(itemName.lastIndexOf(":") + 1, itemName.length));
                itemName = itemName.substring(0, itemName.lastIndexOf(":"));
            }
            if (itemName === "minecraft:wool") {
                return switchWool(key);
            }
            else if (itemName === "minecraft:magma") {
                return items["minecraft:magma_block"].texture;
            }
            else if (itemName === "minecraft:red_flower") {
                return switchRedFlower(key);
            }
            else if (itemName === "minecraft:leaves") {
                return switchLeaves(key);
            }
            else if (itemName === "minecraft:leaves2") {
                return switchLeaves2(key);
            }
            else if (itemName === "minecraft:stone") {
                return switchStone(key);
            }
            else if (itemName === "minecraft:concrete") {
                return switchConrete(key);
            }
            else if (itemName === "minecraft:dye") {
                return switchDye(key);
            }
            else if (itemName === "minecraft:wooden_slab") {
                return switchWoodSlab(key);
            }
            else if (itemName === "minecraft:log") {
                return switchLog(key);
            }
            else if (itemName === "minecraft:sapling") {
                return switchSapling(key);
            }
            else if (itemName === "minecraft:planks") {
                return switchPlank(key);
            }
            else if (itemName === "minecraft:carpet") {
                return switchCarpet(key);
            }
            else if (itemName === "minecraft:wood") {
                return switchWood(key);
            }
            else if (itemName === "minecraft:stained_glass") {
                return switchGlass(key);
            }
            else if (itemName === "minecraft:stained_glass_pane") {
                return switchGlassPane(key);
            }
            else if (itemName === "minecraft:stone_slab") {
                return switchStoneSlab(key);
            }
            else if (itemName === "minecraft:wooden_door") {
                return items["minecraft:oak_door"].texture;
            }
            else if (itemName === "minecraft:web") {
                return items["minecraft:cobweb"].texture;
            }
            else if (itemName === "minecraft:skull") {
                return switchSkull(key);
            }
            else if (itemName === "minecraft:yellow_flower") {
                return items["minecraft:dandelion"].texture;
            }
            else if (itemName === 'minecraft:brick_block') {
                return items['minecraft:bricks'].texture;
            }
            else if (itemName === 'minecraft:stonebrick') {
                return items['minecraft:stone_bricks'].texture;
            }
            else if (itemName === 'minecraft:snow') {
                return items['minecraft:snow_block'].texture;
            }
            if (items[itemName] === undefined) {
                return items["minecraft:stone"].texture;
            }
            return items[itemName].texture;
        }
        function switchLog(key) {
            switch (key.data) {
                case 0: {
                    return items["minecraft:oak_log"].texture;
                }
                case 1: {
                    return items["minecraft:spruce_log"].texture;
                }
                case 2: {
                    return items["minecraft:birch_log"].texture;
                }
                case 3: {
                    return items["minecraft:jungle_log"].texture;
                }
                case 4: {
                    return items["minecraft:acacia_log"].texture;
                }
                case 5: {
                    return items["minecraft:dark_oak_log"].texture;
                }
                default: {
                    return items["minecraft:oak_log"].texture;
                }
            }
        }
        function switchSapling(key) {
            switch (key.data) {
                case 0: {
                    return items["minecraft:oak_sapling"].texture;
                }
                case 1: {
                    return items["minecraft:spruce_sapling"].texture;
                }
                case 2: {
                    return items["minecraft:birch_sapling"].texture;
                }
                case 3: {
                    return items["minecraft:jungle_sapling"].texture;
                }
                case 4: {
                    return items["minecraft:acacia_sapling"].texture;
                }
                case 5: {
                    return items["minecraft:dark_oak_sapling"].texture;
                }
                default: {
                    return items["minecraft:oak_sapling"].texture;
                }
            }
        }
        function switchWood(key) {
            switch (key.data) {
                case 0: {
                    return items["minecraft:oak_wood"].texture;
                }
                case 1: {
                    return items["minecraft:spruce_wood"].texture;
                }
                case 2: {
                    return items["minecraft:birch_wood"].texture;
                }
                case 3: {
                    return items["minecraft:jungle_wood"].texture;
                }
                case 4: {
                    return items["minecraft:acacia_wood"].texture;
                }
                case 5: {
                    return items["minecraft:dark_oak_wood"].texture;
                }
                default: {
                    return items["minecraft:oak_wood"].texture;
                }
            }
        }
        function switchPlank(key) {
            switch (key.data) {
                case 0: {
                    return items["minecraft:oak_planks"].texture;
                }
                case 1: {
                    return items["minecraft:spruce_planks"].texture;
                }
                case 2: {
                    return items["minecraft:birch_planks"].texture;
                }
                case 3: {
                    return items["minecraft:jungle_planks"].texture;
                }
                case 4: {
                    return items["minecraft:acacia_planks"].texture;
                }
                case 5: {
                    return items["minecraft:dark_oak_planks"].texture;
                }
                default: {
                    return items["minecraft:oak_planks"].texture;
                }
            }
        }
        function switchWoodSlab(key) {
            switch (key.data) {
                case 0: {
                    return items["minecraft:oak_slab"].texture;
                }
                case 1: {
                    return items["minecraft:spruce_slab"].texture;
                }
                case 2: {
                    return items["minecraft:birch_slab"].texture;
                }
                case 3: {
                    return items["minecraft:jungle_slab"].texture;
                }
                case 4: {
                    return items["minecraft:acacia_slab"].texture;
                }
                case 5: {
                    return items["minecraft:dark_oak_slab"].texture;
                }
                default: {
                    return items["minecraft:oak_slab"].texture;
                }
            }
        }
        function switchStoneSlab(key) {
            switch (key.data) {
                case 0: {
                    return items["minecraft:smooth_stone_slab"].texture;
                }
                case 1: {
                    return items["minecraft:sandstone_slab"].texture;
                }
                case 2: {
                    return items["minecraft:oak_slab"].texture;
                }
                case 3: {
                    return items["minecraft:cobblestone_slab"].texture;
                }
                case 4: {
                    return items["minecraft:brick_slab"].texture;
                }
                case 5: {
                    return items["minecraft:stone_brick_slab"].texture;
                }
                case 6: {
                    return items["minecraft:quartz_slab"].texture;
                }
                case 7: {
                    return items["minecraft:nether_brick_slab"].texture;
                }
                default: {
                    return items["minecraft:smooth_stone_slab"].texture;
                }
            }
        }
        function switchWool(key) {
            switch (key.data) {
                case 0: {
                    return items["minecraft:white_wool"].texture;
                }
                case 1: {
                    return items["minecraft:orange_wool"].texture;
                }
                case 2: {
                    return items["minecraft:magenta_wool"].texture;
                }
                case 3: {
                    return items["minecraft:light_blue_wool"].texture;
                }
                case 4: {
                    return items["minecraft:yellow_wool"].texture;
                }
                case 5: {
                    return items["minecraft:lime_wool"].texture;
                }
                case 6: {
                    return items["minecraft:pink_wool"].texture;
                }
                case 7: {
                    return items["minecraft:gray_wool"].texture;
                }
                case 8: {
                    return items["minecraft:light_gray_wool"].texture;
                }
                case 9: {
                    return items["minecraft:cyan_wool"].texture;
                }
                case 10: {
                    return items["minecraft:purple_wool"].texture;
                }
                case 11: {
                    return items["minecraft:blue_wool"].texture;
                }
                case 12: {
                    return items["minecraft:brown_wool"].texture;
                }
                case 13: {
                    return items["minecraft:green_wool"].texture;
                }
                case 14: {
                    return items["minecraft:red_wool"].texture;
                }
                case 15: {
                    return items["minecraft:black_wool"].texture;
                }
                default: {
                    return items["minecraft:white_wool"].texture;
                }
            }
        }
        function switchGlassPane(key) {
            switch (key.data) {
                case 0: {
                    return items["minecraft:white_stained_glass_pane"].texture;
                }
                case 1: {
                    return items["minecraft:orange_stained_glass_pane"].texture;
                }
                case 2: {
                    return items["minecraft:magenta_stained_glass_pane"].texture;
                }
                case 3: {
                    return items["minecraft:light_blue_stained_glass_pane"].texture;
                }
                case 4: {
                    return items["minecraft:yellow_stained_glass_pane"].texture;
                }
                case 5: {
                    return items["minecraft:lime_stained_glass_pane"].texture;
                }
                case 6: {
                    return items["minecraft:pink_stained_glass_pane"].texture;
                }
                case 7: {
                    return items["minecraft:gray_stained_glass_pane"].texture;
                }
                case 8: {
                    return items["minecraft:light_gray_stained_glass_pane"].texture;
                }
                case 9: {
                    return items["minecraft:cyan_stained_glass_pane"].texture;
                }
                case 10: {
                    return items["minecraft:purple_stained_glass_pane"].texture;
                }
                case 11: {
                    return items["minecraft:blue_stained_glass_pane"].texture;
                }
                case 12: {
                    return items["minecraft:brown_stained_glass_pane"].texture;
                }
                case 13: {
                    return items["minecraft:green_stained_glass_pane"].texture;
                }
                case 14: {
                    return items["minecraft:red_stained_glass_pane"].texture;
                }
                case 15: {
                    return items["minecraft:black_stained_glass_pane"].texture;
                }
                default: {
                    return items["minecraft:white_stained_glass_pane"].texture;
                }
            }
        }
        function switchGlass(key) {
            switch (key.data) {
                case 0: {
                    return items["minecraft:white_stained_glass"].texture;
                }
                case 1: {
                    return items["minecraft:orange_stained_glass"].texture;
                }
                case 2: {
                    return items["minecraft:magenta_stained_glass"].texture;
                }
                case 3: {
                    return items["minecraft:light_blue_stained_glass"].texture;
                }
                case 4: {
                    return items["minecraft:yellow_stained_glass"].texture;
                }
                case 5: {
                    return items["minecraft:lime_stained_glass"].texture;
                }
                case 6: {
                    return items["minecraft:pink_stained_glass"].texture;
                }
                case 7: {
                    return items["minecraft:gray_stained_glass"].texture;
                }
                case 8: {
                    return items["minecraft:light_gray_stained_glass"].texture;
                }
                case 9: {
                    return items["minecraft:cyan_stained_glass"].texture;
                }
                case 10: {
                    return items["minecraft:purple_stained_glass"].texture;
                }
                case 11: {
                    return items["minecraft:blue_stained_glass"].texture;
                }
                case 12: {
                    return items["minecraft:brown_stained_glass"].texture;
                }
                case 13: {
                    return items["minecraft:green_stained_glass"].texture;
                }
                case 14: {
                    return items["minecraft:red_stained_glass"].texture;
                }
                case 15: {
                    return items["minecraft:black_stained_glass"].texture;
                }
                default: {
                    return items["minecraft:white_stained_glass"].texture;
                }
            }
        }
        function switchCarpet(key) {
            switch (key.data) {
                case 0: {
                    return items["minecraft:white_carpet"].texture;
                }
                case 1: {
                    return items["minecraft:orange_carpet"].texture;
                }
                case 2: {
                    return items["minecraft:magenta_carpet"].texture;
                }
                case 3: {
                    return items["minecraft:light_blue_carpet"].texture;
                }
                case 4: {
                    return items["minecraft:yellow_carpet"].texture;
                }
                case 5: {
                    return items["minecraft:lime_carpet"].texture;
                }
                case 6: {
                    return items["minecraft:pink_carpet"].texture;
                }
                case 7: {
                    return items["minecraft:gray_carpet"].texture;
                }
                case 8: {
                    return items["minecraft:light_gray_carpet"].texture;
                }
                case 9: {
                    return items["minecraft:cyan_carpet"].texture;
                }
                case 10: {
                    return items["minecraft:purple_carpet"].texture;
                }
                case 11: {
                    return items["minecraft:blue_carpet"].texture;
                }
                case 12: {
                    return items["minecraft:brown_carpet"].texture;
                }
                case 13: {
                    return items["minecraft:green_carpet"].texture;
                }
                case 14: {
                    return items["minecraft:red_carpet"].texture;
                }
                case 15: {
                    return items["minecraft:black_carpet"].texture;
                }
                default: {
                    return items["minecraft:white_carpet"].texture;
                }
            }
        }
        function switchConrete(key) {
            switch (key.data) {
                case 0: {
                    return items["minecraft:white_concrete"].texture;
                }
                case 1: {
                    return items["minecraft:orange_concrete"].texture;
                }
                case 2: {
                    return items["minecraft:magenta_concrete"].texture;
                }
                case 3: {
                    return items["minecraft:light_blue_concrete"].texture;
                }
                case 4: {
                    return items["minecraft:yellow_concrete"].texture;
                }
                case 5: {
                    return items["minecraft:lime_concrete"].texture;
                }
                case 6: {
                    return items["minecraft:pink_concrete"].texture;
                }
                case 7: {
                    return items["minecraft:gray_concrete"].texture;
                }
                case 8: {
                    return items["minecraft:light_gray_concrete"].texture;
                }
                case 9: {
                    return items["minecraft:cyan_concrete"].texture;
                }
                case 10: {
                    return items["minecraft:purple_concrete"].texture;
                }
                case 11: {
                    return items["minecraft:blue_concrete"].texture;
                }
                case 12: {
                    return items["minecraft:brown_concrete"].texture;
                }
                case 13: {
                    return items["minecraft:green_concrete"].texture;
                }
                case 14: {
                    return items["minecraft:red_concrete"].texture;
                }
                case 15: {
                    return items["minecraft:black_concrete"].texture;
                }
                default: {
                    return items["minecraft:white_concrete"].texture;
                }
            }
        }
        function switchDye(key) {
            switch (key.data) {
                case 0: {
                    return items["minecraft:red_dye"].texture;
                }
                case 1: {
                    return items["minecraft:orange_dye"].texture;
                }
                case 2: {
                    return items["minecraft:magenta_dye"].texture;
                }
                case 3: {
                    return items["minecraft:light_blue_dye"].texture;
                }
                case 4: {
                    return items["minecraft:yellow_dye"].texture;
                }
                case 5: {
                    return items["minecraft:lime_dye"].texture;
                }
                case 6: {
                    return items["minecraft:pink_dye"].texture;
                }
                case 7: {
                    return items["minecraft:gray_dye"].texture;
                }
                case 8: {
                    return items["minecraft:light_gray_dye"].texture;
                }
                case 9: {
                    return items["minecraft:cyan_dye"].texture;
                }
                case 10: {
                    return items["minecraft:purple_dye"].texture;
                }
                case 11: {
                    return items["minecraft:blue_dye"].texture;
                }
                case 12: {
                    return items["minecraft:brown_dye"].texture;
                }
                case 13: {
                    return items["minecraft:green_dye"].texture;
                }
                case 14: {
                    return items["minecraft:red_dye"].texture;
                }
                case 15: {
                    return items["minecraft:black_dye"].texture;
                }
                default: {
                    return items["minecraft:white_dye"].texture;
                }
            }
        }
        function switchRedFlower(key) {
            switch (key.data) {
                case 0: {
                    return items["minecraft:poppy"].texture;
                }
                case 1: {
                    return items["minecraft:blue_orchid"].texture;
                }
                case 2: {
                    return items["minecraft:allium"].texture;
                }
                case 3: {
                    return items["minecraft:azure_bluet"].texture;
                }
                case 4: {
                    return items["minecraft:red_tulip"].texture;
                }
                case 5: {
                    return items["minecraft:orange_tulip"].texture;
                }
                case 6: {
                    return items["minecraft:white_tulip"].texture;
                }
                case 7: {
                    return items["minecraft:pink_tulip"].texture;
                }
                case 8: {
                    return items["minecraft:oxeye_daisy"].texture;
                }
                case 9: {
                    return items["minecraft:lily_of_the_valley"].texture;
                }
                default: {
                    return items["minecraft:poppy"].texture;
                }
            }
        }
        function switchStone(key) {
            switch (key.data) {
                case 0: {
                    return items["minecraft:stone"].texture;
                }
                case 1: {
                    return items["minecraft:granite"].texture;
                }
                case 2: {
                    return items["minecraft:polished_granite"].texture;
                }
                case 3: {
                    return items["minecraft:diorite"].texture;
                }
                case 4: {
                    return items["minecraft:polished_diorite"].texture;
                }
                case 5: {
                    return items["minecraft:andesite"].texture;
                }
                case 6: {
                    return items["minecraft:polished_andesite"].texture;
                }
                default: {
                    return items["minecraft:stone"].texture;
                }
            }
        }
        function switchLeaves(key) {
            switch (key.data) {
                case 0: {
                    return items["minecraft:oak_leaves"].texture;
                }
                case 1: {
                    return items["minecraft:spruce_leave"].texture;
                }
                case 2: {
                    return items["minecraft:birch_leave"].texture;
                }
                case 3: {
                    return items["minecraft:jungle_leave"].texture;
                }
                default: {
                    return items["minecraft:oak_leaves"].texture;
                }
            }
        }
        function switchLeaves2(key) {
            switch (key.data) {
                case 0: {
                    return items["minecraft:acacia_leaves"].texture;
                }
                case 1: {
                    return items["minecraft:dark_oak_leave"].texture;
                }
                default: {
                    return items["minecraft:acacia_leaves"].texture;
                }
            }
        }
        function switchSkull(key) {
            switch (key.data) {
                case 0: {
                    return items["minecraft:skeleton_skull"].texture;
                }
                case 1: {
                    return items["minecraft:wither_skeleton_skull"].texture;
                }
                case 2: {
                    return items["minecraft:zombie_head"].texture;
                }
                case 3: {
                    return items["minecraft:player_head"].texture;
                }
                case 4: {
                    return items["minecraft:creeper_head"].texture;
                }
                case 5: {
                    return items["minecraft:dragon_head"].texture;
                }
                default: {
                    return items["minecraft:skeleton_skull"].texture;
                }
            }
        }
        var fonts, textures, items, textureData, customTextures, i, customTexture, parsedName, newTexture, defaultConfigData, config, configKeys;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, font_choice_1.scanFontChoice)()];
                case 1:
                    fonts = _a.sent();
                    return [4 /*yield*/, Promise.resolve().then(function () { return require("minecraft-textures/dist/textures/json/1.18.id.json"); })];
                case 2:
                    textures = _a.sent();
                    items = textures.items;
                    textureData = JSON.parse(fs.readFileSync("RP/textures/item_texture.json", "utf-8"))['texture_data'];
                    customTextures = fs.readdirSync("RP/textures/items/");
                    for (i = 0; i < customTextures.length; i++) {
                        customTexture = customTextures[i];
                        parsedName = "minecraft:" + customTexture.replace(".png", "");
                        if (items[parsedName]) {
                            newTexture = fs.readFileSync("RP/textures/items/" + customTexture);
                            items[parsedName].texture = newTexture;
                        }
                    }
                    // Load custom entity spawn egg textures
                    glob.sync("RP/entity/**/*.json").forEach(function (itemPath) {
                        var entity = JSON.parse(fs.readFileSync(itemPath, "utf-8"));
                        var desc = entity['minecraft:client_entity']['description'];
                        if (desc['spawn_egg']) {
                            var identifier = desc['identifier'];
                            var texture = desc['spawn_egg']['texture'];
                            var textureIndex = desc['spawn_egg']['texture_index'];
                            if (textureData[texture]) {
                                var texturePath = "RP/" +
                                    textureData[texture].textures +
                                    ".png";
                                var spawnEggTexture = fs.readFileSync(texturePath);
                                items[identifier] = {
                                    texture: spawnEggTexture
                                };
                                console.log("found entity " + identifier + " with textureIcon " + texture + " and index " + textureIndex);
                            }
                        }
                    });
                    if (!!fs.existsSync("data/create_recipe_board_image/config.json")) return [3 /*break*/, 4];
                    fs.mkdirSync("data/create_recipe_board_image", { recursive: true });
                    return [4 /*yield*/, Promise.resolve().then(function () { return require("./assets/config.json"); })];
                case 3:
                    defaultConfigData = _a.sent();
                    fs.writeFileSync("data/create_recipe_board_image/config.json", JSON.stringify(defaultConfigData, null, 4));
                    console.log("No config file was found, generating default config and quitting!");
                    return [2 /*return*/];
                case 4:
                    config = JSON.parse(fs.readFileSync("./data/create_recipe_board_image/config.json", "utf-8"));
                    configKeys = Object.keys(config);
                    configKeys.forEach(function (key) {
                        //TODO: Rob recipe image and text code from other filters.
                        console.log("   - " + key);
                        var recipeBoardImage = new Canvas.Image();
                        recipeBoardImage.src = recipeBoardImageSrc;
                        var canvas = new Canvas.Canvas(recipeBoardImage.width, recipeBoardImage.height);
                        var ctx = canvas.getContext("2d");
                        ctx.imageSmoothingEnabled = false;
                        ctx.drawImage(recipeBoardImage, 0, 0, recipeBoardImage.width, recipeBoardImage.height);
                        var recipeData = config[key];
                        var recipe = JSON.parse(fs.readFileSync("BP/recipes/" + recipeData.recipe, "utf-8"));
                        var shapedRecipe = recipe["minecraft:recipe_shaped"];
                        var keys = new Map();
                        Object.keys(shapedRecipe.key).forEach(function (key) {
                            keys.set(key, getTexture(shapedRecipe.key[key]));
                        });
                        var recipeImage = new Canvas.Image();
                        recipeImage.src = recipeGridImageSrc;
                        var recipeGridCanvas = new Canvas.Canvas(recipeImage.width, recipeImage.height);
                        var recipeGridCtx = canvas.getContext("2d");
                        // recipeGridCtx.drawImage(recipeImage, 0, 0, recipeImage.width, recipeImage.height);
                        var offX = 232;
                        var offY = 132;
                        if (shapedRecipe.pattern.length !== 3) {
                            offY = 232;
                        }
                        if (recipeData.result_texture !== undefined) {
                            var resultImage = new Canvas.Image();
                            resultImage.src = fs.readFileSync(recipeData.result_texture);
                            ctx.drawImage(resultImage, 956, 236, 184, 184);
                        }
                        else {
                            var resultItemNamespace_1 = shapedRecipe.result.item;
                            if (resultItemNamespace_1.includes("spawn_egg")) {
                                var eggData = shapedRecipe.result.data;
                                if (eggData !== undefined) {
                                    var matched = eggData.match("'(.*?)'")[1];
                                    if (items[matched]) {
                                        console.log("found item texture for entity: " + matched);
                                        var entityTexture = items[matched].texture;
                                        drawCustomTexture(entityTexture, ctx);
                                    }
                                    else {
                                        console.log("could not find item texture for entity: " + matched);
                                    }
                                }
                                else {
                                    console.log("Result " + resultItemNamespace_1 + " does not contain data value. We try our hacky method :>");
                                    var replaced = resultItemNamespace_1.replace('_spawn_egg', '');
                                    console.log("replaced val: " + replaced);
                                    if (items[replaced]) {
                                        console.log("found item texture for entity: " + replaced);
                                        var entityTexture = items[replaced].texture;
                                        drawCustomTexture(entityTexture, ctx);
                                    }
                                    else {
                                        console.log("could not find item texture for entity: " + replaced);
                                    }
                                }
                            }
                            else if (resultItemNamespace_1.includes("minecraft:")) {
                                var resultImage = new Canvas.Image();
                                resultImage.src = getTexture(shapedRecipe.result);
                                ctx.drawImage(resultImage, 956, 236, 184, 184);
                            }
                            else {
                                var resultIcon_1 = undefined;
                                glob.sync("RP/items/**/*.json").forEach(function (itemPath) {
                                    var item = JSON.parse(fs.readFileSync(itemPath, "utf-8"));
                                    var identifier = item["minecraft:item"].description.identifier;
                                    var icon = item["minecraft:item"].components["minecraft:icon"];
                                    if (identifier === resultItemNamespace_1) {
                                        resultIcon_1 = icon;
                                    }
                                });
                                if (resultIcon_1 !== undefined) {
                                    var itemTextures = JSON.parse(fs.readFileSync("RP/textures/item_texture.json", "utf-8"));
                                    var texturePath = "RP/" +
                                        itemTextures.texture_data[resultIcon_1].textures +
                                        ".png";
                                    if (fs.existsSync(texturePath)) {
                                        drawTextureFromPath(texturePath, ctx);
                                    }
                                    else {
                                        var resultImage = new Canvas.Image();
                                        resultImage.src =
                                            " data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAAXNSR0IArs4c6QAAAChJREFUCJltyqENACAMALAORRD8fydimRueUN3IXQ3rTDA8Ag256z8uTGEHATZy6pcAAAAASUVORK5CYII=";
                                        ctx.drawImage(resultImage, 956, 236, 184, 184);
                                    }
                                }
                            }
                        }
                        ctx.imageSmoothingEnabled = false;
                        ctx.drawImage(recipeImage, 224, 124, recipeGridCanvas.width, recipeGridCanvas.height);
                        shapedRecipe.pattern.forEach(function (row) {
                            var column = row.split("");
                            if (column.length !== 3) {
                                offX = 232;
                            }
                            var _loop_1 = function (i) {
                                var key_1 = keys.get(column[i]);
                                var keyImage = new Canvas.Image();
                                keyImage.onload = function () {
                                    recipeGridCtx.drawImage(keyImage, offX, offY, 123, 123);
                                };
                                keyImage.src = key_1;
                                offX += 139;
                            };
                            for (var i = 0; i < column.length; i++) {
                                _loop_1(i);
                            }
                            offX = 232;
                            offY += 139;
                        });
                        {
                            var text = recipeData.text;
                            // Break down input text into lines.
                            var lines_1 = text.split("\\n");
                            // Need a color code to start each line.
                            for (var i = 0; i < lines_1.length; i++) {
                                var line = lines_1[i];
                                lines_1[i] = "§f" + line.replace("&", "§");
                            }
                            // Build text without color codes
                            var trueText_1 = "";
                            lines_1.forEach(function (line) {
                                line.split("§").forEach(function (part) {
                                    trueText_1 += part.substring(1);
                                });
                                trueText_1 += "_";
                            });
                            trueText_1 = trueText_1.slice(0, -1);
                            var width_1 = measureWidth(lines_1, fonts);
                            var height_1 = measureHeight(lines_1, fonts);
                            new Jimp(width_1, height_1, "#c6c6c6", function (err, image) {
                                // Again this is pretty much useless until entity based holograms!
                                // image.opacity(0.0);
                                // Offset on the width axis to help center the text
                                var offX = 0;
                                var offY = 0;
                                // Storing text format here to resemble how bedrock edition proccess formatted text.
                                var bold = false;
                                var italic = false;
                                var lastCode = "f";
                                //Draw and color each line individually
                                lines_1.forEach(function (text) {
                                    // Split text into parts depending on the color code to proccess color.
                                    offX = (width_1 - measureLineWidth(text, fonts)) / 2;
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
                                        image.print((0, font_choice_1.getFontChoice)(fonts, false, false), offX, offY, textPart);
                                        //Translate color code into a color pallet
                                        lastCode = code;
                                        offX += Jimp.measureText((0, font_choice_1.getFontChoice)(fonts, false, false), textPart);
                                    });
                                    offY += Jimp.measureTextHeight(fonts.bold, removeFormating(text), 9999999);
                                });
                                image.getBase64(Jimp.MIME_PNG, function (error, value) {
                                    var textImage = new Canvas.Image();
                                    textImage.onload = function () {
                                        ctx.drawImage(textImage, 0, 0, width_1, height_1, 204, 36, width_1 * 1.333, height_1 * 1.333);
                                    };
                                    textImage.src = value;
                                    //TOOD: Stich them together on a template image.
                                    var buffer = canvas.toBuffer();
                                    recipeData.output.forEach(function (out) {
                                        if (!out.includes(".png")) {
                                            out += ".png";
                                        }
                                        console.log("   > Writing to: " + out);
                                        fs.writeFileSync(out, buffer);
                                    });
                                });
                            });
                            //TODO: Profit!
                        }
                    });
                    return [2 /*return*/];
            }
        });
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
run();
