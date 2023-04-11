export class API {
  static MAX_API_DEPTH = 8; // how many generations we are prepared to retrieve per API call
  static PRIMARY_FIELDS = [
    "BirthDate",
    "BirthLocation",
    "DataStatus",
    "DeathDate",
    "DeathLocation",
    "Derived.BirthName",
    "Derived.BirthNamePrivate",
    "Father",
    "FirstName",
    "Gender",
    "HasChildren",
    "Id",
    "LastNameAtBirth",
    "LastNameCurrent",
    "LastNameOther",
    "MiddleName",
    "Mother",
    "Name",
    "Nicknames",
    "Photo",
    "Prefix",
    "RealName",
    "Suffix",
  ];

  static async getAncestorData(id, depth, fields = API.PRIMARY_FIELDS) {
    const result = await API.postToAPI({
      action: "getAncestors",
      key: id,
      depth: depth,
      fields: fields.join(","),
      resolveRedirect: 1,
    });
    if (result[0].status != 0) {
      throw new Error(`API error! Status: ${result[0].status}`);
    }
    return result[0].ancestors;
  }

  static async getRelatives(ids, fields = API.PRIMARY_FIELDS) {
    const result = await API.postToAPI({
      action: "getRelatives",
      keys: ids.join(","),
      fields: fields.join(","),
      resolveRedirect: 1,
      // getParents: true,
    });
    if (result[0].status != 0) {
      throw new Error(`API error! Status: ${result[0].status}`);
    }
    return result[0].items;
  }

  static async postToAPI(postData) {
    condLog(`>>>>> postToAPI ${postData.action} ${postData.key || postData.keys}`, postData);
    const API_URL = "https://api.wikitree.com/api.php";

    let formData = new FormData();
    for (var key in postData) {
      formData.append(key, postData[key]);
    }
    // We're POSTing the data, so we don't worry about URL size limits and want JSON back.
    let options = {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(formData),
    };
    const response = await fetch(API_URL, options);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}: ${response.statusText}`);
    }
    return await response.json();
  }
}
