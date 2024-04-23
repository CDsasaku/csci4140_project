export enum MediaTypes {
    IMAGE = 'image',
    VIDEO = 'video',
    AUDIO = 'audio',
    TEXT = 'text',
    OTHER = 'other'
}

export enum VerificationType {
    EMAIL = 'email_verification',
    PASSWORD = 'forgot_password'
}

export enum MessageTypes {
    TEXT = 'text',
    ITEM = 'item',
}

export enum ItemStatus {
    HOLD = 'hold',
    AVAILABLE = 'available',
    REQUESTED = 'requested',
}

export enum RequestStatus {
    PENDING = 'pending',
    ACCEPTED = 'accepted',
    REJECTED = 'rejected',
}

export enum NotificationStatus {
    READ = 'read',
    UNREAD = 'unread',
}