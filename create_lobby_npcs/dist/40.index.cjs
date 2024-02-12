"use strict";exports.id=40,exports.ids=[40],exports.modules={40:a=>{a.exports=JSON.parse('{"format_version":"1.10.0","minecraft:client_entity":{"description":{"identifier":"fg:lobby_npc","materials":{"default":"entity_alphatest","animated":"player_animated"},"textures":{},"geometry":{"default":"geometry.npc_normal","slim":"geometry.npc_slim"},"scripts":{"scale":"0.9375","initialize":["variable.is_holding_right = 0.0;","variable.is_blinking = 0.0;","variable.last_blink_time = 0.0;","variable.hand_bob = 0.0;","variable.map_angle = 0.0;","variable.player_x_rotation = 0.0;","variable.is_paperdoll = 0.0;","variable.is_first_person = 0.0;","variable.map_face_icon = 0.0;"],"pre_animation":["variable.player_x_rotation = query.head_x_rotation(0);","variable.helmet_layer_visible = 1.0;","variable.leg_layer_visible = 1.0;","variable.boot_layer_visible = 1.0;","variable.chest_layer_visible = 1.0;","variable.attack_body_rot_y = Math.sin(360*Math.sqrt(variable.attack_time)) * 5.0;","variable.tcos0 = (math.cos(query.modified_distance_moved * 38.17) * query.modified_move_speed / variable.gliding_speed_value) * 57.3;","variable.first_person_rotation_factor = math.sin((1 - variable.attack_time) * 180.0);","variable.hand_bob = query.life_time < 0.01 ? 0.0 : variable.hand_bob + ((query.is_on_ground && query.is_alive ? math.clamp(math.sqrt(math.pow(query.position_delta(0), 2.0) + math.pow(query.position_delta(2), 2.0)), 0.0, 0.1) : 0.0) - variable.hand_bob) * 0.02;","variable.map_angle = math.clamp(1 - variable.player_x_rotation / 45.1, 0.0, 1.0);","variable.item_use_normalized = query.main_hand_item_use_duration / query.main_hand_item_max_duration;"],"animate":["root"]},"animations":{"root":"controller.animation.hs.player.root","base_controller":"controller.animation.hs.player.base","humanoid_base_pose":"animation.hs.humanoid.base_pose","look_at_target":"controller.animation.hs.humanoid.look_at_target","look_at_target_ui":"animation.hs.player.look_at_target.ui","look_at_target_default":"animation.hs.humanoid.look_at_target.default","look_at_target_gliding":"animation.hs.humanoid.look_at_target.gliding","look_at_target_swimming":"animation.hs.humanoid.look_at_target.swimming","look_at_target_inverted":"animation.hs.player.look_at_target.inverted","cape":"animation.hs.player.cape","move.arms":"animation.hs.player.move.arms","move.legs":"animation.hs.player.move.legs","swimming":"animation.hs.player.swim","swimming.legs":"animation.hs.player.swim.legs","riding.arms":"animation.hs.player.riding.arms","riding.legs":"animation.hs.player.riding.legs","holding":"animation.hs.player.holding","brandish_spear":"animation.hs.humanoid.brandish_spear","charging":"animation.hs.humanoid.charging","attack.positions":"animation.hs.player.attack.positions","attack.rotations":"animation.hs.player.attack.rotations","sneaking":"animation.hs.player.sneaking","bob":"animation.hs.player.bob","damage_nearby_mobs":"animation.hs.humanoid.damage_nearby_mobs","use_item_progress":"animation.hs.humanoid.use_item_progress","skeleton_attack":"animation.hs.skeleton.attack","sleeping":"animation.hs.player.sleeping","first_person_base_pose":"animation.hs.player.first_person.base_pose","first_person_empty_hand":"animation.hs.player.first_person.empty_hand","first_person_swap_item":"animation.hs.player.first_person.swap_item","first_person_attack_controller":"controller.animation.hs.player.first_person_attack","first_person_attack_rotation":"animation.hs.player.first_person.attack_rotation","first_person_vr_attack_rotation":"animation.hs.player.first_person.vr_attack_rotation","first_person_walk":"animation.hs.player.first_person.walk","first_person_map_controller":"controller.animation.hs.player.first_person_map","first_person_map_hold":"animation.hs.player.first_person.map_hold","first_person_map_hold_attack":"animation.hs.player.first_person.map_hold_attack","first_person_map_hold_off_hand":"animation.hs.player.first_person.map_hold_off_hand","first_person_map_hold_main_hand":"animation.hs.player.first_person.map_hold_main_hand","shield_block_main_hand":"animation.hs.player.shield_block_main_hand","shield_block_off_hand":"animation.hs.player.shield_block_off_hand"},"render_controllers":[],"enable_attachables":true}}}')}};