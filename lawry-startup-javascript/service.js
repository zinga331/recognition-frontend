async function getTypes() {
    let ans = await fetch("/api/types");
    return ans.json();
}

async function getRecord(type) {
    let ans = await fetch(`/api/record?type=${encodeURIComponent(type)}`);
    ans = await ans.json();
    if (ans.error) return null;
    return ans;
}

async function submitRecord(record) {
    await fetch("/api/record", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(record)
    });
    console.log("Submitting record:", record);
}

window.api = {
    getTypes,
    getTypes,
    getRecord,
    submitRecord
};