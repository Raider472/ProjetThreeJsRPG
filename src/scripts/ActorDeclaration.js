import { Monsters } from "./Actors/Monsters";
import { Hero } from "./Actors/Hero";
import { Team } from "./Actors/Team";

let teamArray = []
const zombie = new Monsters(4)
const bandit = new Monsters(3);
teamArray.push(zombie, bandit);

let teamHero = []
const rookie = new Hero(1);
const tank = new Hero(2);
const healer = new Hero(3);
teamHero.push(rookie, tank, healer);

export const teamMonsterTest = new Team(teamArray)
export const teamHeroes = new Team(teamHero)
