import * as THREE from "three";

const spriteSheetMilitary1 = "/assets/game_assets/timefantasy_characters/sheets/military1.png";
const spriteSheetCharacter2 = "/assets/game_assets/timefantasy_characters/sheets/chara2.png";
const spriteSheetCharacter4 = "/assets/game_assets/timefantasy_characters/sheets/chara4.png";
const spriteSheetCharacter5 = "/assets/game_assets/timefantasy_characters/sheets/chara5.png";
const spriteSheetZombie = "/sprite/Zombie.png";
const spriteSheetBaseAttack = "/assets/game_assets/combat_effects/base_attack/rpg_maker_vx_attack_5.png";
const spriteSheetChargeAttack = "/assets/game_assets/combat_effects/charge_attack/rpg_maker_mv_stick_special_1.png";
const spriteSheetShieldAppear = "/assets/game_assets/combat_effects/shield_appear/btleffect_fantasy_1_74.png";
const spriteSheetShieldBroken = "/assets/game_assets/combat_effects/shield_broken/btleffect_fantasy_1_75.png";
const spriteSheetHealState = "/assets/game_assets/combat_effects/heal_state/rpg_maker_mv_recovery_1.png";
const spriteSheetPoisonState = "/assets/game_assets/combat_effects/poison_state/rpg_maker_vx_state_1.png";
const spriteSheetArrowHurt = "/assets/game_assets/combat_effects/arrow_hurt/rpg_maker_mv_holy_1.png";

export const mapsCrossReferenceHeroCombat = {
    entities: [
        {
            id: 1, name: "Leon, the Rookie Knight", path: spriteSheetMilitary1, idle: [27, 28, 29], horiTile: 12, vertiTile: 8 
        },
        {
            id: 2, name: "Edvard", path: spriteSheetMilitary1, idle: [75, 76, 77], horiTile: 12, vertiTile: 8 
        },
        {
            id: 3, name: "Average Herbalist", path: spriteSheetCharacter2, idle: [33, 34, 35], horiTile: 12, vertiTile: 8 
        },
        {
            id: 4, name: "Archer", path: spriteSheetCharacter2, idle: [30, 31, 32], horiTile: 12, vertiTile: 8 
        },
    ]
}

export const mapsCrossReferenceMonsterCombat = {
    entities: [
        {
            id: 1, name: "Goblin", path: spriteSheetCharacter5, idleWorld:[57, 58, 59], idle: [69, 70, 71], horiTile: 12, vertiTile: 8 
        },
        {
            id: 3, name: "Bandit", path: spriteSheetCharacter5, idleWorld:[9, 10, 11], idle: [21, 22, 23], horiTile: 12, vertiTile: 8 
        },
        {
            id: 4, name: "Zombies", path: spriteSheetZombie, idleWorld:[0, 1, 2, 3], idle: [0, 1, 2, 3], horiTile: 4, vertiTile: 4 
        },
        {
            id: 5, name: "Marauder", path: spriteSheetCharacter5, idleWorld:[51, 52, 53], idle: [63, 64, 65], horiTile: 12, vertiTile: 8 
        },
        {
            id: 6, name: "Barbarian", path: spriteSheetCharacter5, idleWorld:[0, 1, 2], idle: [12, 13, 14], horiTile: 12, vertiTile: 8 
        },
        {
            id: 7, name: "Cultist", path: spriteSheetCharacter5, idleWorld:[54, 55, 56], idle: [66, 67, 68], horiTile: 12, vertiTile: 8 
        },
        {
            id: 8, name: "Chief Cultist", path: spriteSheetCharacter4, idleWorld:[48, 49, 50], idle: [60, 61, 62], horiTile: 12, vertiTile: 8 
        },
        {
            id: 9, name: "Champion of Chaos", path: spriteSheetCharacter4, idleWorld:[57, 58, 59], idle: [69, 70, 71], horiTile: 12, vertiTile: 8 
        }
    ]
}

export const mapsCrossReferenceCombatEffects = {
    entities : [
        { 
            id: 1, name: "Base Attack", path: spriteSheetBaseAttack, idle: [0, 1, 2, 3, 4, 5, 6], horiTile: 5, vertiTile: 2, attack_id: "0"
        }, 
        {
            id: 2, name: "Shield Appear", path: spriteSheetShieldAppear, idle: [0, 0, 1, 1, 2, 2, 2, 2], horiTile: 4, vertiTile: 1.9, attack_id: "06C"
        }, 
        {
            id: 3, name: "Shield Broken", path: spriteSheetShieldBroken, idle: [0, 1, 3, 8, 9, 10, 11], horiTile: 4, vertiTile: 3.2, attack_id: "06C"
        }, 
        {
            id: 4, name: "Charge Attack", path: spriteSheetChargeAttack, idle: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], horiTile: 5, vertiTile: 2, attack_id: "01C"
        }, 
        {
            id: 5, name: "Arrow Hurt", path: spriteSheetArrowHurt , idle: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27], horiTile: 5, vertiTile: 6, attack_id: "02C"
        }, 
        {
            id: 6, name: " One Heal", path: spriteSheetHealState, idle: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30], horiTile: 5, vertiTile: 6, attack_id: "03C"
        },
        {
            id: 7, name: "All Heal", path: spriteSheetPoisonState, idle: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30], horiTile: 5, vertiTile: 3, attack_id: "04C"
        },
        {
            id: 8, name: "Poison State", path: spriteSheetPoisonState, idle: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16], horiTile: 5, vertiTile: 3, attack_id: ""
        } 
    ]
}