/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/naming-convention */

import * as Jimp from "jimp";
import { Font } from "@jimp/plugin-print";
import {
    getFont,
    getFontChoice,
    FontContext,
    scanFontChoice,
} from "./font-choice";
import * as fs from "fs";
import { Console } from "console";
import { randomInt } from "crypto";

var index = 0;
var cache = undefined;

async function run() {
    if (!fs.existsSync("data/create_holograms")) {
        fs.mkdirSync("data/create_holograms");
    }

    const assetDirExist = fs.existsSync("data/create_holograms/assets");

    if (!assetDirExist) {
        console.error(
            "Asset directory was not create. You must copy the asset directory from sample over to use this filter!"
        );
        return;
    }

    if (!fs.existsSync("data/create_holograms/holograms.lang")) {
        fs.writeFileSync(
            "data/create_holograms/holograms.lang",
            Buffer.from("", "utf-8")
        );
    }

    fs.mkdirSync("../../create_holograms/", {recursive:true})
    if (!fs.existsSync("../../create_holograms/cache.json")) {
        fs.writeFileSync(
            "../../create_holograms/cache.json",
            Buffer.from(JSON.stringify({}, null, 4), "utf-8")
        );
    }

    cache = JSON.parse(
        fs.readFileSync("../../create_holograms/cache.json", "utf-8")
    );

    const fonts = await scanFontChoice();
    const data = fs.readFileSync(
        "data/create_holograms/holograms.lang",
        "utf-8"
    );
    const enteries = data.split("\n");

    // Creates default hologram files if BP is missing (lazy since I don't actually check all files, just assume if BP is missing they all are :PP)
    createBPHologramEntityFile();
    createRPHologramEntityFile();
    createHologramRenderFile();
    createHologramAnimationFile();

    //console.log("Creating Holograms:");
    for (var i = 0; i < enteries.length; i++) {
        if (enteries[i][0] === "#" || !enteries[i].includes('=')) {
            // This is for comments or not a valid line
            continue;
        }

        const hologramEntry = enteries[i];
        var namespace = hologramEntry.substring(
            0,
            hologramEntry.indexOf("=")
        );


        var trigger = undefined;

        if (namespace.includes("<") && namespace.includes(">")) {
            trigger = namespace.substring(
                namespace.indexOf("<") + 1,
                namespace.indexOf(">")
            );
            namespace = namespace.substring(0, namespace.indexOf("<"));
            //console.log(' > ' + namespace);
            //console.log('   - trigger: ' + trigger);
        }else {
            //console.log(' > ' + namespace);
        }

        const text = hologramEntry.substring(
            hologramEntry.indexOf("=") + 1,
            hologramEntry.length
        );
        
        if (fs.existsSync('RP/' + text.replace(/\r/g, ''))){
            await createHologramWithImage(
                namespace,
                trigger,
                text,
                cache[namespace]
            );
            //console.log('   - texture path: ' + text);
        } else {
            //console.log('   - text: ' + text);
            await createHologram(
                namespace,
                trigger,
                text,
                true,
                fonts,
                cache[namespace]
            );
        }
    }

    fs.writeFileSync('../../create_holograms/cache.json', JSON.stringify(cache, null, 4));
}

