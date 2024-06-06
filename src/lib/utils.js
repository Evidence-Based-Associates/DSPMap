export const removeDuplicates = (num) => {
  var x,
    len = num.length,
    out = [],
    obj = {};

  for (x = 0; x < len; x++) {
    obj[num[x]] = 0;
  }
  for (x in obj) {
    out.push(x);
  }
  return out;
};

export const headingList = (headingContent, listItems) => {
  const providerCard = document.createElement("div");
  providerCard.className = "card";
  const cardHeader = document.createElement("div");
  cardHeader.className = "card-header";

  const providerTitle = document.createElement("h5");
  providerTitle.className = "card-title";
  providerTitle.innerHTML = headingContent;
  cardHeader.appendChild(providerTitle);

  const list = document.createElement("ul");
  list.className = "list-group-flush mt-2";
  listItems.forEach((item) => {
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.innerText = item;
    list.appendChild(li);
  });

  providerCard.appendChild(cardHeader);
  providerCard.appendChild(list);
  return providerCard;
};
