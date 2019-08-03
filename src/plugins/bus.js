class Bus {
    constructor(){}
    emit(){}
    on(){}
}

Bus.install = function (Vue) {
    Vue.prototype.$bus = new Bus();
}

export default Bus