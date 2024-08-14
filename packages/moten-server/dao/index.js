import { PageDao } from "./page.js";
import { UserDao } from "./user.js";
import { PackageDao } from "./package.js";
import { LogDao } from "./log.js";

export const pageDao = new PageDao();
export const userDao = new UserDao();
export const packageDao = new PackageDao();
export const logDao = new LogDao();
