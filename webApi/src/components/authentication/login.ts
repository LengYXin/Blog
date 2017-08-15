import { Router, Response, Request, NextFunction } from 'express';
import Help from "../../help";
export const RouterUse: Router = Router();
// 路由列表
let routers = [];
RouterUse.get("/", (req: Request, res: Response) => {
    routers = RouterUse.stack.map(x => {
        return (x.route ? req.baseUrl + x.route.path : '这是一个中间件');
    })
    res.render("index", {
        title: "路由列表 ----- " + req.baseUrl,
        routers: routers
    });
});

RouterUse.post("/login", (req: Request, res: Response) => {
    console.log(req.body);
    res.json(Help.ResFormatData({
        state: true,
        name: "LENG",
        ...req.body
    }));
});

