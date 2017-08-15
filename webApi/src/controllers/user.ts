import { Router, Response, Request, NextFunction } from 'express';
import * as users from './users';

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
// RouterUse.use("/userList/:id?", users.RouterUse);
// RouterUse.use("/userList/a", users.RouterUse);
// RouterUse.use("/userList", users.RouterUse);
RouterUse.get("/userContext", (req: Request, res: Response) => {
  res.json({
    Name: "LENG",
  });
});
RouterUse.get("/index/:id", (req: Request, res: Response) => {
  res.json({
    title: "Express User"
  });
});
RouterUse.get("/verifyCellPhone", (req: Request, res: Response) => {
  res.json({
    code: 200,
    Data: {
      Phone: 18611111111
    }
  });
});

