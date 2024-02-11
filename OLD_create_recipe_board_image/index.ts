import * as fs from "fs";
import * as glob from "glob";
import * as Canvas from "canvas";
import Jimp = require("jimp");
import {
    getFont,
    getFontChoice,
    FontContext,
    scanFontChoice,
} from "./font-choice";

import * as JSON from 'comment-json';

const recipeGridImageSrc =
    " data:image/png;base64,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";
const recipeBoardImageSrc =
    " data:image/png;base64,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";

function drawTextureFromPath(texture, ctx) {
    drawCustomTexture(fs.readFileSync(texture), ctx)
}

function drawCustomTexture(texture, ctx) {
    let resultImage = new Canvas.Image();
    resultImage.src = texture

    let tempCanvas = new Canvas.Canvas(resultImage.width, resultImage.height);
    let tempCtx = tempCanvas.getContext('2d');
    tempCtx.drawImage(resultImage, 0, 0, resultImage.width, resultImage.height)

    for (let x = 0; x < resultImage.width; x++) {
        for (let y = 0; y < resultImage.height; y++) {
            var tempData = tempCtx.getImageData(x, y, 1, 1);
            if (tempData.data[3] > 0) {
                tempData.data[3] = 255;
                tempCtx.putImageData(tempData, x, y);
            }
        }
    }
    ctx.drawImage(tempCanvas, 956, 236, 184, 184);
}

