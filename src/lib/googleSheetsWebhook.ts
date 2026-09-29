/**
 * POST JSON to a Google Apps Script web app (/exec).
 * Follows redirect responses while keeping the POST body (Node fetch may drop it on 302).
 */
export async function postToGoogleAppsScript(
  execUrl: string,
  payload: Record<string, unknown>
): Promise<{ ok: boolean; status: number; body: string }> {
  const body = JSON.stringify(payload);
  const headers = { "Content-Type": "application/json" };

  let url = execUrl.trim();
  let lastStatus = 0;
  let lastBody = "";

  for (let hop = 0; hop < 5; hop++) {
    const res = await fetch(url, {
      method: "POST",
      headers,
      body,
      redirect: "manual",
    });

    lastStatus = res.status;
    lastBody = await res.text();

    if (res.status >= 300 && res.status < 400) {
      const location = res.headers.get("location");
      if (!location) break;
      url = location.startsWith("http") ? location : new URL(location, url).href;
      continue;
    }

    break;
  }

  let parsedOk = false;
  try {
    const json = JSON.parse(lastBody) as { ok?: boolean };
    parsedOk = json.ok === true;
  } catch {
    parsedOk = lastStatus >= 200 && lastStatus < 300 && lastBody.includes('"ok":true');
  }

  return {
    ok: parsedOk || (lastStatus >= 200 && lastStatus < 300 && !lastBody.startsWith("<!DOCTYPE")),
    status: lastStatus,
    body: lastBody.slice(0, 500),
  };
}
