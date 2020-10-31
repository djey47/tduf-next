## Raw notes

struct size: 288(10)

LAY end: 0x24c80 <> 150656

LAY start: 0x20 <> 32

LAY size: 0x24c60 <> 150624

LAY count: 150624/288 = 523(10) <> 0x20b

## TDU WorldEditor algorithms

- Heightmaps files not supported ?!

### Std parsing
- GOTO to 'MATA' section (search hex value)
- GOTO 24bytes (from current)
- READ item_size2_bytes = 592
- COMPUTE (item_size2_bytes - 16) / 16 = 36, material_count
- FOR material_count TIMES:
	- STORE current_position_1
	- READ h
	- READ material_address
	- GOTO material_address + 39 = 25415 (from start)
	- READ 1byte, alpha
	- READ 1byte, saturation1
	- READ 1byte, saturation2
	- STORE current position
	- GOTO 118  = 25536 (from current)
	- READ 4x4bytes (float), ambient1-4
	- READ 4x4bytes (float), diffuse1-4
	- READ 4x4bytes (float), specular1-4
	- GOTO 16 (from current)
	- READ 4bytes (integer), parameter_address = 12560
	- GOTO parameter_address + 16 (from start)
	- READ 64bytes, shader_configuration
		[Match with MaterialPieces reference -> shader string]
	- READ 4bytes (int), settings_count
	- READ 4bytes (int), layer_address
	- IF settings_count > 0
		- IF layer_address = 0
			- GOTO 36bytes (from current)
			- READ 4bytes (int), layer_address
		- ELSE
			- GOTO 8bytes (from current)
			- FOR settings_count TIMES
				- READ 4bytes (int), id
				- READ 4bytes (int), unk1
				- READ 4bytes (int), unk2
				- READ 4bytes (int), unk3
		- READ 4bytes (float), reflection_layer_scale1
		- READ 4bytes (float), reflection_layer_scale2
	- GOTO layer_address + 28 (from start)
	- READ 2bytes (integer), layers_count
	- GOTO 2bytes (from current)
	- FOR layers_count TIMES
		- READ 8bytes (string), layer_name
		- READ 8bytes (string), texture_file
		- GOTO 8bytes (from current)
		- READ 4x1byte, flag1-4
		- READ 4bytes (int), anim_settings_address
		- IF anim_settings_address != 0
			- STORE current_position_2
			- GOTO anim_settings_address + 20 (from start)
			- READ bytes (int), anim_address
			- GOTO anim_address (from start)
			- READ 8bytes (string), animation_hash
			- RESTORE current_position_2
	- RESTORE current_position_1
	- GOTO 16bytes (from current)


### Helper: isHeightmap?
- GOTO 'HASH' subsection of 'MATA' section (hex search)
- GOTO 4bytes (from current)
- READ 4bytes, size2_bytes
- COMPUTE (size2_bytes - 16) / 16, hashes_count
- IF hashes_count != 1 -> isHeightmap false
- GOTO 4bytes (from current)


## TDUF Parsing

### Reader

Command sample:

    FileTool jsonify -i "/home/djey/apps/tdu/Euro/Bnk/Vehicules/2_246_Dino_GT.bnk-unpacked/4Build/PC/EURO/Vehicules/Cars/Ferrari/246_Dino_GT/246_Dino_GT.2DM" -s "/home/djey/dev/java/tduf/lib-unlimited/src/main/resources/files/structures/2DM-map.json" -n

### Writer

Command sample:

    FileTool applyjson -i "/home/djey/apps/tdu/Euro/Bnk/Vehicules/2_246_Dino_GT.bnk-unpacked/4Build/PC/EURO/Vehicules/Cars/Ferrari/246_Dino_GT/246_Dino_GT.2DM.json" -o "/home/djey/apps/tdu/Euro/Bnk/Vehicules/2_246_Dino_GT.bnk-unpacked/4Build/PC/EURO/Vehicules/Cars/Ferrari/246_Dino_GT/246_Dino_GT.TDUF.2DM" -s "/home/djey/dev/java/tduf/lib-unlimited/src/main/resources/files/structures/2DM-map.json" -n

## Meta structure

Here is the meta structure I've seen:

A file mainly contains lists of layer groups, materials, parameters.

- Into list of materials, each one having a hash (name) linked to a material instance further (=> LINK1)

- Material instance has many settings (with most of one unknown), currently supported : alpha (1 byte), saturation (2x 1byte), ambient (4x 4bytes), diffuse(4x 4bytes) , specular(4x 4bytes), other(4x 4bytes)  (4x floating point numbers).  And a material instance has some other parameters stored in other part of the file ( => LINK2)

- Into parameter list, each item has its own shader configuration (64 bytes), which can be retrieved thanks to Speeder source files (World Editor::MaterialPieces.cs). And a link to one of the available layer groups (=> LINK3)

- Each layer group contains an amount of layers (up to 8). Each layer having its name, an optional texture file, 4 obscure settings flags, some animation settings held in another part of the file => LINK4). Sadly, I have not encountered any 2DM file with anim settings yet...

And a variable amount of sub settings, we don't know much about (subId, unk1, unk2, unk3, you noticed on first sampling).