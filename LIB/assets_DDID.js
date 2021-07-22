//Assets for DDD
"use strict";
console.log("%cAssets for Deep Down Into Darkness ready.", "color: orange");

var LoadTextures = [
  "Fog.png",
  "WallDG1.jpg",
  "FloorDg1.jpg",
  "BrickWall.jpg",
  "BrickWall2.jpg",
  "BrickWall3.jpg",
  "BrickWall4.jpg",
  "BrickWall5.jpg",
  "BrickWall6.jpg",
  "BrickWall7.jpg",
  "BrokenRuin.jpg",
  "DungeonFloor.jpg",
  "DungeonFloor2.jpg",
  "DungeonWall.jpg",
  "DungeonWall2.jpg",
  "DungeonWall3.jpg",
  "Grass.jpg",
  "MorgueFloor.jpg",
  "CastleWall.jpg",
  "OldWall.jpg",
  "RockFloor.jpg",
  "SlateWall.jpg",
  "StoneFloor.jpg",
  "StoneFloor2.jpg",
  "StoneFloor3.jpg",
  "StoneFloor4.jpg",
  "StoneFloor5.jpg",
  "StoneWall.jpg",
  "StoneWall2.jpg",
  "StoneWall3.jpg",
  "StoneWall3b.jpg",
  "StoneWall4.jpg",
  "StoneWall5.jpg",
  "ThatchFloor.jpg",
  "WhiteWall.jpg",
  "YellowBrick.jpg",
  "LavaWall.jpg",
  "LavaWall2.jpg",
  "TileFloor.jpg",
  "RockWall.jpg",
  "TlakFloor.jpg",
  "TlakFloor2.jpg",
  "TlakFloor3.jpg",
  "TlakFloor4.jpg",
  "TlakFloor2b.jpg",
  "TlakFloor4b.jpg",
  "BlackWall.jpg",
  "BlackWall2.jpg",
  "WhiteCeramicWall.jpg",
  "WhiteCeramicWall2.jpg",
  "BlackBrickWall.jpg",
  "BlackBrickWall2.jpg",
  "DDID_Cover.jpg"
];
var LoadSprites = [
  { srcName: "goldBarSmall.png", name: "Gold" },
  //"skull.png",
  { srcName: "skull.png", name: "Skull" },
  //{ srcName: "green.png", name: "Splash" },
  { srcName: "coins2.png", name: "Coin" },
  { srcName: "stairs_entrance.png", name: "Entrance" },
  { srcName: "stairs_open.png", name: "Exit" },
  { srcName: "door.png", name: "Door" },
  { srcName: "gate48.png", name: "Gate" },
  { srcName: "GoldKey.png", name: "GoldKeyBig" },
  { srcName: "SilverKey.png", name: "SilverKeyBig" },
  { srcName: "GoldKeySmall.png", name: "goldKey" },
  { srcName: "SilverKeySmall.png", name: "silverKey" },
  "temple.png",
  { srcName: "scroll32.png", name: "Scroll" },
  { srcName: "HalfLife.png", name: "SCR_HalfLife" },
  { srcName: "Cripple.png", name: "SCR_Cripple" },
  { srcName: "Light.png", name: "SCR_Light" },
  { srcName: "MagicBoost.png", name: "SCR_MagicBoost" },
  { srcName: "Luck.png", name: "SCR_Luck" },
  { srcName: "DrainMana.png", name: "SCR_DrainMana" },
  { srcName: "Map.png", name: "SCR_Map" },
  { srcName: "TeleportTemple.png", name: "SCR_TeleportTemple" },
  { srcName: "DestroyArmor.png", name: "SCR_DestroyArmor" },
  { srcName: "DestroyWeapon.png", name: "SCR_DestroyWeapon" },
  { srcName: "BoostArmor.png", name: "SCR_BoostArmor" },
  { srcName: "BoostWeapon.png", name: "SCR_BoostWeapon" },
  { srcName: "Invisibility.png", name: "SCR_Invisibility" },
  { srcName: "Petrify.png", name: "SCR_Petrify" },
  { srcName: "bluePotion24.png", name: "BluePotion" },
  { srcName: "potion24.png", name: "RedPotion" },
  { srcName: "chest32.png", name: "Chest" },
  { srcName: "sword4.png", name: "Sword" },
  { srcName: "shield32.png", name: "Shield" },
  { srcName: "divLineB.png", name: "LineBottom" },
  { srcName: "divLineT.png", name: "LineTop" },
  { srcName: "Mana.png", name: "Mana" },
  { srcName: "Agility.png", name: "Agility" },
  { srcName: "Magic.png", name: "Magic" },
  { srcName: "Heart.png", name: "Heart" },
  { srcName: "Lantern32.png", name: "Lamp" },
  { srcName: "grave.png", name: "Grave" }
];
var LoadSequences = [
  { srcName: "SHIP_exp", name: "ShipExp", type: "png", count: 8 },
  { srcName: "ALIEN_exp", name: "AlienExp", type: "png", count: 6 }
];
var LoadSheetSequences = [
  { srcName: "MagicOrb2.png", count: 9, name: "MagicOrb" },
  { srcName: "RedMagic.png", count: 4, name: "RedMagic" },
  { srcName: "Fizzle.png", count: 10, name: "Fizzle" }
];
var LoadSheets = [
  { srcName: "ghost1", type: "png", count: 4, name: "Ghosty" },
  { srcName: "Ghost4", type: "png", count: 4, name: "Ghost" },
  { srcName: "ghost3", type: "png", count: 4, name: "ScaryGhost" },
  { srcName: "gandalf", type: "png", count: 4, name: "Wizard" },
  { srcName: "skelly4", type: "png", count: 4, name: "ZombieGirl" },
  { srcName: "death2", type: "png", count: 4, name: "Death2" },
  { srcName: "death1", type: "png", count: 4, name: "Death" },
  { srcName: "skelly5", type: "png", count: 3, name: "BigHead" },
  { srcName: "skelly1", type: "png", count: 4, name: "Wanderer" },
  { srcName: "skeleton10", type: "png", count: 3, name: "SkeletonBoss" },
  { srcName: "CoinBoss", type: "png", count: 4, name: "Puffy" },
  { srcName: "skeleton9", type: "png", count: 4, name: "SkeletonWarrior" },
  { srcName: "dragon2", type: "png", count: 3, name: "LittleDragon" },
  { srcName: "devil", type: "png", count: 4, name: "Devil" },
  { srcName: "skeleton8", type: "png", count: 4, name: "SkeletonBoss2" },
  { srcName: "Ghost2", type: "png", count: 4, name: "UglyGhost" },
  { srcName: "zombie2", type: "png", count: 3, name: "Ghoul" },
  { srcName: "behemoth", type: "png", count: 4, name: "Behemoth" }
];
var ExtendSheetTag = [];
var LoadPacks = [
  { srcName: "KnightCoated.png", count: 4, name: "KnightCoated" },
  { srcName: "KnightSprites2.png", count: 4, name: "Knight" },
  { srcName: "KnightSpritesInvisible2.png", count: 4, name: "KnightInvisible" },
  { srcName: "Croc.png", count: 5, name: "Croc" },
  { srcName: "LittleGreenSnake.png", count: 4, name: "LittleGreenSnake" },
  { srcName: "GreenSnake.png", count: 4, name: "Snake" },
  { srcName: "PurpleSnake.png", count: 4, name: "PurpleSnake" },
  { srcName: "BlackSnake.png", count: 4, name: "BlackSnake" },
  { srcName: "Sorceress.png", count: 6, name: "Sorceress" },
  { srcName: "Scorpion.png", count: 6, name: "Scorpion" },
  { srcName: "Spiders.png", count: 6, name: "Spider" },
  { srcName: "Bony.png", count: 9, name: "Bony" },
  { srcName: "Black Wolf.png", count: 3, name: "BlackWolf" },
  { srcName: "WhiteWolf.png", count: 4, name: "WhiteWolf" },
  { srcName: "LittleSkelly.png", count: 3, name: "LittleSkelly" },
  { srcName: "Skeletona.png", count: 4, name: "Skeletona" },
  { srcName: "BlueDevil.png", count: 4, name: "BlueDevil" },
  { srcName: "Badger.png", count: 3, name: "Badger" },
  { srcName: "Fox.png", count: 4, name: "Fox" },
  { srcName: "Flamy.png", count: 4, name: "Flamy" },
  { srcName: "GreenPuffer.png", count: 4, name: "GreenPuffer" },
  { srcName: "GreenSkelly.png", count: 3, name: "GreenSkelly" },
  { srcName: "GreenZombie.png", count: 3, name: "GreenZombie" },
  { srcName: "Bat.png", count: 3, name: "Bat" },
  { srcName: "Lizzie.png", count: 3, name: "Lizzy" },
  { srcName: "Ogre.png", count: 4, name: "Ogre" },
  { srcName: "ColoredDevil.png", count: 3, name: "ColoredEvil" },
  { srcName: "Skelegoat.png", count: 3, name: "SkeleGoat" },
  { srcName: "IceBeast.png", count: 4, name: "IceBeast" },
  { srcName: "RedDragon.png", count: 3, name: "RedDragon" },
  { srcName: "JadeBat.png", count: 3, name: "JadeBat" },
  { srcName: "RedEye.png", count: 3, name: "RedEye" },
  { srcName: "Blacky.png", count: 3, name: "Blacky" },
  { srcName: "Whitey.png", count: 3, name: "Whitey" },
  { srcName: "BrownDragon.png", count: 4, name: "BrownDragon" },
  { srcName: "Hellrat.png", count: 8, name: "HellRat" },
  { srcName: "BeastKid.png", count: 3, name: "BeastKid" },
  { srcName: "GreenSpider.png", count: 3, name: "GreenSpider" }
];
var LoadRotated = [];
var LoadExtWasm = [];
var LoadAudio = [
  { srcName: "Explosion1.mp3", name: "Explosion" },
  { srcName: "Failed magic.mp3", name: "MagicFail" },
  { srcName: "Cast.mp3", name: "MagicCast" },
  { srcName: "Power up.mp3", name: "PowerUp" },
  { srcName: "Level up.mp3", name: "LevelUp" },
  { srcName: "Pick up gold.mp3", name: "Pick" },
  { srcName: "Evil laughter.mp3", name: "EvilLaughter" },
  { srcName: "Chest.mp3", name: "Chest" },
  { srcName: "Scroll.mp3", name: "Scroll" },
  { srcName: "Potion.mp3", name: "Potion" },
  { srcName: "Chirp.mp3", name: "Chirp" },
  { srcName: "OpenGate.mp3", name: "OpenGate" },
  { srcName: "Swallow.mp3", name: "Swallow" },
  { srcName: "Keys.mp3", name: "Keys" },
  { srcName: "UpStairs.mp3", name: "UpStairs" },
  { srcName: "DownStairs.mp3", name: "DownStairs" },
  { srcName: "UseScroll.mp3", name: "UseScroll" },
  { srcName: "fight.mp3", name: "Fight" },
  { srcName: "Temple.mp3", name: "Temple" },
  { srcName: "death.mp3", name: "Death" },
  { srcName: "ClosedDoor.mp3", name: "ClosedDoor" },
  { srcName: "Look Me In The Eye, Demon - LaughingSkull.mp3", name: "Title" }
];
var LoadFonts = [
  { srcName: "ArcadeClassic.ttf", name: "Arcade" },
  { srcName: "emulogic.ttf", name: "Emulogic" },
  { srcName: "Adore64.ttf", name: "Adore" },
  { srcName: "adrip.ttf", name: "Drip" }
];
var FORM_WEDGE = {
  HERO: `
    <img id = 'form_pic1'/>
    <hr>
    <span>Available points: <span id = 'hero_points'></span></span>
    <hr>
    <br/>
    <img id = 'pic_sword'/><span>Sword:&nbsp&nbsp&nbsp<span id='hero_sword'></span></span>
    <input type = 'button' value = 'Sword' id = "form_inc_weapon" class = 'form skill'/>
    <br/>
    <img id = 'pic_shield'/><span>Shield:&nbsp&nbsp<span id='hero_shield'></span></span>
    <input type = 'button' value = 'Shield' id = "form_inc_armor" class = 'form skill'/>
    <br/>
    <img id = 'pic_agility'/><span>Agility: <span id='hero_agility'></span></span>
    <input type = 'button' value = 'Agility' id = "form_inc_agility" class = 'form skill'/>
    <br/>
    <img id = 'pic_magic'/><span>Magic:&nbsp&nbsp&nbsp<span id='hero_magic'></span></span>
    <input type = 'button' value = 'Magic' id = "form_inc_magic" class = 'form skill'/>
    <br/>
    <input type = 'button' value = 'Done' id = "form_done" class = 'form' style='margin: 24px'/>
  `,
  hero: function() {
    $(SPRITE.Knight_front_0).replaceAll("#form_pic1");
    $(SPRITE.Sword)
      .replaceAll("#pic_sword")
      .css({ width: "16px", height: "16px" });
    $(SPRITE.Shield)
      .replaceAll("#pic_shield")
      .css({ width: "16px", height: "16px" });
    $(SPRITE.Agility)
      .replaceAll("#pic_agility")
      .css({ width: "16px", height: "16px" });
    $(SPRITE.Magic)
      .replaceAll("#pic_magic")
      .css({ width: "16px", height: "16px" });
    $(".skill").on("click", GAME.CLICK.manageCharacter);
    $("#form_done").on("click", GAME.charDone);
  },
  TEMPLE: `
    <img id = 'form_pic1'/>
    <input type = 'button' value = 'Sacrifice 1000 gold' id = "form_sacrifice_gold" class = 'form' style='margin: 24px'/>
    <span style = 'color: #CFB53B'>Gold: <span id = 'hero_gold' style = 'color: #CFB53B'></span></span>
    <hr>
    <span>Available points: <span id = 'hero_points'></span></span>
    <hr>
    <br/>
    <img id = 'pic_heart'/><span>Health:&nbsp&nbsp<span id='hero_vitality'></span></span>
    <input type = 'button' value = 'Health' id = "form_inc_maxHealth" class = 'form skill'/>
    <br/>
    <img id = 'pic_mana'/><span>Mana:&nbsp&nbsp&nbsp&nbsp<span id='hero_mana'></span></span>
    <input type = 'button' value = 'Mana' id = "form_inc_maxMana" class = 'form skill'/>
    <br/>
    <img id = 'pic_sword'/><span>Sword:&nbsp&nbsp&nbsp<span id='hero_sword'></span></span>
    <input type = 'button' value = 'Sword' id = "form_inc_weapon" class = 'form skill'/>
    <br/>
    <img id = 'pic_shield'/><span>Shield:&nbsp&nbsp<span id='hero_shield'></span></span>
    <input type = 'button' value = 'Shield' id = "form_inc_armor" class = 'form skill'/>
    <br/>
    <img id = 'pic_agility'/><span>Agility: <span id='hero_agility'></span></span>
    <input type = 'button' value = 'Agility' id = "form_inc_agility" class = 'form skill'/>
    <br/>
    <img id = 'pic_magic'/><span>Magic:&nbsp&nbsp&nbsp<span id='hero_magic'></span></span>
    <input type = 'button' value = 'Magic' id = "form_inc_magic" class = 'form skill'/>
    <br/>
    <input type = 'button' value = 'Leave Temple' id = "form_leavetemple" class = 'form' style='margin: 24px'/>
  `,
  temple: function() {
    $(SPRITE.Knight_front_0)
      .replaceAll("#form_pic1")
      .css({ position: "relative", top: "16px", left: "0px" });
    $("#form_sacrifice_gold").on("click", GAME.CLICK.sacrificeGold);
    $(SPRITE.Heart)
      .replaceAll("#pic_heart")
      .css({ width: "16px", height: "16px" });
    $(SPRITE.Mana)
      .replaceAll("#pic_mana")
      .css({ width: "16px", height: "16px" });
    $(SPRITE.Sword)
      .replaceAll("#pic_sword")
      .css({ width: "16px", height: "16px" });
    $(SPRITE.Shield)
      .replaceAll("#pic_shield")
      .css({ width: "16px", height: "16px" });
    $(SPRITE.Agility)
      .replaceAll("#pic_agility")
      .css({ width: "16px", height: "16px" });
    $(SPRITE.Magic)
      .replaceAll("#pic_magic")
      .css({ width: "16px", height: "16px" });
    $(".skill").on("click", GAME.CLICK.manageTemple);
    $("#form_leavetemple").on("click", GAME.leaveTemple);
  },
  FIGHT: `
    <div class='fightWindow'>
      <p id ="fight_Hero_name"></p>
      <img id = 'form_pic1'/>
      <hr>
      <p class = 'attr'>Sword: <span id='hero_sword'></span></p>
      <p class = 'attr'>Shield:&nbsp <span id='hero_shield'></span></p>
      <p class = 'attr'>Agility: <span id='hero_agility'></span></p>
      <p class = 'attr'>Health: </p>
      <div id = "hero_health" class="healthbar"></div>
      <hr>
    </div>
    <div class='fightWindow'>
      <p id = 'monsterName'>Monster</p>
      <img id = 'form_pic2'/>
      <hr class = 'rightAttr'>
      <p class = 'attr rightAttr'>Attack: <span id = "enemy_weapon"></span></p>
      <p class = 'attr rightAttr'>Armor: <span id = "enemy_armor"></span></p>
      <p class = 'attr rightAttr'>Agility: <span id = "enemy_agility"></span></p>
      <p class = 'attr rightAttr'>Health: </p>
      <div id = "enemy_health" class="healthbar rightAttr"></div>
      <hr class = 'rightAttr'>
    </div>
    <div id ="scrollPanel">
      <input type="image" id = "redPotion" src="" title = "Drink health potion"/>
      <span class = "scroll_counter" id = "count_redPotion">#</span>
      <input class="scroll" type="image" id = "SCR_BoostWeapon" src="" title = "Increase your sword skill"/>
      <span class = "scroll_counter" id = "count_BoostWeapon">#</span>
      <input class="scroll" type="image" id = "SCR_BoostArmor" src="" title = "Increase your armor"/>
      <span class = "scroll_counter" id = "count_BoostArmor">#</span>
      <input class="scroll" type="image" id = "SCR_DestroyWeapon" src="" title = "Destroy your enemy's weapon"/>
      <span class = "scroll_counter" id = "count_DestroyWeapon">#</span>
      <input class="scroll" type="image" id = "SCR_DestroyArmor" src="" title = "Destroy your enemy's armor"/>
      <span class = "scroll_counter" id = "count_DestroyArmor">#</span>
      <input class="scroll" type="image" id = "SCR_HalfLife" src="" title = "Halve your enemy's health"/>
      <span class = "scroll_counter" id = "count_HalfLife">#</span>      

    </div>
    <hr>
    <div id = "Console" style = "overflow-y: auto; height: 200px"></div>
    <hr>
    <div id = "fight_buttons" style="color: #888">
      <input type = 'button' value = 'Make Turn' id = "form_make_turn" class = 'form' style='margin: 8px' title='Click to make next turn'/>
      <input type = 'button' value = 'Flee' id = "form_flee" class = 'form' style='margin: 8px' title='Flee or die trying'/>
      <input type = 'checkbox' value = 'Quick resolve' id = "form_quick_resolve" class = 'form' style='margin: 8px; font-size: 14px' title="Don't interfere, just let it go"./>Quick resolve
      <input type = 'button' value = 'Continue' id = "form_continue" class = 'form' style='margin: 8px' disabled='true' title='Continue the adventure'/>
    </div>
  `,
  fight: function(enemy) {
    $("#fight_Hero_name").html(HERO.name);
    $(".fightWindow").css({ width: `${INI.FIGHT_PANEL_WIDTH / 2}px` });
    $("#monsterName").html(enemy.title);
    let HeroSprite = SPRITE.Knight_front_0;
    $(HeroSprite)
      .replaceAll("#form_pic1")
      .css({
        position: "relative",
        top: `2px`,
        left: `${(INI.FIGHT_PANEL_WIDTH / 2 - HeroSprite.width) / 2}px`
      });
    let enemySprite =
      SPRITE[enemy.actor.class + "_front_0"] || SPRITE[enemy.actor.class];
    let corr = Math.floor((48 - enemySprite.height) / 2);
    $(enemySprite)
      .replaceAll("#form_pic2")
      .css({
        position: "relative",
        top: `${corr + 2}px`,
        left: `${(INI.FIGHT_PANEL_WIDTH / 2 - enemySprite.width) / 2}px`
      });
    $(".rightAttr").css({ position: "relative", top: `${2 * corr}px` });
    ENGINE.addCanvas("hero_health", INI.FIGHT_PANEL_WIDTH / 2 - 10, 20);
    ENGINE.addCanvas("enemy_health", INI.FIGHT_PANEL_WIDTH / 2 - 10, 20);
    $("#SCR_BoostWeapon").attr("src", SPRITE.SCR_BoostWeapon.src);
    $("#SCR_BoostArmor").attr("src", SPRITE.SCR_BoostArmor.src);
    $("#SCR_DestroyWeapon").attr("src", SPRITE.SCR_DestroyWeapon.src);
    $("#SCR_DestroyArmor").attr("src", SPRITE.SCR_DestroyArmor.src);
    $("#SCR_HalfLife").attr("src", SPRITE.SCR_HalfLife.src);
    $("#redPotion").attr("src", SPRITE.RedPotion.src);
    $("#form_make_turn").on("click", GAME.turn);
    $("#form_continue").on("click", GAME.endFight);
    $("#redPotion").on("click", GAME.CLICK.usePotion);
    $(".scroll").on("click", GAME.CLICK.useScroll);
    $("#form_flee").on("click", GAME.fleeFight);
  }
};
