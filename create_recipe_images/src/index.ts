import * as Canvas from 'canvas';
import * as JSON from 'comment-json';
import { readFileSync, writeFileSync } from 'fs';
import { getItemTexture } from './texture_map';
import { FURNACE_IMAGE, RECIPE_BOARD_IMAGE, SMITHING_TABLE_IMAGE } from './constants';

async function run() {
    const config = JSON.parse(readFileSync('data/create_recipe_images/config.json', 'utf-8')) as any;
    const configKeys = Object.keys(config);

    console.log('> Creating recipe images!');

    for (const key of configKeys) {
        console.log('   - ' + key);
        const recipeData: recipeData = config[key];

        const recipe = JSON.parse(readFileSync('BP/recipes/' + recipeData.recipe, 'utf-8')) ?? {};
        if ('minecraft:recipe_shaped' in recipe) {
            drawShapedRecipe(recipeData, recipe)
        } else if ('minecraft:recipe_furnace' in recipe) {
            drawFurnaceRecipe(recipeData, recipe)
        } else if ('minecraft:recipe_shapeless' in recipe) {
            const smithing: smithingRecipe = recipe['minecraft:recipe_shapeless'] as any;
            if (smithing.tags.includes("smithing_table")) {
                drawSmithingTableRecipe(recipeData, recipe)
            }
        }
    }

    function drawFurnaceRecipe(recipeData: recipeData, recipe: any) {
        const furnace: furnaceRecipe = recipe['minecraft:recipe_furnace'];

        const coalImage = getItemTexture({item: 'minecraft:coal', data: 0})

        const keys: Map<string, string> = new Map();
        let input = furnace.input
        let output = furnace.output
        keys.set(input, getItemTexture({item: input, data: 0}))
        keys.set(output, getItemTexture({item: output, data: 0}))

        let recipeImage = new Canvas.Image();
        recipeImage.src = FURNACE_IMAGE;
        var canvas = new Canvas.Canvas(recipeImage.width, recipeImage.height);
        var ctx = canvas.getContext('2d');
        ctx.drawImage(recipeImage, 0, 0);

        let convertImage = new Canvas.Image() as any;
        convertImage.onload = function () {
            ctx.imageSmoothingEnabled = false
            ctx.drawImage(convertImage, 11, 27, 16, 16)
        }
        convertImage.src = keys.get(input);

        let currencyImage = new Canvas.Image() as any;
        currencyImage.onload = function () {
            ctx.imageSmoothingEnabled = false
            ctx.drawImage(currencyImage, 65, 38, 32, 32)
        }
        currencyImage.src = keys.get(output);

        let fuelImage = new Canvas.Image();
        fuelImage.onload = function () {
            ctx.imageSmoothingEnabled = false
            ctx.drawImage(fuelImage, 11, 63, 16, 16)
        }
        fuelImage.src = coalImage

        const buffer = canvas.toBuffer();
        recipeData.output.forEach(out => {
            if (!out.includes('.png')) {
                out += '.png'
            }

            console.log('   > Writing to: ' + out);

            writeFileSync(out, buffer);
        });
    }

    function drawSmithingTableRecipe(recipeData: recipeData, recipe: any) {
        const smithing: smithingRecipe = recipe['minecraft:recipe_shapeless'];

        const keys: Map<string, string> = new Map();
        let convert = smithing.ingredients[0]
        let currency = smithing.ingredients[1]
        keys.set(convert.item, getItemTexture(convert as key))
        keys.set(currency.item, getItemTexture(currency as key))

        let recipeImage = new Canvas.Image();
        recipeImage.src = SMITHING_TABLE_IMAGE;
        var canvas = new Canvas.Canvas(recipeImage.width, recipeImage.height);
        var ctx = canvas.getContext('2d');
        ctx.drawImage(recipeImage, 0, 0);

        let convertImage = new Canvas.Image() as any;
        convertImage.onload = function () {
            ctx.imageSmoothingEnabled = false
            ctx.drawImage(convertImage, 29, 46, 16, 16)
        }
        convertImage.src = keys.get(convert.item);

        let currencyImage = new Canvas.Image() as any;
        currencyImage.onload = function () {
            ctx.imageSmoothingEnabled = false
            ctx.drawImage(currencyImage, 63, 46, 16, 16)
        }
        currencyImage.src = keys.get(currency.item);

        const buffer = canvas.toBuffer();
        recipeData.output.forEach(out => {
            if (!out.includes('.png')) {
                out += '.png'
            }

            console.log('   > Writing to: ' + out);

            writeFileSync(out, buffer);
        });
    }

    function drawShapedRecipe(recipeData: recipeData, recipe: any) {
        const shapedRecipe: shapedRecipe = recipe['minecraft:recipe_shaped'];

        let recipeImage = new Canvas.Image();
        recipeImage.src = RECIPE_BOARD_IMAGE;
        var canvas = new Canvas.Canvas(recipeImage.width, recipeImage.height);
        var ctx = canvas.getContext('2d');
        ctx.drawImage(recipeImage, 0, 0);

        var offX = 2;
        var offY = 2;

        if (shapedRecipe.pattern.length !== 3) {
            offY = 38;
        }

        shapedRecipe.pattern.forEach(row => {
            const column: string[] = row.split('');
            if (column.length !== 3) {
                offX = 38;
            }
            for (let i = 0; i < column.length; i++) {
                let key = (shapedRecipe.key as any)[`${column[i]}`];
                let keyImage = new Canvas.Image();
                keyImage.onload = function () {
                    ctx.imageSmoothingEnabled = false
                    ctx.drawImage(keyImage, offX, offY, 32, 32)
                }
                keyImage.src = key;
                offX += 36;
            }
            offX = 2;
            offY += 36;
        });

        const buffer = canvas.toBuffer();
        recipeData.output.forEach(out => {
            if (!out.includes('.png')) {
                out += '.png'
            }
            console.log('   > Writing to: ' + out);
            writeFileSync(out, buffer);
        });
        console.log()
    }
}

type smithingRecipe = {
    description: {
        identifier: string
    },
    tags: string[]
    priority: number
    ingredients: key[]
    result: {
        item: string
        count: number
    }
}

type furnaceRecipe = {
    description: {
        identifier: string
    }

    tags: string[]
    input: string
    output: string
}

type shapedRecipe = {
    description: {
        identifier: string;
    };
    tags: string[];
    pattern: string[];
    key: {};
    result: {
        item: string;
        data: any;
    };
}

type key = {
    item: string;
    count: number;
    data: any;
}

type recipeData = {
    recipe: string;
    output: string[];
}

run();