import * as fs from 'fs';

async function run()
{
    if (!fs.existsSync('./data/create_lobby_npcs/config.json'))
    {
        const defaultConfig = await import('./data/create_lobby_npcs/config.json');
        fs.mkdirSync('data/create_lobby_npcs', {recursive: true});
        fs.writeFileSync('data/create_lobby_npcs/config.json', JSON.stringify(defaultConfig, null, 4));
    }
    const config = JSON.parse(fs.readFileSync('data/create_lobby_npcs/config.json', 'utf-8'));

    const npcDataArray: npcData[] = [];
    const npcKeys = Object.keys(config.npcs);

    //console.log("> Creating NPCs!");
    for (let i = 0; i < npcKeys.length; i++) {
        const npcKey = npcKeys[i];
        const npcValue = config.npcs[npcKey];
        npcDataArray.push({
            namespace: npcKey,
            texture: npcValue.texture, 
            geometry: npcValue.geometry, 
            components: npcValue.components,
            additional_animations: npcValue.additional_animations,
            additional_animation_controller: npcValue.additional_animation_controller,
            include_dialogue_box: (npcValue.include_dialogue_box === undefined ? false : npcValue.include_dialogue_box),
            slim: (npcValue.slim === undefined ? false : npcValue.slim)
        });
        //console.log("   - Creating NPC: " + npcKey);
    }

    writeGeos();
    writeLobbyCenterEntity();
    writeRenderController(npcDataArray);
    writeAnimations();
    writeAnimationControllers();
    writeLobbyNPCEntity(config.center_count === undefined ? 3 : config.center_count, npcDataArray);
}

async function writeGeos() {
    const normalGeo = await import('./assets/RP/models/npc_normal.geo.json');
    const slimGeo = await import('./assets/RP/models/npc_slim.geo.json');
    fs.mkdirSync('RP/models/entity/lobby_npc', {recursive: true});
    fs.writeFileSync('RP/models/entity/lobby_npc/normal.geo.json', JSON.stringify(normalGeo, null, 4));
    fs.writeFileSync('RP/models/entity/lobby_npc/slim.geo.json', JSON.stringify(slimGeo, null, 4));
}

async function writeLobbyCenterEntity()
{
    const bpEntity = await import('./assets/BP/entities/lobby_center.json');
    fs.mkdirSync('BP/entities', {recursive: true});
    fs.writeFileSync('BP/entities/lobby_center.bpe.json', JSON.stringify(bpEntity, null, 4));
}

