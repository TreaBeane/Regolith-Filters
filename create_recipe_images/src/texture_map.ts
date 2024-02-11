import { existsSync, readFileSync, readdirSync } from 'fs';
import { glob } from 'glob';

const version = '1.20';
const textures = {...await import(`minecraft-textures/dist/textures/json/${version}.id.json`)}.items;

const textureData = JSON.parse(
    readFileSync("RP/textures/item_texture.json", "utf-8")
)['texture_data'];

// Load custom entity spawn egg textures
glob.sync("RP/entity/**/*.json").forEach((itemPath) => {
    const entity = JSON.parse(readFileSync(itemPath, "utf-8")) ?? {} as any;

    if (!('minecraft:client_entity' in entity)) return
    const desc = entity['minecraft:client_entity']['description']
    if (!('spawn_egg' in desc)) return

    let identifier = desc['identifier']
    let texture = desc['spawn_egg']['texture']
    let textureIndex = desc['spawn_egg']['texture_index']

    if (textureData[texture]) {
        const texturePath = "RP/" + textureData[texture].textures + ".png";
        let spawnEggTexture = readFileSync(texturePath)
        textures[identifier] = { texture: spawnEggTexture }

        console.log("found entity " + identifier + " with textureIcon " + texture + " and index " + textureIndex)
    }
});

// Load custom textures
let customTextures = readdirSync("RP/textures/items/")
for (let i = 0; i < customTextures.length; i++) {
    let customTexture = customTextures[i]
    let parsedName = "minecraft:" + customTexture.replace(".png", "")

    if (textures[parsedName]) {
        let newTexture = readFileSync("RP/textures/items/" + customTexture)
        textures[parsedName].texture = newTexture
    }
}

