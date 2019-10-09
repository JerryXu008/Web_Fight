// 全局创建组件实例函数
import Vue from 'vue'

export default function(Component, props){

    // 创建vue实例
    const instance = new Vue({
        /*
         通过查看源码，render方法返回的是 虚拟Dom，这里面就包含了Dom元素
        * */
        render: h => { // vdom

           // console.log(h(Component, {props}));

            return h(Component, {props})
        }
    }).$mount();//没有挂载

    // 生成的dom追加至body中
    document.body.appendChild(instance.$el);


    // 添加一个销毁方法
    const comp = instance.$children[0];
   // console.log(instance)
   // console.log(comp);

    comp.remove = function () {
        document.body.removeChild(instance.$el)
        instance.$destroy();
    }

    return comp;
}
