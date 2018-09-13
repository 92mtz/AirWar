/**
 * 程序入口
 */
class Game {
    private hero: Role;
    constructor() {
        //初始化引擎，设置游戏宽高
        Laya.init(400, 852);
        //创建循环滚动的背景
        var bg: BackGround = new BackGround();
        //把背景添加到舞台上显示出来
        Laya.stage.addChild(bg);
        Laya.loader.load("res/atlas/war.atlas", Laya.Handler.create(this, this.onLoaded), null, Laya.Loader.ATLAS)
    }
    onLoaded(): void {
        //创建一个主角
        this.hero = new Role();
        //设置角色位置
        this.hero.pos(200, 500);
        //把角色添加到舞台上
        Laya.stage.addChild(this.hero);
        // 监听舞台的鼠标移动事件
        Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.onMouseMove);
    }
    onMouseMove(): void {
        //始终保持主角与鼠标位置一直
        this.hero.pos(Laya.stage.mouseX, Laya.stage.mouseY)
    }
}
//启动游戏
new Game();