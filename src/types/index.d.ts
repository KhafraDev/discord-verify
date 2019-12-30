export interface IModify { 
    token: string; 
    password: string; 
    email?: string; 
    new_password?: string; 
    avatar?: string; 
    language?: string;
}

export interface IChangeLanguageResponse {
    locale: string; 
    show_current_game: boolean; 
    restricted_guilds: any[]; 
    default_guilds_restricted: boolean; 
    inline_attachment_media: boolean; 
    inline_embed_media: boolean; 
    gif_auto_play: boolean; 
    render_embeds: boolean; 
    render_reactions: boolean; 
    animate_emoji: boolean; 
    enable_tts_command: boolean; 
    message_display_compact: boolean; 
    convert_emoticons: boolean; 
    explicit_content_filter: number; 
    disable_games_tab: boolean; 
    theme: string; 
    developer_mode: boolean; 
    guild_positions: string[]; 
    detect_platform_accounts: boolean; 
    status: string; 
    afk_timeout: number; 
    timezone_offset: number; 
    stream_notifications_enabled: boolean; 
    allow_accessibility_detection: boolean; 
    contact_sync_enabled: boolean; 
    friend_source_flags: { all: boolean }; 
    guild_folders: Array<{guild_ids: string[]; id: string; name?: string; color?: string}>; 
    custom_status: { text?: string; expires_at?: string; emoji_id?: string; emoji_name?: string }
}

export interface IFingerprint {
    fingerprint: string;
    assignments: number[][];
}

export interface IPhoneSuccess {
    message: string;
    retry_after?: number;
    code?: number
}