async function run() {
    const fonts = await scanFontChoice();
    const textures = await import(
        "minecraft-textures/dist/textures/json/1.18.id.json"
        );
    let items = textures.items;

    const textureData = JSON.parse(
        fs.readFileSync("RP/textures/item_texture.json", "utf-8")
    )['texture_data'];

    // Load custom vanilla textures
    let customTextures = fs.readdirSync("RP/textures/items/")
    for (let i = 0; i < customTextures.length; i++) {
        let customTexture = customTextures[i]
        let parsedName = "minecraft:" + customTexture.replace(".png", "")

        if (items[parsedName]) {
            let newTexture = fs.readFileSync("RP/textures/items/" + customTexture)
            items[parsedName].texture = newTexture
        }
    }

    // Load custom entity spawn egg textures
    glob.sync("RP/entity/**/*.json").forEach((itemPath) => {
        const entity = JSON.parse(fs.readFileSync(itemPath, "utf-8"));
        const desc = entity['minecraft:client_entity']['description']

        if (desc['spawn_egg']) {
            let identifier = desc['identifier']
            let texture = desc['spawn_egg']['texture']
            let textureIndex = desc['spawn_egg']['texture_index']

            if (textureData[texture]) {
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

    //TODO: Read requested recipes from the config file.
    if (!fs.existsSync("data/create_recipe_board_image/config.json")) {
        fs.mkdirSync("data/create_recipe_board_image", {recursive: true});
        let defaultConfigData = await import("./assets/config.json");
        fs.writeFileSync(
            "data/create_recipe_board_image/config.json",
            JSON.stringify(defaultConfigData, null, 4)
        );
        console.log(
            "No config file was found, generating default config and quitting!"
        );
        return;
    }

    const config = JSON.parse(
        fs.readFileSync("./data/create_recipe_board_image/config.json", "utf-8")
    );
    const configKeys = Object.keys(config);

    configKeys.forEach((key) => {
        //TODO: Rob recipe image and text code from other filters.
        console.log("   - " + key);
        var recipeBoardImage = new Canvas.Image();
        recipeBoardImage.src = recipeBoardImageSrc;

        var canvas = new Canvas.Canvas(
            recipeBoardImage.width,
            recipeBoardImage.height
        );
        var ctx = canvas.getContext("2d");

        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(
            recipeBoardImage,
            0,
            0,
            recipeBoardImage.width,
            recipeBoardImage.height
        );

        const recipeData: recipeData = config[key];
        const recipe = JSON.parse(
            fs.readFileSync("BP/recipes/" + recipeData.recipe, "utf-8")
        );
        const shapedRecipe: shapedRecipe = recipe["minecraft:recipe_shaped"];
        const keys: Map<string, string> = new Map();
        Object.keys(shapedRecipe.key).forEach((key) => {
            keys.set(key, getTexture(shapedRecipe.key[key] as key));
        });

        let recipeImage = new Canvas.Image();
        recipeImage.src = recipeGridImageSrc;
        var recipeGridCanvas = new Canvas.Canvas(
            recipeImage.width,
            recipeImage.height
        );
        var recipeGridCtx = canvas.getContext("2d");
        // recipeGridCtx.drawImage(recipeImage, 0, 0, recipeImage.width, recipeImage.height);

        var offX = 232;
        var offY = 132;

        if (shapedRecipe.pattern.length !== 3) {
            offY = 232;
        }

        if (recipeData.result_texture !== undefined) {
            let resultImage = new Canvas.Image();
            resultImage.src = fs.readFileSync(recipeData.result_texture);
            ctx.drawImage(resultImage, 956, 236, 184, 184);
        } else {
            const resultItemNamespace = shapedRecipe.result.item;
            if (resultItemNamespace.includes("spawn_egg")) {
                let eggData = shapedRecipe.result.data
                if (eggData !== undefined) {
                    let matched = eggData.match("'(.*?)'")[1]
                    if (items[matched]) {
                        console.log("found item texture for entity: " + matched)
                        let entityTexture = items[matched].texture
                        drawCustomTexture(entityTexture, ctx)
                    } else {
                        console.log("could not find item texture for entity: " + matched)
                    }
                } else {
                    console.log("Result " + resultItemNamespace + " does not contain data value. We try our hacky method :>")
                    let replaced = resultItemNamespace.replace('_spawn_egg', '')
                    console.log("replaced val: " + replaced)
                    if (items[replaced]) {
                        console.log("found item texture for entity: " + replaced)
                        let entityTexture = items[replaced].texture
                        drawCustomTexture(entityTexture, ctx)
                    } else {
                        console.log("could not find item texture for entity: " + replaced)
                    }
                }
            } else if (resultItemNamespace.includes("minecraft:")) {
                let resultImage = new Canvas.Image();
                resultImage.src = getTexture(shapedRecipe.result as key);
                ctx.drawImage(resultImage, 956, 236, 184, 184);
            } else {
                let resultIcon = undefined;

                glob.sync("RP/items/**/*.json").forEach((itemPath) => {
                    const item = JSON.parse(fs.readFileSync(itemPath, "utf-8"));
                    const identifier =
                        item["minecraft:item"].description.identifier;
                    const icon =
                        item["minecraft:item"].components["minecraft:icon"];

                    if (identifier === resultItemNamespace) {
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
                        drawTextureFromPath(texturePath, ctx)
                    } else {
                        let resultImage = new Canvas.Image();
                        resultImage.src =
                            " data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAAXNSR0IArs4c6QAAAChJREFUCJltyqENACAMALAORRD8fydimRueUN3IXQ3rTDA8Ag256z8uTGEHATZy6pcAAAAASUVORK5CYII=";
                        ctx.drawImage(resultImage, 956, 236, 184, 184)
                    }
                }
            }
        }

        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(
            recipeImage,
            224,
            124,
            recipeGridCanvas.width,
            recipeGridCanvas.height
        );

        shapedRecipe.pattern.forEach((row) => {
            const column: string[] = row.split("");

            if (column.length !== 3) {
                offX = 232;
            }

            for (let i = 0; i < column.length; i++) {
                let key = keys.get(column[i]);
                let keyImage = new Canvas.Image();
                keyImage.onload = function () {
                    recipeGridCtx.drawImage(keyImage, offX, offY, 123, 123);
                };
                keyImage.src = key;

                offX += 139;
            }

            offX = 232;
            offY += 139;
        });

        {
            const text = recipeData.text;

            // Break down input text into lines.
            const lines = text.split("\\n");

            // Need a color code to start each line.
            for (let i = 0; i < lines.length; i++) {
                const line = lines[i];
                lines[i] = "§f" + line.replace("&", "§");
            }

            // Build text without color codes
            let trueText = "";
            lines.forEach((line) => {
                line.split("§").forEach((part) => {
                    trueText += part.substring(1);
                });
                trueText += "_";
            });
            trueText = trueText.slice(0, -1);

            const width = measureWidth(lines, fonts);
            const height = measureHeight(lines, fonts);

            new Jimp(width, height, "#c6c6c6", (err, image) => {
                // Again this is pretty much useless until entity based holograms!
                // image.opacity(0.0);

                // Offset on the width axis to help center the text
                let offX = 0;
                let offY = 0;

                // Storing text format here to resemble how bedrock edition proccess formatted text.
                let bold = false;
                let italic = false;
                let lastCode = "f";

                //Draw and color each line individually
                lines.forEach((text) => {
                    // Split text into parts depending on the color code to proccess color.
                    offX = (width - measureLineWidth(text, fonts)) / 2;
                    text?.split("§").forEach((parts) => {
                        let code = parts.charAt(0).toLocaleLowerCase();
                        const textPart = parts.substring(1);

                        if (code === "l") {
                            bold = true;
                            code = lastCode;
                        } else if (code === "o") {
                            italic = true;
                            code = lastCode;
                        } else if (code === "r") {
                            bold = false;
                            italic = false;
                            code = "f";
                        }

                        //Draw text
                        image.print(
                            getFontChoice(fonts, false, false),
                            offX,
                            offY,
                            textPart
                        );

                        //Translate color code into a color pallet
                        lastCode = code;

                        offX += Jimp.measureText(
                            getFontChoice(fonts, false, false),
                            textPart
                        );
                    });
                    offY += Jimp.measureTextHeight(
                        fonts.bold,
                        removeFormating(text),
                        9999999
                    );
                });

                image.getBase64(Jimp.MIME_PNG, (error, value) => {
                    let textImage = new Canvas.Image();
                    textImage.onload = function () {
                        ctx.drawImage(textImage, 0, 0, width, height, 204, 36, width * 1.333, height * 1.333);
                    };
                    textImage.src = value;

                    //TOOD: Stich them together on a template image.
                    const buffer = canvas.toBuffer();
                    recipeData.output.forEach((out) => {
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

    function getTexture(key: key) {
        let itemName: string = key.item;
        if (!itemName.includes(":")) {
            itemName = "minecraft:" + itemName;
        }

        if (itemName.match(/:/g).length == 2) {
            key.data = Number.parseInt(
                itemName.substring(
                    itemName.lastIndexOf(":") + 1,
                    itemName.length
                )
            );
            itemName = itemName.substring(0, itemName.lastIndexOf(":"));
        }

        if (itemName === "minecraft:wool") {
            return switchWool(key);
        } else if (itemName === "minecraft:magma") {
            return items["minecraft:magma_block"].texture;
        } else if (itemName === "minecraft:red_flower") {
            return switchRedFlower(key);
        } else if (itemName === "minecraft:leaves") {
            return switchLeaves(key);
        } else if (itemName === "minecraft:leaves2") {
            return switchLeaves2(key);
        } else if (itemName === "minecraft:stone") {
            return switchStone(key);
        } else if (itemName === "minecraft:concrete") {
            return switchConrete(key);
        } else if (itemName === "minecraft:dye") {
            return switchDye(key);
        } else if (itemName === "minecraft:wooden_slab") {
            return switchWoodSlab(key);
        } else if (itemName === "minecraft:log") {
            return switchLog(key);
        } else if (itemName === "minecraft:sapling") {
            return switchSapling(key);
        } else if (itemName === "minecraft:planks") {
            return switchPlank(key);
        } else if (itemName === "minecraft:carpet") {
            return switchCarpet(key);
        } else if (itemName === "minecraft:wood") {
            return switchWood(key);
        } else if (itemName === "minecraft:stained_glass") {
            return switchGlass(key);
        } else if (itemName === "minecraft:stained_glass_pane") {
            return switchGlassPane(key);
        } else if (itemName === "minecraft:stone_slab") {
            return switchStoneSlab(key);
        } else if (itemName === "minecraft:wooden_door") {
            return items["minecraft:oak_door"].texture;
        } else if (itemName === "minecraft:web") {
            return items["minecraft:cobweb"].texture;
        } else if (itemName === "minecraft:skull") {
            return switchSkull(key);
        } else if (itemName === "minecraft:yellow_flower") {
            return items["minecraft:dandelion"].texture;
        }

        if (items[itemName] === undefined) {
            return items["minecraft:stone"].texture;
        }
        return items[itemName].texture;
    }

    function switchLog(key: key) {
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

    function switchSapling(key: key) {
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

    function switchWood(key: key) {
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

    function switchPlank(key: key) {
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

    function switchWoodSlab(key: key) {
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

    function switchStoneSlab(key: key) {
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

    function switchWool(key: key) {
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

    function switchGlassPane(key: key) {
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

    function switchGlass(key: key) {
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

    function switchCarpet(key: key) {
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

    function switchConrete(key: key) {
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

    function switchDye(key: key) {
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

    function switchRedFlower(key: key) {
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

    function switchStone(key: key) {
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

    function switchLeaves(key: key) {
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

    function switchLeaves2(key: key) {
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

    function switchSkull(key: key) {
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
};

type key = {
    item: string;
    count: number;
    data: number;
};

type recipeData = {
    recipe: string;
    text: string;
    output: string[];
    result_texture: string;
};

function measureWidth(lines: string[], fonts: FontContext): number {
    let width = 0;
    lines.forEach((text) => {
        const lineWidth = measureLineWidth(text, fonts);
        if (lineWidth >= width) {
            width = lineWidth;
        }
    });

    return width;
}

function measureLineWidth(text: string, fonts: FontContext): number {
    let width = 0;
    let bold = false;
    let italic = false;

    text?.split("§").forEach((parts) => {
        const code = parts.charAt(0).toLocaleLowerCase();
        const textPart = parts.substring(1);

        if (code === "l") {
            bold = true;
        } else if (code === "o") {
            italic = true;
            width += 10;
        } else if (code === "r") {
            bold = false;
            italic = false;
        }

        width += Jimp.measureText(getFontChoice(fonts, bold, italic), textPart);
    });

    return width;
}

function measureHeight(lines: string[], fonts: FontContext): number {
    let height = 0;
    let bold = false;
    let italic = false;

    lines.forEach((text) => {
        let lineHeight = 0;
        text?.split("§").forEach((parts) => {
            const code = parts.charAt(0).toLocaleLowerCase();
            const textPart = parts.substring(1);

            if (code === "l") {
                bold = true;
            } else if (code === "o") {
                italic = true;
            } else if (code === "r") {
                bold = false;
                italic = false;
            }

            const textHeight = Jimp.measureTextHeight(
                getFontChoice(fonts, bold, italic),
                textPart,
                999999
            );
            if (textHeight >= lineHeight) {
                lineHeight = textHeight;
            }
        });
        height += lineHeight;
    });

    return height;
}

function removeFormating(text: string): string {
    let trueText = "";
    text.split("§").forEach((part) => {
        trueText += part.substring(1);
    });
    return trueText;
}

run();