async function createHologram(
    namespace: string,
    trigger: string,
    text: string,
    background: boolean,
    fonts: FontContext,
    cacheData: {
        text: string;
        variant: number;
        texture: string;
    }
) {

    if (cacheData === undefined){
        cacheData = {
            text: undefined,
            variant: undefined,
            texture: undefined
        }
    }

    //Ensure user input values are not undefined (if undefined means they hit esc and want to cancel the command)
    if (background === undefined || text === undefined) {
        return;
    }

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

    // Clean text for namespace and file name (lower case, remove sapces, ect..)
    const cleanText = `${trueText
        ?.replace(/(?:\r\n|\r|\n| )/g, "_")
        .replace("/", "")
        .toLocaleLowerCase()}`.replace(/\W/g, "");

    if (namespace === undefined) {
        namespace = cleanText;
    }

    // Retrieve texture and json paths (root them in a subfolder called holos to isolate them from non hologram files)
    const texturePath =
        "RP/textures/entity/hologram/" +
        namespace.substring(namespace.indexOf(":") + 1, namespace.length) +
        ".png";

    // Caculate image width and height TODO: This method doesn't seem to be perfect, try to fix later!
    const width = measureWidth(lines, fonts) + 10;
    const height = measureHeight(lines, fonts) + 10;

    // Export JSON file.
    // OLD Particle JSON (DO NOT TOUCH!!!!! IT STILL WORKS!!!! AHHHHH!!!!)
    // createParticleJSON(jsonPath, cleanText, cleanText, width, height);

    // Ensure texture path exists.
    const path = "RP/textures/entity/hologram";
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
    }

    // Export Texture file.
    if (cacheData.texture === undefined || (cacheData.text !== undefined && cacheData.text.replace(/Â/g, '') !== text)) {
        createHologramTexture(
            width,
            height,
            background,
            lines,
            namespace,
            texturePath,
            fonts
        );
    } else {
        fs.writeFileSync(texturePath, Buffer.from(cacheData.texture, 'base64'));
    }

    if (!fs.existsSync("RP/models/entity/hologram")) {
        fs.mkdirSync("RP/models/entity/hologram");
    }

    var index = (cacheData.variant === undefined ? randomInt(999999) + 1 : cacheData.variant);
    cacheData.variant = index;

    // Insert new hologram into BP entity
    {
        const fileData = fs.readFileSync("BP/entities/hologram.bpe.json", "utf-8");
        const BPHologramEntity = JSON.parse(fileData);
        BPHologramEntity["minecraft:entity"].component_groups[namespace] =
            getComponetGroupJSON(index);
        BPHologramEntity["minecraft:entity"].events[namespace] = getEventJSON(
            namespace,
            trigger
        );
        fs.writeFileSync(
            "BP/entities/hologram.bpe.json",
            Buffer.from(
                JSON.stringify(BPHologramEntity, null, 4).replace(
                    /\n/g,
                    "\r\n"
                ),
                "utf-8"
            )
        );
    }

    // Insert new hologram into RP entity
    {
        const fileData = fs.readFileSync(
            "RP/entity/hologram.rpe.json",
            "utf-8"
        );
        const RPHologramEntity = JSON.parse(fileData);
        RPHologramEntity["minecraft:client_entity"].description.textures[
            namespace.substring(namespace.indexOf(":") + 1, namespace.length)
        ] =
            "textures/entity/hologram/" +
            namespace.substring(namespace.indexOf(":") + 1, namespace.length)
        RPHologramEntity["minecraft:client_entity"].description.geometry[
            namespace.substring(namespace.indexOf(":") + 1, namespace.length)
        ] =
            "geometry.hologram." +
            namespace.substring(namespace.indexOf(":") + 1, namespace.length);
        RPHologramEntity[
            "minecraft:client_entity"
        ].description.render_controllers.push({
            [`controller.render.hologram.${namespace.substring(
                namespace.indexOf(":") + 1,
                namespace.length
            )}`]: "query.variant == " + index,
        });
        fs.writeFileSync(
            "RP/entity/hologram.rpe.json",
            Buffer.from(
                JSON.stringify(RPHologramEntity, null, 4).replace(
                    /\n/g,
                    "\r\n"
                ),
                "utf-8"
            )
        );
    }

    // Insert new hologram into Render
    {
        const fileData = fs.readFileSync(
            "RP/render_controllers/hologram.render.json",
            "utf-8"
        );
        const renderController = JSON.parse(fileData);
        renderController.render_controllers[
            "controller.render.hologram." +
                namespace.substring(
                    namespace.indexOf(":") + 1,
                    namespace.length
                )
        ] = getHologramRenderJSON(
            namespace.substring(namespace.indexOf(":") + 1, namespace.length)
        );
        fs.writeFileSync(
            "RP/render_controllers/hologram.render.json",
            Buffer.from(
                JSON.stringify(renderController, null, 4).replace(
                    /\n/g,
                    "\r\n"
                ),
                "utf-8"
            )
        );
    }

    // Create Geometry
    createHologramGeoFile(namespace, width, height);
    cacheData.text = text;
    cache[namespace] = cacheData;
}

