import type { IModalConfig } from "@/components/page-modal/type"
const modalConfig: IModalConfig = {
  pageName: 'department',
  header: {
    newTitle: '新建部门',
    editTitle: '编辑部门'
  },
  formItems: [
    { type: 'input', label: '部门名称', prop: 'name', placeholder: "请输入部门名称" },
    { type: 'input', label: '部门领导', prop: 'leader', placeholder: "请输入部门领导", },
    {
      type: 'select', label: '上级部门', prop: 'parentId', placeholder: "请选择上级部门", options: [
        // { label: '财务部', value: 111 },
        // { label: '安保部', value: 222 }
      ]
    }]
}
export default modalConfig
