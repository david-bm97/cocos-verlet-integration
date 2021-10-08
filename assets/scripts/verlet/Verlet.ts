
import { _decorator, Component, Node, Graphics, Vec2, v2, director, view, log } from 'cc';
import { Point } from './Point';
import { Stick } from './Stick';
const { ccclass, property } = _decorator;

@ccclass('Verlet')
export class Verlet extends Component {
    graphics: Graphics

    points: Point[] = []
    sticks: Stick[] = []
    bounce: number = 0.9
    gravity: number = 0.5
    friction: number = 0.999

    onLoad() {
        this.graphics = this.getComponent(Graphics)

        this.points.push(new Point(
            100,
            - 100,
            85,
            -105,
            true
        ))

        this.points.push(new Point(
            200,
            - 100,
            200,
            -100,
            false
        ))

        this.points.push(new Point(
            200,
            - 200,
            200,
            -200,
            false
        ))

        this.points.push(new Point(
            100,
            - 200,
            100,
            -200,
            false
        ))

        this.addStick(new Stick(
            this.points[0],
            this.points[1],
        ))
        this.addStick(new Stick(
            this.points[1],
            this.points[2],
        ))
        this.addStick(new Stick(
            this.points[2],
            this.points[3],
        ))
        this.addStick(new Stick(
            this.points[3],
            this.points[0],
        ))
        this.addStick(new Stick(
            this.points[0],
            this.points[2],
            true
        ))
    }

    update(dt) {
        this.updatePoints()
        for (let i = 0; i < 3; i++) {
            this.updateSticks()
            this.constrinPoints()
        }
        this.graphics.clear()
        this.renderSticks()
        this.renderPoints()
    }

    addStick(stick: Stick) {
        this.sticks.push(stick)
    }

    updatePoints() {
        this.points.forEach(point => {
            point.update(this.friction, this.gravity)
        })
    }

    constrinPoints() {
        this.points.forEach(point => {
            point.constrain(this.friction, this.bounce)
        })
    }

    updateSticks() {
        this.sticks.forEach(stick => {
            stick.update()
        })
    }

    renderPoints() {
        this.points.forEach(point => {
            point.render(this.graphics)
        })
    }

    renderSticks() {
        this.graphics.lineWidth = 3
        this.sticks.forEach(stick => {
            stick.render(this.graphics)
        })
    }
}