async function createHologramWithImage(
    namespace: string,
    trigger: string,
    texture: string,
    cacheData: {
        text: string;
        variant: number;
        texture: string;
    }
) {
    if (cacheData === undefined){
        cacheData = {
            text: undefined,
            variant: undefined,
            texture: undefined
        }
    }
    // Retrieve texture and json paths (root them in a subfolder called holos to isolate them from non hologram files)
    const texturePath = "RP/" + texture.replace(/\r/g, '');

    var image = await Jimp.read(texturePath);

    // Ensure texture path exists.
    const path = "RP/textures/entity/hologram";
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
    }

    const existingFiles = isBPEntityFileCreated();

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

    var index = (cacheData === undefined || cacheData.variant === undefined ? randomInt(999999) + 1 : cacheData.variant);
    cacheData.variant = index;

    // Insert new hologram into BP entity
    {
        const fileData = fs.readFileSync("BP/entities/hologram.bpe.json", "utf-8");
        const BPHologramEntity = JSON.parse(fileData);
        BPHologramEntity["minecraft:entity"].component_groups[namespace] =
            getComponetGroupJSON(index);
        BPHologramEntity["minecraft:entity"].events[namespace] = getEventJSON(
            namespace,
            undefined
        );
        fs.writeFileSync(
            "BP/entities/hologram.bpe.json",
            Buffer.from(
                JSON.stringify(BPHologramEntity, null, 4).replace(
                    /\n/g,
                    "\r\n"
                ),
                "utf-8"
            )
        );
    }

    // Insert new hologram into RP entity
    {
        const fileData = fs.readFileSync(
            "RP/entity/hologram.rpe.json",
            "utf-8"
        );
        const RPHologramEntity = JSON.parse(fileData);
        RPHologramEntity["minecraft:client_entity"].description.textures[
            namespace.substring(namespace.indexOf(":") + 1, namespace.length)
        ] = texture.replace(/\\/g, '/').replace(/\r/g, '').replace('.png', '');
        RPHologramEntity["minecraft:client_entity"].description.geometry[
            namespace.substring(namespace.indexOf(":") + 1, namespace.length)
        ] = "geometry.hologram." + namespace.substring(namespace.indexOf(":") + 1, namespace.length);
        RPHologramEntity[
            "minecraft:client_entity"
        ].description.render_controllers.push({
            [`controller.render.hologram.${namespace.substring(namespace.indexOf(":") + 1, namespace.length)}`]:
                "query.variant == " + index,
        });
        fs.writeFileSync(
            "RP/entity/hologram.rpe.json",
            Buffer.from(
                JSON.stringify(RPHologramEntity, null, 4).replace(
                    /\n/g,
                    "\r\n"
                ),
                "utf-8"
            )
        );
    }

    // Insert new hologram into Render
    {
        const fileData = fs.readFileSync(
            "RP/render_controllers/hologram.render.json",
            "utf-8"
        );
        const renderController = JSON.parse(fileData);
        renderController.render_controllers[
            "controller.render.hologram." + namespace.substring(namespace.indexOf(":") + 1, namespace.length)
        ] = getHologramRenderJSON(namespace.substring(namespace.indexOf(":") + 1, namespace.length));
        fs.writeFileSync(
            "RP/render_controllers/hologram.render.json",
            Buffer.from(
                JSON.stringify(renderController, null, 4).replace(
                    /\n/g,
                    "\r\n"
                ),
                "utf-8"
            )
        );
    }

    // Create Geometry
    createHologramGeoFile(namespace, image.getWidth(), image.getHeight());
    cacheData.text = texture;
    cache[namespace] = cacheData;
}

function createHologramTexture(
    width: number,
    height: number,
    background: boolean,
    lines: string[],
    identifier: string,
    path: string,
    fonts: FontContext
): Jimp {
    return new Jimp(width, height, "#000000", (err, image) => {
        // Again this is pretty much useless until entity based holograms!
        image.opacity(background ? 0.25 : 0.0);

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
                    getFontChoice(fonts, bold, italic),
                    offX,
                    offY,
                    textPart
                );

                //Translate color code into a color pallet
                const colorPallet = getPallet(code);
                lastCode = code;

                image.scan(offX, offY,
                    Jimp.measureText(getFontChoice(fonts, bold, italic), textPart + " "),
                    Jimp.measureTextHeight(getFontChoice(fonts, bold, italic), textPart, width),
                    (x: number, y: number) => {
                        const color = image.getPixelColor(x, y);
                        if (color === 4294967295) {
                            image.setPixelColor(colorPallet[0], x, y);
                        } else if (color === 2459079321 || color === parseInt("0x929292ff", 16)) {
                            image.setPixelColor(colorPallet[1], x, y);
                        }
                    }
                );

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

                offX += Jimp.measureText(
                    getFontChoice(fonts, bold, italic),
                    textPart
                );
            });
            offY += Jimp.measureTextHeight(
                fonts.bold,
                removeFormating(text),
                9999999
            );
        });

        // Export texture
        exportTexture(
            image,
            identifier,
            path
        );
    });
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

