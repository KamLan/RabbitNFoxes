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
  intervalDeathRabbit
  intervalDeathFox
  intervalRabbitRebirth
  intervalFoxrebirth

  constructor() { }

  //Comportement au lancement
  ngOnInit() {
    this.CreateCanva();
    this.CreateRabbit(300)
    this.CreateFox(20)
    this.intervalMove = setInterval(this.MoveRandom.bind(this, false), 500)
    this.intervalDeathRabbit = setInterval(this.RabbitElimination.bind(this, false), 400)
    this.RabbitRebirth()
    this.FoxRebirth()
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

  //Regénère des populations
  regenPopulations(){
    this.CreateRabbit(30)
    this.CreateFox(5)
    this.MoveRandom();
  }

  editParameters(rabbitPop, foxesPop, rabbitRebirth, distancePrey, deathHunger){
    //console.log("parameters changed")
    this.clearAll()
    this.CreateRabbit(rabbitPop)
    this.CreateFox(foxesPop)
    //TODO ajouter rebirth/distance/deathHunger
    this.MoveRandom()
  }

  //Fonction pour mettre en place le canva
  CreateCanva(){
    this.myCanva = document.getElementById('myCanva');
    this.myCanva.width = 1000
    this.myCanva.height = 1000
  }

  //Fonction mouvement random pour lapins et renards
  MoveRandom(){
    this.MoveRandomFox()
    this.MoveRandomRabbit()
  }

  //fonction pour généré un mouvement aléatoire lapin
  MoveRandomRabbit(){
    //console.log("Rabbit pop avant mouvement", this.arrayRabbits)
    for(var i= 0; i <= this.arrayRabbits.length - 1; i++){
      var context
      context = this.myCanva.getContext('2d');
      context.clearRect(this.arrayRabbits[i][1], this.arrayRabbits[i][2], 4, 4)
      var random = Math.random() < 0.5 ? -1 : 1;
      var x = this.arrayRabbits[i][1] + (Math.random() < 0.5 ? -1 : 1);
      var y = this.arrayRabbits[i][2] + (Math.random() < 0.5 ? -1 : 1);
      this.arrayRabbits[i][1] = x
      this.arrayRabbits[i][2] = y
    }
    //console.log("Rabbit pop après mouvement",this.arrayRabbits)
    context.fillStyle = "green";
    for(var j= 0; j <= this.arrayRabbits.length - 1; j++){
      context.fillRect(this.arrayRabbits[j][1],this.arrayRabbits[j][2], 4, 4);
    }
  }

  //fonction pour généré un mouvement aléatoire renard
  MoveRandomFox(){
    //console.log("Foxes pop avant mouvement", this.arrayFoxes)
    for(var i= 0; i <= this.arrayFoxes.length - 1; i++){
      var context
      context = this.myCanva.getContext('2d');
      context.clearRect(this.arrayFoxes[i][1], this.arrayFoxes[i][2], 4, 4)
      var x = this.arrayFoxes[i][1] + (Math.random() < 0.5 ? -1 : 1);
      var y = this.arrayFoxes[i][2] + (Math.random() < 0.5 ? -1 : 1);
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
  }

  //Fonction pour faire apparaitre des lapins
  RabbitRebirth(){
    this.intervalRabbitRebirth = setInterval(this.CreateRabbit(1), 1000)
  }

  //Fonction pour faire réapparaitre des renards
  FoxRebirth(){
    this.intervalRabbitRebirth = setInterval(this.CreateFox(1), 10000)
  }

  //Fonction gérant la mort des renards
  FoxDeathHunger(){
    //TODO
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
          this.arrayRabbits.splice(indexDeadRabbit)
          console.log(this.arrayRabbits)
        }
      }
    }
  }

  //fonction pour créer une population de lapins
  CreateRabbit(nombre){
    for(var i = 0; i <= nombre - 1; i++ ){
      this.rabbitId++
      var x = Math.floor(Math.random() * 1000) + 1
      var y = Math.floor(Math.random() * 1000) + 1
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
      var x = Math.floor(Math.random() * 1000) + 1
      var y = Math.floor(Math.random() * 1000) + 1
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
