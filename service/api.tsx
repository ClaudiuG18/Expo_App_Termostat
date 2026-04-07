export const GetData = async () => {
  try {
    const res = await fetch("http://192.168.2.218:8787/api/latest");

    const text = await res.text();

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${text}`);
    }

    const data = JSON.parse(text);
    console.log(data);
    return data;
  } catch (err) {
    console.error("Fetch error:", err);
  }
};

export const SetData = async (temp: number) => {
  try {
    const res = await fetch("http://192.168.2.218:8787/api/set", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ temp }),
    });

    const text = await res.text();

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${text}`);
    }

    const data = JSON.parse(text);
    console.log(data);
    return data;
  } catch (err) {
    console.error("Fetch error:", err);
  }
};
