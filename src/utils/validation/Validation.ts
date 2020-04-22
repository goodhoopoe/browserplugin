export class Validation {
  public static isDomainWithPossibleAsterisks = (maybeDomainName: string) =>
    /[\w*]{2,}\.[a-z]{2,}/i.test(maybeDomainName);
}
