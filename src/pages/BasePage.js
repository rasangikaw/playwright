exports.BasePage = class BasePage {
  constructor(page) {
    this.page = page;
  }

  async replace(locatorName, valueToReplace, locatorType) {
    return await locatorType.locator(
      locatorName
        .toString()
        .replace("{1}", valueToReplace)
        .replace("Locator@", "")
        .toString()
    );
  }
};
