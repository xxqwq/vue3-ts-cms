import { ref } from 'vue'
import type pageModal from '@/components/page-modal/page-modal.vue'
type CallbackType = (data?: any) => void
function usePageModal(newCallback?: CallbackType, editCallback?: CallbackType) {
  const modalRef = ref<InstanceType<typeof pageModal>>()
  function handleNewBtnClick() {
    modalRef.value?.setModalVisible()
    if (newCallback) {
      newCallback()
    }
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
