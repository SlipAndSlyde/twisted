class GameController
{
  constructor()
  {
    this.row = 18;
    this.col = 18;
    this.noLevels = _LEVELS.length;
    this.alpha = 1;

    this.gravity = 0.25;
    this.friction = 0.88;

    this.music = new MusicController();
    this.levels = new LevelController(this);
    this.background = new Background(this);
    this.settings = new Settings(this);
    this.player = new Player(this);

    this.end = false;
    this.freeze = false;
  }

  get tileWidth()
  {
    return canvas.width/this.row;
  }

  nextLevel()
  {
    const levels = this.levels;

    keyList[16] = false;
    keyList[88] = false;

    this.freeze = true;
    fade(this, -0.02);
    wait(() => this.alpha === 0).then(() => {
      this.init(false);
      fade(this, 0.02);
    });
  }

  updateMusic()
  {
    const music = this.music;

    music.currentMusic = music.playlist.cloud_chaser;
    music.playMusic();
  }

  displayEndScreen(firstTime = true)
  {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if(firstTime)
    {
      this.alpha = 0;
      fade(this, 0.02);
    }

    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.drawImage(img.thumbnail, 0, 0, canvas.width, canvas.height);
    ctx.restore();

    window.requestAnimationFrame(() => {
      this.displayEndScreen(false);
    });
  }

  init(tick = true)
  {
    const levels = this.levels;
    const player = this.player;
    const background = this.background;
    this.freeze = false;

    this.end = levels.nextLevel();
    if(this.end)
    {
      this.displayEndScreen();
    } else
    {
      player.init();
      if(tick)
      {
        background.createCloud();
        this.tick();
      }
    }
  }

  tick()
  {
    let tick = true;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const music = this.music;
    const levels = this.levels;
    const background = this.background;
    const settings = this.settings;
    const player = this.player;

    this.background.draw();
    this.updateMusic();

    if(!this.freeze)
    {
      levels.tick();
      if(player.alive) player.tick();
    }
    levels.draw();
    player.draw();
    settings.tick();

    if(keyList[16] && keyList[88]) this.nextLevel();

    cursor.tick();
    music.tick();

    if(this.end) tick = false;

    if(tick)
    {
      window.requestAnimationFrame(() => {
        this.tick();
      });
    }
  }

}
