const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const V = SAT.Vector;
const P = SAT.Polygon;
const B = SAT.Box;

function wait(condition)
{
  const promise = (resolve) => {
    if(condition())
    {
      resolve();
    } else
    {
      setTimeout(() => {
        promise(resolve)
      }, 100);
    }
  }

  return new Promise(promise);
}

function fade(target, speed)
{
  let tick = true;

  target.alpha += speed;

  if(speed < 0 && target.alpha < 0)
  {
    target.alpha = 0;
    tick = false;
  }
  if(speed > 0 && target.alpha > 1)
  {
    target.alpha = 1;
    tick = false;
  }

  if(tick)
  {
    window.requestAnimationFrame(() => {
      fade(target, speed);
    });
  }
}

let keyList = [];

for(let i = 0; i < 255; i++) {
  keyList.push(false);
}

document.onkeydown = (e) => {
  keyList[event.keyCode] = true;
}

document.onkeyup = (e) => {
  keyList[event.keyCode] = false;
}

const cursor = {
  x: 0,
  y: 0,
  clicked: false,

  getHitbox: function()
  {
    return new SAT.Vector(this.x, this.y);
  },

  eventHandler: function()
  {
    window.onmousemove = (e) => {
      let pos = canvas.getBoundingClientRect();
      this.x = e.clientX - pos.left;
      this.y = e.clientY - pos.top;
    }

    canvas.onmouseup = (e) => {
      this.clicked = true;
    }
  },

  tick: function()
  {
    this.clicked = false;
  }
}

window.onload = () => {
  let clicked = false;

  canvas.onclick = () => {
    if(!clicked)
    {
      clicked = true;

      console.log("Hello world!");
      console.log("Press [SHIFT] and [x] simultaneously to skip a level");
      console.log("Music and sFx");
      console.log("Settings in a corner: when hovered over, reveals settings to mute sFx and/or music");
      console.log("Update hitbox for spike and lava tiles");
      console.log("Stop ticking when game ends");
      console.log("Add minimalistic clouds");

      const game = new GameController();
      cursor.eventHandler();
      game.init();
    }
  }
}
