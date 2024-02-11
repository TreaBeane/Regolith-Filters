import * as fs from 'fs';
import * as Canvas from 'canvas';
import * as glob from "glob";

import * as JSON from 'comment-json';

// Our 3x3 recipe board encoded in base64
const recipeBoardImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGwAAABsCAIAAAAABMCaAAAAAXNSR0IArs4c6QAAATpJREFUeJzt2sENg0AQBMHDIicIhFAIiyD9uBDc+HGqSmCl1jx3O45jvO+6rjHG8zxL3vr84dLytrnEWfQ9932PMc7zXPKWJQZEDIgYEDEgYkDEgIgBEQMiBkQMiBgQMSBiQMSAiAERAyIGRAyIGBAxIGJAxICIAREDIgZEDIgYEDEgYkDEgIiBfX7wzT+7t616yxIDm5/t329ZYsDPdnDLEgMiBkQMiBgQMSBiQMSAiAERAyIGRAyIGBAxIGJAxICIAREDIgZEDIgYEDEgYkDEgIgBEQMiBkQMiBgQMSBiQMSAn+2AJQb8bAe3LDHgZzu4ZYkBEQMiBkQMiBgQMSBiQMSAiAERAyIGRAyIGBAxIGJAxICIAREDIgZEDIgYEDEgYkDEgIgBEQMiBkQMiBgQMSBiwM92wBIDX/NdR8tv3jpFAAAAAElFTkSuQmCC'
const furnaceImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGwAAABsCAYAAACPZlfNAAAAAXNSR0IArs4c6QAAArtJREFUeJzt2z1y2kAYxvGHTA5gagpcmSMshSmTGQoaRzO5A41TQMW4yri3m9whRdykcOELSEcglXIC+wZJwZcE2KCVAL+r/69CK43Y0TP7SlpYCQAAAAAAAAAAAAAAAAAAoBqNt3Y65/4dqyNYiaJI4/F4azY7A7u/uz9Mr/Aq13VqNBpbs/m470muv12X7kgURepd9kqfp872DkyaXfAyRqORkjgpdY66+3DqDqAYAjOGwIwhMGMIzBgCM4bAjCEwYwq9OIemitmbKiwmJPaZBWKEGVPrEbZQdsqtrNFoJEl7TdsxwowhMGMIzBgCM2bvh44oipY3R5zO3oH1Lnv8+PgOBFESXdedugtH4xXY2e1NpcdVoS6heQXWGT5thLFtuzN88u+ZhzqE5hVY0ow3wti2nTRj/555Cj00/5LYb+cb++38KFvfPqKQQ/MuieuS+OfOUXdMoYbmN/nbb0tKJa0e889ub6Rh9qBU6p9LBapi1RfZdV1wryKFR9iyzD3m/0nc+f0nf+B8/6nK4kJoI61wYLMyl2r649OybRZKmruvLfafsixK0sOvh5N+f9WKl8R5KC+T78umWSjnmg4upIky+12hsuh7ca++XL16vlar5XXO98rjHpZKktxzd+2xPdXLZHW/cM9dScVWK1V5cUMMS/IoidPB59mH7GP9+iN+pm06uPDqWBmhhiV5BLYqhenGPtf9mtlK144/jpDDkjwCm5U65Z8SH//OP6SZtkb++CMIPSzJ4x6WNGMpTqTM/WvZtuO4Q6pDWFIgP68kcVKLsKRAAqsT1jgbwxpnYyiJxhCYMQRmDIEZQ2DGEJgxtV4ftnhNsfQXdEaYMbUeYYtZF0sv84wwYwjMGAIzhsCMITBjCMwY1jgbwxpnY94MLIqi4BYTAAAAAAAAAAAAAAAAAAAAAMDh/Qf2PawN/oxzvgAAAABJRU5ErkJggg=='
const smithingTableImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGwAAABsCAYAAACPZlfNAAAAAXNSR0IArs4c6QAAAORJREFUeJzt2kEKwjAQBdAoHkpBb5F76CI3VLCeSheiuHBhqY6d8N6qUOik/WSYQkoBAAAAAAAAAAAAAAAAAAAAAACgV4vIYsN5uEbWi7LerMO+4yqq0MP+sJ/8jFpr2W13XaxjrPDASrm/6BSttXIZLt2sY4xlaDUm+8sO+7Xj6fi8jm5Zv2aHJSOwZASWjMCSST90vA4Yn97PPIjYYckILJn0LfFde/MfxmwILBmBJSOwZNIPHe/0Nmi8Cg+s1lpaa9FlZ7uOsRwR+ILIIwIAAAAAAAAAAAAAAAAAAAAAAAD06waALCj/jvlSlwAAAABJRU5ErkJggg=='

