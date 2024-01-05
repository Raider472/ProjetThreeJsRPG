import { Monsters } from "../Actors/Monsters";
import { Hero } from "../Actors/Hero";
import { Team } from "../Actors/Team";

let teamArray = []

//Test Hero
let teamHero = []
const rookie = new Hero(1);
const tank = new Hero(2);
const healer = new Hero(3);
const archer = new Hero(4);
teamHero.push(rookie, tank, healer, archer);

//Monster Desert Map
const zombieDesert = new Monsters(4);
const zombieDesert2 = new Monsters(4);
const banditDesert = new Monsters(3);
const marauderDesert = new Monsters(5);
teamArray.push(zombieDesert, banditDesert, zombieDesert2, marauderDesert);

export const teamMonsterTest = new Team(teamArray)
export const teamMonstersDesert = {
    
}
export const teamHeroes = new Team(teamHero)
