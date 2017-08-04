import { Router } from 'express';
let modularList: { Url: string, Router: any }[] = [];
import * as users from './controllers/users';
import * as user from './controllers/user';
import Api from './controllers/api';

modularList.push({ Url: "/users", Router: users.RouterUse });
modularList.push({ Url: "/user", Router: user.RouterUse });
// modularList.push({ Url: "/user222", Router: user.RouterUse });
// modularList.push({ Url: "/user333", Router: user.RouterUse });

// modularList.push({ Url: "/api", Router: Api });

export { modularList };