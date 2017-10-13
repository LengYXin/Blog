/**
 * Music
 */
import { observable, computed, autorun } from "mobx"
import Http from "../utils/http"
class ObservableStore {
    @observable Store = {};
    // 当前播放的音乐
    @observable current = {};
    // 模式  
    @observable pattern = "";
    constructor() { }

}
const Store = new ObservableStore();
console.log("Store----Music", Store);
export default Store;


