export default class {
    /**
     * 响应数据格式化
     * @param data 
     */
    static ResFormatData(data: any = {}, code: number = 0) {
        return {
            code,
            data
        }
    }

}