async function run() {
    // Load vanilla item texures
    const textures = await import('minecraft-textures/dist/textures/json/1.18.id.json')
    let items = textures.items

    const textureData = JSON.parse(
        fs.readFileSync("RP/textures/item_texture.json", "utf-8")
    )['texture_data'];

    // Load custom entity spawn egg textures
    glob.sync("RP/entity/**/*.json").forEach((itemPath) => {
        const entity = JSON.parse(fs.readFileSync(itemPath, "utf-8"));
        const desc = entity['minecraft:client_entity']['description']

        if (desc['spawn_egg']) {
            let identifier = desc['identifier']
            let texture = desc['spawn_egg']['texture']
            let textureIndex = desc['spawn_egg']['texture_index']

            if(textureData[texture]) {
                const texturePath =
                    "RP/" +
                    textureData[texture].textures +
                    ".png";

                let spawnEggTexture = fs.readFileSync(texturePath)
                items[identifier] = {
                    texture: spawnEggTexture
                }

                console.log("found entity " + identifier + " with textureIcon " + texture + " and index " + textureIndex)
            }
        }
    });

    // Load custom textures
    let customTextures = fs.readdirSync("RP/textures/items/")
    for (let i = 0; i < customTextures.length; i++) {
        let customTexture = customTextures[i]
        let parsedName = "minecraft:" + customTexture.replace(".png", "")

        if (items[parsedName]) {
            let newTexture = fs.readFileSync("RP/textures/items/" + customTexture)
            items[parsedName].texture = newTexture
        }
    }

    // Read config
    const config = JSON.parse(fs.readFileSync('data/create_recipe_images/config.json', 'utf-8'));
    const configKeys = Object.keys(config);

    console.log('> Creating recipe images!');

    configKeys.forEach(key => {
        console.log('   - ' + key);
        const recipeData: recipeData = config[key];

        const recipe = JSON.parse(fs.readFileSync('BP/recipes/' + recipeData.recipe, 'utf-8'));
        if (recipe['minecraft:recipe_shaped']) {
            drawShapedRecipe(recipeData, recipe)
        } else if (recipe['minecraft:recipe_furnace']) {
            drawFurnaceRecipe(recipeData, recipe)
        } else if (recipe['minecraft:recipe_shapeless']) {
            const smithing: smithingRecipe = recipe['minecraft:recipe_shapeless'];
            if (smithing.tags.includes("smithing_table")) {
                drawSmithingTableRecipe(recipeData, recipe)
            }
        }
    });

    function drawFurnaceRecipe(recipeData, recipe) {
        const furnace: furnaceRecipe = recipe['minecraft:recipe_furnace'];

        const coalImage = getTexture({item: 'minecraft:coal', count: 1, data: 0})

        const keys: Map<string, string> = new Map();
        let input = furnace.input
        let output = furnace.output
        keys.set(input, getTexture({item: input, count: 1, data: 0}))
        keys.set(output, getTexture({item: output, count: 1, data: 0}))

        let recipeImage = new Canvas.Image();
        recipeImage.src = furnaceImage;
        var canvas = new Canvas.Canvas(recipeImage.width, recipeImage.height);
        var ctx = canvas.getContext('2d');
        ctx.drawImage(recipeImage, 0, 0);

        let convertImage = new Canvas.Image();
        convertImage.onload = function () {
            ctx.imageSmoothingEnabled = false
            ctx.drawImage(convertImage, 11, 27, 16, 16)
        }
        convertImage.src = keys.get(input);

        let currencyImage = new Canvas.Image();
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

            fs.writeFileSync(out, buffer);
        });
    }

    function drawSmithingTableRecipe(recipeData, recipe) {
        const smithing: smithingRecipe = recipe['minecraft:recipe_shapeless'];

        const keys: Map<string, string> = new Map();
        let convert = smithing.ingredients[0]
        let currency = smithing.ingredients[1]
        keys.set(convert.item, getTexture(convert as key))
        keys.set(currency.item, getTexture(currency as key))

        let recipeImage = new Canvas.Image();
        recipeImage.src = smithingTableImage;
        var canvas = new Canvas.Canvas(recipeImage.width, recipeImage.height);
        var ctx = canvas.getContext('2d');
        ctx.drawImage(recipeImage, 0, 0);

        let convertImage = new Canvas.Image();
        convertImage.onload = function () {
            ctx.imageSmoothingEnabled = false
            ctx.drawImage(convertImage, 29, 46, 16, 16)
        }
        convertImage.src = keys.get(convert.item);

        let currencyImage = new Canvas.Image();
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

            fs.writeFileSync(out, buffer);
        });
    }

    function drawShapedRecipe(recipeData, recipe) {
        const shapedRecipe: shapedRecipe = recipe['minecraft:recipe_shaped'];
        const keys: Map<string, string> = new Map();
        Object.keys(shapedRecipe.key).forEach(key => {
            keys.set(key, getTexture(shapedRecipe.key[key] as key));
        });

        let recipeImage = new Canvas.Image();
        recipeImage.src = recipeBoardImage;
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
                let key = keys.get(column[i]);
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

            fs.writeFileSync(out, buffer);
        });
        console.log()
    }

    function getTexture(key: key) {
        let itemName: string = key.item;
        if (!itemName.includes(':')) {
            itemName = 'minecraft:' + itemName;
        }

        if(itemName.includes("spawn_egg")) {
            let eggData = key.data
            if(eggData !== undefined) {
                let matched = eggData.match("'(.*?)'")[1]
                if(items[matched]) {
                    console.log("found item texture for entity: " + matched)
                    return items[matched].texture
                } else {
                    console.log("could not find item texture for entity: " + matched)
                }
            } else {
                let replaced = itemName.replace('_spawn_egg', '')
                if(items[replaced]) {
                    console.log("found item texture for entity: " + replaced)
                    return items[replaced].texture
                } else {
                    console.log("could not find item texture for entity: " + replaced)
                }
            }
        }

        if (itemName.match(/:/g).length == 2) {
            key.data = Number.parseInt(itemName.substring(itemName.lastIndexOf(':') + 1, itemName.length));
            itemName = itemName.substring(0, itemName.lastIndexOf(':'));
        }

        if (itemName === 'minecraft:wool') {
            return switchWool(key);
        } else if (itemName === 'minecraft:magma') {
            return items['minecraft:magma_block'].texture;
        } else if (itemName === 'minecraft:red_flower') {
            return switchRedFlower(key);
        } else if (itemName === 'minecraft:leaves') {
            return switchLeaves(key);
        } else if (itemName === 'minecraft:leaves2') {
            return switchLeaves2(key);
        } else if (itemName === 'minecraft:stone') {
            return switchStone(key);
        } else if (itemName === 'minecraft:concrete') {
            return switchConrete(key)
        } else if (itemName === 'minecraft:dye') {
            return switchDye(key)
        } else if (itemName === 'minecraft:wooden_slab') {
            return switchWoodSlab(key)
        } else if (itemName === 'minecraft:log') {
            return switchLog(key)
        } else if (itemName === 'minecraft:sapling') {
            return switchSapling(key)
        } else if (itemName === 'minecraft:planks') {
            return switchPlank(key)
        } else if (itemName === 'minecraft:carpet') {
            return switchCarpet(key)
        } else if (itemName === 'minecraft:wood') {
            return switchWood(key)
        } else if (itemName === 'minecraft:stained_glass') {
            return switchGlass(key)
        } else if (itemName === 'minecraft:stained_glass_pane') {
            return switchGlassPane(key)
        } else if (itemName === 'minecraft:stone_slab') {
            return switchStoneSlab(key)
        } else if (itemName === 'minecraft:wooden_door') {
            return items['minecraft:oak_door'].texture
        } else if (itemName === 'minecraft:web') {
            return items['minecraft:cobweb'].texture
        } else if (itemName === 'minecraft:skull') {
            return switchSkull(key)
        } else if (itemName === 'minecraft:yellow_flower') {
            return items['minecraft:dandelion'].texture;
        } else if (itemName === 'minecraft:brick_block') {
            return items['minecraft:bricks'].texture;
        }

        if (items[itemName] === undefined) {
            let resultIcon = undefined;

            glob.sync("RP/items/**/*.json").forEach((itemPath) => {
                const item = JSON.parse(fs.readFileSync(itemPath, "utf-8"));
                const identifier =
                    item["minecraft:item"].description.identifier;
                const icon =
                    item["minecraft:item"].components["minecraft:icon"];

                if (identifier === itemName) {
                    resultIcon = icon;
                }
            });

            if (resultIcon !== undefined) {
                const itemTextures = JSON.parse(
                    fs.readFileSync("RP/textures/item_texture.json", "utf-8")
                );
                const texturePath =
                    "RP/" +
                    (itemTextures as any).texture_data[resultIcon].textures +
                    ".png";

                if (fs.existsSync(texturePath)) {
                    let texture = fs.readFileSync(texturePath)
                    return texture
                } else {
                    const invalid = " data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAAXNSR0IArs4c6QAAAChJREFUCJltyqENACAMALAORRD8fydimRueUN3IXQ3rTDA8Ag256z8uTGEHATZy6pcAAAAASUVORK5CYII="
                    return invalid
                }
            }

            return items['minecraft:stone'].texture;
        }
        return items[itemName].texture;
    }

    function switchLog(key: key) {
        switch (key.data) {
            case 0: {
                return items['minecraft:oak_log'].texture
            }
            case 1: {
                return items['minecraft:spruce_log'].texture
            }
            case 2: {
                return items['minecraft:birch_log'].texture
            }
            case 3: {
                return items['minecraft:jungle_log'].texture
            }
            case 4: {
                return items['minecraft:acacia_log'].texture
            }
            case 5: {
                return items['minecraft:dark_oak_log'].texture
            }
            default: {
                return items['minecraft:oak_log'].texture;
            }
        }
    }

    function switchSapling(key: key) {
        switch (key.data) {
            case 0: {
                return items['minecraft:oak_sapling'].texture
            }
            case 1: {
                return items['minecraft:spruce_sapling'].texture
            }
            case 2: {
                return items['minecraft:birch_sapling'].texture
            }
            case 3: {
                return items['minecraft:jungle_sapling'].texture
            }
            case 4: {
                return items['minecraft:acacia_sapling'].texture
            }
            case 5: {
                return items['minecraft:dark_oak_sapling'].texture
            }
            default: {
                return items['minecraft:oak_sapling'].texture;
            }
        }
    }

    function switchWood(key: key) {
        switch (key.data) {
            case 0: {
                return items['minecraft:oak_wood'].texture
            }
            case 1: {
                return items['minecraft:spruce_wood'].texture
            }
            case 2: {
                return items['minecraft:birch_wood'].texture
            }
            case 3: {
                return items['minecraft:jungle_wood'].texture
            }
            case 4: {
                return items['minecraft:acacia_wood'].texture
            }
            case 5: {
                return items['minecraft:dark_oak_wood'].texture
            }
            default: {
                return items['minecraft:oak_wood'].texture;
            }
        }
    }

    function switchPlank(key: key) {
        switch (key.data) {
            case 0: {
                return items['minecraft:oak_planks'].texture
            }
            case 1: {
                return items['minecraft:spruce_planks'].texture
            }
            case 2: {
                return items['minecraft:birch_planks'].texture
            }
            case 3: {
                return items['minecraft:jungle_planks'].texture
            }
            case 4: {
                return items['minecraft:acacia_planks'].texture
            }
            case 5: {
                return items['minecraft:dark_oak_planks'].texture
            }
            default: {
                return items['minecraft:oak_planks'].texture;
            }
        }
    }

    function switchWoodSlab(key: key) {
        switch (key.data) {
            case 0: {
                return items['minecraft:oak_slab'].texture
            }
            case 1: {
                return items['minecraft:spruce_slab'].texture
            }
            case 2: {
                return items['minecraft:birch_slab'].texture
            }
            case 3: {
                return items['minecraft:jungle_slab'].texture
            }
            case 4: {
                return items['minecraft:acacia_slab'].texture
            }
            case 5: {
                return items['minecraft:dark_oak_slab'].texture
            }
            default: {
                return items['minecraft:oak_slab'].texture;
            }
        }
    }

    function switchStoneSlab(key: key) {
        switch (key.data) {
            case 0: {
                return items['minecraft:smooth_stone_slab'].texture
            }
            case 1: {
                return items['minecraft:sandstone_slab'].texture
            }
            case 2: {
                return items['minecraft:oak_slab'].texture
            }
            case 3: {
                return items['minecraft:cobblestone_slab'].texture
            }
            case 4: {
                return items['minecraft:brick_slab'].texture
            }
            case 5: {
                return items['minecraft:stone_brick_slab'].texture
            }
            case 6: {
                return items['minecraft:quartz_slab'].texture
            }
            case 7: {
                return items['minecraft:nether_brick_slab'].texture
            }
            default: {
                return items['minecraft:smooth_stone_slab'].texture;
            }
        }
    }

    function switchWool(key: key) {
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

    function switchGlassPane(key: key) {
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

    function switchGlass(key: key) {
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

    function switchCarpet(key: key) {
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

    function switchConrete(key: key) {
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

    function switchDye(key: key) {
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

    function switchRedFlower(key: key) {
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

    function switchStone(key: key) {
        switch (key.data) {
            case 0: {
                return items['minecraft:stone'].texture;
            }
            case 1: {
                return items['minecraft:granite'].texture
            }
            case 2: {
                return items['minecraft:polished_granite'].texture
            }
            case 3: {
                return items['minecraft:diorite'].texture
            }
            case 4: {
                return items['minecraft:polished_diorite'].texture
            }
            case 5: {
                return items['minecraft:andesite'].texture
            }
            case 6: {
                return items['minecraft:polished_andesite'].texture
            }
            default: {
                return items['minecraft:stone'].texture;
            }
        }
    }

    function switchLeaves(key: key) {
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

    function switchLeaves2(key: key) {
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

    function switchSkull(key: key) {
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