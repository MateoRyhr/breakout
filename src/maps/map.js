export default class Map{

  //10 mapas
  maps = [
    [
      [0,1,1,1,1,1,1,0],
      [0,1,0,0,0,0,1,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,1,1,0,0,0],      //    1
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,1,1,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,1,0,0,0,0,1,0],
      [0,1,1,1,1,1,1,0]
    ],
    [
      [0],
      [0,0,0,1,1,0,0,0],
      [0,0,1,0,0,1,0,0],
      [1,1,0,0,0,0,1,1],
      [0,1,0,1,1,0,1,0],      //    2
      [0,1,0,1,1,0,1,0],
      [1,1,0,0,0,0,1,1],
      [0,0,1,0,0,1,0,0],
      [0,0,0,1,1,0,0,0],
    ],
    [
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,1,1,1,1,1,1,0],
      [0,1,1,1,1,1,1,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],      //    3
      [0,0,0,0,0,0,0,0],
      [0,1,1,1,1,1,1,0],
      [0,1,1,1,1,1,1,0],
    ],
    [
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [1,1,1,1,1,1,1,1],
      [0,0,0,0,0,0,0,0],      //    4
      [0,0,0,0,0,0,0,0],
      [1,1,1,1,1,1,1,1],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [1,1,1,1,1,1,1,1],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [1,1,1,1,1,1,1,1],
    ],
    [
      [1,1,1,1,1,1,1,1],
      [1,0,1,0,0,1,0,1],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],      //    5
      [1,1,1,1,1,1,1,1],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [1,1,1,1,1,1,1,1],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [1,0,1,0,0,1,0,1],
      [1,1,1,1,1,1,1,1],
    ],
    [
      [0,0,0,1,1,0,0,0],
      [0,0,0,1,1,0,0,0],
      [0,1,1,0,0,1,1,0],
      [0,1,1,0,0,1,1,0],      //    6
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,1,1,0,0,1,1,0],
      [0,1,1,0,0,1,1,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,1,1,0,0,1,1,0],
      [0,1,1,0,0,1,1,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,1,1,0,0,1,1,0],
      [0,1,1,0,0,1,1,0],
      [0,0,0,1,1,0,0,0],
      [0,0,0,1,1,0,0,0],
    ],
    [
      [1,0,1,1,1,1,0,1],
      [1,0,0,1,1,0,0,1],
      [1,0,0,1,1,0,0,1],
      [1,0,0,1,1,0,0,1],      //    7
      [1,0,1,1,1,1,0,1],
      [1,0,0,1,1,0,0,1],
      [1,0,0,1,1,0,0,1],
      [1,0,0,1,1,0,0,1],
      [1,0,1,1,1,1,0,1],
      [1,0,0,1,1,0,0,1],
      [1,0,0,1,1,0,0,1],
      [1,0,0,1,1,0,0,1],
      [1,0,1,1,1,1,0,1],
      [1,0,0,1,1,0,0,1],
      [1,0,0,1,1,0,0,1],
      [1,0,0,0,0,0,0,1],
    ],
    [
      [0,0,1,1,1,1,0,0],
      [0,0,0,1,1,0,0,0],
      [1,0,0,0,0,0,0,1],
      [1,1,0,0,0,0,1,1],      //    8
      [1,1,1,0,0,1,1,1],
      [1,1,1,0,0,1,1,1],
      [1,1,1,0,0,1,1,1],
      [1,1,1,0,0,1,1,1],
      [1,1,1,0,0,1,1,1],
      [1,1,1,0,0,1,1,1],
      [1,1,0,0,0,0,1,1],
      [1,0,0,0,0,0,0,1],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,1,1,1,1,0,0],
      [0,1,1,1,1,1,1,0],
      [0,1,1,1,1,1,1,0],
      [0,1,1,1,1,1,1,0],
    ],
    [
      [1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,1],      //    9
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
      [1,0,1,1,1,1,0,1],
      [1,0,1,1,1,1,0,1],
      [1,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,1],      //    10
      [1,0,1,1,1,1,0,1],
      [1,0,1,1,1,1,0,1],
      [1,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,1],
      [1,0,1,1,1,1,0,1],
      [1,0,1,1,1,1,0,1],
      [1,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,1],
      [1,0,1,1,1,1,0,1],
      [1,0,1,1,1,1,0,1],
      [1,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,1],
      [1,0,1,1,1,1,0,1],
      [1,0,1,1,1,1,0,1],
      [1,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,1],
      [1,0,1,1,1,1,0,1],
      [1,0,1,1,1,1,0,1]
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
  createLevel(m,data,blockConstructor,ballConstructor,ui){
    this.blocks = new Array()

    // para crear los mapas con distintas paletas de colores tendremos un array
    // en dataManager que guarda arrays con los colores, y recorreremos del inicio
    // al fin y luego del fin al inicio los arrays de colores, esto para ir asignando
    // a cada fila un color ditinto pero en orden

    let c = 0 // indice del color a asignar
    let recorridoAlReves = false
    let randomPalette = data.blockColors[Math.floor(Math.random()*data.blockColors.length)]
    let color
    for (let i = 0; i < m.length; i++) {
      // se asigna un color por fila para que queden de la forma:
      //ejemplo con paleta 4 colores 0,1,2,3,3,2,1,0,0,1,2,3...
      if(i !== 0 && i % (randomPalette.length) === 0){
        recorridoAlReves = !recorridoAlReves
        recorridoAlReves ? c = randomPalette.length-1 : c = 0
      }
      color = randomPalette[c]
      if(!recorridoAlReves ){
        c++
      }else{
        c--
      }

      for (let j = 0; j < m[i].length; j++) {
        if(m[i][j]){
          this.blocks.push(new blockConstructor(
            this.blockWidth * j,
            this.blockHeight * i,
            this.blockWidth,
            this.blockHeight,
            color
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

    ui.changeBackgroundColor(randomPalette[0])
  }

  drawMap(ctx){
    this.blocks.forEach(block => {
      if(block){
        block.draw(ctx)
      }
    });
  }
}