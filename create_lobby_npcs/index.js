"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var fs = require("fs");
function run() {
    return __awaiter(this, void 0, void 0, function () {
        var defaultConfig, config, npcDataArray, npcKeys, i, npcKey, npcValue;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!!fs.existsSync('./data/create_lobby_npcs/config.json')) return [3 /*break*/, 2];
                    return [4 /*yield*/, Promise.resolve().then(function () { return require('./data/create_lobby_npcs/config.json'); })];
                case 1:
                    defaultConfig = _a.sent();
                    fs.mkdirSync('data/create_lobby_npcs', { recursive: true });
                    fs.writeFileSync('data/create_lobby_npcs/config.json', JSON.stringify(defaultConfig, null, 4));
                    _a.label = 2;
                case 2:
                    config = JSON.parse(fs.readFileSync('data/create_lobby_npcs/config.json', 'utf-8'));
                    npcDataArray = [];
                    npcKeys = Object.keys(config.npcs);
                    //console.log("> Creating NPCs!");
                    for (i = 0; i < npcKeys.length; i++) {
                        npcKey = npcKeys[i];
                        npcValue = config.npcs[npcKey];
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
                    return [2 /*return*/];
            }
        });
    });
}
function writeGeos() {
    return __awaiter(this, void 0, void 0, function () {
        var normalGeo, slimGeo;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Promise.resolve().then(function () { return require('./assets/RP/models/npc_normal.geo.json'); })];
                case 1:
                    normalGeo = _a.sent();
                    return [4 /*yield*/, Promise.resolve().then(function () { return require('./assets/RP/models/npc_slim.geo.json'); })];
                case 2:
                    slimGeo = _a.sent();
                    fs.mkdirSync('RP/models/entity/lobby_npc', { recursive: true });
                    fs.writeFileSync('RP/models/entity/lobby_npc/normal.geo.json', JSON.stringify(normalGeo, null, 4));
                    fs.writeFileSync('RP/models/entity/lobby_npc/slim.geo.json', JSON.stringify(slimGeo, null, 4));
                    return [2 /*return*/];
            }
        });
    });
}
function writeLobbyCenterEntity() {
    return __awaiter(this, void 0, void 0, function () {
        var bpEntity;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Promise.resolve().then(function () { return require('./assets/BP/entities/lobby_center.json'); })];
                case 1:
                    bpEntity = _a.sent();
                    fs.mkdirSync('BP/entities', { recursive: true });
                    fs.writeFileSync('BP/entities/lobby_center.bpe.json', JSON.stringify(bpEntity, null, 4));
                    return [2 /*return*/];
            }
        });
    });
}
function writeLobbyNPCEntity(centerCount, npcs) {
    return __awaiter(this, void 0, void 0, function () {
        var rpEntity, bpEntity, rpac, i, _loop_1, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Promise.resolve().then(function () { return require('./assets/RP/entity/lobby_npc.entity.json'); })];
                case 1:
                    rpEntity = _a.sent();
                    fs.mkdirSync('RP/entity', { recursive: true });
                    fs.writeFileSync('RP/entity/lobby_npc.rpe.json', JSON.stringify(rpEntity, null, 4));
                    return [4 /*yield*/, Promise.resolve().then(function () { return require('./assets/BP/entities/lobby_npc.json'); })];
                case 2:
                    bpEntity = _a.sent();
                    fs.mkdirSync('BP/entities', { recursive: true });
                    fs.writeFileSync('BP/entities/lobby_npc.bpe.json', JSON.stringify(bpEntity, null, 4));
                    return [4 /*yield*/, Promise.resolve().then(function () { return require('./assets/RP/animation_controllers/lobby_npc.animation_controllers.json'); })];
                case 3:
                    rpac = _a.sent();
                    for (i = 0; i < centerCount; i++) {
                        bpEntity['minecraft:entity'].events['fg:random_center'].randomize.push({
                            "weight": 1,
                            "add": {
                                "component_groups": [
                                    "fg:center" + i
                                ]
                            }
                        });
                        bpEntity['minecraft:entity'].component_groups['fg:center' + i] = {
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
                    _loop_1 = function (i) {
                        var _b, _c;
                        var npc = npcs[i];
                        bpEntity['minecraft:entity'].events[npc.namespace] = {
                            "add": {
                                "component_groups": [
                                    npc.namespace
                                ]
                            }
                        };
                        if (npc.components !== undefined) {
                            bpEntity['minecraft:entity'].component_groups[npc.namespace] = npc.components;
                        }
                        else {
                            bpEntity['minecraft:entity'].component_groups[npc.namespace] = {};
                        }
                        bpEntity['minecraft:entity'].component_groups[npc.namespace]["minecraft:variant"] = {
                            value: i
                        };
                        if (npc.slim !== undefined && npc.slim) {
                            bpEntity['minecraft:entity'].component_groups[npc.namespace]['minecraft:is_saddled'] = {};
                        }
                        if (npc.include_dialogue_box) {
                            bpEntity['minecraft:entity'].component_groups[npc.namespace]["minecraft:npc"] = {
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
                            };
                        }
                        rpEntity['minecraft:client_entity'].description.textures[npc.namespace.substring(npc.namespace.lastIndexOf(':') + 1, npc.namespace.length)] = npc.texture;
                        var name_1 = npc.namespace.substring(npc.namespace.lastIndexOf(':') + 1, npc.namespace.length);
                        rpEntity['minecraft:client_entity'].description.render_controllers.push((_b = {},
                            _b["controller.render.lobby_npc.".concat(name_1)] = "query.variant == ".concat(i),
                            _b));
                        if (npc.geometry !== undefined) {
                            rpEntity['minecraft:client_entity'].description.geometry[npc.geometry.substring(npc.geometry.indexOf('.') + 1, npc.geometry.length)] = npc.geometry;
                        }
                        if (npc.additional_animations !== undefined) {
                            var animationKeys = Object.keys(npc.additional_animations);
                            animationKeys.forEach(function (value) {
                                rpEntity['minecraft:client_entity'].description.animations[value] = npc.additional_animations[value];
                            });
                        }
                        if (npc.additional_animation_controller !== undefined) {
                            rpac.animation_controllers["controller.animation.lobby_npc.".concat(name_1)] = {
                                initial_state: "default",
                                states: { "default": { animations: npc.additional_animation_controller } }
                            };
                            rpEntity['minecraft:client_entity'].description.animations["controller.lobby_npc.".concat(name_1)] = "controller.animation.lobby_npc.".concat(name_1);
                            rpEntity['minecraft:client_entity'].description.scripts.animate.push((_c = {},
                                _c["controller.lobby_npc.".concat(name_1)] = "query.variant == ".concat(i),
                                _c));
                        }
                    };
                    for (i = 0; i < npcs.length; i++) {
                        _loop_1(i);
                    }
                    fs.mkdirSync('RP/entity', { recursive: true });
                    fs.writeFileSync('RP/entity/lobby_npc.rpe.json', JSON.stringify(rpEntity, null, 4));
                    fs.mkdirSync('BP/entities', { recursive: true });
                    fs.writeFileSync('BP/entities/lobby_npc.bpe.json', JSON.stringify(bpEntity, null, 4));
                    fs.mkdirSync('RP/animation_controllers', { recursive: true });
                    fs.writeFileSync('RP/animation_controllers/lobby_npc.rpac.json', JSON.stringify(rpac, null, 4));
                    return [2 /*return*/];
            }
        });
    });
}
function writeRenderController(npcs) {
    return __awaiter(this, void 0, void 0, function () {
        var renderController;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Promise.resolve().then(function () { return require('./assets/RP/render_controllers/lobby_npc.render.json'); })];
                case 1:
                    renderController = _a.sent();
                    npcs.forEach(function (npc) {
                        var name = npc.namespace.substring(npc.namespace.lastIndexOf(':') + 1, npc.namespace.length);
                        renderController.render_controllers["controller.render.lobby_npc.".concat(name)] = {
                            "geometry": (npc.geometry === undefined ? (npc.slim !== undefined && npc.slim) ? 'geometry.slim' : 'geometry.default' : npc.geometry),
                            "materials": [
                                {
                                    "*": "Material.default"
                                }
                            ],
                            "textures": [
                                "texture.".concat(name)
                            ]
                        };
                    });
                    fs.mkdirSync('RP/render_controllers', { recursive: true });
                    fs.writeFileSync('RP/render_controllers/lobby_npc.render.json', JSON.stringify(renderController, null, 4));
                    return [2 /*return*/];
            }
        });
    });
}
function writeAnimations() {
    return __awaiter(this, void 0, void 0, function () {
        var animations;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Promise.resolve().then(function () { return require('./assets/RP/animations/lobby_npc.animation.json'); })];
                case 1:
                    animations = _a.sent();
                    fs.mkdirSync('RP/animations', { recursive: true });
                    fs.writeFileSync('RP/animations/lobby_npc.rpa.json', JSON.stringify(animations, null, 4));
                    return [2 /*return*/];
            }
        });
    });
}
function writeAnimationControllers() {
    return __awaiter(this, void 0, void 0, function () {
        var animationControllers;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Promise.resolve().then(function () { return require('./assets/RP/animation_controllers/lobby_npc.animation_controllers.json'); })];
                case 1:
                    animationControllers = _a.sent();
                    fs.mkdirSync('RP/animation_controllers', { recursive: true });
                    fs.writeFileSync('RP/animation_controllers/lobby_npc.rpac.json', JSON.stringify(animationControllers, null, 4));
                    return [2 /*return*/];
            }
        });
    });
}
run();
