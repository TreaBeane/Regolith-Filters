import * as Canvas from 'canvas';
import * as JSON from 'comment-json';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { getItemTexture } from './texture_map';
import { FURNACE_IMAGE, RECIPE_GRID_IMAGE, SMITHING_TABLE_IMAGE } from './constants';
import { resolve } from 'path';

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
            writeFileSyncRecursive(out, buffer)
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
            writeFileSyncRecursive(out, buffer)
        });
    }

    async function drawShapedRecipe(recipeData: recipeData, recipe: any) {
        const shapedRecipe: shapedRecipe = recipe['minecraft:recipe_shaped'];

        let recipeImage = new Canvas.Image();
        recipeImage.src = RECIPE_GRID_IMAGE;
        var canvas = new Canvas.Canvas(recipeImage.width, recipeImage.height);
        var ctx = canvas.getContext('2d');
        ctx.drawImage(recipeImage, 0, 0);

        var offX = 2;
        var offY = 2;

        if (shapedRecipe.pattern.length !== 3) {
            offY = 38;
        }

        async function drawKeys(ctx: any) {
            shapedRecipe.pattern.forEach(row => {
                const column: string[] = row.split('');
                if (column.length !== 3) {
                    offX = 38;
                }
                for (let i = 0; i < column.length; i++) {
                    new Promise((resolve: any, reject: any) => {
                        let key = (shapedRecipe.key as any)[`${column[i]}`];
                        let keyImage = new Canvas.Image();
                        keyImage.onload = function () {
                            ctx.imageSmoothingEnabled = false
                            ctx.drawImage(keyImage, offX, offY, 32, 32)
                            resolve()
                        }
                        keyImage.src = getItemTexture(key);
                        keyImage.onerror = reject;
                    })
                    offX += 36;
                }
                offX = 2;
                offY += 36;
            });
        }

        await drawKeys(ctx)
        const buffer = canvas.toBuffer();
        recipeData.output.forEach(out => {
            if (!out.includes('.png')) {
                out += '.png'
            }
            console.log('   > Writing to: ' + out);

            writeFileSyncRecursive(out, buffer)
        });
        console.log()
    }
}

function writeFileSyncRecursive(filename: string, content: any) {
    // -- normalize path separator to '/' instead of path.sep, 
    // -- as / works in node for Windows as well, and mixed \\ and / can appear in the path
    let filepath = filename.replace(/\\/g,'/');  
  
    // -- preparation to allow absolute paths as well
    let root = '';
    if (filepath[0] === '/') { 
      root = '/'; 
      filepath = filepath.slice(1);
    } 
    else if (filepath[1] === ':') { 
      root = filepath.slice(0,3);   // c:\
      filepath = filepath.slice(3); 
    }
  
    // -- create folders all the way down
    const folders = filepath.split('/').slice(0, -1);  // remove last item, file
    folders.reduce(
      (acc, folder) => {
        const folderPath = acc + folder + '/';
        if (!existsSync(folderPath)) {
          mkdirSync(folderPath);
        }
        return folderPath
      },
      root // first 'acc', important
    ); 
    
    // -- write file
    writeFileSync(root + filepath, content);
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