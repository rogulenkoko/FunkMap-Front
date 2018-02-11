

export class SoundSettings{
    public volume: number;
    public mute: boolean;
    public repeat: boolean;
    public mix: boolean;

    static default():SoundSettings{
        var settings = new SoundSettings();
        settings.mix = false;
        settings.mute = false;
        settings.volume = 100;
        settings.repeat = false;
        return settings;
    }
}