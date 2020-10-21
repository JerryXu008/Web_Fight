// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportHome from '../../../app/controller/home';
import ExportUser from '../../../app/controller/user';
import ExportUsers from '../../../app/controller/users';
import ExportUtil from '../../../app/controller/util';

declare module 'egg' {
  interface IController {
    home: ExportHome;
    user: ExportUser;
    users: ExportUsers;
    util: ExportUtil;
  }
}