function getPallet(code: string): number[] {
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

function exportTexture(image: Jimp, identifier: string, path: string) {
    image = image.scale(0.5, Jimp.RESIZE_NEAREST_NEIGHBOR);
    roundEdges(image, 64, image.getWidth(), image.getHeight());
    image.write(path, (err, image) => {
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

function roundEdges(
    image: Jimp,
    fontSize: number,
    width: number,
    height: number
) {
    const i = fontSize / 16;
    for (let x = 0; x < i; x++) {
        for (let z = 0; z < i; z++) {
            image.setPixelColor(0x0, x, z);
        }
    }

    for (let x = 1; x <= i; x++) {
        for (let z = 0; z < i; z++) {
            image.setPixelColor(0x0, width - x, z);
        }
    }

    for (let x = 0; x < i; x++) {
        for (let z = 1; z <= i; z++) {
            image.setPixelColor(0x0, x, height - z);
        }
    }

    for (let x = 1; x <= i; x++) {
        for (let z = 1; z <= i; z++) {
            image.setPixelColor(0x0, width - x, height - z);
        }
    }
}

function isBPEntityFileCreated(): boolean {
    return fs.existsSync("BP/entities/hologram.bpe.json");
}

function createFile(path: string, content: Uint8Array) {
    fs.writeFileSync(path, content);
}

function createBPHologramEntityFile() {
    const path = "BP/entities";
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
    }
    createFile(
        "BP/entities/hologram.bpe.json",
        Buffer.from(
            JSON.stringify(getDefaultBPHologramEntityJSON(), null, 4).replace(
                /\n/g,
                "\r\n"
            ),
            "utf-8"
        )
    );
}

function createRPHologramEntityFile() {
    const path = "RP/entity";
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
    }
    createFile(
        "RP/entity/hologram.rpe.json",
        Buffer.from(
            JSON.stringify(getDefaultRPHologramEntityJSON(), null, 4).replace(
                /\n/g,
                "\r\n"
            ),
            "utf-8"
        )
    );
}

function createHologramRenderFile() {
    const path = "RP/render_controllers";
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
    }
    createFile(
        "RP/render_controllers/hologram.render.json",
        Buffer.from(
            JSON.stringify(getDefaultHologramRenderJSON(), null, 4).replace(
                /\n/g,
                "\r\n"
            ),
            "utf-8"
        )
    );
}

function createHologramGeoFile(
    identifier: string,
    width: number,
    height: number
) {
    const path =
        "RP/models/entity/hologram/" +
        identifier.substring(identifier.indexOf(":") + 1, identifier.length) +
        ".geo.json";
    if (!fs.existsSync("RP/models/entity/hologram/")) {
        fs.mkdirSync("RP/models/entity/hologram/");
    }
    createFile(
        path,
        Buffer.from(
            JSON.stringify(
                getHologramGeometryJSON(
                    identifier.substring(
                        identifier.indexOf(":") + 1,
                        identifier.length
                    ),
                    width,
                    height
                ),
                null,
                4
            ).replace(/\n/g, "\r\n"),
            "utf-8"
        )
    );
}

function createHologramAnimationFile() {
    const path = "RP/animations/holograms";
    fs.mkdirSync(path, {recursive: true});
    createFile(
        "RP/animations/holograms/hologram.animation.json",
        Buffer.from(
            JSON.stringify(getHologramAnimationJSON(), null, 4).replace(
                /\n/g,
                "\r\n"
            ),
            "utf-8"
        )
    );
}

//RP: Default hologram entity JSON (if not already created!)
function getDefaultRPHologramEntityJSON() {
    return getTemplate().rp_entity;
}

//RP: Default hologram render JSON (if not already created!)
function getDefaultHologramRenderJSON() {
    return {
        format_version: "1.8.0",
        render_controllers: {},
    };
}

//RP: Default hologram render JSON (if not already created!)
function getHologramRenderJSON(identifier: string) {
    return JSON.parse(
        JSON.stringify(getTemplate().render_controller).replace(
            /\$identifier\$/gi,
            identifier
        )
    );
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
function getHologramGeometryJSON(
    identifier: string,
    width: number,
    height: number
) {
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
                    visible_bounds_offset: [0, 0.25, 0],
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
                                        uv_size: [width, height],
                                    },
                                    east: { uv: [0, 0], uv_size: [0, height] },
                                    south: { uv: [0, 0], uv_size: [0, 0] },
                                    west: {
                                        uv: [width, 0],
                                        uv_size: [0, height],
                                    },
                                    up: {
                                        uv: [width, 0],
                                        uv_size: [-width, 0],
                                    },
                                    down: {
                                        uv: [width, 0],
                                        uv_size: [-width, 0],
                                    },
                                },
                            },
                        ],
                    },
                ],
            },
        ],
    };
}

// BP: Standard event part.
function getEventJSON(identifier: string, trigger: string) {
    return trigger !== undefined
        ? {
              trigger: trigger,
              add: {
                  component_groups: [identifier],
              },
          }
        : {
              add: {
                  component_groups: [identifier],
              },
          };
}

// BP: Standard componet group part.
function getComponetGroupJSON(index: number) {
    return {
        "minecraft:variant": {
            value: index,
        },
    };
}

function getTemplate() {
    return JSON.parse(
        fs.readFileSync("data/create_holograms/assets/template.json", 'utf-8')
    );
}



run();
function getColorCode(code: string): number {
    throw new Error('Function not implemented.');
}

