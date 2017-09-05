export class VideoInfo {

    constructor(public id: string, public type: VideoType) {

    }
    public name: string;
    public description: string;



    //только на фронте
    public previewImage: string;

    public static ToVideoInfos(data: any): Array<VideoInfo>{
        var result = new Array<VideoInfo>();
        if(!data) return result;
        data.forEach(video => {
            var info = new VideoInfo(video.Id, video.Type);
            info.description = video.Description;
            info.name = video.Name;
            result.push(info);
            
        });
        return result;
    }

    public static ConvertYoutube(data: any): VideoInfo {
        
        if (!data || !data.items || data.items.length < 1) {
            return null;
        }
        var item = data.items[0];
        var result = new VideoInfo(item.id, VideoType.Youtube);
        result.name = item.snippet.title;
        result.description = item.snippet.description;
        result.previewImage = item.snippet.thumbnails.medium.url;
        return result;
    }

    public static ConvertVimeo(data: any): VideoInfo {
        
        if (!data || data.length < 1) {
            return null;
        }
        var item = data[0];
        var result = new VideoInfo(item.id, VideoType.Vimeo);
        result.name = item.title;
        result.description = item.description;
        result.previewImage = item.thumbnail_medium;
        return result;
    }
}



export enum VideoType {
    Youtube = 1,
    Vimeo = 2
}