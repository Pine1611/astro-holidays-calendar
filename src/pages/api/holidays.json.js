export async function GET() {
    try {
        const response = await fetch("https://pine1611.github.io/holidays/api/v1/vn/date.json");
        if (!response.ok) {
            throw new Error("Network response was not ok!");
        }

        const data = await response.json();

        return new Response(JSON.stringify(data), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
}
