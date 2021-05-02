class GameObject {
  constructor(x, y, width, height) {
    this.xi = x;
    this.yi = y;
    this.xf = this.xi + width;
    this.yf = this.yi + height;
    this.width = width,
    this.height = height,
    this.velx = 0;
    this.vely = 0;

    //devuelve un booleao si el objeto en su siguiente movimiento colisionará o no
    this.collision = function (obj, bounce = false, maxVel) {
      //-->recibe de parametro un objeto con el cual evaluara si se produjo una collision
      if (this.yi < obj.yf &&
        obj.yi < this.yf &&
        obj.xi < this.xf &&
        obj.xf > this.xi) {
        //collision condition
        let up = Math.abs(this.yi - obj.yf);
        let left = Math.abs(this.xi - obj.xf);
        let right = Math.abs(this.xf - obj.xi);
        let down = Math.abs(this.yf - obj.yi);
        if (bounce) {
          //add force of blockPlayer
          if (this.velx < maxVel && this.velx > -maxVel) {
            if (obj.velx < 0){
              this.velx -= maxVel/4;
            }
            if (obj.velx > 0){
              this.velx += maxVel/4;
            }

            //random vel add in x on bounce
            let randomNum = Math.floor(Math.random() * 2)
            if(randomNum === 1){
              this.velx -= maxVel/8;
              console.log(this.velx)
            }else{
              this.velx += maxVel/8;
              console.log(this.velx)
            }
          }
          //bounces
          //sistema por comparación de distancias
          if (up <= right && up <= down && up <= left)
            this.vely = Math.abs(this.vely);
          if (right <= down && right <= left && right <= up)
            this.velx = Math.abs(this.velx) * -1;
          if (down <= left && down <= up && down <= right)
            this.vely = Math.abs(this.vely) * -1;
          if (left <= up && left <= right && left <= down)
            this.velx = Math.abs(this.velx);
        }
        return true;
      } else {
        return false;
      }
    };

    // recibe un array de objetos con los cuales revisara si al moverse colisionara o no
    // si colisiona no se mueve
    this.setNewPos = function(objects = 1){

      let newXi = this.xi + this.velx
      let newXf = this.xf + this.velx
      let newYi = this.yi + this.vely
      let newYf = this.yf + this.vely

      let nextPos = new GameObject(newXi,newYi,this.width,this.height)
      let count = 0

      for(let i = 0; i < objects.length; i++){
        if(!nextPos.collision(objects[i])){
          count++
        }
      }

      if(count === objects.length){
        this.xi += this.velx
        this.xf += this.velx
        this.yi += this.vely
        this.yf += this.vely
        return true
      }
    };
  }
}

class Ball extends GameObject{
  constructor(x, y, width, height, color) {
    // GameObject.call(this, x, y, width, height);
    super(x,y,width,height)
    this.radius = width / 2;
    this.xi = x - this.radius;
    this.yi = y - this.radius;
    this.xf = x + this.radius;
    this.yf = y + this.radius;
    this.width = width;
    this.height = height;
    this.color = color;
    this.launched = false;

    this.draw = function (ctx) {
      ctx.beginPath();
      ctx.arc(
        this.xi + this.radius,
        this.yi + this.radius,
        this.radius,
        0,
        2 * Math.PI,
        false
      );
      ctx.fillStyle = this.color;
      ctx.fill();
    };
  }
}

class Block extends GameObject{
  constructor(x, y, width, height, color) {
    //GameObject.call(this, x, y, width, height);
    super(x,y,width,height)
    this.color = color;

    this.draw = function (ctx) {
      ctx.fillStyle = color;
      ctx.lineWidth = 1;
      ctx.strokeStyle = "black";
      ctx.fillRect(this.xi, this.yi, this.width, this.height);
      ctx.strokeRect(this.xi, this.yi, this.width, this.height);
    };
  }
}

export default { GameObject, Ball, Block }