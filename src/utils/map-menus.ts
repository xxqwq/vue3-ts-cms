import { radioGroupEmits } from 'element-plus'
import type { RouteRecordRaw } from 'vue-router'
function loadLocalRoutes() {
  //1.读取router中所有的ts文件
  const localRoutes: RouteRecordRaw[] = []
  const files: Record<string, any> = import.meta.glob('../router/main/**/*.ts', { eager: true })
  //2.将加载的对象放到localRoute中
  for (const key in files) {
    const module = files[key]
    localRoutes.push(module.default)
  }
  return localRoutes
}
export let firstMenu: any = null
export function mapMenusToRoutes(userMenus: any[]) {
  const localRoutes = loadLocalRoutes()
  //3.根据菜单去匹配路由
  const routes: RouteRecordRaw[] = []
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      const route = localRoutes.find(item => item.path === submenu.url)
      if (route) {
        //给route的顶层菜单增加重定向功能（但是只需要添加一次）
        if (!routes.find(item => item.path === menu.url)) {
          routes.push({ path: menu.url, redirect: route })
        }
        //将二级菜单的路由加到route里
        routes.push(route)
      }
      //记录第一个被匹配到的菜单
      if (!firstMenu && route) firstMenu = submenu
    }
  }
  return routes
}

export function mapPathToMenus(path: string, userMenus: any[]) {
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        return submenu
      }
    }
  }
}

interface IBreadcrumbs {
  name: string,
  path: string
}
export function mapPathToBreadCrumbs(path: string, userMenus: any[]) {
  const breadcrumbs: IBreadcrumbs[] = []
  //遍历获取面包屑层级
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        //顶层菜单
        breadcrumbs.push({ name: menu.name, path: menu.url })
        //匹配菜单
        breadcrumbs.push({ name: submenu.name, path: submenu.url })
      }
    }
  }
  return breadcrumbs
}
//菜单映射到id的列表
export function mapMenuListToIds(menulist: any[]) {
  const ids: number[] = []
  function recurseGetId(menus: any[]) {
    for (const item of menus) {
      if (item.children) {
        recurseGetId(item.children)
      }
      else {
        ids.push(item.id)
      }
    }
  }
  recurseGetId(menulist)

  return ids
}

//菜单映射到权限
export function mapMenuListToPermissions(menuList: any[]) {
  const permissions: string[] = []
  function recurseGetPermissions(menus: any[]) {
    for (const item of menus) {
      if (item.type === 3) {
        permissions.push(item.permission)
      } else {
        recurseGetPermissions(item.children ?? [])
      }
    }
  }
  recurseGetPermissions(menuList)
  return permissions
}
