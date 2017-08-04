import { Router, Response, Request, NextFunction } from 'express';

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
RouterUse.get("/index", (req: Request, res: Response) => {
  res.send('respond with a resource');
});
RouterUse.get("/error", (req: Request, res: Response) => {
  let err = parseInt('a111a');
  throw "报错了";
  
});
