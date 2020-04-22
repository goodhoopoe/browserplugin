import { ISearchSiteData } from "./utils/storage/ISearchSiteData";
import { ChromeStorageKeys } from "./utils/storage/ChromeStorageKeys";
import { ChromeStorage } from "./utils/storage/ChromeStorage";

ChromeStorage.retrieveLocalData<ISearchSiteData[]>(
  ChromeStorageKeys.browserPluginKey,
  (storedValues) => {
    const searchInput = document.querySelector<HTMLInputElement>(
      '#searchform input:not([type="hidden"])'
    );

    let domainMask: string | undefined;

    storedValues.forEach((currentValue) => {
      if (searchInput?.value.includes(currentValue.searchString)) {
        domainMask = currentValue.domainMask;
      }
    });

    if (domainMask === undefined) {
      return;
    }

    domainMask = domainMask.replace("*", ".");

    document
      .querySelectorAll<HTMLAnchorElement>(
        '#search a[ping^="/url"]:not([tracking])'
      )
      .forEach((element) => {
        element.setAttribute("tracking", "");
        element.addEventListener("click", () => {
          if (new RegExp(domainMask!).test(element.href)) {
            console.log("GOTCHA");
          }
        });
      });
  }
);
