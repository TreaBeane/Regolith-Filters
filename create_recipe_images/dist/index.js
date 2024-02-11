"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Canvas = __importStar(require("canvas"));
const JSON = __importStar(require("comment-json"));
const fs_1 = require("fs");
const texture_map_js_1 = require("./texture_map.js");
const constants_js_1 = require("./constants.js");
async function run() {
    const config = JSON.parse((0, fs_1.readFileSync)('data/create_recipe_images/config.json', 'utf-8'));
    const configKeys = Object.keys(config);
    console.log('> Creating recipe images!');
    for (const key of configKeys) {
        console.log('   - ' + key);
        const recipeData = config[key];
        const recipe = JSON.parse((0, fs_1.readFileSync)('BP/recipes/' + recipeData.recipe, 'utf-8')) ?? {};
        if ('minecraft:recipe_shaped' in recipe) {
            drawShapedRecipe(recipeData, recipe);
        }
        else if ('minecraft:recipe_furnace' in recipe) {
            drawFurnaceRecipe(recipeData, recipe);
        }
        else if ('minecraft:recipe_shapeless' in recipe) {
            const smithing = recipe['minecraft:recipe_shapeless'];
            if (smithing.tags.includes("smithing_table")) {
                drawSmithingTableRecipe(recipeData, recipe);
            }
        }
    }
    function drawFurnaceRecipe(recipeData, recipe) {
        const furnace = recipe['minecraft:recipe_furnace'];
        const coalImage = (0, texture_map_js_1.getItemTexture)({ item: 'minecraft:coal', data: 0 });
        const keys = new Map();
        let input = furnace.input;
        let output = furnace.output;
        keys.set(input, (0, texture_map_js_1.getItemTexture)({ item: input, data: 0 }));
        keys.set(output, (0, texture_map_js_1.getItemTexture)({ item: output, data: 0 }));
        let recipeImage = new Canvas.Image();
        recipeImage.src = constants_js_1.FURNACE_IMAGE;
        var canvas = new Canvas.Canvas(recipeImage.width, recipeImage.height);
        var ctx = canvas.getContext('2d');
        ctx.drawImage(recipeImage, 0, 0);
        let convertImage = new Canvas.Image();
        convertImage.onload = function () {
            ctx.imageSmoothingEnabled = false;
            ctx.drawImage(convertImage, 11, 27, 16, 16);
        };
        convertImage.src = keys.get(input);
        let currencyImage = new Canvas.Image();
        currencyImage.onload = function () {
            ctx.imageSmoothingEnabled = false;
            ctx.drawImage(currencyImage, 65, 38, 32, 32);
        };
        currencyImage.src = keys.get(output);
        let fuelImage = new Canvas.Image();
        fuelImage.onload = function () {
            ctx.imageSmoothingEnabled = false;
            ctx.drawImage(fuelImage, 11, 63, 16, 16);
        };
        fuelImage.src = coalImage;
        const buffer = canvas.toBuffer();
        recipeData.output.forEach(out => {
            if (!out.includes('.png')) {
                out += '.png';
            }
            console.log('   > Writing to: ' + out);
            (0, fs_1.writeFileSync)(out, buffer);
        });
    }
    function drawSmithingTableRecipe(recipeData, recipe) {
        const smithing = recipe['minecraft:recipe_shapeless'];
        const keys = new Map();
        let convert = smithing.ingredients[0];
        let currency = smithing.ingredients[1];
        keys.set(convert.item, (0, texture_map_js_1.getItemTexture)(convert));
        keys.set(currency.item, (0, texture_map_js_1.getItemTexture)(currency));
        let recipeImage = new Canvas.Image();
        recipeImage.src = constants_js_1.SMITHING_TABLE_IMAGE;
        var canvas = new Canvas.Canvas(recipeImage.width, recipeImage.height);
        var ctx = canvas.getContext('2d');
        ctx.drawImage(recipeImage, 0, 0);
        let convertImage = new Canvas.Image();
        convertImage.onload = function () {
            ctx.imageSmoothingEnabled = false;
            ctx.drawImage(convertImage, 29, 46, 16, 16);
        };
        convertImage.src = keys.get(convert.item);
        let currencyImage = new Canvas.Image();
        currencyImage.onload = function () {
            ctx.imageSmoothingEnabled = false;
            ctx.drawImage(currencyImage, 63, 46, 16, 16);
        };
        currencyImage.src = keys.get(currency.item);
        const buffer = canvas.toBuffer();
        recipeData.output.forEach(out => {
            if (!out.includes('.png')) {
                out += '.png';
            }
            console.log('   > Writing to: ' + out);
            (0, fs_1.writeFileSync)(out, buffer);
        });
    }
    function drawShapedRecipe(recipeData, recipe) {
        const shapedRecipe = recipe['minecraft:recipe_shaped'];
        let recipeImage = new Canvas.Image();
        recipeImage.src = constants_js_1.RECIPE_BOARD_IMAGE;
        var canvas = new Canvas.Canvas(recipeImage.width, recipeImage.height);
        var ctx = canvas.getContext('2d');
        ctx.drawImage(recipeImage, 0, 0);
        var offX = 2;
        var offY = 2;
        if (shapedRecipe.pattern.length !== 3) {
            offY = 38;
        }
        shapedRecipe.pattern.forEach(row => {
            const column = row.split('');
            if (column.length !== 3) {
                offX = 38;
            }
            for (let i = 0; i < column.length; i++) {
                let key = shapedRecipe.key[`${column[i]}`];
                let keyImage = new Canvas.Image();
                keyImage.onload = function () {
                    ctx.imageSmoothingEnabled = false;
                    ctx.drawImage(keyImage, offX, offY, 32, 32);
                };
                keyImage.src = key;
                offX += 36;
            }
            offX = 2;
            offY += 36;
        });
        const buffer = canvas.toBuffer();
        recipeData.output.forEach(out => {
            if (!out.includes('.png')) {
                out += '.png';
            }
            console.log('   > Writing to: ' + out);
            (0, fs_1.writeFileSync)(out, buffer);
        });
        console.log();
    }
}
run();
