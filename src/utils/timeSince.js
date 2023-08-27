const timeSince = (date) => {
    if (typeof(date) != Date) date = new Date(date);

    var seconds = Math.floor((new Date() - date) / 1000);
    var interval = seconds / 31536000;

    if (interval > 1) return Math.floor(interval) + "y";

    interval = seconds / 2592000;

    if (interval > 1) return Math.floor(interval) + "mo";

    interval = seconds / 86400;

    if (interval > 1) return Math.floor(interval) + "d";
    
    interval = seconds / 3600;

    if (interval > 1) return Math.floor(interval) + "h";

    interval = seconds / 60;

    if (interval > 1) return Math.floor(interval) + "m";

    return Math.floor(seconds) + "s";
}

export default timeSince;
