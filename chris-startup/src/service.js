export async function getTypes() {
  let ans = await fetch("/api/types");
  if (ans.status >= 400) {
    alert("You are not logged in!");
    window.location.href = "/"; // Redirect to login page
  }
  return ans.json();
}

export async function getRecord(type) {
  console.log("Getting record:", type);
  let ans = await fetch(`/api/record?type=${encodeURIComponent(type)}`);
  ans = await ans.json();
  if (ans.error) return null;
  return ans;
}

export async function submitRecord(record) {
  await fetch("/api/record", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(record),
  });
}

export async function getQuote() {
  let data = await fetch("https://api.quotable.io/random");
  let { content, author } = await data.json();
  return `${content} - ${author}`;
}