export const typeIdTextureMap = new Map<string, (string | string[])>([
    ['minecraft:wool', [
        textures['minecraft:white_wool'].texture,
        textures['minecraft:orange_wool'].texture,
        textures['minecraft:magenta_wool'].texture,
        textures['minecraft:light_blue_wool'].texture,
        textures['minecraft:yellow_wool'].texture,
        textures['minecraft:lime_wool'].texture,
        textures['minecraft:pink_wool'].texture,
        textures['minecraft:gray_wool'].texture,
        textures['minecraft:light_gray_wool'].texture,
        textures['minecraft:cyan_wool'].texture,
        textures['minecraft:purple_wool'].texture,
        textures['minecraft:blue_wool'].texture,
        textures['minecraft:brown_wool'].texture,
        textures['minecraft:green_wool'].texture,
        textures['minecraft:red_wool'].texture,
        textures['minecraft:black_wool'].texture,
        textures['minecraft:white_wool'].texture,
    ]],
    ['minecraft:red_flower', [
        textures['minecraft:poppy'].texture,
        textures['minecraft:blue_orchid'].texture,
        textures['minecraft:allium'].texture,
        textures['minecraft:azure_bluet'].texture,
        textures['minecraft:red_tulip'].texture,
        textures['minecraft:orange_tulip'].texture,
        textures['minecraft:white_tulip'].texture,
        textures['minecraft:pink_tulip'].texture,
        textures['minecraft:oxeye_daisy'].texture,
        textures['minecraft:lily_of_the_valley'].texture,
        textures['minecraft:poppy'].texture,
    ]],
    ['minecraft:leaves', [
        textures['minecraft:oak_leaves'].texture,
        textures['minecraft:spruce_leaves'].texture,
        textures['minecraft:birch_leaves'].texture,
        textures['minecraft:jungle_leaves'].texture,
        textures['minecraft:oak_leaves'].texture,
    ]],
    ['minecraft:leaves2', [
        textures['minecraft:acacia_leaves'].texture,
        textures['minecraft:dark_oak_leaves'].texture,
        textures['minecraft:acacia_leaves'].texture,
    ]],
    ['minecraft:stone', [
        textures['minecraft:stone'].texture,
        textures['minecraft:granite'].texture,
        textures['minecraft:polished_granite'].texture,
        textures['minecraft:diorite'].texture,
        textures['minecraft:polished_diorite'].texture,
        textures['minecraft:andesite'].texture,
        textures['minecraft:polished_andesite'].texture,
        textures['minecraft:stone'].texture,
    ]],
    ['minecraft:concrete', [
        textures['minecraft:white_concrete'].texture,
        textures['minecraft:orange_concrete'].texture,
        textures['minecraft:magenta_concrete'].texture,
        textures['minecraft:light_blue_concrete'].texture,
        textures['minecraft:yellow_concrete'].texture,
        textures['minecraft:lime_concrete'].texture,
        textures['minecraft:pink_concrete'].texture,
        textures['minecraft:gray_concrete'].texture,
        textures['minecraft:light_gray_concrete'].texture,
        textures['minecraft:cyan_concrete'].texture,
        textures['minecraft:purple_concrete'].texture,
        textures['minecraft:blue_concrete'].texture,
        textures['minecraft:brown_concrete'].texture,
        textures['minecraft:green_concrete'].texture,
        textures['minecraft:red_concrete'].texture,
        textures['minecraft:black_concrete'].texture,
        textures['minecraft:white_concrete'].texture,
    ]],
    ['minecraft:dye', [
        textures['minecraft:red_dye'].texture,
        textures['minecraft:orange_dye'].texture,
        textures['minecraft:magenta_dye'].texture,
        textures['minecraft:light_blue_dye'].texture,
        textures['minecraft:yellow_dye'].texture,
        textures['minecraft:lime_dye'].texture,
        textures['minecraft:pink_dye'].texture,
        textures['minecraft:gray_dye'].texture,
        textures['minecraft:light_gray_dye'].texture,
        textures['minecraft:cyan_dye'].texture,
        textures['minecraft:purple_dye'].texture,
        textures['minecraft:blue_dye'].texture,
        textures['minecraft:brown_dye'].texture,
        textures['minecraft:green_dye'].texture,
        textures['minecraft:red_dye'].texture,
        textures['minecraft:black_dye'].texture,
        textures['minecraft:white_dye'].texture,
    ]],
    ['minecraft:wooden_slab', [
        textures['minecraft:oak_slab'].texture,
        textures['minecraft:spruce_slab'].texture,
        textures['minecraft:birch_slab'].texture,
        textures['minecraft:jungle_slab'].texture,
        textures['minecraft:acacia_slab'].texture,
        textures['minecraft:dark_oak_slab'].texture,
        textures['minecraft:oak_slab'].texture,
    ]],
    ['minecraft:log', [
        textures['minecraft:oak_log'].texture,
        textures['minecraft:spruce_log'].texture,
        textures['minecraft:birch_log'].texture,
        textures['minecraft:jungle_log'].texture,
        textures['minecraft:acacia_log'].texture,
        textures['minecraft:dark_oak_log'].texture,
        textures['minecraft:oak_log'].texture,
    ]],
    ['minecraft:sapling', [
        textures['minecraft:oak_sapling'].texture,
        textures['minecraft:spruce_sapling'].texture,
        textures['minecraft:birch_sapling'].texture,
        textures['minecraft:jungle_sapling'].texture,
        textures['minecraft:acacia_sapling'].texture,
        textures['minecraft:dark_oak_sapling'].texture,
        textures['minecraft:oak_sapling'].texture,
    ]],
    ['minecraft:planks', [
        textures['minecraft:oak_planks'].texture,
        textures['minecraft:spruce_planks'].texture,
        textures['minecraft:birch_planks'].texture,
        textures['minecraft:jungle_planks'].texture,
        textures['minecraft:acacia_planks'].texture,
        textures['minecraft:dark_oak_planks'].texture,
        textures['minecraft:oak_planks'].texture,
    ]],
    ['minecraft:carpet', [
        textures['minecraft:white_carpet'].texture,
        textures['minecraft:orange_carpet'].texture,
        textures['minecraft:magenta_carpet'].texture,
        textures['minecraft:light_blue_carpet'].texture,
        textures['minecraft:yellow_carpet'].texture,
        textures['minecraft:lime_carpet'].texture,
        textures['minecraft:pink_carpet'].texture,
        textures['minecraft:gray_carpet'].texture,
        textures['minecraft:light_gray_carpet'].texture,
        textures['minecraft:cyan_carpet'].texture,
        textures['minecraft:purple_carpet'].texture,
        textures['minecraft:blue_carpet'].texture,
        textures['minecraft:brown_carpet'].texture,
        textures['minecraft:green_carpet'].texture,
        textures['minecraft:red_carpet'].texture,
        textures['minecraft:black_carpet'].texture,
        textures['minecraft:white_carpet'].texture,
    ]],
    ['minecraft:wood', [
        textures['minecraft:oak_wood'].texture,
        textures['minecraft:spruce_wood'].texture,
        textures['minecraft:birch_wood'].texture,
        textures['minecraft:jungle_wood'].texture,
        textures['minecraft:acacia_wood'].texture,
        textures['minecraft:dark_oak_wood'].texture,
        textures['minecraft:oak_wood'].texture,
    ]],
    ['minecraft:stained_glass', [
        textures['minecraft:white_stained_glass'].texture,
        textures['minecraft:orange_stained_glass'].texture,
        textures['minecraft:magenta_stained_glass'].texture,
        textures['minecraft:light_blue_stained_glass'].texture,
        textures['minecraft:yellow_stained_glass'].texture,
        textures['minecraft:lime_stained_glass'].texture,
        textures['minecraft:pink_stained_glass'].texture,
        textures['minecraft:gray_stained_glass'].texture,
        textures['minecraft:light_gray_stained_glass'].texture,
        textures['minecraft:cyan_stained_glass'].texture,
        textures['minecraft:purple_stained_glass'].texture,
        textures['minecraft:blue_stained_glass'].texture,
        textures['minecraft:brown_stained_glass'].texture,
        textures['minecraft:green_stained_glass'].texture,
        textures['minecraft:red_stained_glass'].texture,
        textures['minecraft:black_stained_glass'].texture,
        textures['minecraft:white_stained_glass'].texture,
    ]],
    ['minecraft:stained_glass', [
        textures['minecraft:white_stained_glass_pane'].texture,
        textures['minecraft:orange_stained_glass_pane'].texture,
        textures['minecraft:magenta_stained_glass_pane'].texture,
        textures['minecraft:light_blue_stained_glass_pane'].texture,
        textures['minecraft:yellow_stained_glass_pane'].texture,
        textures['minecraft:lime_stained_glass_pane'].texture,
        textures['minecraft:pink_stained_glass_pane'].texture,
        textures['minecraft:gray_stained_glass_pane'].texture,
        textures['minecraft:light_gray_stained_glass_pane'].texture,
        textures['minecraft:cyan_stained_glass_pane'].texture,
        textures['minecraft:purple_stained_glass_pane'].texture,
        textures['minecraft:blue_stained_glass_pane'].texture,
        textures['minecraft:brown_stained_glass_pane'].texture,
        textures['minecraft:green_stained_glass_pane'].texture,
        textures['minecraft:red_stained_glass_pane'].texture,
        textures['minecraft:black_stained_glass_pane'].texture,
        textures['minecraft:white_stained_glass_pane'].texture,
    ]],
    ['minecraft:stone_slab', [
        textures['minecraft:smooth_stone_slab'].texture,
        textures['minecraft:sandstone_slab'].texture,
        textures['minecraft:oak_slab'].texture,
        textures['minecraft:cobblestone_slab'].texture,
        textures['minecraft:brick_slab'].texture,
        textures['minecraft:stone_brick_slab'].texture,
        textures['minecraft:quartz_slab'].texture,
        textures['minecraft:nether_brick_slab'].texture,
        textures['minecraft:smooth_stone_slab'].texture,
    ]],
    ['minecraft:skull', [
        textures['minecraft:skeleton_skull'].texture,
        textures['minecraft:wither_skeleton_skull'].texture,
        textures['minecraft:zombie_head'].texture,
        textures['minecraft:player_head'].texture,
        textures['minecraft:creeper_head'].texture,
        textures['minecraft:dragon_head'].texture,
        textures['minecraft:skeleton_skull'].texture,
    ]],
    ['minecraft:magma', textures['minecraft:magma_block'].texture],
    ['minecraft:wooden_door', textures['minecraft:oak_door'].texture],
    ['minecraft:web', textures['minecraft:cobweb'].texture],
    ['minecraft:yellow_flower', textures['minecraft:dandelion'].texture],
    ['minecraft:brick_block', textures['minecraft:bricks'].texture]
])

