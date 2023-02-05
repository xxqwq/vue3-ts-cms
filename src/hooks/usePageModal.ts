import { ref } from 'vue'
import type pageModal from '@/components/page-modal/page-modal.vue'
type EditCallbackType = (data: any) => void
function usePageModal(editCallback?: EditCallbackType) {
  const modalRef = ref<InstanceType<typeof pageModal>>()
  function handleNewBtnClick() {
    modalRef.value?.setModalVisible()
  }
  function handleEditClick(itemData: any) {
    modalRef.value?.setModalVisible(false, itemData)
    if (editCallback) {
      editCallback(itemData)
    }
  }
  return {
    modalRef, handleNewBtnClick, handleEditClick
  }
}

export default usePageModal
