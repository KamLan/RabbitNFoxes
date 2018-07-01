import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-canva',
  templateUrl: './canva.component.html',
  styleUrls: ['./canva.component.css']
})
export class CanvaComponent implements OnInit {

  myCanva:any;  
  x:number
  y:number
  ranNum = 0 
  context
  rabbitId = 0
  arrayRabbits = []
  arrayFoxes = []
  intervalMove
  intervalMoveFoxHunt
  intervalDeathRabbit
  intervalDeathFox
  intervalRabbitRebirth
  intervalFoxrebirth

  constructor() { }

  //Comportement au lancement
  ngOnInit() {
    this.CreateCanva();
    this.CreateRabbit(30)
    this.CreateFox(200)
    this.intervalMove = setInterval(this.MoveRandomInitial.bind(this, false), 500)
    this.intervalDeathRabbit = setInterval(this.RabbitElimination.bind(this, false), 400)
    this.intervalMoveFoxHunt = setInterval(this.MoveFoxToTarget.bind(this, false), 400)
    this.RabbitRebirth(1000)
    this.FoxRebirth(10000)
    //console.log("Rabbits pop", this.arrayRabbits)
    //console.log("Foxes pop", this.arrayFoxes)
  }

  //fonction pour effacer tous les animaux
  clearAll(){
    var context
    context = this.myCanva.getContext('2d');
    for(var j= 0; j <= this.arrayRabbits.length - 1; j++){
      context.clearRect(this.arrayRabbits[j][1], this.arrayRabbits[j][2], 4, 4)
    }
    for(var i= 0; i <= this.arrayFoxes.length - 1; i++){
      context.clearRect(this.arrayFoxes[i][1], this.arrayFoxes[i][2], 4, 4)
    }
    clearInterval(this.intervalMove);
  }

  getRandomInt(min, max) {
    var number = Math.floor(Math.random() * (max - min + 1)) + min;
    return number
  } 

  //Regénère des populations
  regenPopulations(){
    this.CreateRabbit(30)
    this.CreateFox(5)
    this.MoveRandom();
  }

  //Fonction pour changer les params ecosystem
  editParameters(rabbitPop, foxesPop, rabbitRebirth, distancePrey, deathHunger){
    if(rabbitRebirth == null){
      rabbitRebirth=1000
    }
    var foxRebirth = rabbitRebirth * 10
    this.clearAll()
    this.CreateRabbit(rabbitPop)
    this.CreateFox(foxesPop)
    //TODO ajouter distance/deathHunger
    this.RabbitRebirth(rabbitRebirth)
    this.FoxRebirth(foxRebirth)
    this.MoveRandom()
    this.MoveFoxToTarget()
  }

  //Fonction pour mettre en place le canva
  CreateCanva(){
    this.myCanva = document.getElementById('myCanva');
    this.myCanva.width = 500
    this.myCanva.height = 500
  }

  //Fonction mouvement random pour lapins et renards
  MoveRandomInitial(){
    this.MoveRandomFox()
    this.MoveRandomRabbit()
  }

  MoveRandom(){
    this.intervalMove = setInterval(this.MoveRandomInitial.bind(this, false), 500)
  }

  //fonction pour généré un mouvement aléatoire lapin
  MoveRandomRabbit(){
    //console.log("Rabbit pop avant mouvement", this.arrayRabbits)
    var context
    context = this.myCanva.getContext('2d');
    for(var i= 0; i <= this.arrayRabbits.length - 1; i++){
      context.clearRect(this.arrayRabbits[i][1], this.arrayRabbits[i][2], 4, 4)
      var random = Math.random() < 0.5 ? -1 : 1;
      var x = this.arrayRabbits[i][1] + this.getRandomInt(-10, 10);
      var y = this.arrayRabbits[i][2] + this.getRandomInt(-10, 10);
      this.arrayRabbits[i][1] = x
      this.arrayRabbits[i][2] = y
    }
    console.log("Rabbit pop après mouvement",this.arrayRabbits)
    context.fillStyle = "green";
    for(var j= 0; j <= this.arrayRabbits.length - 1; j++){
      context.fillRect(this.arrayRabbits[j][1],this.arrayRabbits[j][2], 4, 4);
    }
  }

