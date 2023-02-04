export interface IModalConfig {
  header: {
    newTitle: string
    editTitle: string
  }
  formItems: any[]
}
export interface IModalProps {
  modalConfig: IModalConfig

}
