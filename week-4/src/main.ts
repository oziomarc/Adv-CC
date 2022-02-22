import * as PIXI from "pixi.js";
import * as dat from 'dat.gui';
import { gsap } from 'gsap';
import { easeIn, easeInOut, easeOut, lerp } from './easing';
import { wrapYoyo } from 'gsap/all';

const main = async () => {
    let app = new PIXI.Application();

    // Display application properly
    document.body.style.margin = '0';
    app.renderer.view.style.position = 'absolute';
    app.renderer.view.style.display = 'block';
    app.renderer.backgroundColor = 0xE9FFC2;

    // View size = windows
    app.renderer.resize(window.innerWidth, window.innerHeight);

    var obj = {prop: 10}

    gsap.to(obj, {
        duration: 1, // time in seconds of the animation
        prop: 200, // property to change
        onUpdate: function() { // called every update
          console.log(obj.prop);
      } });

    // Handle window resizing
    window.addEventListener('resize', (_e) => {
        app.renderer.resize(window.innerWidth, window.innerHeight);
    });

    document.body.appendChild(app.view);
};

main();

