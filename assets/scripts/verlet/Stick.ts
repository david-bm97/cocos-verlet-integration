import { Graphics } from "cc";
import { Point } from "./Point";

export class Stick {
    public length: number = 0;

    constructor(
        public p0: Point,
        public p1: Point,
        public hidden: boolean = false
    ) {
        this.length = this.distance(p0, p1)
    }

    update() {
        let dx = this.p1.x - this.p0.x
        let dy = this.p1.y - this.p0.y
        let distance = Math.sqrt(dx * dx + dy * dy)
        let difference = this.length - distance
        let percent = difference / distance / 2
        let offsetX = dx * percent
        let offsetY = dy * percent

        if (!this.p0.locked) {
            this.p0.x -= offsetX
            this.p0.y -= offsetY
        }
        if (!this.p1.locked) {
            this.p1.x += offsetX
            this.p1.y += offsetY
        }
    }

    render(graphics: Graphics) {
        if (this.hidden) {
            return
        }
        graphics.moveTo(this.p0.x, this.p0.y)
        graphics.lineTo(this.p1.x, this.p1.y)

        graphics.stroke()
        graphics.fill()
    }

    private distance(pointA: Point, pointB: Point) {
        let dx = pointB.x - pointA.x
        let dy = pointB.y - pointA.y
        return Math.sqrt(dx * dx + dy * dy)
    }
}
