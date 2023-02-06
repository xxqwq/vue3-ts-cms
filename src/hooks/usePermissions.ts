import useLoginStore from "@/store/login/login"

function usePermissions(permissionId: string) {
  const loginstore = useLoginStore()
  const { permissions } = loginstore
  return !!permissions.find((item) => item.includes(permissionId))
}
export default usePermissions
