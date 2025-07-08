let tela = "menu";  // menu | instrucoes | jogo | venceu

let btnJogar, btnComoJogar, btnVoltar;

let itens = [];

let arrastandoItem = null;

let offsetX, offsetY;

let fase = 1;

const maxFase = 3;

const sementeX = 200;

const sementeY = 330;

const sementeSize = 30;

function setup() {

  createCanvas(400, 400);

  textAlign(CENTER, CENTER);

  rectMode(CENTER);

  btnJogar = new Botao(width/2, 250, 150, 40, "🌱 JOGAR");

  btnComoJogar = new Botao(width/2, 300, 150, 40, "📖 COMO JOGAR?");

  btnVoltar = new Botao(80, 370, 120, 30, "⬅ VOLTAR");

  itens.push(new Item("Sol", color(255, 204, 0), 350, 50));         

  itens.push(new Item("Água", color(0, 102, 204), 15, 360));        

  itens.push(new Item("Fertilizante", color(139, 69, 19), 330, 360)); 

}

function draw() {

  if (tela === "menu") {

    background(144, 238, 144);

    drawMenu();

  } else if (tela === "instrucoes") {

    background(255, 255, 224);

    drawInstrucoes();

  } else if (tela === "jogo") {

    desenharFundo();

    desenharPlanta();

    for (let item of itens) {

      item.draw();

    }

  } else if (tela === "venceu") {

    background(255, 228, 225);

    drawVenceu();

  }

}

function drawMenu() {

  fill(0);

  textSize(28);

  text("🌻 TELA INICIAL 🌻", width/2, 150);

  btnJogar.draw();

  btnComoJogar.draw();

}

function drawInstrucoes() {
  background(144, 238, 144);

  fill(0);

  textSize(22);

  text("COMO JOGAR", width/2, 60);

  textSize(16);

  text("Arraste os itens na ordem certa até a planta:\n\n🌞 Sol\n🌊 Água\n🌿 Fertilizante\n\nDepois ela floresce!", width/2, 180);

  btnVoltar.draw();

}

function drawVenceu() {

  // Flor com pétalas bonitinhas

  let x = width / 2;

  let y = 330;

  // Céu

  background(135, 206, 235);

  // Grama

  fill(34, 139, 34);

  rect(width/2, height - 35, width, 70);

  // Caule

  stroke(0, 100, 0);

  strokeWeight(4);

  line(x, y, x, y - 100);

  // Folhas

  fill(0, 200, 0);

  noStroke();

  ellipse(x - 15, y - 50, 20, 20);

  ellipse(x + 15, y - 50, 20, 20);

  // Pétalas

  fill(255);  // Branco

  let petalaDist = 25;

  for (let a = 0; a < TWO_PI; a += PI / 6) {  // Mais pétalas

    let px = x + cos(a) * petalaDist;

    let py = y - 100 + sin(a) * petalaDist;

    ellipse(px, py, 15, 15);

  }

  // Miolo da flor

  fill(255, 200, 0);

  ellipse(x, y - 100, 20, 20);

  // Texto de vitória

  fill(0);

  textSize(20);

  text("🎉 PARABÉNS! Sua planta floresceu! 🎉", width/2, 50);

  btnVoltar.draw();

}

class Botao {

  constructor(x, y, w, h, texto) {

    this.x = x;

    this.y = y;

    this.w = w;

    this.h = h;

    this.texto = texto;

  }

  draw() {

    fill(255, 255, 153);

    if (this.estaMouseSobre()) fill(255, 204, 0);

    rect(this.x, this.y, this.w, this.h, 10);

    fill(0);

    textSize(16);

    text(this.texto, this.x, this.y);

  }

  estaMouseSobre() {

    return mouseX > this.x - this.w/2 && mouseX < this.x + this.w/2 &&

           mouseY > this.y - this.h/2 && mouseY < this.y + this.h/2;

  }

}

class Item {

  constructor(nome, cor, x, y) {

    this.nome = nome;

    this.cor = cor;

    this.x = x;

    this.y = y;

    this.startX = x;

    this.startY = y;

    this.size = 30;

    this.usado = false;

  }

  draw() {

    fill(this.cor);

    noStroke();

    if (this.nome === "Sol") {

      ellipse(this.x, this.y, this.size, this.size);

      stroke(255, 204, 0);

      for (let a = 0; a < TWO_PI; a += PI / 4) {

        let x1 = this.x + cos(a) * 20;

        let y1 = this.y + sin(a) * 20;

        let x2 = this.x + cos(a) * 30;

        let y2 = this.y + sin(a) * 30;

        line(x1, y1, x2, y2);

      }

    } else if (this.nome === "Água") {

      fill(0, 102, 204);

      ellipse(this.x, this.y, this.size, this.size * 1.3);

    } else if (this.nome === "Fertilizante") {

      fill(139, 69, 19);

      rect(this.x, this.y, this.size, this.size * 1.2, 5);

    }

    noStroke();

    fill(0);

    textSize(10);

    text(this.nome, this.x, this.y + this.size);

  }

