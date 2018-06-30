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

  constructor() { }

  //Comportement au lancement
  ngOnInit() {
    this.CreateCanva();
    this.CreateRabbit(30)
    this.CreateFox(5)
    setInterval(this.MoveRandom.bind(this, false), 500)
    console.log("Rabbits pop", this.arrayRabbits)
    console.log("Foxes pop", this.arrayFoxes)
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
  }

  //Regénère des populations
  regenPopulations(){
    this.CreateRabbit(30)
    this.CreateFox(5)
  }

  editParameters(){
    console.log("parameters changed")
  }

  //fonction pour mettre en place le canva
  CreateCanva(){
    this.myCanva = document.getElementById('myCanva');
    this.myCanva.width = 1000
    this.myCanva.height = 1000
  }

  MoveRandom(){
    this.MoveRandomFox()
    this.MoveRandomRabbit()
  }

  //fonction pour généré un mouvement aléatoire lapin
  MoveRandomRabbit(){
    console.log("Rabbit pop avant mouvement", this.arrayRabbits)
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
    console.log("Rabbit pop après mouvement",this.arrayRabbits)
    context.fillStyle = "green";
    for(var j= 0; j <= this.arrayRabbits.length - 1; j++){
      context.fillRect(this.arrayRabbits[j][1],this.arrayRabbits[j][2], 4, 4);
    }
  }

  //fonction pour généré un mouvement aléatoire renard
  MoveRandomFox(){
    console.log("Foxes pop avant mouvement", this.arrayFoxes)
    for(var i= 0; i <= this.arrayFoxes.length - 1; i++){
      var context
      context = this.myCanva.getContext('2d');
      context.clearRect(this.arrayFoxes[i][1], this.arrayFoxes[i][2], 4, 4)
      var x = this.arrayFoxes[i][1] + (Math.random() < 0.5 ? -1 : 1);
      var y = this.arrayFoxes[i][2] + (Math.random() < 0.5 ? -1 : 1);
      this.arrayFoxes[i][1] = x
      this.arrayFoxes[i][2] = y
    }
    console.log("Foxes pop après mouvement",this.arrayRabbits)
    context.fillStyle = "red";
    for(var j= 0; j <= this.arrayFoxes.length - 1; j++){
      context.fillRect(this.arrayFoxes[j][1], this.arrayFoxes[j][2], 4, 4);
    }
  }

  //Fonction pour généré un mouvement vers le lapin après repérage
  MoveFoxToTarget(){

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
