/**
 * 精品歌单
 */
import { observable, computed, autorun } from "mobx"
import * as Http from "../utils/http"
class ObservableStore {
    @observable Store = {};
    @observable playlist = JSON.parse(window.localStorage.getItem("getPlaylist"));
    constructor() {
        this.getPlaylist();
    }
    // 获取歌单
    async getPlaylist() {
        if (!this.playlist) {
            this.playlist = await Http.get(`top/playlist`);
            window.localStorage.setItem("getPlaylist", JSON.stringify(this.playlist));
        }
        return this.playlist;
    }
}
const Store = new ObservableStore();
console.log("Store----highquality", Store);
export default Store;


