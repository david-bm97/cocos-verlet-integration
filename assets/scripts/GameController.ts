
import { _decorator, Component, Node, log, Vec2, view, Color } from 'cc';
import { Point } from './verlet/Point';
import { Stick } from './verlet/Stick';
import { Verlet } from './verlet/Verlet';
const { ccclass, property } = _decorator;

@ccclass('GameController')
export class GameController extends Component {
    @property(Verlet)
    verlet: Verlet = null

    pointStickFrom: Point = null
    drawingPoints: Point[] = []

    onLoad() {
        this.node.on(Node.EventType.MOUSE_DOWN, this.onMouseDown, this)
    }

    onDestroy() {
        this.node.off(Node.EventType.MOUSE_DOWN, this.onMouseDown, this)
    }

    onMouseDown(ev) {
        let location: Vec2 = ev.getLocation()
        location.y -= view.getCanvasSize().height

        let point: Point = null
        for (let i = 0; i < this.verlet.points.length; i++) {
            const p = this.verlet.points[i];
            const distance = (Vec2.distance(p.getLocation(), location))
            if (distance < 15) {
                point = p
                break
            }
        }

        if (!point) {
            if (!this.pointStickFrom) {
                this.pointStickFrom = this.verlet.points[this.verlet.points.length - 1]
            }
            const point = new Point(
                location.x,
                location.y,
                location.x,
                location.y,
                true
            )
            this.addPoint(point)
            this.pointStickFrom = null
        } else {
            if (this.pointStickFrom) {
                this.addPoint(this.pointStickFrom, point)
            }
            if (this.pointStickFrom) {
                this.pointStickFrom.color = Color.WHITE
            }
            this.pointStickFrom = point
            this.pointStickFrom.color = Color.GREEN
        }

        this.verlet.points.forEach(point => {
            point.color = Color.WHITE
        })

        if (this.pointStickFrom) {
            this.pointStickFrom.color = Color.GREEN
        } else {
            this.verlet.points[this.verlet.points.length - 1].color = Color.GREEN
        }
    }

    unlockDrawingPoints() {
        this.drawingPoints.forEach(point => {
            point.locked = false
        })
        this.drawingPoints = []
    }

    addPoint(to: Point, from: Point = null) {
        this.drawingPoints.push(to)
        this.verlet.points.push(to)
        this.verlet.addStick(new Stick(
            from ? from : this.pointStickFrom,
            to
        ))
        this.unschedule(this.unlockDrawingPoints)
        this.scheduleOnce(this.unlockDrawingPoints, 3)
    }
}