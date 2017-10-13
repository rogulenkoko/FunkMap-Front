export class ImageInfo {
    constructor(public id: string, public image: string) {

    }

    public static ToImageInfos(data: any): Array<ImageInfo> {
        console.log(data);
        var result = new Array<ImageInfo>();
        if (data) {
            data.forEach(item => {
                result.push(new ImageInfo(item.Id, item.Bytes));
            });
        }

        return result;
    }
}