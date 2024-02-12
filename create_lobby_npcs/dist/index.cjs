(()=>{"use strict";var e,t,n,i={},r={};function a(e){var t=r[e];if(void 0!==t)return t.exports;var n=r[e]={exports:{}};return i[e](n,n.exports,a),n.exports}a.m=i,t=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__,a.t=function(n,i){if(1&i&&(n=this(n)),8&i)return n;if("object"==typeof n&&n){if(4&i&&n.__esModule)return n;if(16&i&&"function"==typeof n.then)return n}var r=Object.create(null);a.r(r);var o={};e=e||[null,t({}),t([]),t(t)];for(var s=2&i&&n;"object"==typeof s&&!~e.indexOf(s);s=t(s))Object.getOwnPropertyNames(s).forEach((e=>o[e]=()=>n[e]));return o.default=()=>n,a.d(r,o),r},a.d=(e,t)=>{for(var n in t)a.o(t,n)&&!a.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},a.f={},a.e=e=>Promise.all(Object.keys(a.f).reduce(((t,n)=>(a.f[n](e,t),t)),[])),a.u=e=>e+".index.cjs",a.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),a.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n={590:1},a.f.require=(e,t)=>{n[e]||(e=>{var t=e.modules,i=e.ids,r=e.runtime;for(var o in t)a.o(t,o)&&(a.m[o]=t[o]);r&&r(a);for(var s=0;s<i.length;s++)n[i[s]]=1})(require("./"+a.u(e)))};const o=require("fs");!async function(){if(!(0,o.existsSync)("./data/create_lobby_npcs/config.json")){const e=await a.e(522).then(a.t.bind(a,522,19));(0,o.mkdirSync)("data/create_lobby_npcs",{recursive:!0}),e.default=void 0,(0,o.writeFileSync)("data/create_lobby_npcs/config.json",JSON.stringify(e,null,4))}const e=JSON.parse((0,o.readFileSync)("data/create_lobby_npcs/config.json","utf-8")),t=[],n=Object.keys(e.npcs);for(let i=0;i<n.length;i++){const r=n[i],a=e.npcs[r];t.push({namespace:r,texture:a.texture,geometry:a.geometry,components:a.components,additional_animations:a.additional_animations,additional_animation_controller:a.additional_animation_controller,include_dialogue_box:void 0!==a.include_dialogue_box&&a.include_dialogue_box,slim:void 0!==a.slim&&a.slim})}await async function(){const e=JSON.parse((0,o.readFileSync)("data/create_lobby_npcs/assets/RP/models/npc_normal.geo.json","utf-8")),t=JSON.parse((0,o.readFileSync)("data/create_lobby_npcs/assets/RP/models/npc_slim.geo.json","utf-8"));(0,o.mkdirSync)("RP/models/entity/lobby_npc",{recursive:!0}),e.default=void 0,(0,o.writeFileSync)("RP/models/entity/lobby_npc/normal.geo.json",JSON.stringify(e,null,4)),t.default=void 0,(0,o.writeFileSync)("RP/models/entity/lobby_npc/slim.geo.json",JSON.stringify(t,null,4))}(),await async function(){const e=JSON.parse((0,o.readFileSync)("data/create_lobby_npcs/assets/BP/entities/lobby_center.bpe.json","utf-8"));(0,o.mkdirSync)("BP/entities",{recursive:!0}),(0,o.writeFileSync)("BP/entities/lobby_center.bpe.json",JSON.stringify(e,null,4))}(),await async function(e){const t=JSON.parse((0,o.readFileSync)("data/create_lobby_npcs/assets/RP/render_controllers/lobby_npc.render.json","utf-8"));e.forEach((e=>{let n=e.namespace.substring(e.namespace.lastIndexOf(":")+1,e.namespace.length);t.render_controllers[`controller.render.lobby_npc.${n}`]={geometry:void 0===e.geometry?void 0!==e.slim&&e.slim?"geometry.slim":"geometry.default":e.geometry,materials:[{"*":"Material.default"}],textures:[`texture.${n}`]}})),(0,o.mkdirSync)("RP/render_controllers",{recursive:!0}),t.default=void 0,(0,o.writeFileSync)("RP/render_controllers/lobby_npc.render.json",JSON.stringify(t,null,4))}(t),await async function(){const e=JSON.parse((0,o.readFileSync)("data/create_lobby_npcs/assets/RP/animations/lobby_npc.rpa.json","utf-8"));(0,o.mkdirSync)("RP/animations",{recursive:!0}),e.default=void 0,(0,o.writeFileSync)("RP/animations/lobby_npc.rpa.json",JSON.stringify(e,null,4))}(),await async function(){const e=JSON.parse((0,o.readFileSync)("data/create_lobby_npcs/assets/RP/animation_controllers/lobby_npc.rpac.json","utf-8"));(0,o.mkdirSync)("RP/animation_controllers",{recursive:!0}),e.default=void 0,(0,o.writeFileSync)("RP/animation_controllers/lobby_npc.rpac.json",JSON.stringify(e,null,4))}(),await async function(e,t){const n=JSON.parse((0,o.readFileSync)("data/create_lobby_npcs/assets/RP/entity/lobby_npc.rpe.json","utf-8"));(0,o.mkdirSync)("RP/entity",{recursive:!0});const i=JSON.parse((0,o.readFileSync)("data/create_lobby_npcs/assets/BP/entities/lobby_npc.bpe.json","utf-8"));(0,o.mkdirSync)("BP/entities",{recursive:!0});const r=JSON.parse((0,o.readFileSync)("data/create_lobby_npcs/assets/RP/animation_controllers/lobby_npc.rpac.json","utf-8"));for(let t=0;t<e;t++)i["minecraft:entity"].events["fg:random_center"].randomize.push({weight:1,add:{component_groups:["fg:center"+t]}}),i["minecraft:entity"].component_groups["fg:center"+t]={"minecraft:timer":{looping:!0,time:{range_min:25,range_max:60},time_down_event:{event:"fg:random_center"}},"minecraft:behavior.nearest_attackable_target":{priority:2,entity_types:[{filters:{all_of:[{test:"has_tag",subject:"other",value:"center"+t}]},max_dist:128,must_see:!1,must_see_forget_duration:0}],must_reach:!1,must_see:!1,must_see_forget_duration:0,reselect_targets:!0,scan_interval:10,within_radius:128},"minecraft:behavior.circle_around_anchor":{priority:3,goal_radius:2,height_above_target_range:[0,0],height_offset_range:[0,0],radius_range:[0,14]}};for(let e=0;e<t.length;e++){const a=t[e];i["minecraft:entity"].events[a.namespace]={add:{component_groups:[a.namespace]}},void 0!==a.components?i["minecraft:entity"].component_groups[a.namespace]=a.components:i["minecraft:entity"].component_groups[a.namespace]={},i["minecraft:entity"].component_groups[a.namespace]["minecraft:variant"]={value:e},void 0!==a.slim&&a.slim&&(i["minecraft:entity"].component_groups[a.namespace]["minecraft:is_saddled"]={}),a.include_dialogue_box&&(i["minecraft:entity"].component_groups[a.namespace]["minecraft:npc"]={npc_data:{portrait_offsets:{translate:[-7,50,0],scale:[1.75,1.75,1.75]},picker_offsets:{translate:[0,20,0],scale:[1.7,1.7,1.7]}}}),n["minecraft:client_entity"].description.textures[a.namespace.substring(a.namespace.lastIndexOf(":")+1,a.namespace.length)]=a.texture;let o=a.namespace.substring(a.namespace.lastIndexOf(":")+1,a.namespace.length);n["minecraft:client_entity"].description.render_controllers.push({[`controller.render.lobby_npc.${o}`]:`query.variant == ${e}`}),void 0!==a.geometry&&(n["minecraft:client_entity"].description.geometry[a.geometry.substring(a.geometry.indexOf(".")+1,a.geometry.length)]=a.geometry),void 0!==a.additional_animations&&Object.keys(a.additional_animations).forEach((e=>{n["minecraft:client_entity"].description.animations[e]=a.additional_animations[e]})),void 0!==a.additional_animation_controller&&(r.animation_controllers[`controller.animation.lobby_npc.${o}`]={initial_state:"default",states:{default:{animations:a.additional_animation_controller}}},n["minecraft:client_entity"].description.animations[`controller.lobby_npc.${o}`]=`controller.animation.lobby_npc.${o}`,n["minecraft:client_entity"].description.scripts.animate.push({[`controller.lobby_npc.${o}`]:`query.variant == ${e}`}))}n.default=void 0,(0,o.writeFileSync)("RP/entity/lobby_npc.rpe.json",JSON.stringify(n,null,4)),i.default=void 0,(0,o.writeFileSync)("BP/entities/lobby_npc.bpe.json",JSON.stringify(i,null,4)),(0,o.mkdirSync)("RP/animation_controllers",{recursive:!0}),r.default=void 0,(0,o.writeFileSync)("RP/animation_controllers/lobby_npc.rpac.json",JSON.stringify(r,null,4))}(void 0===e.center_count?3:e.center_count,t)}()})();