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
        var entity, animation_controller, config, firework_keys, i, key, value, time, substringKey, colors, on_entry, has_fade, trail, j, color, color_code, k, blast_effect, fade, blast_effect, fade, flash_effect;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, Promise.resolve().then(function () { return require('../assets/fireworks_rocket.json'); })];
                case 1:
                    entity = _b.sent();
                    return [4 /*yield*/, Promise.resolve().then(function () { return require('../assets/fireworks_rocket.animation_controller.json'); })];
                case 2:
                    animation_controller = _b.sent();
                    config = JSON.parse(fs.readFileSync('data/firework_rockets/config.json', 'utf-8'));
                    firework_keys = Object.keys(config);
                    i = 0;
                    _b.label = 3;
                case 3:
                    if (!(i < firework_keys.length)) return [3 /*break*/, 16];
                    key = firework_keys[i];
                    value = config[key];
                    //console.log("> Creating Firework: " + key);
                    time = value.power;
                    if (time === undefined) {
                        console.warn(key + " is missing time object, skipping...");
                        return [3 /*break*/, 15];
                    }
                    entity['minecraft:entity'].component_groups[key] = {
                        "minecraft:timer": {
                            "time": time,
                            "looping": false,
                            "time_down_event": {
                                "event": "custom:detonate"
                            }
                        },
                        "minecraft:variant": {
                            "value": i
                        }
                    };
                    entity['minecraft:entity'].events[key] = {
                        "add": {
                            "component_groups": [
                                key
                            ]
                        }
                    };
                    if ((value.random_weight === undefined ? 1 : value.random_weight) !== 0) {
                        entity['minecraft:entity'].events['custom:random'].randomize.push({
                            "trigger": key,
                            "weight": (value.random_weight === undefined ? 1 : value.random_weight)
                        });
                    }
                    substringKey = key.substring(key.lastIndexOf(":") + 1, key.length);
                    animation_controller.animation_controllers['controller.animation.fireworks_rocket'].states["default"].transitions.push((_a = {},
                        _a[substringKey] = "q.is_baby && q.variant == " + i,
                        _a));
                    colors = (typeof value.color === "string" ? [value.color] : value.color);
                    on_entry = [
                        "/playsound firework.blast @a ~~~"
                    ];
                    has_fade = value.fade !== undefined;
                    trail = (value.trail !== undefined ? value.trail : false);
                    fs.mkdirSync('RP/particles/firework_effects/' + substringKey, { recursive: true });
                    j = 0;
                    _b.label = 4;
                case 4:
                    if (!(j < colors.length)) return [3 /*break*/, 14];
                    color = colors[j];
                    color_code = hexToRgb(parseColor(color));
                    if (!trail) return [3 /*break*/, 9];
                    k = 0;
                    _b.label = 5;
                case 5:
                    if (!(k < 5)) return [3 /*break*/, 8];
                    return [4 /*yield*/, Promise.resolve().then(function () { return require('../assets/fireworks_rocket_blast_trail.json'); })];
                case 6:
                    blast_effect = _b.sent();
                    blast_effect.particle_effect.description.identifier = key + "_blast_" + j + k;
                    blast_effect.particle_effect.components['minecraft:particle_initial_speed'] = (k + 3) * .5;
                    blast_effect.particle_effect.components['minecraft:emitter_rate_instant'].num_particles = (100 / colors.length);
                    on_entry.push("/particle " + key + "_blast_" + j + k + " ~~~");
                    if (has_fade) {
                        fade = (typeof value.fade === "string" ? [value.fade] : value.fade);
                        blast_effect.particle_effect.components['minecraft:particle_appearance_tinting'].color = {
                            interpolant: "(v.particle_age / v.particle_lifetime)",
                            gradient: {
                                "0.0": parseColor(color),
                                "1.0": parseColor(fade[j % fade.length])
                            }
                        };
                    }
                    else {
                        blast_effect.particle_effect.components['minecraft:particle_appearance_tinting'].color = [
                            (color_code.r / 250),
                            (color_code.g / 250),
                            (color_code.b / 250),
                            1
                        ];
                    }
                    fs.writeFileSync('RP/particles/firework_effects/' + substringKey + '/blast' + j + k + '.particle.json', JSON.stringify(blast_effect, null, 4));
                    _b.label = 7;
                case 7:
                    k++;
                    return [3 /*break*/, 5];
                case 8: return [3 /*break*/, 11];
                case 9: return [4 /*yield*/, Promise.resolve().then(function () { return require('../assets/fireworks_rocket_blast.json'); })];
                case 10:
                    blast_effect = _b.sent();
                    blast_effect.particle_effect.description.identifier = key + "_blast_" + j;
                    // Firework blast count should stay at 100
                    blast_effect.particle_effect.components['minecraft:emitter_rate_instant'].num_particles = (100 / colors.length);
                    if (has_fade) {
                        fade = (typeof value.fade === "string" ? [value.fade] : value.fade);
                        blast_effect.particle_effect.components['minecraft:particle_appearance_tinting'].color = {
                            interpolant: "(v.particle_age / v.particle_lifetime)",
                            gradient: {
                                "0.0": parseColor(color),
                                "1.0": parseColor(fade[j % fade.length])
                            }
                        };
                    }
                    else {
                        blast_effect.particle_effect.components['minecraft:particle_appearance_tinting'].color = [
                            (color_code.r / 250),
                            (color_code.g / 250),
                            (color_code.b / 250),
                            1
                        ];
                    }
                    on_entry.push("/particle " + key + "_blast_" + j + " ~~~");
                    fs.writeFileSync('RP/particles/firework_effects/' + substringKey + '/blast' + j + '.particle.json', JSON.stringify(blast_effect, null, 4));
                    _b.label = 11;
                case 11: return [4 /*yield*/, Promise.resolve().then(function () { return require('../assets/fireworks_rocket_flash.json'); })];
                case 12:
                    flash_effect = _b.sent();
                    flash_effect.particle_effect.description.identifier = key + "_flash_" + j;
                    on_entry.push("/particle " + key + "_flash_" + j + " ~~~");
                    flash_effect.particle_effect.components['minecraft:particle_appearance_tinting'].color = [
                        (color_code.r / 250),
                        (color_code.g / 250),
                        (color_code.b / 250),
                        "Math.clamp(variable.alpha, 0, 1)"
                    ];
                    fs.writeFileSync('RP/particles/firework_effects/' + substringKey + '/flash' + j + '.particle.json', JSON.stringify(flash_effect, null, 4));
                    _b.label = 13;
                case 13:
                    j++;
                    return [3 /*break*/, 4];
                case 14:
                    on_entry.push("/kill @s");
                    animation_controller.animation_controllers['controller.animation.fireworks_rocket'].states[substringKey] = {
                        "on_entry": on_entry
                    };
                    _b.label = 15;
                case 15:
                    i++;
                    return [3 /*break*/, 3];
                case 16:
                    /*----------------          Write Files       ----------------*/
                    fs.mkdirSync('BP/entities', { recursive: true });
                    fs.mkdirSync('BP/animation_controllers', { recursive: true });
                    fs.writeFileSync('BP/entities/fireworks_rocket.bpe.json', JSON.stringify(entity, null, 4));
                    fs.writeFileSync('BP/animation_controllers/fireworks_rocket.bpac.json', JSON.stringify(animation_controller, null, 4));
                    return [2 /*return*/];
            }
        });
    });
}
function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}
function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
function parseColor(value) {
    switch (value) {
        case 'red': {
            return '#B3312C';
        }
        case 'orange': {
            return '#EB8844';
        }
        case 'yellow': {
            return '#DECF2A';
        }
        case 'lime': {
            return '#41CD34';
        }
        case 'green': {
            return '#3B511A';
        }
        case 'light_blue': {
            return '#6689D3';
        }
        case 'cyan': {
            return '#287697';
        }
        case 'blue': {
            return '#253192';
        }
        case 'purple': {
            return '#7B2FBE';
        }
        case 'magenta': {
            return '#C354CD';
        }
        case 'pink': {
            return '#D88198';
        }
        case 'white': {
            return '#F0F0F0';
        }
        case 'light_gray': {
            return '#ABABAB';
        }
        case 'gray': {
            return '#434343';
        }
        case 'black': {
            return '#1E1B1B';
        }
        case 'brown': {
            return '#51301A';
        }
    }
    return value;
}
function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}
run();
