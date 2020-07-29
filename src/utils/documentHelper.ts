export class DocumentHelper {

  /**
   * Returns a reference to the first object with the specified value of the ID or NAME attribute.
   * @param elementId String that specifies the ID value. Case-insensitive.
   */
  static getElementById(elementId: string): HTMLElement {
    return document.getElementById(elementId)!
  }

}
