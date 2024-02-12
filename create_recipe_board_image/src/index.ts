import * as Canvas from 'canvas';
import * as JSON from 'comment-json';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { getItemTexture } from './texture_map';
import { RECIPE_BOARD_IMAGE, RECIPE_GRID_IMAGE } from './constants';
import * as Jimp from "jimp";
import { FontContext, getFontChoice, scanFontChoice } from './font-choice';

async function run() {
    const fonts = await scanFontChoice();
    const config = JSON.parse(readFileSync('data/create_recipe_board_image/config.json', 'utf-8')) as any;
    const configKeys = Object.keys(config);

    for (const key of configKeys) {
        const recipeBoardImage = new Canvas.Image();
        recipeBoardImage.src = RECIPE_BOARD_IMAGE;

        const recipeData: recipeData = config[key];
        const recipe = JSON.parse(readFileSync('BP/recipes/' + recipeData.recipe, 'utf-8')) ?? {};

        if ('minecraft:recipe_shaped' in recipe) {
            await drawShapedRecipe(key, recipeData, recipe, fonts)
        }
    }

    return 'done!'
}

async function drawShapedRecipe(key: string, recipeData: recipeData, recipe: any, fonts: any) {
    const shapedRecipe: shapedRecipe = recipe['minecraft:recipe_shaped'];

    var canvas = new Canvas.Canvas(1356, 586);
    var ctx = canvas.getContext('2d');

    async function drawBase(ctx: any) {
        return new Promise((resolve: any, reject: any) => {
            let recipeImage = new Canvas.Image();
            recipeImage.onload = function () {
                ctx.drawImage(recipeImage, 0, 0);
                resolve()
            }
            recipeImage.onerror = reject
            recipeImage.src = RECIPE_BOARD_IMAGE;
        })
    }

    async function drawRecipeResult(ctx: any) {
        return new Promise((resolve: any, reject: any) => {
            let resultImage = new Canvas.Image();
            resultImage.onload = function () {
                ctx.imageSmoothingEnabled = false
                ctx.drawImage(resultImage, 956, 236, 184, 184);
                resolve()
            }
            resultImage.onerror = reject;

            if (recipeData.result_texture !== undefined) {
                resultImage.src = readFileSync(recipeData.result_texture);
            } else {
                resultImage.src = getItemTexture(shapedRecipe.result)
            }
        })
    }

    async function drawRecipeElement(ctx: any, indexKey: string, offX: number, offY: number) {
        return new Promise((resolve: any, reject: any) => {
            let key = (shapedRecipe.key as any)[`${indexKey}`];
            let keyImage = new Canvas.Image();
            keyImage.onload = function () {
                ctx.imageSmoothingEnabled = false
                ctx.drawImage(keyImage, offX, offY, 123, 123);
                resolve()
            }
            keyImage.onerror = reject;
            keyImage.src = getItemTexture(key);
        })
    }

    async function drawRecipeGrid(ctx: any) {
        var offX = 232;
        var offY = 132;

        if (shapedRecipe.pattern.length !== 3) {
            offY = 271;
        }

        for (const row of shapedRecipe.pattern) {
            const column: string[] = row.split('');
            if (column.length !== 3) {
                offX = 232;
            }
            for (let i = 0; i < column.length; i++) {
                await drawRecipeElement(ctx, column[i], offX, offY)
                offX += 139;
            }
            offX = 232;
            offY += 139;
        }
    }

    async function drawRecipeTitle(ctx: any) {
        const text = recipeData.text;
        const lines = text.split("\\n");

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            lines[i] = "§f" + line.replace("&", "§");
        }

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

        return new Promise((resolve: any, reject) => {
            new Jimp(width, height, "#c6c6c6", (_, image) => {
                let offX = 0;
                let offY = 0;

                let lastCode = "f";

                lines.forEach((text) => {
                    offX = (width - measureLineWidth(text, fonts)) / 2;
                    text?.split("§").forEach((parts) => {
                        let code = parts.charAt(0).toLocaleLowerCase();
                        const textPart = parts.substring(1);

                        if (code === "l") {
                            code = lastCode;
                        } else if (code === "o") {
                            code = lastCode;
                        } else if (code === "r") {
                            code = "f";
                        }

                        image.print(
                            getFontChoice(fonts, false, false),
                            offX,
                            offY,
                            textPart
                        );

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

                image.getBase64(Jimp.MIME_PNG, (_, value) => {
                    let textImage = new Canvas.Image();
                    textImage.onload = function () {
                        ctx.imageSmoothingEnabled = false
                        ctx.drawImage(textImage, 0, 0, width, height, 204, 36, width * 1.333, height * 1.333);
                        resolve()
                    };
                    textImage.onerror = reject
                    textImage.src = value;
                });
            });
        })
    }

    await drawBase(ctx)
    await drawRecipeResult(ctx)
    await drawRecipeTitle(ctx)
    await drawRecipeGrid(ctx)

    const buffer = canvas.toBuffer();
    recipeData.output.forEach(out => {
        if (!out.includes('.png')) {
            out += '.png'
        }
        console.log(`creating ${key} board -> ${out}`)
        writeFileSyncRecursive(out, buffer)
    });
}

function writeFileSyncRecursive(filename: string, content: any) {
    // -- normalize path separator to '/' instead of path.sep, 
    // -- as / works in node for Windows as well, and mixed \\ and / can appear in the path
    let filepath = filename.replace(/\\/g, '/');

    // -- preparation to allow absolute paths as well
    let root = '';
    if (filepath[0] === '/') {
        root = '/';
        filepath = filepath.slice(1);
    }
    else if (filepath[1] === ':') {
        root = filepath.slice(0, 3);   // c:\
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

type recipeData = {
    recipe: string;
    text: string;
    output: string[];
    result_texture: string;
}

const status = await run();
console.log(status)