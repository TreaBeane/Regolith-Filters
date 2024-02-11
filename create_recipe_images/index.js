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
var Canvas = require("canvas");
var glob = require("glob");
var JSON = require("comment-json");
// Our 3x3 recipe board encoded in base64
var recipeBoardImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGwAAABsCAIAAAAABMCaAAAAAXNSR0IArs4c6QAAATpJREFUeJzt2sENg0AQBMHDIicIhFAIiyD9uBDc+HGqSmCl1jx3O45jvO+6rjHG8zxL3vr84dLytrnEWfQ9932PMc7zXPKWJQZEDIgYEDEgYkDEgIgBEQMiBkQMiBgQMSBiQMSAiAERAyIGRAyIGBAxIGJAxICIAREDIgZEDIgYEDEgYkDEgIiBfX7wzT+7t616yxIDm5/t329ZYsDPdnDLEgMiBkQMiBgQMSBiQMSAiAERAyIGRAyIGBAxIGJAxICIAREDIgZEDIgYEDEgYkDEgIgBEQMiBkQMiBgQMSBiQMSAn+2AJQb8bAe3LDHgZzu4ZYkBEQMiBkQMiBgQMSBiQMSAiAERAyIGRAyIGBAxIGJAxICIAREDIgZEDIgYEDEgYkDEgIgBEQMiBkQMiBgQMSBiwM92wBIDX/NdR8tv3jpFAAAAAElFTkSuQmCC';
var furnaceImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGwAAABsCAYAAACPZlfNAAAAAXNSR0IArs4c6QAAArtJREFUeJzt2z1y2kAYxvGHTA5gagpcmSMshSmTGQoaRzO5A41TQMW4yri3m9whRdykcOELSEcglXIC+wZJwZcE2KCVAL+r/69CK43Y0TP7SlpYCQAAAAAAAAAAAAAAAAAAoBqNt3Y65/4dqyNYiaJI4/F4azY7A7u/uz9Mr/Aq13VqNBpbs/m470muv12X7kgURepd9kqfp872DkyaXfAyRqORkjgpdY66+3DqDqAYAjOGwIwhMGMIzBgCM4bAjCEwYwq9OIemitmbKiwmJPaZBWKEGVPrEbZQdsqtrNFoJEl7TdsxwowhMGMIzBgCM2bvh44oipY3R5zO3oH1Lnv8+PgOBFESXdedugtH4xXY2e1NpcdVoS6heQXWGT5thLFtuzN88u+ZhzqE5hVY0ow3wti2nTRj/555Cj00/5LYb+cb++38KFvfPqKQQ/MuieuS+OfOUXdMoYbmN/nbb0tKJa0e889ub6Rh9qBU6p9LBapi1RfZdV1wryKFR9iyzD3m/0nc+f0nf+B8/6nK4kJoI61wYLMyl2r649OybRZKmruvLfafsixK0sOvh5N+f9WKl8R5KC+T78umWSjnmg4upIky+12hsuh7ca++XL16vlar5XXO98rjHpZKktxzd+2xPdXLZHW/cM9dScVWK1V5cUMMS/IoidPB59mH7GP9+iN+pm06uPDqWBmhhiV5BLYqhenGPtf9mtlK144/jpDDkjwCm5U65Z8SH//OP6SZtkb++CMIPSzJ4x6WNGMpTqTM/WvZtuO4Q6pDWFIgP68kcVKLsKRAAqsT1jgbwxpnYyiJxhCYMQRmDIEZQ2DGEJgxtV4ftnhNsfQXdEaYMbUeYYtZF0sv84wwYwjMGAIzhsCMITBjCMwY1jgbwxpnY94MLIqi4BYTAAAAAAAAAAAAAAAAAAAAAMDh/Qf2PawN/oxzvgAAAABJRU5ErkJggg==';
var smithingTableImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGwAAABsCAYAAACPZlfNAAAAAXNSR0IArs4c6QAAAORJREFUeJzt2kEKwjAQBdAoHkpBb5F76CI3VLCeSheiuHBhqY6d8N6qUOik/WSYQkoBAAAAAAAAAAAAAAAAAAAAAACgV4vIYsN5uEbWi7LerMO+4yqq0MP+sJ/8jFpr2W13XaxjrPDASrm/6BSttXIZLt2sY4xlaDUm+8sO+7Xj6fi8jm5Zv2aHJSOwZASWjMCSST90vA4Yn97PPIjYYckILJn0LfFde/MfxmwILBmBJSOwZNIPHe/0Nmi8Cg+s1lpaa9FlZ7uOsRwR+ILIIwIAAAAAAAAAAAAAAAAAAAAAAAD06waALCj/jvlSlwAAAABJRU5ErkJggg==';
function run() {
    return __awaiter(this, void 0, void 0, function () {
        function drawFurnaceRecipe(recipeData, recipe) {
            var furnace = recipe['minecraft:recipe_furnace'];
            var coalImage = getTexture({ item: 'minecraft:coal', count: 1, data: 0 });
            var keys = new Map();
            var input = furnace.input;
            var output = furnace.output;
            keys.set(input, getTexture({ item: input, count: 1, data: 0 }));
            keys.set(output, getTexture({ item: output, count: 1, data: 0 }));
            var recipeImage = new Canvas.Image();
            recipeImage.src = furnaceImage;
            var canvas = new Canvas.Canvas(recipeImage.width, recipeImage.height);
            var ctx = canvas.getContext('2d');
            ctx.drawImage(recipeImage, 0, 0);
            var convertImage = new Canvas.Image();
            convertImage.onload = function () {
                ctx.imageSmoothingEnabled = false;
                ctx.drawImage(convertImage, 11, 27, 16, 16);
            };
            convertImage.src = keys.get(input);
            var currencyImage = new Canvas.Image();
            currencyImage.onload = function () {
                ctx.imageSmoothingEnabled = false;
                ctx.drawImage(currencyImage, 65, 38, 32, 32);
            };
            currencyImage.src = keys.get(output);
            var fuelImage = new Canvas.Image();
            fuelImage.onload = function () {
                ctx.imageSmoothingEnabled = false;
                ctx.drawImage(fuelImage, 11, 63, 16, 16);
            };
            fuelImage.src = coalImage;
            var buffer = canvas.toBuffer();
            recipeData.output.forEach(function (out) {
                if (!out.includes('.png')) {
                    out += '.png';
                }
                console.log('   > Writing to: ' + out);
                fs.writeFileSync(out, buffer);
            });
        }
        function drawSmithingTableRecipe(recipeData, recipe) {
            var smithing = recipe['minecraft:recipe_shapeless'];
            var keys = new Map();
            var convert = smithing.ingredients[0];
            var currency = smithing.ingredients[1];
            keys.set(convert.item, getTexture(convert));
            keys.set(currency.item, getTexture(currency));
            var recipeImage = new Canvas.Image();
            recipeImage.src = smithingTableImage;
            var canvas = new Canvas.Canvas(recipeImage.width, recipeImage.height);
            var ctx = canvas.getContext('2d');
            ctx.drawImage(recipeImage, 0, 0);
            var convertImage = new Canvas.Image();
            convertImage.onload = function () {
                ctx.imageSmoothingEnabled = false;
                ctx.drawImage(convertImage, 29, 46, 16, 16);
            };
            convertImage.src = keys.get(convert.item);
            var currencyImage = new Canvas.Image();
            currencyImage.onload = function () {
                ctx.imageSmoothingEnabled = false;
                ctx.drawImage(currencyImage, 63, 46, 16, 16);
            };
            currencyImage.src = keys.get(currency.item);
            var buffer = canvas.toBuffer();
            recipeData.output.forEach(function (out) {
                if (!out.includes('.png')) {
                    out += '.png';
                }
                console.log('   > Writing to: ' + out);
                fs.writeFileSync(out, buffer);
            });
        }
        function drawShapedRecipe(recipeData, recipe) {
            var shapedRecipe = recipe['minecraft:recipe_shaped'];
            var keys = new Map();
            Object.keys(shapedRecipe.key).forEach(function (key) {
                keys.set(key, getTexture(shapedRecipe.key[key]));
            });
            var recipeImage = new Canvas.Image();
            recipeImage.src = recipeBoardImage;
            var canvas = new Canvas.Canvas(recipeImage.width, recipeImage.height);
            var ctx = canvas.getContext('2d');
            ctx.drawImage(recipeImage, 0, 0);
            var offX = 2;
            var offY = 2;
            if (shapedRecipe.pattern.length !== 3) {
                offY = 38;
            }
            shapedRecipe.pattern.forEach(function (row) {
                var column = row.split('');
                if (column.length !== 3) {
                    offX = 38;
                }
                var _loop_1 = function (i) {
                    var key = keys.get(column[i]);
                    var keyImage = new Canvas.Image();
                    keyImage.onload = function () {
                        ctx.imageSmoothingEnabled = false;
                        ctx.drawImage(keyImage, offX, offY, 32, 32);
                    };
                    keyImage.src = key;
                    offX += 36;
                };
                for (var i = 0; i < column.length; i++) {
                    _loop_1(i);
                }
                offX = 2;
                offY += 36;
            });
            var buffer = canvas.toBuffer();
            recipeData.output.forEach(function (out) {
                if (!out.includes('.png')) {
                    out += '.png';
                }
                console.log('   > Writing to: ' + out);
                fs.writeFileSync(out, buffer);
            });
            console.log();
        }
        function getTexture(key) {
            var itemName = key.item;
            if (!itemName.includes(':')) {
                itemName = 'minecraft:' + itemName;
            }
            if (itemName.includes("spawn_egg")) {
                var eggData = key.data;
                if (eggData !== undefined) {
                    var matched = eggData.match("'(.*?)'")[1];
                    if (items[matched]) {
                        console.log("found item texture for entity: " + matched);
                        return items[matched].texture;
                    }
                    else {
                        console.log("could not find item texture for entity: " + matched);
                    }
                }
                else {
                    var replaced = itemName.replace('_spawn_egg', '');
                    if (items[replaced]) {
                        console.log("found item texture for entity: " + replaced);
                        return items[replaced].texture;
                    }
                    else {
                        console.log("could not find item texture for entity: " + replaced);
                    }
                }
            }
            if (itemName.match(/:/g).length == 2) {
                key.data = Number.parseInt(itemName.substring(itemName.lastIndexOf(':') + 1, itemName.length));
                itemName = itemName.substring(0, itemName.lastIndexOf(':'));
            }
            if (itemName === 'minecraft:wool') {
                return switchWool(key);
            }
            else if (itemName === 'minecraft:magma') {
                return items['minecraft:magma_block'].texture;
            }
            else if (itemName === 'minecraft:red_flower') {
                return switchRedFlower(key);
            }
            else if (itemName === 'minecraft:leaves') {
                return switchLeaves(key);
            }
            else if (itemName === 'minecraft:leaves2') {
                return switchLeaves2(key);
            }
            else if (itemName === 'minecraft:stone') {
                return switchStone(key);
            }
            else if (itemName === 'minecraft:concrete') {
                return switchConrete(key);
            }
            else if (itemName === 'minecraft:dye') {
                return switchDye(key);
            }
            else if (itemName === 'minecraft:wooden_slab') {
                return switchWoodSlab(key);
            }
            else if (itemName === 'minecraft:log') {
                return switchLog(key);
            }
            else if (itemName === 'minecraft:sapling') {
                return switchSapling(key);
            }
            else if (itemName === 'minecraft:planks') {
                return switchPlank(key);
            }
            else if (itemName === 'minecraft:carpet') {
                return switchCarpet(key);
            }
            else if (itemName === 'minecraft:wood') {
                return switchWood(key);
            }
            else if (itemName === 'minecraft:stained_glass') {
                return switchGlass(key);
            }
            else if (itemName === 'minecraft:stained_glass_pane') {
                return switchGlassPane(key);
            }
            else if (itemName === 'minecraft:stone_slab') {
                return switchStoneSlab(key);
            }
            else if (itemName === 'minecraft:wooden_door') {
                return items['minecraft:oak_door'].texture;
            }
            else if (itemName === 'minecraft:web') {
                return items['minecraft:cobweb'].texture;
            }
            else if (itemName === 'minecraft:skull') {
                return switchSkull(key);
            }
            else if (itemName === 'minecraft:yellow_flower') {
                return items['minecraft:dandelion'].texture;
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
            else if (itemName === 'minecraft:slime') {
                return items['minecraft:slime_block'].texture;
            }
            if (items[itemName] === undefined) {
                var resultIcon_1 = undefined;
                glob.sync("RP/items/**/*.json").forEach(function (itemPath) {
                    var item = JSON.parse(fs.readFileSync(itemPath, "utf-8"));
                    var identifier = item["minecraft:item"].description.identifier;
                    var icon = item["minecraft:item"].components["minecraft:icon"];
                    if (identifier === itemName) {
                        resultIcon_1 = icon;
                    }
                });
                if (resultIcon_1 !== undefined) {
                    if (fs.existsSync('RP/textures/item_texture.json')){
                        var itemTextures = JSON.parse(fs.readFileSync("RP/textures/item_texture.json", "utf-8"));
                        var texturePath = "RP/" +
                            itemTextures.texture_data[resultIcon_1].textures +
                            ".png";
                        if (fs.existsSync(texturePath)) {
                            var texture = fs.readFileSync(texturePath);
                            return texture;
                        }
                        else {
                            var invalid = " data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAAXNSR0IArs4c6QAAAChJREFUCJltyqENACAMALAORRD8fydimRueUN3IXQ3rTDA8Ag256z8uTGEHATZy6pcAAAAASUVORK5CYII=";
                            return invalid;
                        }
                    }
                }
                return items['minecraft:stone'].texture;
            }
            return items[itemName].texture;
        }
        function switchLog(key) {
            switch (key.data) {
                case 0: {
                    return items['minecraft:oak_log'].texture;
                }
                case 1: {
                    return items['minecraft:spruce_log'].texture;
                }
                case 2: {
                    return items['minecraft:birch_log'].texture;
                }
                case 3: {
                    return items['minecraft:jungle_log'].texture;
                }
                case 4: {
                    return items['minecraft:acacia_log'].texture;
                }
                case 5: {
                    return items['minecraft:dark_oak_log'].texture;
                }
                default: {
                    return items['minecraft:oak_log'].texture;
                }
            }
        }
        function switchSapling(key) {
            switch (key.data) {
                case 0: {
                    return items['minecraft:oak_sapling'].texture;
                }
                case 1: {
                    return items['minecraft:spruce_sapling'].texture;
                }
                case 2: {
                    return items['minecraft:birch_sapling'].texture;
                }
                case 3: {
                    return items['minecraft:jungle_sapling'].texture;
                }
                case 4: {
                    return items['minecraft:acacia_sapling'].texture;
                }
                case 5: {
                    return items['minecraft:dark_oak_sapling'].texture;
                }
                default: {
                    return items['minecraft:oak_sapling'].texture;
                }
            }
        }
        function switchWood(key) {
            switch (key.data) {
                case 0: {
                    return items['minecraft:oak_wood'].texture;
                }
                case 1: {
                    return items['minecraft:spruce_wood'].texture;
                }
                case 2: {
                    return items['minecraft:birch_wood'].texture;
                }
                case 3: {
                    return items['minecraft:jungle_wood'].texture;
                }
                case 4: {
                    return items['minecraft:acacia_wood'].texture;
                }
                case 5: {
                    return items['minecraft:dark_oak_wood'].texture;
                }
                default: {
                    return items['minecraft:oak_wood'].texture;
                }
            }
        }
        function switchPlank(key) {
            switch (key.data) {
                case 0: {
                    return items['minecraft:oak_planks'].texture;
                }
                case 1: {
                    return items['minecraft:spruce_planks'].texture;
                }
                case 2: {
                    return items['minecraft:birch_planks'].texture;
                }
                case 3: {
                    return items['minecraft:jungle_planks'].texture;
                }
                case 4: {
                    return items['minecraft:acacia_planks'].texture;
                }
                case 5: {
                    return items['minecraft:dark_oak_planks'].texture;
                }
                default: {
                    return items['minecraft:oak_planks'].texture;
                }
            }
        }
        function switchWoodSlab(key) {
            switch (key.data) {
                case 0: {
                    return items['minecraft:oak_slab'].texture;
                }
                case 1: {
                    return items['minecraft:spruce_slab'].texture;
                }
                case 2: {
                    return items['minecraft:birch_slab'].texture;
                }
                case 3: {
                    return items['minecraft:jungle_slab'].texture;
                }
                case 4: {
                    return items['minecraft:acacia_slab'].texture;
                }
                case 5: {
                    return items['minecraft:dark_oak_slab'].texture;
                }
                default: {
                    return items['minecraft:oak_slab'].texture;
                }
            }
        }
        function switchStoneSlab(key) {
            switch (key.data) {
                case 0: {
                    return items['minecraft:smooth_stone_slab'].texture;
                }
                case 1: {
                    return items['minecraft:sandstone_slab'].texture;
                }
                case 2: {
                    return items['minecraft:oak_slab'].texture;
                }
                case 3: {
                    return items['minecraft:cobblestone_slab'].texture;
                }
                case 4: {
                    return items['minecraft:brick_slab'].texture;
                }
                case 5: {
                    return items['minecraft:stone_brick_slab'].texture;
                }
                case 6: {
                    return items['minecraft:quartz_slab'].texture;
                }
                case 7: {
                    return items['minecraft:nether_brick_slab'].texture;
                }
                default: {
                    return items['minecraft:smooth_stone_slab'].texture;
                }
            }
        }
        function switchWool(key) {
            switch (key.data) {
                case 0: {
                    return items['minecraft:white_wool'].texture;
                }
                case 1: {
                    return items['minecraft:orange_wool'].texture;
                }
                case 2: {
                    return items['minecraft:magenta_wool'].texture;
                }
                case 3: {
                    return items['minecraft:light_blue_wool'].texture;
                }
                case 4: {
                    return items['minecraft:yellow_wool'].texture;
                }
                case 5: {
                    return items['minecraft:lime_wool'].texture;
                }
                case 6: {
                    return items['minecraft:pink_wool'].texture;
                }
                case 7: {
                    return items['minecraft:gray_wool'].texture;
                }
                case 8: {
                    return items['minecraft:light_gray_wool'].texture;
                }
                case 9: {
                    return items['minecraft:cyan_wool'].texture;
                }
                case 10: {
                    return items['minecraft:purple_wool'].texture;
                }
                case 11: {
                    return items['minecraft:blue_wool'].texture;
                }
                case 12: {
                    return items['minecraft:brown_wool'].texture;
                }
                case 13: {
                    return items['minecraft:green_wool'].texture;
                }
                case 14: {
                    return items['minecraft:red_wool'].texture;
                }
                case 15: {
                    return items['minecraft:black_wool'].texture;
                }
                default: {
                    return items['minecraft:white_wool'].texture;
                }
            }
        }
        function switchGlassPane(key) {
            switch (key.data) {
                case 0: {
                    return items['minecraft:white_stained_glass_pane'].texture;
                }
                case 1: {
                    return items['minecraft:orange_stained_glass_pane'].texture;
                }
                case 2: {
                    return items['minecraft:magenta_stained_glass_pane'].texture;
                }
                case 3: {
                    return items['minecraft:light_blue_stained_glass_pane'].texture;
                }
                case 4: {
                    return items['minecraft:yellow_stained_glass_pane'].texture;
                }
                case 5: {
                    return items['minecraft:lime_stained_glass_pane'].texture;
                }
                case 6: {
                    return items['minecraft:pink_stained_glass_pane'].texture;
                }
                case 7: {
                    return items['minecraft:gray_stained_glass_pane'].texture;
                }
                case 8: {
                    return items['minecraft:light_gray_stained_glass_pane'].texture;
                }
                case 9: {
                    return items['minecraft:cyan_stained_glass_pane'].texture;
                }
                case 10: {
                    return items['minecraft:purple_stained_glass_pane'].texture;
                }
                case 11: {
                    return items['minecraft:blue_stained_glass_pane'].texture;
                }
                case 12: {
                    return items['minecraft:brown_stained_glass_pane'].texture;
                }
                case 13: {
                    return items['minecraft:green_stained_glass_pane'].texture;
                }
                case 14: {
                    return items['minecraft:red_stained_glass_pane'].texture;
                }
                case 15: {
                    return items['minecraft:black_stained_glass_pane'].texture;
                }
                default: {
                    return items['minecraft:white_stained_glass_pane'].texture;
                }
            }
        }
        function switchGlass(key) {
            switch (key.data) {
                case 0: {
                    return items['minecraft:white_stained_glass'].texture;
                }
                case 1: {
                    return items['minecraft:orange_stained_glass'].texture;
                }
                case 2: {
                    return items['minecraft:magenta_stained_glass'].texture;
                }
                case 3: {
                    return items['minecraft:light_blue_stained_glass'].texture;
                }
                case 4: {
                    return items['minecraft:yellow_stained_glass'].texture;
                }
                case 5: {
                    return items['minecraft:lime_stained_glass'].texture;
                }
                case 6: {
                    return items['minecraft:pink_stained_glass'].texture;
                }
                case 7: {
                    return items['minecraft:gray_stained_glass'].texture;
                }
                case 8: {
                    return items['minecraft:light_gray_stained_glass'].texture;
                }
                case 9: {
                    return items['minecraft:cyan_stained_glass'].texture;
                }
                case 10: {
                    return items['minecraft:purple_stained_glass'].texture;
                }
                case 11: {
                    return items['minecraft:blue_stained_glass'].texture;
                }
                case 12: {
                    return items['minecraft:brown_stained_glass'].texture;
                }
                case 13: {
                    return items['minecraft:green_stained_glass'].texture;
                }
                case 14: {
                    return items['minecraft:red_stained_glass'].texture;
                }
                case 15: {
                    return items['minecraft:black_stained_glass'].texture;
                }
                default: {
                    return items['minecraft:white_stained_glass'].texture;
                }
            }
        }
        function switchCarpet(key) {
            switch (key.data) {
                case 0: {
                    return items['minecraft:white_carpet'].texture;
                }
                case 1: {
                    return items['minecraft:orange_carpet'].texture;
                }
                case 2: {
                    return items['minecraft:magenta_carpet'].texture;
                }
                case 3: {
                    return items['minecraft:light_blue_carpet'].texture;
                }
                case 4: {
                    return items['minecraft:yellow_carpet'].texture;
                }
                case 5: {
                    return items['minecraft:lime_carpet'].texture;
                }
                case 6: {
                    return items['minecraft:pink_carpet'].texture;
                }
                case 7: {
                    return items['minecraft:gray_carpet'].texture;
                }
                case 8: {
                    return items['minecraft:light_gray_carpet'].texture;
                }
                case 9: {
                    return items['minecraft:cyan_carpet'].texture;
                }
                case 10: {
                    return items['minecraft:purple_carpet'].texture;
                }
                case 11: {
                    return items['minecraft:blue_carpet'].texture;
                }
                case 12: {
                    return items['minecraft:brown_carpet'].texture;
                }
                case 13: {
                    return items['minecraft:green_carpet'].texture;
                }
                case 14: {
                    return items['minecraft:red_carpet'].texture;
                }
                case 15: {
                    return items['minecraft:black_carpet'].texture;
                }
                default: {
                    return items['minecraft:white_carpet'].texture;
                }
            }
        }
        function switchConrete(key) {
            switch (key.data) {
                case 0: {
                    return items['minecraft:white_concrete'].texture;
                }
                case 1: {
                    return items['minecraft:orange_concrete'].texture;
                }
                case 2: {
                    return items['minecraft:magenta_concrete'].texture;
                }
                case 3: {
                    return items['minecraft:light_blue_concrete'].texture;
                }
                case 4: {
                    return items['minecraft:yellow_concrete'].texture;
                }
                case 5: {
                    return items['minecraft:lime_concrete'].texture;
                }
                case 6: {
                    return items['minecraft:pink_concrete'].texture;
                }
                case 7: {
                    return items['minecraft:gray_concrete'].texture;
                }
                case 8: {
                    return items['minecraft:light_gray_concrete'].texture;
                }
                case 9: {
                    return items['minecraft:cyan_concrete'].texture;
                }
                case 10: {
                    return items['minecraft:purple_concrete'].texture;
                }
                case 11: {
                    return items['minecraft:blue_concrete'].texture;
                }
                case 12: {
                    return items['minecraft:brown_concrete'].texture;
                }
                case 13: {
                    return items['minecraft:green_concrete'].texture;
                }
                case 14: {
                    return items['minecraft:red_concrete'].texture;
                }
                case 15: {
                    return items['minecraft:black_concrete'].texture;
                }
                default: {
                    return items['minecraft:white_concrete'].texture;
                }
            }
        }
        function switchDye(key) {
            switch (key.data) {
                case 0: {
                    return items['minecraft:red_dye'].texture;
                }
                case 1: {
                    return items['minecraft:orange_dye'].texture;
                }
                case 2: {
                    return items['minecraft:magenta_dye'].texture;
                }
                case 3: {
                    return items['minecraft:light_blue_dye'].texture;
                }
                case 4: {
                    return items['minecraft:yellow_dye'].texture;
                }
                case 5: {
                    return items['minecraft:lime_dye'].texture;
                }
                case 6: {
                    return items['minecraft:pink_dye'].texture;
                }
                case 7: {
                    return items['minecraft:gray_dye'].texture;
                }
                case 8: {
                    return items['minecraft:light_gray_dye'].texture;
                }
                case 9: {
                    return items['minecraft:cyan_dye'].texture;
                }
                case 10: {
                    return items['minecraft:purple_dye'].texture;
                }
                case 11: {
                    return items['minecraft:blue_dye'].texture;
                }
                case 12: {
                    return items['minecraft:brown_dye'].texture;
                }
                case 13: {
                    return items['minecraft:green_dye'].texture;
                }
                case 14: {
                    return items['minecraft:red_dye'].texture;
                }
                case 15: {
                    return items['minecraft:black_dye'].texture;
                }
                default: {
                    return items['minecraft:white_dye'].texture;
                }
            }
        }
        function switchRedFlower(key) {
            switch (key.data) {
                case 0: {
                    return items['minecraft:poppy'].texture;
                }
                case 1: {
                    return items['minecraft:blue_orchid'].texture;
                }
                case 2: {
                    return items['minecraft:allium'].texture;
                }
                case 3: {
                    return items['minecraft:azure_bluet'].texture;
                }
                case 4: {
                    return items['minecraft:red_tulip'].texture;
                }
                case 5: {
                    return items['minecraft:orange_tulip'].texture;
                }
                case 6: {
                    return items['minecraft:white_tulip'].texture;
                }
                case 7: {
                    return items['minecraft:pink_tulip'].texture;
                }
                case 8: {
                    return items['minecraft:oxeye_daisy'].texture;
                }
                case 9: {
                    return items['minecraft:lily_of_the_valley'].texture;
                }
                default: {
                    return items['minecraft:poppy'].texture;
                }
            }
        }
        function switchStone(key) {
            switch (key.data) {
                case 0: {
                    return items['minecraft:stone'].texture;
                }
                case 1: {
                    return items['minecraft:granite'].texture;
                }
                case 2: {
                    return items['minecraft:polished_granite'].texture;
                }
                case 3: {
                    return items['minecraft:diorite'].texture;
                }
                case 4: {
                    return items['minecraft:polished_diorite'].texture;
                }
                case 5: {
                    return items['minecraft:andesite'].texture;
                }
                case 6: {
                    return items['minecraft:polished_andesite'].texture;
                }
                default: {
                    return items['minecraft:stone'].texture;
                }
            }
        }
        function switchLeaves(key) {
            switch (key.data) {
                case 0: {
                    return items['minecraft:oak_leaves'].texture;
                }
                case 1: {
                    return items['minecraft:spruce_leave'].texture;
                }
                case 2: {
                    return items['minecraft:birch_leave'].texture;
                }
                case 3: {
                    return items['minecraft:jungle_leave'].texture;
                }
                default: {
                    return items['minecraft:oak_leaves'].texture;
                }
            }
        }
        function switchLeaves2(key) {
            switch (key.data) {
                case 0: {
                    return items['minecraft:acacia_leaves'].texture;
                }
                case 1: {
                    return items['minecraft:dark_oak_leave'].texture;
                }
                default: {
                    return items['minecraft:acacia_leaves'].texture;
                }
            }
        }
        function switchSkull(key) {
            switch (key.data) {
                case 0: {
                    return items['minecraft:skeleton_skull'].texture;
                }
                case 1: {
                    return items['minecraft:wither_skeleton_skull'].texture;
                }
                case 2: {
                    return items['minecraft:zombie_head'].texture;
                }
                case 3: {
                    return items['minecraft:player_head'].texture;
                }
                case 4: {
                    return items['minecraft:creeper_head'].texture;
                }
                case 5: {
                    return items['minecraft:dragon_head'].texture;
                }
                default: {
                    return items['minecraft:skeleton_skull'].texture;
                }
            }
        }
        var textures, items, textureData, customTextures, i, customTexture, parsedName, newTexture, config, configKeys;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Promise.resolve().then(function () { return require('minecraft-textures/dist/textures/json/1.19.id.json'); })];
                case 1:
                    textures = _a.sent();
                    items = textures.items;
                    if (fs.existsSync('RP/textures/item_texture.json')){
                    textureData = JSON.parse(fs.readFileSync("RP/textures/item_texture.json", "utf-8"))['texture_data'];
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
                }
                    customTextures = fs.readdirSync("RP/textures/items/");
                    for (i = 0; i < customTextures.length; i++) {
                        customTexture = customTextures[i];
                        parsedName = "minecraft:" + customTexture.replace(".png", "");
                        if (items[parsedName]) {
                            newTexture = fs.readFileSync("RP/textures/items/" + customTexture);
                            items[parsedName].texture = newTexture;
                        }
                    }
                    config = JSON.parse(fs.readFileSync('data/create_recipe_images/config.json', 'utf-8'));
                    configKeys = Object.keys(config);
                    console.log('> Creating recipe images!');
                    configKeys.forEach(function (key) {
                        console.log('   - ' + key);
                        var recipeData = config[key];
                        var recipe = JSON.parse(fs.readFileSync('BP/recipes/' + recipeData.recipe, 'utf-8'));
                        if (recipe['minecraft:recipe_shaped']) {
                            drawShapedRecipe(recipeData, recipe);
                        }
                        else if (recipe['minecraft:recipe_furnace']) {
                            drawFurnaceRecipe(recipeData, recipe);
                        }
                        else if (recipe['minecraft:recipe_shapeless']) {
                            var smithing = recipe['minecraft:recipe_shapeless'];
                            if (smithing.tags.includes("smithing_table")) {
                                drawSmithingTableRecipe(recipeData, recipe);
                            }
                        }
                    });
                    return [2 /*return*/];
            }
        });
    });
}
run();