  //fonction pour généré un mouvement aléatoire renard
  MoveRandomFox(){
    //console.log("Foxes pop avant mouvement", this.arrayFoxes)
    var context
    context = this.myCanva.getContext('2d');
    for(var i= 0; i <= this.arrayFoxes.length - 1; i++){
      context.clearRect(this.arrayFoxes[i][1], this.arrayFoxes[i][2], 4, 4)
      var x = this.arrayFoxes[i][1] + this.getRandomInt(-10, 10);
      var y = this.arrayFoxes[i][2] + this.getRandomInt(-10, 10);
      this.arrayFoxes[i][1] = x
      this.arrayFoxes[i][2] = y
    }
    //console.log("Foxes pop après mouvement",this.arrayRabbits)
    context.fillStyle = "red";
    for(var j= 0; j <= this.arrayFoxes.length - 1; j++){
      context.fillRect(this.arrayFoxes[j][1], this.arrayFoxes[j][2], 4, 4);
    }
  }

  //Fonction pour généré un mouvement vers le lapin après repérage
  MoveFoxToTarget(){
    //TODO
    for(var i= 0; i <= this.arrayFoxes.length - 1; i++){
      for(var j= 0; j <= this.arrayRabbits.length - 1; j++){
        var x = Math.abs(this.arrayFoxes[i][1] - this.arrayRabbits[j][1])
        var y = Math.abs(this.arrayFoxes[i][2] - this.arrayRabbits[j][2])
        if(x <= 5 && y <= 5){
         console.log("Fox has spoted a rabbit")
        }
      }
    }
  }

  //Fonction pour faire apparaitre des lapins
  RabbitRebirth(timeR){
    this.intervalRabbitRebirth = setInterval(this.CreateRabbit(1), timeR)
  }

  //Fonction pour faire réapparaitre des renards
  FoxRebirth(timeF){
    this.intervalRabbitRebirth = setInterval(this.CreateFox(1), timeF)
  }

  //Fonction gérant la mort des renards
  FoxDeathHunger(){
    //TODO
    //Ajouter hunger status dans le tableau des renards ?
  }

  //Fonction pour gerer la disparition des lapins
  RabbitElimination(){
    for(var i= 0; i <= this.arrayFoxes.length - 1; i++){
      for(var j= 0; j <= this.arrayRabbits.length - 1; j++){
        if(this.arrayFoxes[i][1]==this.arrayRabbits[j][1] && this.arrayFoxes[i][2]==this.arrayRabbits[j][2]){
          var context
          console.log("Rabbit has been killed")
          context = this.myCanva.getContext('2d');
          context.clearRect(this.arrayRabbits[j][1], this.arrayRabbits[j][2], 4, 4)
          var indexDeadRabbit = this.arrayRabbits.indexOf(this.arrayRabbits[j])
          console.log(this.arrayRabbits[indexDeadRabbit])
          this.arrayRabbits.splice(indexDeadRabbit[indexDeadRabbit])
          console.log(this.arrayRabbits)
        }
      }
    }
  }

  //fonction pour créer une population de lapins
  CreateRabbit(nombre){
    for(var i = 0; i <= nombre - 1; i++ ){
      this.rabbitId++
      var x = Math.floor(Math.random() * 500) + 1
      var y = Math.floor(Math.random() * 500) + 1
      var name = "Rabbit"+this.rabbitId
      var arrayRabbit = []
      arrayRabbit.push(name, x, y)
      this.arrayRabbits.push(arrayRabbit)
      var context;
      context = this.myCanva.getContext('2d');
      context.fillStyle = "green";
      context.fillRect(x,y, 4, 4);
    }
  }

  //fonction pour créer une population de renards
  CreateFox(nombre){
    for(var i = 0; i <= nombre - 1; i++ ){
      var x = Math.floor(Math.random() * 500) + 1
      var y = Math.floor(Math.random() * 500) + 1
      var name = "Fox"+this.rabbitId
      var arrayFox = []
      arrayFox.push(name, x, y)
      this.arrayFoxes.push(arrayFox)
      var context;  
      context = this.myCanva.getContext('2d');
      context.fillStyle = "red";
      context.fillRect(x,y, 4, 4);
    }
  }

}
