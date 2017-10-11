/**
 * 每日推荐
 */
import { observable, computed, autorun } from "mobx"
import * as Http from "../utils/http"
class ObservableStore {
    @observable Store = {};
    constructor() {
    }
    init() {

    }
}
const Store = new ObservableStore();
// console.log(Store);
export default Store;


