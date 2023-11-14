import { Monsters } from "./Actors/Monsters";
import { Hero } from "./Actors/Hero";
import { Team } from "./Actors/Team";

let teamArray = []
const goblin = new Monsters(1)
const bandit = new Monsters(3);
teamArray.push(bandit);
teamArray.push(goblin);

let teamHero = []
const rookie = new Hero(1)
teamHero.push(rookie)

export const teamMonsterTest = new Team(teamArray)
export const teamHeroes = new Team(teamHero)
