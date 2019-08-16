import store from '@/store';

// 完成一个指令，该指令通过传递进来的权限数组和当前用户角色数组过滤
// 如果用户拥有要求的权限则可以看到，否则删除指令挂钩dom元素
export default {
    // el-挂载dom
    // binding- v-per="[]" {value:[]}
    inserted(el, binding) {
        // 获取值
        const {value: permissionRoles} = binding;
        console.log(binding);
        // 获取用户角色
        const roles = store.getters.roles;
        // 合法性判断
        if (permissionRoles && permissionRoles instanceof Array &&
            permissionRoles.length > 0) {
            // 判断用户角色中是否有要求的
            const hasPermission = roles.some(role => {
                return permissionRoles.includes(role)
            });

            // 如果没有权限则删除当前dom
            if (!hasPermission) {
                el.parentNode && el.parentNode.removeChild(el);
            }

        } else {
            throw new Error('需要指定数组类型权限，如v-permission。。。')
        }
        
    }
}