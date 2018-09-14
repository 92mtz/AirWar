/**
 * 角色类
 */
class Role extends Laya.Sprite {
    // 定义飞机身体
    private body: Laya.Animation;
    // 定义动画是否已被缓存
    private static cached: boolean = false;
    // 角色类型
    private type: string;
    // 阵营
    public camp: number;
    // 血量
    public hp: number;
    // 敌军速度
    public speed: number;
    // 被击半径
    public hitRadius: number;

    constructor() {
        super();
        //初始化
        // this.init();
    }
    public init(_type: string, _camp: number, _hp: number, _speed: number, _hitRadius: number): void {
        this.type = _type;
        this.camp = _camp;
        this.hp = _hp;
        this.speed = _speed;
        this.hitRadius = _hitRadius;
        if (!Role.cached) {
            //缓存主角飞行动画
            Laya.Animation.createFrames(["war/hero_fly1.png", "war/hero_fly2.png"], "hero_fly");
            //缓存主角集中后的爆炸效果
            Laya.Animation.createFrames(["war/hero_down1.png", "war/hero_down2.png", "war/hero_down3.png", "war/hero_down4.png"], "hero_down");
            //缓存敌机1飞行动画
            Laya.Animation.createFrames(["war/enemy1_fly1.png"], "enemy1_fly");
            //缓存敌机1的爆炸效果
            Laya.Animation.createFrames(["war/enemy1_down1.png", "war/enemy1_down2.png", "war/enemy1_down3.png", "war/enemy1_down4.png"], "enemy1_down");
            //缓存敌机2飞行动画
            Laya.Animation.createFrames(["war/enemy2_fly1.png"], "enemy2_fly");
            //缓存敌机2的爆炸效果
            Laya.Animation.createFrames(["war/enemy2_down1.png", "war/enemy2_down2.png", "war/enemy2_down3.png", "war/enemy2_down4.png"], "enemy2_down");
            //缓存敌机2的碰撞动画
            Laya.Animation.createFrames(["war/enemy2_hit.png"], "enemy2_hit");
            //缓存敌机3飞行动画
            Laya.Animation.createFrames(["war/enemy3_fly1.png", "war/enemy3_fly2.png"], "enemy3_fly");
            //缓存敌机3的爆炸效果
            Laya.Animation.createFrames(["war/enemy3_down1.png", "war/enemy3_down2.png", "war/enemy3_down3.png", "war/enemy3_down4.png", "war/enemy3_down5.png", "war/enemy3_down6.png"], "enemy3_down");
            //缓存敌机3的碰撞动画
            Laya.Animation.createFrames(["war/enemy3_hit.png"], "enemy3_hit");
        }
        if (!this.body) {
            //创建一个动画作为飞机的身体
            this.body = new Laya.Animation();
            //把机体添加到容器内
            this.addChild(this.body);
        }
        // 根据类型播放动画
        this.playAction("fly");
    }
    playAction(action: string): void {
        this.body.play(0, true, this.type + '_' + action);
        //获取动画大小
        var bound: Laya.Rectangle = this.body.getBounds();
        //设置机身居中
        this.body.pos(-bound.width / 2, -bound.height / 2);
    }
}