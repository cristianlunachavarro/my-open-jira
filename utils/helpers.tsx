export const formatTime = (timestamp: string) => {
    const now = new Date().getTime();
    const targetDate = new Date(timestamp).getTime();
    const timeDifference = now - targetDate;

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 1) {
        return `Hace ${days} días`;
    } else if (days === 1) {
        return 'Ayer';
    } else if (hours > 1) {
        return `Hace ${hours} horas`;
    } else if (hours === 1) {
        return 'Hace una hora';
    } else if (minutes > 1) {
        return `Hace ${minutes} minutos`;
    } else if (minutes === 1) {
        return 'Hace un minuto';
    } else {
        return 'Ahora';
    }
}
