export const fetcher = async (url: string) => {
  const res = await fetch(url, {
    method: "GET",
    headers: new Headers({ "Content-Type": "application/json" }),
  });

  return res.json();
};

export const creator = async <T>(url: string, body?: T) => {
  const res = await fetch(url, {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify(body),
  });
  // DO NOT return res.json()
  return res.json();
};
