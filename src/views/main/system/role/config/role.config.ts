const searchConfig = {
  formItems: [{
    type: 'input',
    prop: 'name',
    label: '角色名称',
    placeholder: '请输入查询的角色名称',
  }, {
    type: 'input',
    prop: 'introduction',
    label: '权限介绍',
    placeholder: '请输入查询的权限名'
  },
  {
    type: 'date-picker',
    prop: 'createAt',
    label: '创建时间',
  }
  ]
}
export default searchConfig