async function writeLobbyNPCEntity(centerCount: number, npcs: npcData[])
{
    const rpEntity = await import('./assets/RP/entity/lobby_npc.entity.json');
    fs.mkdirSync('RP/entity', {recursive: true});
    fs.writeFileSync('RP/entity/lobby_npc.rpe.json', JSON.stringify(rpEntity, null, 4));

    const bpEntity = await import('./assets/BP/entities/lobby_npc.json');
    fs.mkdirSync('BP/entities', {recursive: true});
    fs.writeFileSync('BP/entities/lobby_npc.bpe.json', JSON.stringify(bpEntity, null, 4));

    const rpac = await import('./assets/RP/animation_controllers/lobby_npc.animation_controllers.json');
    
    for (let i = 0; i < centerCount; i++) {
        (bpEntity['minecraft:entity'].events['fg:random_center'].randomize as any[]).push(
            {
                "weight": 1,
                "add": {
                    "component_groups": [
                        "fg:center" + i
                    ]
                }
        });
        (bpEntity['minecraft:entity'].component_groups as any)['fg:center' + i] = {
            "minecraft:timer": {
                "looping": true,
                "time": {
                    "range_min": 25,
                    "range_max": 60
                },
                "time_down_event": {
                    "event": "fg:random_center"
                }
            },
            "minecraft:behavior.nearest_attackable_target": {
                "priority": 2,
                "entity_types": [
                    {
                        "filters": {
                            "all_of": [
                                {
                                    "test": "has_tag",
                                    "subject": "other",
                                    "value": "center" + i
                                }
                            ]
                        },
                        "max_dist": 128,
                        "must_see": false,
                        "must_see_forget_duration": 0
                    }
                ],
                "must_reach": false,
                "must_see": false,
                "must_see_forget_duration": 0,
                "reselect_targets": true,
                "scan_interval": 10,
                "within_radius": 128
            },
            "minecraft:behavior.circle_around_anchor": {
                "priority": 3,
                "goal_radius": 2,
                "height_above_target_range": [
                    0.0,
                    0.0
                ],
                "height_offset_range": [
                    0,
                    0
                ],
                "radius_range": [
                    0.0,
                    14.0
                ]
            }
        };
    }

    for (let i = 0; i < npcs.length; i++) {
        const npc = npcs[i];
        (bpEntity['minecraft:entity'].events as any)[npc.namespace] = {
            "add": {
                "component_groups": [
                    npc.namespace
                ]
            }
        };

        if (npc.components !== undefined) {
            (bpEntity['minecraft:entity'].component_groups as any)[npc.namespace] = npc.components;
        }else {
            (bpEntity['minecraft:entity'].component_groups as any)[npc.namespace] = {};
        }

        (bpEntity['minecraft:entity'].component_groups as any)[npc.namespace]["minecraft:variant"] = {
            value: i
        }

        if (npc.slim !== undefined && npc.slim) {
            (bpEntity['minecraft:entity'].component_groups as any)[npc.namespace]['minecraft:is_saddled'] = {
            }
        }

        if (npc.include_dialogue_box){
            (bpEntity['minecraft:entity'].component_groups as any)[npc.namespace]["minecraft:npc"] = {
                "npc_data": {
                    "portrait_offsets": {
                        "translate": [
                            -7,
                            50,
                            0
                        ],
                        "scale": [
                            1.75,
                            1.75,
                            1.75
                        ]
                    },
                    "picker_offsets": {
                        "translate": [
                            0,
                            20,
                            0
                        ],
                        "scale": [
                            1.7,
                            1.7,
                            1.7
                        ]
                    }
                }
            }
        }

        (rpEntity['minecraft:client_entity'].description.textures as any)[npc.namespace.substring(npc.namespace.lastIndexOf(':') + 1, npc.namespace.length)] = npc.texture;
        
        let name = npc.namespace.substring(npc.namespace.lastIndexOf(':') + 1, npc.namespace.length);
        rpEntity['minecraft:client_entity'].description.render_controllers.push(
            {
                [`controller.render.lobby_npc.${name}`]: `query.variant == ${i}`
            }
        );

        if (npc.geometry !== undefined) {
            rpEntity['minecraft:client_entity'].description.geometry[npc.geometry.substring(npc.geometry.indexOf('.') + 1, npc.geometry.length)] = npc.geometry;
        }

        if (npc.additional_animations !== undefined) {
            const animationKeys = Object.keys(npc.additional_animations) 
            animationKeys.forEach(value => {
                rpEntity['minecraft:client_entity'].description.animations[value] = npc.additional_animations[value];
            });
        }

        if (npc.additional_animation_controller !== undefined) {
            rpac.animation_controllers[`controller.animation.lobby_npc.${name}`] = {
                initial_state: "default",
                states: {default: {animations: npc.additional_animation_controller}}
            }
            rpEntity['minecraft:client_entity'].description.animations[`controller.lobby_npc.${name}`] = `controller.animation.lobby_npc.${name}`;
            (rpEntity['minecraft:client_entity'].description.scripts.animate as (string|{})[]).push(
                {
                    [`controller.lobby_npc.${name}`]: `query.variant == ${i}`
                }
            );
        }
    }

    fs.mkdirSync('RP/entity', {recursive: true});
    fs.writeFileSync('RP/entity/lobby_npc.rpe.json', JSON.stringify(rpEntity, null, 4));

    fs.mkdirSync('BP/entities', {recursive: true});
    fs.writeFileSync('BP/entities/lobby_npc.bpe.json', JSON.stringify(bpEntity, null, 4));

    fs.mkdirSync('RP/animation_controllers', {recursive:true});
    fs.writeFileSync('RP/animation_controllers/lobby_npc.rpac.json', JSON.stringify(rpac, null, 4));
}

async function writeRenderController(npcs: npcData[]) {
    const renderController = await import('./assets/RP/render_controllers/lobby_npc.render.json');

    npcs.forEach(npc => {
        let name = npc.namespace.substring(npc.namespace.lastIndexOf(':') + 1, npc.namespace.length);
        renderController.render_controllers[`controller.render.lobby_npc.${name}`] = {
            "geometry": (npc.geometry === undefined ? (npc.slim !== undefined && npc.slim) ? 'geometry.slim' : 'geometry.default' : npc.geometry),
            "materials": [
                {
                    "*": "Material.default"
                }
            ],
            "textures": [
                `texture.${name}`
            ]
        }
    });

    fs.mkdirSync('RP/render_controllers', {recursive: true});
    fs.writeFileSync('RP/render_controllers/lobby_npc.render.json', JSON.stringify(renderController, null, 4));
}

async function writeAnimations() {
    const animations = await import('./assets/RP/animations/lobby_npc.animation.json');
    fs.mkdirSync('RP/animations', {recursive:true});
    fs.writeFileSync('RP/animations/lobby_npc.rpa.json', JSON.stringify(animations, null, 4));
}

async function writeAnimationControllers() {
    const animationControllers = await import('./assets/RP/animation_controllers/lobby_npc.animation_controllers.json')
    fs.mkdirSync('RP/animation_controllers', {recursive:true});
    fs.writeFileSync('RP/animation_controllers/lobby_npc.rpac.json', JSON.stringify(animationControllers, null, 4));
}

type npcData = {
    namespace: string,
    texture: string,
    geometry: string,
    include_dialogue_box: boolean,
    components: {},
    additional_animations: {},
    additional_animation_controller: ({}|string)[]
    slim: boolean
}

run()