export default class Agent {

  constructor(p5) {
    this.radius = 20;
    this.pos = p5.createVector(p5.random(this.radius,p5.width-this.radius),p5.random(this.radius,p5.height-this.radius));
    this.vel = p5.createVector(p5.random(-4,4), p5.random(-4,4));
  }

  update(){
    this.pos.add(this.vel);
  }

  display(p5) {
    p5.noStroke();
    p5.fill(100,250,20,255);
    p5.ellipse(this.pos.x, this.pos.y, this.radius*2, this.radius*2);
  }

  wrapWindow(p5){

    if(p5.width < this.pos.x+this.radius){
      this.vel.x *= -1;
    }else if(0 > this.pos.x-this.radius){
      this.vel.x *= -1;
    }

    if(p5.height < this.pos.y+this.radius){
      this.vel.y *= -1;
    }else if(0 > this.pos.y-this.radius){
      this.vel.y *= -1;
    }

  }

}
