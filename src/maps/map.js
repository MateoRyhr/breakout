export default class Map{

  maps = [
    [
      [1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,1]
    ],
    [
      [0,1,1,1,1,1,1,0],
      [0,1,0,0,0,0,1,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,1,1,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,1,1,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,1,0,0,0,0,1,0],
      [0,1,1,1,1,1,1,0]
    ],
    [
      [0],
      [0],
      [1,1,1,1,1,1,1,1],
      [1,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,1],
      [1,1,1,1,1,1,1,1],
    ],
    [
      [0],
      [0],
      [0],
      [0,1,1,1,1,1,1,0],
      [0,1,1,1,1,1,1,0],
      [0,1,1,1,1,1,1,0],
    ],
    [
      [1,1,1,1,1,1,1,1],
      [0],
      [0],
      [1,1,1,1,1,1,1,1],
      [0],
      [0],
      [1,1,1,1,1,1,1,1],
      [0],
      [0],
      [1,1,1,1,1,1,1,1],
    ],
    [
      [1,1,1,1,1,1,1,1],
      [1,0,1,0,0,1,0,1],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [1,1,1,1,1,1,1,1],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [1,1,1,1,1,1,1,1],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [1,0,1,0,0,1,0,1],
      [1,1,1,1,1,1,1,1],
    ]
  ]

  constructor(ui,blockConstructor){
    this.blockWidth = ui.gameWidth * 0.125
    this.blockHeight = ui.gameWidth * 0.04

    this.ballWidth = ui.gameWidth * 0.04
    this.ballHeight = ui.gameWidth * 0.04

    this.playerWidth = ui.gameWidth * 0.25
    this.playerHeight = ui.gameWidth * 0.04

    this.playerXi = (ui.gameWidth - this.playerWidth) / 2
    this.playerYi = ui.gameHeight - this.playerHeight

    this.ballXi = ui.gameWidth / 2
    this.ballYi = ui.gameHeight - this.playerHeight - this.ballHeight/2

    this.rightWall = new blockConstructor(ui.gameWidth, 0, 0, ui.gameHeight, '');
    this.upWall = new blockConstructor(0, 0, ui.gameWidth, 0, '');
    this.leftWall = new blockConstructor(0, 0, 0, ui.gameHeight, '');
  }

  // la funcion crear nivel recibe una matriz que representa la posicion de los bloques
  createLevel(m,data,blockConstructor,ballConstructor){
    this.blocks = new Array()
    let randomPalette = data.blockColors[Math.floor(Math.random()*data.blockColors.length)]
    for (let i = 0; i < m.length; i++) {
      //colo aleatorio para cada fila
      for (let j = 0; j < m[i].length; j++) {
        if(m[i][j]){
          this.blocks.push(new blockConstructor(
            this.blockWidth * j,
            this.blockHeight * i,
            this.blockWidth,
            this.blockHeight,
            randomPalette[i]
            // color aleatorio para cada bloque
            //data.blockColors[Math.floor(Math.random()*6)]
          ))
        }
      }
    }

    this.blockPlayer = new blockConstructor(
      this.playerXi,
      this.playerYi,
      this.playerWidth,
      this.playerHeight,
      data.playerColor
    )

    this.ball = new ballConstructor(
      this.ballXi,
      this.ballYi,
      this.ballWidth,
      this.ballHeight,
      data.ballColor
    )
  }

  drawMap(ctx){
    this.blocks.forEach(block => {
      if(block){
        block.draw(ctx)
      }
    });
  }
}