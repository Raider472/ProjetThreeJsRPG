import { Monsters } from "./Actors/Monsters";
import { Hero } from "./Actors/Hero";
import { Team } from "./Actors/Team";

let teamArray = []
const zombie = new Monsters(4)
teamArray.push(zombie);

let teamHero = []
const rookie = new Hero(1)
teamHero.push(rookie)

export const teamMonsterTest = new Team(teamArray)
export const teamHeroes = new Team(teamHero)
