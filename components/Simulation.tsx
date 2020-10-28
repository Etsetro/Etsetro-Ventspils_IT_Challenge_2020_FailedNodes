//import styles from "../styles/simulation.module.css";
import Popup from "./Popup";
import { Line } from "react-chartjs-2";
//import { useRef } from "react";
import React, {useEffect} from "react";


const Simulation = (props) => {
  // Utility functions
  function getRandomFloat(min:number, max:number):number{
    return Math.random() * (max-min) + min
  }
  function getRandomInt(min:number, max:number):number{
    return Math.floor(getRandomFloat(min, max))
  }

  /* ----------------------------------- */
  // Simulation constants
  const width = 1456; // Sets simulation ratio to 3:4
  const height = 1092; // Sets simulation ratio to 3:4

  /* ----------------------------------- */
  // Vehicle constants
  //const speed = 50;
  const carTypes = ['sedan', 'pickup', 'minivan', 'truck'];
  const carHeights = [136, 146, 148, 241]
  const carColorPalette = ['black', 'blue', 'green', 'brown', 'red'];
  const startLocations = [0, 0, width, width];

  /* ----------------------------------- */

  interface ISimObject {
    Draw(context:CanvasRenderingContext2D, distance:number):void
  }

  class Vehicle implements ISimObject {
    route:number;
    type:string; color:string;
    x:number;

    timeToLive:number;
    delay:number;

    image = new Image();

    constructor(type:string, route:number, delay:number){
      this.type = type;
      if(this.type === 'truck') {
        const colors = ['red', 'black'];
        this.color = colors[getRandomInt(0, colors.length)];
      } else {
        this.color = carColorPalette[getRandomInt(0, carColorPalette.length)]
      }
      this.image.src = `../images/${this.type}-${this.color}.png`;
      this.route = route;
      this.delay = delay;
      this.timeToLive = delay + 500;
      this.x = startLocations[this.route];
    }

    Draw(context:CanvasRenderingContext2D, distance:number){
      distance = distance * 5;

      context.save();
      
      if(this.route === 3) {
        context.translate((this.x + this.delay) - distance, height/2 + 20);
        context.rotate(-90 * Math.PI/180);
      } else if (this.route === 2) {
        context.translate((this.x + this.delay) - distance, height/2 - 65);
        context.rotate(-90 * Math.PI/180);
      } else if (this.route === 1) {
        context.translate((this.x - this.delay) + distance, height/2 + 60);
        context.rotate(90 * Math.PI/180);
      } else {
        context.translate((this.x - this.delay) + distance, height/2 + 145);
        context.rotate(90 * Math.PI/180);
      }
      context.scale(0.2, 0.2);
      context.drawImage(this.image, 0, 0);
      context.restore();
    }
  }

  class Tree implements ISimObject {
    stage_count:number;
    x:number; y:number;

    current_stage_image = new Image();
    next_stage_image = new Image();

    constructor(emissions:number, x:number, y:number){
      this.stage_count = Math.floor(emissions / 10000) > 10 ? 10 : Math.floor(emissions / 10000);
      this.x = x;
      this.y = y;
    }

    Draw(context:CanvasRenderingContext2D, distance:number){
      let frame = distance - 1;
      let frames_per_stage = 2000 / this.stage_count;
      let current_stage = Math.floor(frame / frames_per_stage) + 1;
      let image_opacity = (frame - ((current_stage - 1) * frames_per_stage)) / frames_per_stage;

      context.save();
      
      this.current_stage_image.src = `../images/tree-${current_stage}.png`;
      context.drawImage(this.current_stage_image, this.x, this.y);

      if (current_stage !== 10) {
        this.next_stage_image.src = `../images/tree-${current_stage + 1}.png`;
        context.globalAlpha = Number(image_opacity.toFixed(2));
        context.drawImage(this.next_stage_image, this.x, this.y);
      }
      context.restore();
    }
  }

  class Simulation implements ISimObject {
    vehicle_count:number;
    vehicles:Vehicle[] = [];
    trees:Tree[] = [];
    constructor(car_count:number, emmisions:number, private width:number, private height:number){
      this.vehicle_count = car_count;
      let route_vehicles = []
      let space_between_cars = []

      for (let i = 0; i < this.vehicle_count; i++) {
        let route = Math.floor(i / (this.vehicle_count / 4));
        if (i !== 0) {
          if (this.vehicles[i - 1].route !== route) {
            route_vehicles = []
            space_between_cars = []
          }
        }
        // Generates car type
        let type = '';
        let randomNumber = getRandomInt(0, 100)
        if (randomNumber <= 5) {
          type = carTypes[3];
        } else if (randomNumber > 5 && randomNumber <= 15) {
          type = carTypes[2];
        } else if (randomNumber > 15 && randomNumber <= 40) {
          type = carTypes[1];
        } else {
          type = carTypes[0];
        }

        let delay = 0;
        space_between_cars.push(getRandomInt(50, 350))
        if (Math.floor(i - (route * (this.vehicle_count / 4))) !== 0) {
          delay = route_vehicles.reduce((a, b) => a + b, 0) + space_between_cars.reduce((a, b) => a + b, 0);
        } else {
          delay = space_between_cars.reduce((a, b) => a + b, 0);
        }

        route_vehicles.push(carHeights[carTypes.indexOf(type)]);

        this.vehicles.push(new Vehicle(type, route, delay));
      }
      for (let i = 1; i < 21; i++) {
        let x;
        let y;
        if (i <= 10) {
          x = getRandomInt((i - 1) * (1456 / 10), i * (1456 / 10));
          y = getRandomInt(0 + 50, (1092 / 3) - 100);
        } else {
          x = getRandomInt((i - 11) * (1456 / 10), (i - 10) * (1456 / 10));
          y = getRandomInt(((1092 / 3) * 2) + 50, 1092 - 50);
        }
        this.trees.push(new Tree(emmisions, x, y));
      }
    }

    Draw(context:CanvasRenderingContext2D, distance:number){
      const image = new Image();
      image.src = '../images/map.png';
      context.drawImage(image, 0, 0, width, height);

      this.vehicles.forEach(
        v => v.Draw(context, distance)
      )
      this.trees.forEach(
        t => t.Draw(context, distance)
      )
    }
  }

  function bootstrapper() {
    let canvas;
    const renderFrameRate = 50;
    let frame = 0;
    if (typeof window !== 'undefined') {
      canvas = document.createElement('canvas');
      document.body.appendChild(canvas);
    }
    if (!canvas) return null
    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext('2d');
    if(!context) return null

    const sim = new Simulation(parseFloat(props.vehicle_count), parseFloat(props.emissions), width, height);

    setInterval(
      () => {
        if(frame < 40 * renderFrameRate) {
          frame++;
          sim.Draw(context, frame);
        }
      },
      1000/renderFrameRate
    )
  }

  bootstrapper()
  return (
    <>
      <section>
        <div>Simulation Works!</div>
        <div id="simulation">{}</div>
      </section>
    </>
  );
};

export default Simulation;