import { test, expect } from "@playwright/test";

const EMAIL = "blackswordgc@gmail.com";
const PASSWORD = "123321@Q";

test("signup", async ({ request, baseURL }) => {
  const [user, provider] = EMAIL.split("@");

  let result = await request.post(`${baseURL}/users/signup`, {
    data: {
      displayName: "blackswordgc",
      email: `${user}+${Date.now()}@${provider}`,
      password: PASSWORD,
    },
  });

  expect(result.ok()).toBeTruthy();
});

test("signin", async ({ request, baseURL }) => {
  let result = await request.post(`${baseURL}/users/signin`, {
    data: {
      email: EMAIL,
      password: PASSWORD,
    },
  });

  expect(result.ok()).toBeTruthy();
});

test("fetch user information", async ({ request, baseURL }) => {
  let signInResult = await request.post(`${baseURL}/users/signin`, {
    data: {
      email: EMAIL,
      password: PASSWORD,
    },
  });

  expect(signInResult.ok()).toBeTruthy();

  const token = await signInResult.text();

  const meResult = await request.get(`${baseURL}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  expect(meResult.ok()).toBeTruthy();

  const user = await meResult.json();
  expect(user).toEqual(
    expect.objectContaining({
      email: EMAIL,
    })
  );
});
