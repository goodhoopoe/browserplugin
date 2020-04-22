export const viewElementTemplate = (searchString: string, href: string) =>
  `<div>
        <input type="text" placeholder="search string" style="margin-left: 1em;" disabled value="${searchString}" />
        <input type="text" placeholder="search string" style="margin-left: 1em;" disabled value="${href}" />
        <button onclick="alert('delete');">Delete</button>
    </div>`;
