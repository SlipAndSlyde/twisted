class LevelController
{
  constructor(game)
  {
    this.game = game;

    this.level = 0;
    this.alpha = 1;
    this.blocks = [];
    this.enemies = [];
  }

  initBlocks()
  {
    const game = this.game;

    this.blocks = [];
    this.enemies = [];

    _LEVELS[this.level - 1].forEach((row, j) => {
      row.forEach((slot, i) => {
        let x = i * game.tileWidth;
        let y = j * game.tileWidth;

        if(slot >= 1 && slot <= a) this.blocks.push(new Block(x, y, game.tileWidth, this.alpha, "BLOCK", slot-1, this.game));
        if(slot === c) this.blocks.push(new Block(x, y, game.tileWidth, this.alpha, "FINISH", 0, this.game));
        if(slot >= d && slot <= e) this.blocks.push(new Spike(x, y, game.tileWidth, this.alpha, "SPIKE", slot-d, this.game));
        if(slot >= f && slot <= g) this.blocks.push(new Lava(x, y, game.tileWidth, this.alpha, "LAVA", slot-f, this.game));
      });
    });
  }

  nextLevel()
  {
    const game = this.game;

    let endReached = false;
    if(this.level < game.noLevels)
    {
      this.level++;
      this.initBlocks();
    } else
    {
      endReached = true;
    }
    return endReached;
  }

  tick()
  {
    //enemies will tick
  }

  draw()
  {
    this.blocks.forEach((block) => {
      block.draw();
    });
  }
}
