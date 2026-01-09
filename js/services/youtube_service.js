
const YOUTUBE_API_URL = "https://www.googleapis.com/youtube/v3/search";

class YouTubeService {
    constructor() {
        this.apiKey = (typeof youtubeConfig !== 'undefined' && youtubeConfig.apiKey)
            ? youtubeConfig.apiKey
            : localStorage.getItem('YOUTUBE_API_KEY');
    }

    async searchVideos(query, maxResults = 3) {
        if (!this.apiKey) {
            console.warn("YouTube API Key missing");
            return [];
        }

        try {
            const url = `${YOUTUBE_API_URL}?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=${maxResults}&key=${this.apiKey}`;
            const response = await fetch(url);

            if (!response.ok) {
                const error = await response.json();
                console.error("YouTube API Error:", error);
                return [];
            }

            const data = await response.json();
            return data.items.map(item => ({
                id: item.id.videoId,
                title: item.snippet.title,
                thumbnail: item.snippet.thumbnails.medium.url,
                channel: item.snippet.channelTitle
            }));

        } catch (error) {
            console.error("YouTube Service Error:", error);
            return [];
        }
    }
}

window.youTubeService = new YouTubeService();
