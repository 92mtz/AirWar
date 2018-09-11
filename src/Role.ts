/**
 * 角色类
 */
class Role extends Laya.Sprite {
    //定义飞机身体
    private body: Laya.Animation
    constructor() {
        super();
        //初始化
        this.init();
    }
    init(): void {
        //缓存飞行动画
        Laya.Animation.createFrames(["war/hero_fly1.png", "war/hero_fly2.png"], "hero_fly");
        //缓存集中后的爆炸效果
        Laya.Animation.createFrames(["war/hero_down1.png", "war/hero_down2.png", "war/hero_down3.png", "war/hero_down4.png"], "hero_down");
        //创建一个动画作为飞机的身体
        this.body = new Laya.Animation();
        //把机体添加到容器内
        this.addChild(this.body);
        this.playAction("hero_fly");
    }
    playAction(action): void {
        this.body.play(0, true, action);
        //获取动画大小
        var bound: Laya.Rectangle = this.body.getBounds();
        //设置机身居中
        this.body.pos(-bound.width / 2, -bound.height / 2);
    }

}