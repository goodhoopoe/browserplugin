import { ChromeStorage } from "./utils/storage/ChromeStorage";
import { ChromeStorageKeys } from "./utils/storage/ChromeStorageKeys";
import { ISearchSiteData } from "./utils/storage/ISearchSiteData";
import { viewElementTemplate } from "./templates/ViewElementTemplate";
import { Validation } from "./utils/validation/Validation";

let storedData: ISearchSiteData[] = [];

const getStoredDataAndDrawExistingElements = () =>
  ChromeStorage.retrieveLocalData<ISearchSiteData[]>(
    ChromeStorageKeys.browserPluginKey,
    (elements = []) => {
      storedData = elements;

      drawExistingElements();
    }
  );

const drawExistingElements = () => {
  const parentNode = document.querySelector(".modal__items");
  if (parentNode) parentNode.innerHTML = "";

  storedData.forEach((element, index) => {
    let node = document.createElement("div");
    node.innerHTML = viewElementTemplate(
      element.searchString,
      element.domainMask
    );

    node.querySelector("button")?.addEventListener("click", () => {
      storedData.splice(index, 1);

      ChromeStorage.storeLocalData(
        ChromeStorageKeys.browserPluginKey,
        storedData
      );

      drawExistingElements();
    });

    parentNode?.append(node);
  });
};

document
  .querySelector(".modal__create-item button")
  ?.addEventListener("click", () => {
    const searchString = document.querySelector<HTMLInputElement>(
      ".modal__create-item-search-string"
    );

    const searchDomain = document.querySelector<HTMLInputElement>(
      ".modal__create-item-search-domain"
    );

    if (searchString?.value && searchDomain?.value) {
      if (!Validation.isDomainWithPossibleAsterisks(searchDomain.value)) {
        alert("Not a domain wildcard");

        return;
      }
      storedData.push({
        searchString: searchString.value,
        domainMask: searchDomain.value,
      });

      ChromeStorage.storeLocalData(
        ChromeStorageKeys.browserPluginKey,
        storedData
      );

      searchString.value = "";
      searchDomain.value = "";

      drawExistingElements();
    }
  });

getStoredDataAndDrawExistingElements();