export function getItemTexture(key: { item: string; data?: number }) {
    let itemName = key.item.includes(':') ? key.item : `minecraft:${key.item}`;

    // Handle spawn egg textures
    if (itemName.includes("spawn_egg")) {
        return handleSpawnEggTexture(itemName, key.data);
    }

    // Handle special cases with multiple possible textures
    if (typeIdTextureMap.has(itemName)) {
        return handleSpecialCaseTexture(itemName, key.data);
    }

    // Default texture lookup
    if (textures[itemName]) {
        return textures[itemName].texture;
    }

    // Attempt to find the texture from file if not predefined
    const texture = findTextureInFiles(itemName);
    return texture || textures['minecraft:stone'].texture; // Fallback to stone texture
}

function handleSpawnEggTexture(itemName: string, data?: any): string | undefined {
    const entityName = data ? data.match("'(.*?)'")[1] : itemName.replace('_spawn_egg', '');
    if (textures[entityName]) {
        console.log(`found item texture for entity: ${entityName}`);
        return textures[entityName].texture;
    } else {
        console.log(`could not find item texture for entity: ${entityName}`);
    }
}

function handleSpecialCaseTexture(itemName: string, data?: number): string {
    const textureEntry = typeIdTextureMap.get(itemName);
    if (typeof textureEntry === 'string') {
        return textureEntry;
    } else if (Array.isArray(textureEntry) && data !== undefined) {
        return textureEntry[Math.max(0, Math.min(textureEntry.length - 1, data))];
    }
    return textures['minecraft:stone'].texture; // Fallback for unexpected cases
}

function findTextureInFiles(itemName: string): string | undefined {
    let resultIcon: string | undefined;
    glob.sync("RP/textures/**/*.json").forEach((itemPath) => {
        const item = JSON.parse(readFileSync(itemPath, "utf-8"));
        if (item["minecraft:item"].description.identifier === itemName) {
            resultIcon = item["minecraft:item"].components["minecraft:icon"];
        }
    });

    if (resultIcon) {
        const itemTextures = JSON.parse(readFileSync("RP/textures/item_texture.json", "utf-8"));
        const texturePath = `RP/${itemTextures.texture_data[resultIcon].textures}.png`;
        if (existsSync(texturePath)) {
            return readFileSync(texturePath).toString(); // Assuming texture needs to be returned as string
        }
        // Return an invalid texture image as a fallback
        return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAAXNSR0IArs4c6QAAAChJREFUCJltyqENACAMALAORRD8fydimRueUN3IXQ3rTDA8Ag256z8uTGEHATZy6pcAAAAASUVORK5CYII=";
    }
}