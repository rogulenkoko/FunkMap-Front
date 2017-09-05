export class VideoInfo{
  public id: string;
  public name: string;
  public description: string;
  public type: VideoType;


  //только на фронте
  public previewImage: string;


  public static ConvertYoutube(data: any): VideoInfo{
    var result = new VideoInfo();
    if(!data || !data.items || data.items.length < 1){
      return result;
    }
    var item = data.items[0];
    result.id = item.id;
    result.name = item.snippet.title;
    result.description = item.snippet.description;
    result.previewImage = item.snippet.thumbnails.medium.url;
    result.type = VideoType.Youtube;
    return result;
  }

  public static ConvertVimeo(data: any): VideoInfo{
    var result = new VideoInfo();
    if(!data || data.length < 1){
      return result;
    }
    var item = data[0];
    result.id = item.id;
    result.name = item.title;
    result.description = item.description;
    result.previewImage = item.thumbnail_medium;
    return result;
  }
}



export enum VideoType{
  Youtube = 1,
  Vimeo = 2
}