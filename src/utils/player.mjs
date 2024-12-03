class Player {
  constructor(name, health) {
    this.name = name;
    this.health = health;
  }
  takeDamage(damage) {
    this.health -= damage;
    if (this.health < 0) this.health = 0;
  }
  basicAttack() {
    return this.attack;
  }
  // Utility method to display character stats (useful for debugging or gameplay)
  displayStats() {
    return `${this.name} - Health: ${this.health}, Attack: ${this.attack}`;
  }
}
export default Player;
