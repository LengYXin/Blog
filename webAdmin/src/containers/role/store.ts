import { observable, computed, autorun } from "mobx"
import * as Http from "../../utils/http"
class ObservableStore {
    @observable data = [];//数据
    @observable pagination = {};//分页数据
    @observable loading = false;//加载中
    @observable selectedRowKeys = [];//勾选数据
    @observable editModalVisible = false;//编辑显示
    @observable editModel = {};//编辑模型
    constructor() {
        // autorun(() => console.log("-----autorun------", this.selectedRowKeys));

    }
    // 首次初始化
    init() {
        if (this.data.length) {
            return
        }
        this.loading = true;
        setTimeout(() => {
            for (let i = 0; i < 5; i++) {
                this.data.push({
                    key: i + Math.random(),
                    name: `名称 ${i}`,
                    address: `权限 ${i}`,
                });
            }
            this.loading = false;
        }, 1500);
    }
    // 添加
    edit(param) {
        return new Promise<any>((resolve, reject) => {
            console.log("edit ", param);
            setTimeout(() => {
                if (param.key) {
                    // this.data = [
                    //     ...state.slice(0, index),
                    //     param,
                    //     ...state.slice(index + 1)
                    //   
                    this.data = this.data.map(x => {
                        if (x.key == param.key) {
                            return Object.assign({}, x, param)
                        }
                        return x
                    });
                    return resolve('修改角色成功！');
                } else {
                    if (this.data.some(x => x.name == param.name)) {
                        return reject("已经拥有相同的角色了！");
                    }
                    this.data = [...this.data, {
                        key: Math.random(),
                        name: param.name,
                        address: param.name,
                    }];
                    return resolve('添加角色成功！');
                }

            }, 1000);
        })
    }
    // 删除
    delete(key) {
        this.loading = true;
     
        return new Promise<any>((resolve, reject) => {
            setTimeout(() => {
                this.data.splice(this.data.findIndex(x => x.key == key), 1);
                this.data = [...this.data]
                this.loading = false;
                return resolve('删除角色成功！');
            }, 1000);
        })
    }

    // 编辑界面显示
    editModalDisplay(Visible = false, Model = {}) {
        this.editModalVisible = Visible;
        if (Visible) {
            this.editModel = Model;
        }
        console.log(this.editModel);
    }
}

export const Store = new ObservableStore();
// console.log(Store);



