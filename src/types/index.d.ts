declare module 'discord-verify' {
    export const super_properties: string;
    export const useragent: string;
    export const smspva: string;
    export const captcha: string;

    // phone.ts

    interface PhoneNumber {    
        response: string;
        number: string;
        id: number;
        again: number;
        text: any;
        extra: string;
        karma: number;
        pass: any;
        sms: any;
        balanceOnPhone: number;
        service: any;
        country: any;
        CountryCode: string;
        branchId: number;
        callForwarding: boolean;
        goipSlotId: number;
    }

    interface SMS {
        response: string;
        number: string,
        id: number;
        text: string;
        extra: string;
        karma: number;
        pass: string;
        sms: string;
        balanceOnPhone: number;
    }

    interface TextRequest {
        message: string;
        code?: number;
        retry_after?: number;
    }
    
    // account.ts

    interface User {
        id: string;
        username: string;
        avatar: string;
        discriminator: string;
        email: string;
        verified: boolean;
        locale: string;
        mfa_enabled: boolean;
        phone: string;
        flags: number;
    }

    interface ModifyOptions {
        password: string;
        token: string; // required as a header
        email?: string;
        new_password?: string;
        username?: string;
        avatar?: string;
        language?: string;
    }

    interface ChangeLanguage {
        locale: string;
        show_current_game?: boolean; 
        restricted_guilds?: string[]; 
        default_guilds_restricted?: boolean; 
        inline_attachment_media?: boolean; 
        inline_embed_media?: boolean; 
        gif_auto_play?: boolean; 
        render_embeds?: boolean; 
        render_reactions?: boolean; 
        animate_emoji?: boolean; 
        enable_tts_command?: boolean; 
        message_display_compact?: boolean; 
        convert_emoticons?: boolean; 
        explicit_content_filter?: string; 
        disable_games_tab?: boolean; 
        theme?: string; 
        developer_mode?: boolean; 
        guild_positions?: string[]; 
        detect_platform_accounts?: boolean; 
        status?: string; 
        afk_timeout?: number; 
        timezone_offset?: number; 
        stream_notifications_enabled?: boolean; 
        allow_accessibility_detection?: boolean; 
        contact_sync_enabled?: boolean; 
        friend_source_flags?: { all?: boolean }; 
        guild_folders?: [{ guild_ids: string[]; id: number; name: string; color: string }]; 
        custom_status?: {
            text: string; 
            expires_at: unknown; 
            emoji_id: string; 
            emoji_name: string;
        }
    }

    interface ModifyReturn {
        id: string;
        username: string;
        avatar?: string; 
        discriminator: string;
        token: string;
        email: string;
        verified: boolean;
        locale: string;
        mfa_enabled: boolean;
        phone: string;
        flags: number;
    }

    // fingerprint.ts
    interface Fingerprint {
        fingerprint: string;
        assignments: number[][];
    }

    // invites.ts
    interface Guild {
        code: string;
        guild: {
          id: string;
          name: string;
          splash: string;
          banner: string;
          description: string;
          icon: string;
          features: string[];
          verification_level: number;
          vanity_url_code: string;
        },
        channel: { id: string, name: string, type: number }
    }

    interface Friendlist {
        id: string, 
        type: number, 
        user: {
            id: string, 
            username: string, 
            avatar: string|null, 
            discriminator: string
        }
    }
}