/**
 * 程序入口
 */
class Game {
    constructor() {
        //初始化引擎，设置游戏宽高
        Laya.init(400, 852);
        //创建循环滚动的背景
        var bg: BackGround = new BackGround();
        //把背景添加到舞台上显示出来
        Laya.stage.addChild(bg);
        Laya.loader.load("res/atlas/war.atlas", Laya.Handler.create(this, this.onLoaded), null, Laya.Loader.ATLAS
        )
    }
    onLoaded(): void {
        //创建一个主角
        var hero: Role = new Role();
        //设置角色位置
        hero.pos(200,500);
        //把角色添加到舞台上
        Laya.stage.addChild(hero);
    }
}
//启动游戏
new Game();