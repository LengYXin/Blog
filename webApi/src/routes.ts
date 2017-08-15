import { Router } from 'express';
let modularList: { Url: string, Router: any }[] = [];
import * as users from './components/user/users';
import * as user from './components/user/user';
import * as login from './components/authentication/login';

modularList.push({ Url: "/users", Router: users.RouterUse });
modularList.push({ Url: "/user", Router: user.RouterUse });
modularList.push({ Url: "/authentication", Router: login.RouterUse });

export { modularList };