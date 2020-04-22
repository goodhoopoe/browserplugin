export class ChromeStorage {
  public static storeLocalData = <TType>(key: string, searchString: TType) => {
    chrome.storage.local.set({ [key]: searchString });
  };

  public static retrieveLocalData = <TType>(
    key: string,
    callback: (result: TType) => void
  ) => {
    chrome.storage.local.get(key, (result) => callback(result[key]));
  };
}
