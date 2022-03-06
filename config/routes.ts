export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  /*{
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },*/
  /*{
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './Welcome',
      },
      {
        component: './404',
      },
    ],
  },*/
 /* {
    name: 'list.table-list',
    icon: 'table',
    path: '/list',
    component: './TableList',
  },*/
  {
    name: 'employee-list',
    icon: 'UserOutlined',
    path: '/employeeList',
    component: './List/Employee',
  },
  {
    name: 'department-list',
    icon: 'ProfileOutlined',
    path: '/departmentList',
    component: './Department/DepartmentList',
  },
  {
    name: 'password-page',
    icon: 'SettingOutlined',
    path: '/passwordManage',
    component: './Password/PasswordManage',
    access: 'canAdmin',
  },
  {
    name: 'log-page',
    icon: 'SettingOutlined',
    path: '/logList',
    component: './LogList/logList',
    access: 'canAdmin',
  },
  {
    name: 'app-user-page',
    icon: 'SettingOutlined',
    path: '/appUserList',
    component: './AppUserList/list',
    access: 'canAdmin',
  },
  {
    path: '/',
    redirect: '/employeeList',
  },
  {
    component: './404',
  },
];
