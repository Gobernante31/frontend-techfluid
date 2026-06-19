(async () => {
  const url = process.env.API_URL || "http://127.0.0.1:8787/verification";
  const sample = {
    name: "Juan Pérez",
    email: "juan.perez@example.com",
    documentNumber: "12345678",
    selfieImage:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAAWgmWQ0AAAAASUVORK5CYII=",
    documentImage:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAAWgmWQ0AAAAASUVORK5CYII=",
  };

  try {
    console.log(`POST ${url}`);
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sample),
    });

    const text = await res.text();
    console.log("Status:", res.status);
    console.log("Response body:", text);

    if (res.ok) {
      const json = JSON.parse(text);
      const id = json.id || (json.user && json.user.id) || null;
      if (id) {
        const getUrl = url.replace(/\/verification$/, `/verification/${id}`);
        console.log(`GET ${getUrl}`);
        const res2 = await fetch(getUrl);
        console.log("GET status:", res2.status);
        console.log("GET body:", await res2.text());
      }
    }
  } catch (err) {
    console.error("Error during test submit:", err);
    process.exit(1);
  }
})();
