TDU SPOTS
=========

## Questions
- What is the role of MSSDB.bin? Looks like it can be deleted without issues...
	Is it kind of reference file for development?
- Are spots reserved on Level files ? In Area-x-y.bnk
- There are 7 car wash (ECW) spots... what's disabling them ? Missing in per sector file?
- Tire rack present in database but not visible... missing files?
- 10 car rental spots in database but only 8 visible .... ?
- Find all values for spotType / spotSubType
- Are per sector spots required to display on map?
- Thumbnails : packed file directory and names matter??

## Files

### SPOT DATABASE
Euro/Bnk/Database/MSSDB.bin => unused?

Euro/Bnk/Level/Hawai/HawaiSpt.bnk => WIP
Contains .spt files

#### Global
Root: Hawai.spt, binary file for spot info on map

	+ spotIdentifier: 8 bytes STRING, e.g {sv_8H_9 read, ECD_8H_9602 real => 602 put at the beginning
```		E 69d
		C 67d
		D 68d
		+
		6 54d
		0 48d
		2 50d
		=
		{ 123d	
		s 115d
		v 118d
```

	+ spotEntry: 64 bytes

_Attempt to duplicate a car rental : ECR_7873 to ECR_7874 (id |vR_A_78 to |wR_A_78)_
* headerEntryZoneSizePlus16 : added 64 => 30736 to 30800
* added front end all res spot logo: ECR_7874.bnk
* no interior nor exterior additional files required
* added database entry for shop, cloned the ECR_7873 with new resources

=> Failed but game did not crash, maybe missing in sector file (need to find right one)

_Attempt to enable car wash ECW_A_4417_

=> Failed but no crash, maybe missing in sector file (need to find right one)

_Attempt to change Japan Auto Parts Tuner to tire rack files (eam_o)_
* EAM_I_5677 => EAM_O_9757 in shops database and spot database

=> Changed tuner, but unable to enter because of invalid brand combination... try with just replacing files ...

#### Per sector
Sector-w-x-y-z.spt, binary file for spot info when cruising
* Spot entry: 240 bytes

### ICONS

Euro/Bnk/FrontEnd/AllRes/LogoTexturePage.bnk => map icons

### THUMBS

* Euro/Bnk/FrontEnd/AllRes/SpotsScr.bnk => default map thumbnail
* Euro/Bnk/FrontEnd/AllRes/MapScreens/ExtraChallenges/CV_XX.bnk => convoy mission map thumbnail
* Euro/Bnk/FrontEnd/AllRes/MapScreens/ExtraChallenges/HH_XX.bnk => hitchhiker mission map thumbnail
* Euro/Bnk/FrontEnd/AllRes/MapScreens/ExtraChallenges/SG_XX.bnk => top model mission map thumbnail
* Euro/Bnk/FrontEnd/AllRes/MapScreens/ExtraChallenges/TP_XX.bnk => delivery mission map thumbnail
* Euro/Bnk/FrontEnd/AllRes/MapScreens/IGE/*.bnk => challenges map thumbnails
* Euro/Bnk/FrontEnd/AllRes/MapScreens/Spots/ECD_XX_YYYY.bnk => dealer spot map thumbnail
* Euro/Bnk/FrontEnd/AllRes/MapScreens/Spots/EBD_XX_YYYY.bnk => bike dealer spot map thumbnail
* Euro/Bnk/FrontEnd/AllRes/MapScreens/Spots/IAM_X_YYYY.bnk => aftermarket spot map thumbnail
* Euro/Bnk/FrontEnd/AllRes/MapScreens/Spots/ECR_X_YYYY.bnk => car rental spot map thumbnail
* Euro/Bnk/FrontEnd/AllRes/MapScreens/Spots/ECP_X_YYYY.bnk => car paint spot map thumbnail
* Euro/Bnk/FrontEnd/AllRes/MapScreens/Spots/EAS_X_YYYY.bnk => avatar shop spot map thumbnail
* Euro/Bnk/FrontEnd/AllRes/MapScreens/Spots/EPH_XXX_YYYY.bnk => player house spot map thumbnail
* Euro/Bnk/FrontEnd/AllRes/MapScreens/Spots/ERE_X_YYYY.bnk => real estate spot map thumbnail
* Euro/Bnk/FrontEnd/AllRes/MapScreens/Spots/ECH_X_YYYY.bnk => player house spot map thumbnail
* Euro/Bnk/FrontEnd/AllRes/MapScreens/Spots/EDI_X_YYYY.bnk => Liza's Diner spot map thumbnail
* Euro/Bnk/FrontEnd/AllRes/RealtoScr/EPH_XXX_YYYY.bnk => player house real estate thumbnails (exterior, living, garage)

### 3D MODELS

* Euro/Bnk/Level/Hawai/Spots/ecd_XX.bnk => dealer exterior 3D
* Euro/Bnk/Interior/icd_XX.bnk => dealer interior 3D

* Euro/Bnk/Level/Hawai/Spots/ebd_XX.bnk => bike dealer exterior 3D
* Euro/Bnk/Interior/ibd_XX.bnk => bike dealer interior 3D

* Euro/Bnk/Level/Hawai/Spots/eam_X.bnk => aftermarket exterior 3D
* Euro/Bnk/Interior/iam_X.bnk => aftermarket interior 3D

* Euro/Bnk/Level/Hawai/Spots/ecr_X.bnk => car rental exterior 3D
* Euro/Bnk/Interior/icr_X.bnk => car rental interior 3D

* Euro/Bnk/Level/Hawai/Spots/ecp_X.bnk => car paint exterior 3D
* Euro/Bnk/Interior/icp_X.bnk => car paint interior 3D

* Euro/Bnk/Level/Hawai/Spots/eas_X.bnk => avatar shop exterior 3D
* Euro/Bnk/Interior/ias_X.bnk => avatar shop interior 3D

* Euro/Bnk/Level/Hawai/Spots/eph_XXX.bnk => player house exterior 3D
* Euro/Bnk/Interior/gph_XXX.bnk => player house garage 3D
* Euro/Bnk/Interior/lph_XXX.bnk => player house living room 3D

* Euro/Bnk/Level/Hawai/Spots/ere_X.bnk => real estate exterior 3D
* Euro/Bnk/Interior/ire_X.bnk => real estate interior 3D

* Euro/Bnk/Level/Hawai/Spots/ech_X.bnk => club house exterior 3D
* Euro/Bnk/Interior/Ich_X.bnk => club house interior 3D
* Euro/Bnk/Interior/gch_X.bnk => club house garage 3D

* Euro/Bnk/Level/Hawai/Spots/ecw_X.bnk => car wash exterior 3D
* Euro/Bnk/Interior/Icw_X.bnk => car wash interior 3D (only animation?)

* Euro/Bnk/Level/Hawai/Spots/edi_X.bnk => Liza's Diner exterior 3D
* Euro/Bnk/Interior/IDI_X.bnk => Liza's Diner interior 3D

* Euro/Bnk/Interior/IDR_X.bnk => Player Dress Room interior 3D

* Euro/Bnk/Interior/IEtrade.bnk => E-Trade interior 3D

## USEFUL CLI OPS

### Read MSSDB.BIN
`FileTool.cmd jsonify -i "D:\Jeux\Test Drive Unlimited\Euro\Bnk\DataBase\MSSDB.bin" -s "D:\Utils\TDU\tduf-1.12.0\structures\BIN-spots-map.json"`

### Read/Write HawaiSpt.bnk: Hawai.spt packed file
`FileTool.cmd unpack -i "D:\Jeux\Test Drive Unlimited\Euro\Bnk\Level\Hawai\HawaiSpt.bnk"`

`FileTool.cmd jsonify -i "D:\Users\Djey\Documents\Bureau Win\En cours\SPOTS\HawaiSpt.bnk-unpacked\4Build\PC\EURO\Level\Hawai\Hawai.spt" -s "D:\Utils\TDU\tduf-1.12.0\structures\SPT-hawai-map.json"`

`FileTool applyjson -i "D:\Users\Djey\Documents\Bureau Win\En cours\SPOTS\HawaiSpt.bnk-unpacked\4Build\PC\EURO\Level\Hawai\Hawai.spt.json" -o "D:\Users\Djey\Documents\Bureau Win\En cours\SPOTS\HawaiSpt.bnk-unpacked\4Build\PC\EURO\Level\Hawai\Hawai.spt" -s "D:\Utils\TDU\tduf-1.12.0\structures\SPT-hawai-map.json"`

`FileTool.cmd repack -i "D:\Users\Djey\Documents\Bureau Win\En cours\SPOTS\HawaiSpt.bnk-unpacked" -o "D:\Jeux\Test Drive Unlimited\Euro\Bnk\Level\Hawai\HawaiSpt.bnk"
`