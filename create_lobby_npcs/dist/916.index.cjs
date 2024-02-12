"use strict";exports.id=916,exports.ids=[916],exports.modules={916:a=>{a.exports=JSON.parse('{"format_version":"1.10.0","animation_controllers":{"controller.animation.hs.player.crossbow":{"initial_state":"default","states":{"charge":{"animations":["third_person_crossbow_equipped"],"transitions":[{"default":"query.get_equipped_item_name != \'crossbow\' || (query.item_remaining_use_duration <= 0.0 && !query.item_is_charged)"},{"hold":"query.item_is_charged"}]},"default":{"transitions":[{"hold":"query.item_is_charged"},{"charge":"query.item_remaining_use_duration > 0.0"}]},"hold":{"animations":["crossbow_hold"],"transitions":[{"default":"query.get_equipped_item_name != \'crossbow\' || (query.item_remaining_use_duration <= 0.0 && !query.item_is_charged)"},{"charge":"query.item_remaining_use_duration > 0.0"}]}}},"controller.animation.hs.player.first_person_attack":{"initial_state":"default","states":{"default":{"animations":["first_person_attack_rotation"],"transitions":[{"vr_attack":"variable.is_using_vr"}]},"vr_attack":{"animations":["first_person_vr_attack_rotation"],"transitions":[{"default":"!variable.is_using_vr"}]}}},"controller.animation.hs.player.first_person_map":{"initial_state":"default","states":{"default":{"transitions":[{"one_hand":"query.get_equipped_item_name(\'off_hand\') == \'map\' || query.get_equipped_item_name(\'off_hand\') == \'shield\'"},{"two_hand":"query.get_equipped_item_name(\'off_hand\') != \'map\' && query.get_equipped_item_name(\'off_hand\') != \'shield\'"}]},"one_hand":{"animations":[{"first_person_map_hold_main_hand":"query.get_equipped_item_name(0, 1) == \'map\'"},{"first_person_map_hold_off_hand":"query.get_equipped_item_name(\'off_hand\') == \'map\' && (query.get_equipped_item_name == \'bow\' ? !(variable.item_use_normalized > 0 && variable.item_use_normalized < 1.0) : 1.0)"}],"transitions":[{"default":"query.get_equipped_item_name(0, 1) != \'map\' && query.get_equipped_item_name(\'off_hand\') != \'map\'"},{"two_hand":"query.get_equipped_item_name(\'off_hand\') != \'map\' && query.get_equipped_item_name(\'off_hand\') != \'shield\'"}]},"two_hand":{"animations":["first_person_map_hold","first_person_map_hold_attack"],"transitions":[{"default":"query.get_equipped_item_name(0, 1) != \'map\' && query.get_equipped_item_name(\'off_hand\') != \'map\'"},{"one_hand":"query.get_equipped_item_name(\'off_hand\') == \'map\' || query.get_equipped_item_name(\'off_hand\') == \'shield\'"}]}}},"controller.animation.hs.player.root":{"initial_state":"first_person","states":{"first_person":{"animations":["first_person_swap_item",{"first_person_attack_controller":"variable.attack_time > 0.0f && query.get_equipped_item_name != \'map\'"},"first_person_base_pose",{"first_person_empty_hand":"query.get_equipped_item_name(0, 1) != \'map\'"},{"first_person_walk":"variable.bob_animation"},{"first_person_map_controller":"(query.get_equipped_item_name(0, 1) == \'map\' || query.get_equipped_item_name(\'off_hand\') == \'map\')"}],"transitions":[{"paperdoll":"variable.is_paperdoll"},{"map_player":"variable.map_face_icon"},{"third_person":"!variable.is_first_person"}]},"map_player":{"transitions":[{"paperdoll":"variable.is_paperdoll"},{"first_person":"variable.is_first_person"},{"third_person":"!variable.map_face_icon && !variable.is_first_person"}]},"paperdoll":{"animations":["humanoid_base_pose","look_at_target_ui","move.arms","move.legs","cape"],"transitions":[{"first_person":"!variable.is_paperdoll && variable.is_first_person"},{"map_player":"variable.map_face_icon"},{"third_person":"!variable.is_paperdoll && !variable.is_first_person"}]},"third_person":{"animations":["humanoid_base_pose",{"look_at_target":"!query.is_sleeping"},"move.arms","move.legs","cape",{"riding.arms":"query.is_riding"},{"riding.legs":"query.is_riding"},"holding",{"brandish_spear":"variable.is_brandishing_spear"},{"charging":"query.is_charging"},{"sneaking":"query.is_sneaking && !query.is_sleeping"},"bob",{"damage_nearby_mobs":"variable.damage_nearby_mobs"},{"swimming":"variable.swim_amount > 0.0"},{"swimming.legs":"variable.swim_amount > 0.0"},{"use_item_progress":"( variable.use_item_interval_progress > 0.0 ) || ( variable.use_item_startup_progress > 0.0 ) && !variable.is_brandishing_spear"},{"sleeping":"query.is_sleeping && query.is_alive"},{"attack.positions":"variable.attack_time >= 0.0"},{"attack.rotations":"variable.attack_time >= 0.0"},{"shield_block_main_hand":"query.blocking && query.get_equipped_item_name(\'off_hand\') != \'shield\' && query.get_equipped_item_name == \'shield\'"},{"shield_block_off_hand":"query.blocking && query.get_equipped_item_name(\'off_hand\') == \'shield\'"}],"transitions":[{"paperdoll":"variable.is_paperdoll"},{"first_person":"variable.is_first_person"},{"map_player":"variable.map_face_icon"}]}}},"controller.animation.hs.humanoid.attack":{"initial_state":"default","states":{"attacking":{"animations":["attack.rotations"],"transitions":[{"default":"variable.attack_time < 0.0"}]},"default":{"transitions":[{"attacking":"variable.attack_time >= 0.0"}]}}},"controller.animation.hs.humanoid.baby_big_head":{"initial_state":"default","states":{"baby":{"animations":["humanoid_big_head"],"transitions":[{"default":"!query.is_baby"}]},"default":{"transitions":[{"baby":"query.is_baby"}]}}},"controller.animation.hs.humanoid.base_pose":{"initial_state":"default","states":{"default":{"animations":["humanoid_base_pose"]}}},"controller.animation.hs.humanoid.bob":{"initial_state":"default","states":{"default":{"animations":["bob"]}}},"controller.animation.hs.humanoid.bow_and_arrow":{"initial_state":"default","states":{"bow_and_arrow":{"animations":["bow_and_arrow"],"transitions":[{"default":"!query.has_target"}]},"default":{"transitions":[{"bow_and_arrow":"query.has_target"}]}}},"controller.animation.hs.humanoid.brandish_spear":{"initial_state":"default","states":{"brandish_spear":{"animations":["brandish_spear"],"transitions":[{"default":"!variable.is_brandishing_spear"}]},"default":{"transitions":[{"brandish_spear":"variable.is_brandishing_spear"}]}}},"controller.animation.hs.humanoid.charging":{"initial_state":"default","states":{"charging":{"animations":["charging"],"transitions":[{"default":"!query.is_charging"}]},"default":{"transitions":[{"charging":"query.is_charging"}]}}},"controller.animation.hs.humanoid.damage_nearby_mobs":{"initial_state":"default","states":{"damage_nearby_mobs":{"animations":["damage_nearby_mobs"],"transitions":[{"default":"!variable.damage_nearby_mobs"}]},"default":{"transitions":[{"damage_nearby_mobs":"variable.damage_nearby_mobs"}]}}},"controller.animation.hs.humanoid.holding":{"initial_state":"default","states":{"default":{"animations":["holding"]}}},"controller.animation.hs.humanoid.look_at_target":{"initial_state":"default","states":{"default":{"animations":["look_at_target_default"],"transitions":[{"gliding":"query.is_gliding"},{"swimming":"query.is_swimming"}]},"gliding":{"animations":["look_at_target_gliding"],"transitions":[{"swimming":"query.is_swimming"},{"default":"!query.is_gliding"}]},"swimming":{"animations":["look_at_target_swimming"],"transitions":[{"gliding":"query.is_gliding"},{"default":"!query.is_swimming"}]}}},"controller.animation.hs.humanoid.move":{"initial_state":"default","states":{"default":{"animations":["move"]}}},"controller.animation.hs.humanoid.riding":{"initial_state":"default","states":{"default":{"transitions":[{"riding":"query.is_riding"}]},"riding":{"animations":["riding.arms","riding.legs"],"transitions":[{"default":"!query.is_riding"}]}}},"controller.animation.hs.humanoid.sneaking":{"initial_state":"default","states":{"default":{"transitions":[{"sneaking":"query.is_sneaking"}]},"sneaking":{"animations":["sneaking"],"transitions":[{"default":"!query.is_sneaking"}]}}},"controller.animation.hs.humanoid.swimming":{"initial_state":"default","states":{"default":{"transitions":[{"swimming":"variable.swim_amount > 0.0"}]},"swimming":{"animations":["swimming"],"transitions":[{"default":"variable.swim_amount <= 0.0"}]}}},"controller.animation.hs.humanoid.use_item_progress":{"initial_state":"default","states":{"default":{"transitions":[{"use_item_progress":"( variable.use_item_interval_progress > 0.0 ) || ( variable.use_item_startup_progress > 0.0 )"}]},"use_item_progress":{"animations":["use_item_progress"],"transitions":[{"default":"( variable.use_item_interval_progress <= 0.0 ) && ( variable.use_item_startup_progress <= 0.0 )"}]}}}}}')}};