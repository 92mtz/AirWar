/**
 * 程序入口
 */
var Game = /** @class */ (function () {
    function Game() {
        //初始化引擎，设置游戏宽高
        Laya.init(400, 852);
        //创建循环滚动的背景
        var bg = new BackGround();
        //把背景添加到舞台上显示出来
        Laya.stage.addChild(bg);
        Laya.loader.load("res/atlas/war.atlas", Laya.Handler.create(this, this.onLoaded), null, Laya.Loader.ATLAS);
    }
    Game.prototype.onLoaded = function () {
        //创建一个主角
        var hero = new Role();
        //设置角色位置
        hero.pos(200, 500);
        //把角色添加到舞台上
        Laya.stage.addChild(hero);
    };
    return Game;
}());
//启动游戏
new Game();
//# sourceMappingURL=Game.js.map