import * as fs from 'fs';

async function run() {
	/*---------------- Create and define firework ----------------*/
	const entity = await import('./assets/fireworks_rocket.json');
	const animation_controller = await import('./assets/fireworks_rocket.animation_controller.json');

	/*----------------         Parse Config       ----------------*/
	const config = JSON.parse(fs.readFileSync('data/firework_rockets/config.json', 'utf-8'));
	const firework_keys = Object.keys(config);
	for (let i = 0; i < firework_keys.length; i++) {
		const key = firework_keys[i];
		const value = config[key];

		//console.log("> Creating Firework: " + key);

		const time = value.power;

		if (time === undefined) {
			console.warn(key + " is missing time object, skipping...");
			continue;
		}

		(entity['minecraft:entity'].component_groups as any)[key] = {
			"minecraft:timer": {
				"time": time,
				"looping": false,
				"time_down_event": {
					"event": "fg:detonate"
				}
			},
			"minecraft:variant": {
				"value": i
			}
		};

		(entity['minecraft:entity'].events as any)[key] = {
			"add": {
				"component_groups": [
					key
				]
			}
		};

		if ((value.random_weight === undefined ? 1 : value.random_weight) !== 0){
			(entity['minecraft:entity'].events['fg:random'].randomize as {}[]).push(
				{
					"trigger": key,
					"weight": (value.random_weight === undefined ? 1 : value.random_weight)
				}
			);
		}

		const substringKey = key.substring(key.lastIndexOf(":") + 1, key.length);
		(animation_controller.animation_controllers['controller.animation.fireworks_rocket'].states.default.transitions as any).push(
			{
				[substringKey]: "q.is_baby && q.variant == " + i
			}
		);

		const colors: string[] = (typeof value.color === "string" ? [value.color] : value.color);

		const on_entry: string[] = [
			"/playsound firework.blast @a ~~~"
		];

		const has_fade = value.fade !== undefined;
		const trail = (value.trail !== undefined ? (value.trail as boolean) : false);
		fs.mkdirSync('RP/particles/firework_effects/' + substringKey, {recursive:true});

		for (let j = 0; j < colors.length; j++){
			const color = colors[j];
			const color_code = hexToRgb(parseColor(color));

			// Number of flash
			if (trail){
				for (let k = 0; k < 5; k++){
					const blast_effect = await import('./assets/fireworks_rocket_blast_trail.json');
					blast_effect.particle_effect.description.identifier = key + "_blast_" + j + k;
					blast_effect.particle_effect.components['minecraft:particle_initial_speed'] = (k + 3) * .5
					blast_effect.particle_effect.components['minecraft:emitter_rate_instant'].num_particles = (100 / colors.length);
					on_entry.push("/particle " + key + "_blast_" + j + k + " ~~~");
				
					if (has_fade){
						const fade: string[] = (typeof value.fade === "string" ? [value.fade] : value.fade);
						(blast_effect.particle_effect.components['minecraft:particle_appearance_tinting'].color as any) = {
							interpolant: "(v.particle_age / v.particle_lifetime)",
							gradient: {
								"0.0": parseColor(color),
								"1.0": parseColor(fade[j%fade.length])
							}
						};
					}
					else {
						blast_effect.particle_effect.components['minecraft:particle_appearance_tinting'].color = [
							(color_code!.r / 250),
							(color_code!.g/ 250),
							(color_code!.b / 250),
							1
						];
					}
					fs.writeFileSync('RP/particles/firework_effects/' + substringKey + '/blast' + j + k + '.particle.json', JSON.stringify(blast_effect, null, 4));
				}
			}else {
				const blast_effect = await import('./assets/fireworks_rocket_blast.json');
				blast_effect.particle_effect.description.identifier = key + "_blast_" + j;

				// Firework blast count should stay at 100
				blast_effect.particle_effect.components['minecraft:emitter_rate_instant'].num_particles = (100 / colors.length);
				
				if (has_fade){
					const fade: string[] = (typeof value.fade === "string" ? [value.fade] : value.fade);
					(blast_effect.particle_effect.components['minecraft:particle_appearance_tinting'].color as any) = {
						interpolant: "(v.particle_age / v.particle_lifetime)",
						gradient: {
							"0.0": parseColor(color),
							"1.0": parseColor(fade[j%fade.length])
						}
					};
				}
				else {
					blast_effect.particle_effect.components['minecraft:particle_appearance_tinting'].color = [
						(color_code!.r / 250),
						(color_code!.g/ 250),
						(color_code!.b / 250),
						1
					];
				}
				on_entry.push("/particle " + key + "_blast_" + j + " ~~~");
				fs.writeFileSync('RP/particles/firework_effects/' + substringKey + '/blast' + j + '.particle.json', JSON.stringify(blast_effect, null, 4));
			}

			const flash_effect = await import('./assets/fireworks_rocket_flash.json');
			flash_effect.particle_effect.description.identifier = key + "_flash_" + j;

			on_entry.push("/particle " + key + "_flash_" + j + " ~~~");

			flash_effect.particle_effect.components['minecraft:particle_appearance_tinting'].color = [
				(color_code!.r / 250),
				(color_code!.g/ 250),
				(color_code!.b / 250),
				"Math.clamp(variable.alpha, 0, 1)"
			];

			fs.writeFileSync('RP/particles/firework_effects/' + substringKey + '/flash' + j + '.particle.json', JSON.stringify(flash_effect, null, 4));
		}

		on_entry.push("/kill @s");

		(animation_controller.animation_controllers['controller.animation.fireworks_rocket'].states as any)[substringKey] = {
			"on_entry": on_entry
		}
	}

	/*----------------          Write Files       ----------------*/
	fs.mkdirSync('BP/entities', { recursive: true });
	fs.mkdirSync('BP/animation_controllers', { recursive: true });

	fs.writeFileSync('BP/entities/fireworks_rocket.bpe.json', JSON.stringify(entity, null, 4));
	fs.writeFileSync('BP/animation_controllers/fireworks_rocket.bpac.json', JSON.stringify(animation_controller, null, 4));
}

type effect = {
	color_mode: string;
	color: string;
}

function componentToHex(c: number) {
	var hex = c.toString(16);
	return hex.length == 1 ? "0" + hex : hex;
  }
  
function rgbToHex(r: number, g: number, b: number) {
	return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function parseColor(value: string) {
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

function hexToRgb(hex: string) {
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? {
		r: parseInt(result[1], 16),
		g: parseInt(result[2], 16),
		b: parseInt(result[3], 16)
	} : null;
}

run();