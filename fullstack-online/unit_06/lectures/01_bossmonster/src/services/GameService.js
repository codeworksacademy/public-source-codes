import { AppState } from "@/AppState.js"
import Pop from "@/utils/Pop.js";

const losesTo = {
  'Fighter🪨': 'Wizard📖',
  'Ranger✂️': 'Fighter🪨',
  'Wizard📖': 'Ranger✂️'
}


class GameService {
  revive(heroName) {
    const heroToRevive = AppState.heroes.find(hero => hero.name == heroName)
    if (AppState.gold > 100) {
      heroToRevive.health = Math.round(heroToRevive.maxHealth / 2)
      AppState.gold -= 100
    }
  }
  attackBoss(heroName) {
    const attackingHero = AppState.heroes.find(hero => hero.name == heroName)
    const monster = AppState.monster
    const monsterAttack = monster.randomType
    console.log('hero', attackingHero.type);
    console.log('monster', monsterAttack);
    if (attackingHero.type == monsterAttack) {
      console.log('TIE');
      Pop.toast('TIE', 'info', 'center')
    } else if (losesTo[attackingHero.type] == monsterAttack) {
      console.log('LOSE');
      Pop.toast('LOSE', 'warning', 'center')
      attackingHero.health -= 10
    } else {
      console.log('WIN');
      Pop.toast('WIN', 'success', 'center')
      monster.health -= 25
    }

    if (monster.health <= 0) {
      AppState.gold += monster.goldDropped
      Pop.toast("Monster is dead")
      this.changeMonster()
    }
  }

  changeMonster() {
    const currentMonster = AppState.monster
    if (!currentMonster) {
      AppState.monster = AppState.allMonsters[0]
    } else {
      let index = AppState.allMonsters.indexOf(currentMonster)
      AppState.monster = AppState.allMonsters[index + 1]
    }
  }


}


export const gamesService = new GameService()