  estaMouseSobre() {

    let d = dist(mouseX, mouseY, this.x, this.y);

    return d < this.size / 2 + 10;

  }

  resetarPosicao() {

    this.x = this.startX;

    this.y = this.startY;

  }

}

function mousePressed() {

  if (tela === "menu") {

    if (btnJogar.estaMouseSobre()) {

      tela = "jogo";

      fase = 1;

      for (let item of itens) item.usado = false;

    } else if (btnComoJogar.estaMouseSobre()) {

      tela = "instrucoes";

    }

  } else if (tela === "instrucoes" || tela === "venceu") {

    if (btnVoltar.estaMouseSobre()) tela = "menu";

  } else if (tela === "jogo") {

    for (let item of itens) {

      if (item.estaMouseSobre() && !item.usado) {

        arrastandoItem = item;

        offsetX = mouseX - item.x;

        offsetY = mouseY - item.y;

        break;

      }

    }

  }

}

function mouseDragged() {

  if (tela === "jogo" && arrastandoItem) {

    arrastandoItem.x = mouseX - offsetX;

    arrastandoItem.y = mouseY - offsetY;

  }

}

function mouseReleased() {

  if (tela === "jogo" && arrastandoItem) {

    let d = dist(arrastandoItem.x, arrastandoItem.y, sementeX, sementeY);

    let itemCorreto = false;

    if (fase === 1 && arrastandoItem.nome === "Sol") itemCorreto = true;

    if (fase === 2 && arrastandoItem.nome === "Água") itemCorreto = true;

    if (fase === 3 && arrastandoItem.nome === "Fertilizante") itemCorreto = true;

    if (d < sementeSize + 50 && itemCorreto && !arrastandoItem.usado) {

      arrastandoItem.usado = true;

      fase++;

      if (fase > maxFase) {

        tela = "venceu";

      }

    }

    arrastandoItem.resetarPosicao();

    arrastandoItem = null;

  }

}

function desenharFundo() {

  background(135, 206, 235);  // Céu

  fill(34, 139, 34);          // Grama

  rect(width/2, height - 35, width, 70);

  fill(0, 102, 204);          // Rio

  noStroke();

  beginShape();

  vertex(0, 330);

  vertex(40, 330);

  vertex(30, 350);

  vertex(40, 370);

  vertex(30, 390);

  vertex(40, 400);

  vertex(0, 400);

  endShape(CLOSE);

}

function desenharPlanta() {

  fill(100, 50, 0);

  ellipse(sementeX, sementeY + 20, 20, 20);

  fill(0, 150, 0);

  noStroke();

  if (fase === 1) {

    ellipse(sementeX, sementeY, 15, 15);

  } else if (fase === 2) {

    ellipse(sementeX, sementeY, 15, 15);

    stroke(0, 100, 0);

    strokeWeight(3);

    line(sementeX, sementeY + 10, sementeX, sementeY - 30);

    noStroke();

  } else if (fase === 3) {

    ellipse(sementeX, sementeY, 15, 15);

    stroke(0, 100, 0);

    strokeWeight(3);

    line(sementeX, sementeY + 10, sementeX, sementeY - 50);

    fill(0, 200, 0);

    ellipse(sementeX - 10, sementeY - 40, 15, 15);

    ellipse(sementeX + 10, sementeY - 40, 15, 15);

    noStroke();

  } else if (fase >= 4) {

    ellipse(sementeX, sementeY, 15, 15);

    stroke(0, 100, 0);

    strokeWeight(3);

    line(sementeX, sementeY + 10, sementeX, sementeY - 70);

    fill(0, 200, 0);

    ellipse(sementeX - 10, sementeY - 60, 15, 15);

    ellipse(sementeX + 10, sementeY - 60, 15, 15);

    fill(255, 182, 193);  // Pétalas

    let petalaDist = 25;

    for (let a = 0; a < TWO_PI; a += PI / 6) {

      let px = sementeX + cos(a) * petalaDist;

      let py = sementeY - 80 + sin(a) * petalaDist;

      ellipse(px, py, 15, 15);

    }

    fill(255, 200, 0);  // Miolo

    ellipse(sementeX, sementeY - 80, 20, 20);

    noStroke();

  }

}