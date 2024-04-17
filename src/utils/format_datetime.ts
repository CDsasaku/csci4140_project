

export const formatDateTime = (datetime: Date) => {
    const date = new Date(datetime);
    const today = new Date();
    
    const diff = today.getTime() - date.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (seconds < 60) {
        return `${seconds} seconds ago`;
    } else if (minutes < 60) {
        return `${minutes} minutes ago`;
    } else if (hours < 24) {
        return `${hours} hours ago`;
    } else if (days < 2) {
        return 'Yesterday';
    } else {
        return date.toDateString();
    }
};