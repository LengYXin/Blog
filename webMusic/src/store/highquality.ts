/**
 * 精品歌单
 */
import { observable, computed, autorun } from "mobx"
import * as Http from "../utils/http"
class ObservableStore {
    @observable Store = {};
    @observable highquality = JSON.parse(window.localStorage.getItem("getHighquality"));
    constructor() {
        this.getHighquality();
    }
    // 获取精品歌单
    async getHighquality() {
        if (!this.highquality) {
            this.highquality = await Http.get(`top/playlist/highquality`);
            window.localStorage.setItem("getHighquality", JSON.stringify(this.highquality));
        }
        return this.highquality;
    }
}
const Store = new ObservableStore();
console.log("Store----highquality", Store);
export default Store;


