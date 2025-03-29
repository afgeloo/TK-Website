export async function fetchEvents() {
    const response = await fetch("http://localhost/php-backend/fetch_events.php");
    const data = await response.json();
    return data;
}
