import React from "react"

import loadGoals from "@services/hexbingo"

class BingoGameSelector extends React.Component {
  render() {
    return (
      <select id="bingogame" onChange={() => loadGoals()}>
        <option value="botw-mount.js">Breath of the Wild [Mount]</option>
        <option value="botw-hunt.js">Breath of the Wild [Hunt]</option>
        <option value="botw-gp.js">Breath of the Wild [Great Plateau]</option>
        <option value="botw-cute.js">Breath of the Wild [Cute]</option>
        <option value="botw.js">Breath of the Wild</option>
        <option value="pkmn-snap.js">Pokémon Snap</option>
        <option value="banjo-tooie.js">Banjo-Tooie</option>
        <option value="battleblock.js">BattleBlock Theater</option>
        <option value="celeste.js">Celeste</option>
        <option value="dark-souls.js">Dark Souls</option>
        <option value="dead-cells.js">Dead Cells</option>
        <option value="dk64.js">Donkey Kong 64</option>
        <option value="ff1.js">Final Fantasy 1</option>
        <option value="harry-potter-2.js">Harry Potter 2</option>
        <option value="hat-in-time.js">A Hat in Time</option>
        <option value="jak-and-daxter.js">Jak and Daxter</option>
        <option value="loz-mm.js">Majora's Mask</option>
        <option value="mmnt.js">Mega Man Network Transmission</option>
        <option value="metroid-zm.js">Metroid: Zero Mission</option>
        <option value="minecraft.js">Minecraft</option>
        <option value="pkmn-redblue.js">Pokémon: Red / Blue</option>
        <option value="pkmn-crystal.js">Pokémon: Crystal</option>
        <option value="pkmn-rubysapphire.js">Pokémon: Ruby / Sapphire</option>
        <option value="pkmn-emerald-rando.js">
          Pokémon: Emerald [Randomizer]
        </option>
        <option value="pkmn-platinum.js">Pokémon: Platinum</option>
        <option value="pkmn-lets-go.js">Pokémon Lets Go!</option>
        <option value="rogue-legacy.js">Rogue Legacy</option>
        <option value="loz-ss.js">Skyward Sword</option>
        <option value="sadx.js">Sonic Adventure</option>
        <option value="sa2b.js">Sonic Adventure 2 Battle</option>
        <option value="sa2b-hero.js">
          Sonic Adventure 2 Battle: Hero Story
        </option>
        <option value="sa2b-dark.js">
          Sonic Adventure 2 Battle: Dark Story
        </option>
        <option value="spelunky.js">Spelunky</option>
        <option value="smw.js">Super Mario World</option>
        <option value="sm64.js">Super Mario 64</option>
        <option value="sms.js">Super Mario Sunshine</option>
        <option value="smo.js">Super Mario Odyssey</option>
        <option value="smo-all-kingdoms.js">
          Super Mario Odyssey [All Kingdoms]
        </option>
        <option value="smm2.js">Super Mario Maker 2</option>
        <option value="sotn.js">Symphony of the Night</option>
        <option value="sotn-rando.js">
          Symphony of the Night [Randomizer]
        </option>
        <option value="super-metroid.js">Super Metroid</option>
        <option value="loz-tp.js">Twilight Princess</option>
        <option value="loz-ww.js">Wind Waker</option>
        <option value="yooka-laylee.js">Yooka Laylee</option>
        <option value="URL">URL</option>
        <option value="JSON">JSON [Goal List]</option>
      </select>
    )
  }
}

export default BingoGameSelector
