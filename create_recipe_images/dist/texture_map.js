"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getItemTexture = exports.typeIdTextureMap = void 0;
const fs_1 = require("fs");
const glob_1 = require("glob");
const _1_20_id_json_1 = __importDefault(require("minecraft-textures/dist/textures/json/1.20.id.json"));
const items = { ..._1_20_id_json_1.default.items };
const textureData = JSON.parse((0, fs_1.readFileSync)("RP/textures/item_texture.json", "utf-8"))['texture_data'];
// Load custom entity spawn egg textures
glob_1.glob.sync("RP/entity/**/*.json").forEach((itemPath) => {
    const entity = JSON.parse((0, fs_1.readFileSync)(itemPath, "utf-8")) ?? {};
    if (!('minecraft:client_entity' in entity))
        return;
    const desc = entity['minecraft:client_entity']['description'];
    if (!('spawn_egg' in desc))
        return;
    let identifier = desc['identifier'];
    let texture = desc['spawn_egg']['texture'];
    let textureIndex = desc['spawn_egg']['texture_index'];
    if (textureData[texture]) {
        const texturePath = "RP/" + textureData[texture].textures + ".png";
        let spawnEggTexture = (0, fs_1.readFileSync)(texturePath);
        items[identifier] = { texture: spawnEggTexture };
        console.log("found entity " + identifier + " with textureIcon " + texture + " and index " + textureIndex);
    }
});
// Load custom textures
let customTextures = (0, fs_1.readdirSync)("RP/textures/items/");
for (let i = 0; i < customTextures.length; i++) {
    let customTexture = customTextures[i];
    let parsedName = "minecraft:" + customTexture.replace(".png", "");
    if (items[parsedName]) {
        let newTexture = (0, fs_1.readFileSync)("RP/textures/items/" + customTexture);
        items[parsedName].texture = newTexture;
    }
}
exports.typeIdTextureMap = new Map([
    ['minecraft:wool', [
            items['minecraft:white_wool'].texture,
            items['minecraft:orange_wool'].texture,
            items['minecraft:magenta_wool'].texture,
            items['minecraft:light_blue_wool'].texture,
            items['minecraft:yellow_wool'].texture,
            items['minecraft:lime_wool'].texture,
            items['minecraft:pink_wool'].texture,
            items['minecraft:gray_wool'].texture,
            items['minecraft:light_gray_wool'].texture,
            items['minecraft:cyan_wool'].texture,
            items['minecraft:purple_wool'].texture,
            items['minecraft:blue_wool'].texture,
            items['minecraft:brown_wool'].texture,
            items['minecraft:green_wool'].texture,
            items['minecraft:red_wool'].texture,
            items['minecraft:black_wool'].texture,
            items['minecraft:white_wool'].texture,
        ]],
    ['minecraft:red_flower', [
            items['minecraft:poppy'].texture,
            items['minecraft:blue_orchid'].texture,
            items['minecraft:allium'].texture,
            items['minecraft:azure_bluet'].texture,
            items['minecraft:red_tulip'].texture,
            items['minecraft:orange_tulip'].texture,
            items['minecraft:white_tulip'].texture,
            items['minecraft:pink_tulip'].texture,
            items['minecraft:oxeye_daisy'].texture,
            items['minecraft:lily_of_the_valley'].texture,
            items['minecraft:poppy'].texture,
        ]],
    ['minecraft:leaves', [
            items['minecraft:oak_leaves'].texture,
            items['minecraft:spruce_leaves'].texture,
            items['minecraft:birch_leaves'].texture,
            items['minecraft:jungle_leaves'].texture,
            items['minecraft:oak_leaves'].texture,
        ]],
    ['minecraft:leaves2', [
            items['minecraft:acacia_leaves'].texture,
            items['minecraft:dark_oak_leaves'].texture,
            items['minecraft:acacia_leaves'].texture,
        ]],
    ['minecraft:stone', [
            items['minecraft:stone'].texture,
            items['minecraft:granite'].texture,
            items['minecraft:polished_granite'].texture,
            items['minecraft:diorite'].texture,
            items['minecraft:polished_diorite'].texture,
            items['minecraft:andesite'].texture,
            items['minecraft:polished_andesite'].texture,
            items['minecraft:stone'].texture,
        ]],
    ['minecraft:concrete', [
            items['minecraft:white_concrete'].texture,
            items['minecraft:orange_concrete'].texture,
            items['minecraft:magenta_concrete'].texture,
            items['minecraft:light_blue_concrete'].texture,
            items['minecraft:yellow_concrete'].texture,
            items['minecraft:lime_concrete'].texture,
            items['minecraft:pink_concrete'].texture,
            items['minecraft:gray_concrete'].texture,
            items['minecraft:light_gray_concrete'].texture,
            items['minecraft:cyan_concrete'].texture,
            items['minecraft:purple_concrete'].texture,
            items['minecraft:blue_concrete'].texture,
            items['minecraft:brown_concrete'].texture,
            items['minecraft:green_concrete'].texture,
            items['minecraft:red_concrete'].texture,
            items['minecraft:black_concrete'].texture,
            items['minecraft:white_concrete'].texture,
        ]],
    ['minecraft:dye', [
            items['minecraft:red_dye'].texture,
            items['minecraft:orange_dye'].texture,
            items['minecraft:magenta_dye'].texture,
            items['minecraft:light_blue_dye'].texture,
            items['minecraft:yellow_dye'].texture,
            items['minecraft:lime_dye'].texture,
            items['minecraft:pink_dye'].texture,
            items['minecraft:gray_dye'].texture,
            items['minecraft:light_gray_dye'].texture,
            items['minecraft:cyan_dye'].texture,
            items['minecraft:purple_dye'].texture,
            items['minecraft:blue_dye'].texture,
            items['minecraft:brown_dye'].texture,
            items['minecraft:green_dye'].texture,
            items['minecraft:red_dye'].texture,
            items['minecraft:black_dye'].texture,
            items['minecraft:white_dye'].texture,
        ]],
    ['minecraft:wooden_slab', [
            items['minecraft:oak_slab'].texture,
            items['minecraft:spruce_slab'].texture,
            items['minecraft:birch_slab'].texture,
            items['minecraft:jungle_slab'].texture,
            items['minecraft:acacia_slab'].texture,
            items['minecraft:dark_oak_slab'].texture,
            items['minecraft:oak_slab'].texture,
        ]],
    ['minecraft:log', [
            items['minecraft:oak_log'].texture,
            items['minecraft:spruce_log'].texture,
            items['minecraft:birch_log'].texture,
            items['minecraft:jungle_log'].texture,
            items['minecraft:acacia_log'].texture,
            items['minecraft:dark_oak_log'].texture,
            items['minecraft:oak_log'].texture,
        ]],
    ['minecraft:sapling', [
            items['minecraft:oak_sapling'].texture,
            items['minecraft:spruce_sapling'].texture,
            items['minecraft:birch_sapling'].texture,
            items['minecraft:jungle_sapling'].texture,
            items['minecraft:acacia_sapling'].texture,
            items['minecraft:dark_oak_sapling'].texture,
            items['minecraft:oak_sapling'].texture,
        ]],
    ['minecraft:planks', [
            items['minecraft:oak_planks'].texture,
            items['minecraft:spruce_planks'].texture,
            items['minecraft:birch_planks'].texture,
            items['minecraft:jungle_planks'].texture,
            items['minecraft:acacia_planks'].texture,
            items['minecraft:dark_oak_planks'].texture,
            items['minecraft:oak_planks'].texture,
        ]],
    ['minecraft:carpet', [
            items['minecraft:white_carpet'].texture,
            items['minecraft:orange_carpet'].texture,
            items['minecraft:magenta_carpet'].texture,
            items['minecraft:light_blue_carpet'].texture,
            items['minecraft:yellow_carpet'].texture,
            items['minecraft:lime_carpet'].texture,
            items['minecraft:pink_carpet'].texture,
            items['minecraft:gray_carpet'].texture,
            items['minecraft:light_gray_carpet'].texture,
            items['minecraft:cyan_carpet'].texture,
            items['minecraft:purple_carpet'].texture,
            items['minecraft:blue_carpet'].texture,
            items['minecraft:brown_carpet'].texture,
            items['minecraft:green_carpet'].texture,
            items['minecraft:red_carpet'].texture,
            items['minecraft:black_carpet'].texture,
            items['minecraft:white_carpet'].texture,
        ]],
    ['minecraft:wood', [
            items['minecraft:oak_wood'].texture,
            items['minecraft:spruce_wood'].texture,
            items['minecraft:birch_wood'].texture,
            items['minecraft:jungle_wood'].texture,
            items['minecraft:acacia_wood'].texture,
            items['minecraft:dark_oak_wood'].texture,
            items['minecraft:oak_wood'].texture,
        ]],
    ['minecraft:stained_glass', [
            items['minecraft:white_stained_glass'].texture,
            items['minecraft:orange_stained_glass'].texture,
            items['minecraft:magenta_stained_glass'].texture,
            items['minecraft:light_blue_stained_glass'].texture,
            items['minecraft:yellow_stained_glass'].texture,
            items['minecraft:lime_stained_glass'].texture,
            items['minecraft:pink_stained_glass'].texture,
            items['minecraft:gray_stained_glass'].texture,
            items['minecraft:light_gray_stained_glass'].texture,
            items['minecraft:cyan_stained_glass'].texture,
            items['minecraft:purple_stained_glass'].texture,
            items['minecraft:blue_stained_glass'].texture,
            items['minecraft:brown_stained_glass'].texture,
            items['minecraft:green_stained_glass'].texture,
            items['minecraft:red_stained_glass'].texture,
            items['minecraft:black_stained_glass'].texture,
            items['minecraft:white_stained_glass'].texture,
        ]],
    ['minecraft:stained_glass', [
            items['minecraft:white_stained_glass_pane'].texture,
            items['minecraft:orange_stained_glass_pane'].texture,
            items['minecraft:magenta_stained_glass_pane'].texture,
            items['minecraft:light_blue_stained_glass_pane'].texture,
            items['minecraft:yellow_stained_glass_pane'].texture,
            items['minecraft:lime_stained_glass_pane'].texture,
            items['minecraft:pink_stained_glass_pane'].texture,
            items['minecraft:gray_stained_glass_pane'].texture,
            items['minecraft:light_gray_stained_glass_pane'].texture,
            items['minecraft:cyan_stained_glass_pane'].texture,
            items['minecraft:purple_stained_glass_pane'].texture,
            items['minecraft:blue_stained_glass_pane'].texture,
            items['minecraft:brown_stained_glass_pane'].texture,
            items['minecraft:green_stained_glass_pane'].texture,
            items['minecraft:red_stained_glass_pane'].texture,
            items['minecraft:black_stained_glass_pane'].texture,
            items['minecraft:white_stained_glass_pane'].texture,
        ]],
    ['minecraft:stone_slab', [
            items['minecraft:smooth_stone_slab'].texture,
            items['minecraft:sandstone_slab'].texture,
            items['minecraft:oak_slab'].texture,
            items['minecraft:cobblestone_slab'].texture,
            items['minecraft:brick_slab'].texture,
            items['minecraft:stone_brick_slab'].texture,
            items['minecraft:quartz_slab'].texture,
            items['minecraft:nether_brick_slab'].texture,
            items['minecraft:smooth_stone_slab'].texture,
        ]],
    ['minecraft:skull', [
            items['minecraft:skeleton_skull'].texture,
            items['minecraft:wither_skeleton_skull'].texture,
            items['minecraft:zombie_head'].texture,
            items['minecraft:player_head'].texture,
            items['minecraft:creeper_head'].texture,
            items['minecraft:dragon_head'].texture,
            items['minecraft:skeleton_skull'].texture,
        ]],
    ['minecraft:magma', items['minecraft:magma_block'].texture],
    ['minecraft:wooden_door', items['minecraft:oak_door'].texture],
    ['minecraft:web', items['minecraft:cobweb'].texture],
    ['minecraft:yellow_flower', items['minecraft:dandelion'].texture],
    ['minecraft:brick_block', items['minecraft:bricks'].texture]
]);
function getItemTexture(key) {
    let itemName = key.item.includes(':') ? key.item : `minecraft:${key.item}`;
    // Handle spawn egg textures
    if (itemName.includes("spawn_egg")) {
        return handleSpawnEggTexture(itemName, key.data);
    }
    // Handle special cases with multiple possible textures
    if (exports.typeIdTextureMap.has(itemName)) {
        return handleSpecialCaseTexture(itemName, key.data);
    }
    // Default texture lookup
    if (items[itemName]) {
        return items[itemName].texture;
    }
    // Attempt to find the texture from file if not predefined
    const texture = findTextureInFiles(itemName);
    return texture || items['minecraft:stone'].texture; // Fallback to stone texture
}
exports.getItemTexture = getItemTexture;
function handleSpawnEggTexture(itemName, data) {
    const entityName = data ? data.match("'(.*?)'")[1] : itemName.replace('_spawn_egg', '');
    if (items[entityName]) {
        console.log(`found item texture for entity: ${entityName}`);
        return items[entityName].texture;
    }
    else {
        console.log(`could not find item texture for entity: ${entityName}`);
    }
}
function handleSpecialCaseTexture(itemName, data) {
    const textureEntry = exports.typeIdTextureMap.get(itemName);
    if (typeof textureEntry === 'string') {
        return textureEntry;
    }
    else if (Array.isArray(textureEntry) && data !== undefined) {
        return textureEntry[Math.max(0, Math.min(textureEntry.length - 1, data))];
    }
    return items['minecraft:stone'].texture; // Fallback for unexpected cases
}
function findTextureInFiles(itemName) {
    let resultIcon;
    glob_1.glob.sync("RP/textures/**/*.json").forEach((itemPath) => {
        const item = JSON.parse((0, fs_1.readFileSync)(itemPath, "utf-8"));
        if (item["minecraft:item"].description.identifier === itemName) {
            resultIcon = item["minecraft:item"].components["minecraft:icon"];
        }
    });
    if (resultIcon) {
        const itemTextures = JSON.parse((0, fs_1.readFileSync)("RP/textures/item_texture.json", "utf-8"));
        const texturePath = `RP/${itemTextures.texture_data[resultIcon].textures}.png`;
        if ((0, fs_1.existsSync)(texturePath)) {
            return (0, fs_1.readFileSync)(texturePath).toString(); // Assuming texture needs to be returned as string
        }
        // Return an invalid texture image as a fallback
        return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAAXNSR0IArs4c6QAAAChJREFUCJltyqENACAMALAORRD8fydimRueUN3IXQ3rTDA8Ag256z8uTGEHATZy6pcAAAAASUVORK5CYII=";
    }
}
