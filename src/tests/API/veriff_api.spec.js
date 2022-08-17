const { test, expect, request } = require("@playwright/test");
const config = require("../../../playwright.config");
const { POST_CONFIG, GET_CONFIG } = require("../../helpers/relativeUrl");
const testdata = require("../../test-resources/test-data/api_test_data.json");
const schema = require("../../test-resources/schemas/schemas.json");
const baseURL = config.use.baseURL;
let res = null;
const Ajv = require("ajv-draft-04");
const ajv = new Ajv({ allErrors: true }); // options can be passed, e.g. allErrors: true}

test.describe("Veriff Session Configuration API's", () => {

  test('Create a Session with Valid Data  @Smoke', async ({ request }) => {
    await request
      .post(baseURL + POST_CONFIG, {
        data: testdata.With_Valid_Payload,
      })
      .then((respond) => {
        expect(respond.status()).toBe(200);
        res = respond.json();
        expect(res.sessionToken).not.toBeNull;
        console.log(res.sessionToken);
      });
  });

  test("Create a Session with Invalid Country @Regression", async ({ request }) => {
    await request
      .post(baseURL + POST_CONFIG, {
        data: testdata.With_Invalid_Payload_Country,
      })
      .then((respond) => {
        expect(respond.status()).toBe(400);
      });
  });

  test("Create a Session with Invalid Document Type @Regression", async ({ request }) => {
    await request
      .post(baseURL + POST_CONFIG, {
        data: testdata.With_Invalid_Payload_DocType,
      })
      .then((respond) => {
        expect(respond.status()).toBe(400);
      });
  });

  test("Create a Session with Invalid Language Type @Regression", async ({ request }) => {
    await request
      .post(baseURL + POST_CONFIG, {
        data: testdata.With_Invalid_Payload_Lang,
      })
      .then((respond) => {
        expect(respond.status()).toBe(400);
      });
  });

  test("Create a Session with Invalid Language Type Integer @Regression", async ({
    request,
  }) => {
    await request
      .post(baseURL + POST_CONFIG, {
        data: testdata.With_Invalid_Payload_Lang_Int,
      })
      .then((respond) => {
        expect(respond.status()).toBe(400);
      });
  });

  test("Retrive session config with Valid Token @Smoke", async ({ request }) => {
    let resspond = await request.post(baseURL + POST_CONFIG, {
      data: testdata.With_Valid_Payload,
    });
    res = await resspond.json();
    let session_token = res.sessionToken;
    let inte_url = res.integrationUrl;
    console.log("Session Token : " + session_token);
    await request
      .get(inte_url + GET_CONFIG, {
        headers: {
          Authorization: "Bearer " + session_token,
        },
      })
      .then((respond) => {
        expect(respond.status()).toBe(200);
      });
  });

  test("Retrive session config with Invalid Token @Regression", async ({ request }) => {
    let resspond = await request.post(baseURL + POST_CONFIG, {
      data: testdata.With_Valid_Payload,
    });
    res = await resspond.json();
    let inte_url = res.integrationUrl;
    await request
      .get(inte_url + GET_CONFIG, {
        headers: {
          Authorization: "Bearer " + "Invalid Token",
        },
      })
      .then((respond) => {
        expect(respond.status()).toBe(401);
      });
  });

  test("Schema Verification for Session Creation @Regression", async ({ request }) => {
    let resspond = await request.post(baseURL + POST_CONFIG, {
      data: testdata.With_Valid_Payload,
    });
    res = await resspond.json();
    let validate = ajv.compile(schema.Session_Creation_Schema);
    let valid = validate(res);
    console.log(valid);
    expect(valid).toBe(true);
  });
});
