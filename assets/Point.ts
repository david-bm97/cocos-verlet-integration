import { Graphics, view } from "cc"

export class Point {
    constructor(
        public x: number,
        public y: number,
        public oldx: number,
        public oldy: number,
        public locked: boolean = false
    ) { }

    update(friction: number, gravity: number) {
        if (this.locked) {
            return
        }
        let vx = (this.x - this.oldx) * friction
        let vy = (this.y - this.oldy) * friction

        this.oldx = this.x
        this.oldy = this.y
        this.x += vx
        this.y += vy
        this.y -= gravity
    }

    constrain(friction: number, bounce: number) {
        if (this.locked) {
            return
        }
        let vx = (this.x - this.oldx) * friction
        let vy = (this.y - this.oldy) * friction

        if (this.x > view.getCanvasSize().width) {
            this.x = view.getCanvasSize().width
            this.oldx = this.x + vx * bounce
        }
        if (this.x < 0) {
            this.x = 0
            this.oldx = this.x + vx * bounce
        }
        if (this.y < -view.getCanvasSize().height) {
            this.y = -view.getCanvasSize().height
            this.oldy = this.y + vy * bounce
        }
        if (this.y > 0) {
            this.y = 0
            this.oldy = this.y + vy * bounce
        }
    }

    render(graphics: Graphics) {
        graphics.circle(this.x, this.y, 5)
    }
}
