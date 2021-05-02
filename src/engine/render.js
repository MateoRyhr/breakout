export default class Render{
  constructor(ui){
    this.ctx = ui.canvas.getContext("2d");
  }

  draw(map,ui){
    this.ctx.clearRect(0, 0, ui.gameWidth, ui.gameHeight);
    map.drawMap(this.ctx)
    map.blockPlayer.draw(this.ctx)
    map.ball.draw(this.ctx)
  }
}