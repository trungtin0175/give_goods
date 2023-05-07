import config from '~/config';

// Layouts
import { HeaderOnly } from '~/layouts';

import Home from '~/page/Home';
import Login from '~/page/Login';
import Register from '~/page/Register';
import Profile from '~/page/Profile';
import Upload from '~/page/Upload';
import Search from '~/page/Search';
import Myblog from '~/page/Myblog';
import Chat from '~/page/Chat';
import Product from '~/page/Product';
import Fixblog from '~/page/Fixblog';
import Filter from '~/page/Filter';

// public routes: ko login vẫn xem được
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.login, component: Login, layout: null },
    { path: config.routes.register, component: Register, layout: null },
    { path: config.routes.profile, component: Profile },
    { path: config.routes.upload, component: Upload },
    { path: config.routes.search, component: Search },
    { path: config.routes.myblog, component: Myblog },
    { path: config.routes.chat, component: Chat },
    { path: config.routes.product, component: Product },
    { path: config.routes.fixblog, component: Fixblog },
    { path: config.routes.filter, component: Filter },
];
// băt buộc phải login
const privateRoutes = [];
export { publicRoutes, privateRoutes };
