import { Router, Response, Request, NextFunction } from 'express';
import * as RouterDecorators from '../decorators/RouterDecorators';
// export const RouterUse: Router = Router();
// RouterUse.get("/index", (req: Request, res: Response) => {
//   res.json({
//     title: "Express"
//   });
// });
// RouterUse.get("/verifyCellPhone", (req: Request, res: Response) => {
//   res.json({
//     code: 200,
//     Data: {
//       Phone: 18611111111
//     }
//   });
// });
@RouterDecorators.Router({
    RootPath: "/api"
})
export default class Api {
    constructor(public App: Router = Router()) {
        console.log("构造函数运行");
        for (var key in this) {
            console.log("构造函数运行---", key);
        }
    }
    @RouterDecorators.Get()
    getA(req: Request, res: Response) {
        res.json({
            title: "getA"
        });
    }

}